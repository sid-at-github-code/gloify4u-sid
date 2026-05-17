import { useEffect, useRef } from "react";
import * as THREE from "three";

const N        = 130;          // particle count
const SPREAD   = 55;           // half-size of the spawn cube (x/y)
const DEPTH    = 28;           // half-size in z
const THRESH   = 22;           // connection distance threshold
const MAX_SEGS = 700;          // pre-allocated line segments

// Primary green (hsl 148 44% 20%) normalised to 0–1
const G_R = 28  / 255;
const G_G = 74  / 255;
const G_B = 42  / 255;

export default function ThreeBackground({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ───────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ─────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 95);

    /* ── Particles ──────────────────────────────────────────── */
    const pArr = new Float32Array(N * 3);
    const vel: number[] = [];

    for (let i = 0; i < N; i++) {
      pArr[i * 3]     = (Math.random() - 0.5) * SPREAD * 2;
      pArr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 2;
      pArr[i * 3 + 2] = (Math.random() - 0.5) * DEPTH  * 2;
      vel.push(
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.009,
      );
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xf0ece0,
      size: 0.9,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── Line segments ──────────────────────────────────────── */
    const lPos = new Float32Array(MAX_SEGS * 6);
    const lCol = new Float32Array(MAX_SEGS * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage));
    lGeo.setAttribute("color",    new THREE.BufferAttribute(lCol, 3).setUsage(THREE.DynamicDrawUsage));

    const lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 });
    const lineSegs = new THREE.LineSegments(lGeo, lMat);
    scene.add(lineSegs);

    /* ── Mouse parallax ─────────────────────────────────────── */
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    /* ── Resize ─────────────────────────────────────────────── */
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ─────────────────────────────────────── */
    let raf: number;
    let elapsed = 0;
    let last = performance.now();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt  = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      const p = pGeo.attributes.position.array as Float32Array;

      /* move particles */
      for (let i = 0; i < N; i++) {
        p[i * 3]     += vel[i * 3];
        p[i * 3 + 1] += vel[i * 3 + 1];
        p[i * 3 + 2] += vel[i * 3 + 2];
        if (Math.abs(p[i * 3])     > SPREAD) vel[i * 3]     *= -1;
        if (Math.abs(p[i * 3 + 1]) > SPREAD) vel[i * 3 + 1] *= -1;
        if (Math.abs(p[i * 3 + 2]) > DEPTH)  vel[i * 3 + 2] *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      /* build connections */
      let seg = 0;
      for (let i = 0; i < N && seg < MAX_SEGS; i++) {
        for (let j = i + 1; j < N && seg < MAX_SEGS; j++) {
          const dx = p[i*3]   - p[j*3];
          const dy = p[i*3+1] - p[j*3+1];
          const dz = p[i*3+2] - p[j*3+2];
          const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (d < THRESH) {
            const a = (1 - d / THRESH) * 0.45;
            const b = seg * 6;
            lPos[b]   = p[i*3];   lPos[b+1] = p[i*3+1]; lPos[b+2] = p[i*3+2];
            lPos[b+3] = p[j*3];   lPos[b+4] = p[j*3+1]; lPos[b+5] = p[j*3+2];
            lCol[b]   = G_R*a; lCol[b+1] = G_G*a; lCol[b+2] = G_B*a;
            lCol[b+3] = G_R*a; lCol[b+4] = G_G*a; lCol[b+5] = G_B*a;
            seg++;
          }
        }
      }
      lGeo.setDrawRange(0, seg * 2);
      lGeo.attributes.position.needsUpdate = true;
      lGeo.attributes.color.needsUpdate    = true;

      /* slow overall rotation */
      points.rotation.y   = elapsed * 0.025;
      lineSegs.rotation.y = elapsed * 0.025;

      /* camera parallax */
      camera.position.x += (mx * 14 - camera.position.x) * 0.04;
      camera.position.y += (-my * 9  - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pGeo.dispose(); pMat.dispose();
      lGeo.dispose(); lMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
