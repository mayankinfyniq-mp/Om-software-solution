"use client";

import { useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/* ------------------------------------------------------------------ */
/*  Shaders                                                            */
/* ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uAmp;

attribute float aScale;
attribute float aMix;

varying float vMix;
varying float vAlpha;

/* --- Ashima Arts 3D simplex noise --- */
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
/* ------------------------------------ */

void main() {
  vMix = aMix;
  vec3 dir = normalize(position);
  float n = snoise(dir * 1.7 + uTime * 0.16);
  float n2 = snoise(dir * 4.2 - uTime * 0.1);
  vec3 displaced = position + dir * (n * 0.34 + n2 * 0.12) * uAmp;

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio / max(0.001, -mv.z);
  vAlpha = smoothstep(15.0, 3.0, -mv.z) * (0.55 + 0.45 * n);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;

varying float vMix;
varying float vAlpha;

void main() {
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.05, d);
  vec3 color = mix(uColorA, uColorB, smoothstep(0.15, 0.85, vMix));
  color = mix(color, uColorC, step(0.93, vMix));
  gl_FragColor = vec4(color, soft * vAlpha * uOpacity);
}
`;

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                   */
/* ------------------------------------------------------------------ */

function createOrbGeometry(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const mixes = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    scales[i] = 0.6 + Math.random() * 1.1;
    mixes[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geo.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
  return geo;
}

function createStarGeometry(count: number, inner: number, outer: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const mixes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const dir = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    const r = inner + Math.random() * (outer - inner);
    positions[i * 3] = dir.x * r;
    positions[i * 3 + 1] = dir.y * r;
    positions[i * 3 + 2] = dir.z * r;
    scales[i] = 0.35 + Math.random() * 0.55;
    mixes[i] = 0.85 + Math.random() * 0.15;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geo.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
  return geo;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * The hero WebGL scene: a saffron particle orb breathing with simplex noise,
 * surrounded by drifting ambient dust. Reacts to the mouse, rotates with
 * time and gently rises as you scroll. Performance-conscious: DPR clamped,
 * particle count halved on mobile, render pauses when off-screen.
 */
export default function HeroCanvas({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* WebGL support check — fall back to the CSS gradient behind it. */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3.6;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: isMobile ? 12 : 10 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uAmp: { value: reduced ? 1 : 2.2 },
      uOpacity: { value: reduced ? 1 : 0 },
      uColorA: { value: new THREE.Color("#FF671F") }, // saffron
      uColorB: { value: new THREE.Color("#FFC49A") }, // pale peach
      uColorC: { value: new THREE.Color("#7E93C8") }, // slate blue
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const group = new THREE.Group();
    const orbGeo = createOrbGeometry(isMobile ? 4200 : 9000, 1.5);
    const starGeo = createStarGeometry(isMobile ? 500 : 1300, 3.4, 9);
    const orb = new THREE.Points(orbGeo, material);
    const stars = new THREE.Points(starGeo, material);
    group.add(orb, stars);
    scene.add(group);

    /* Entrance: particles gather into the orb while fading in. */
    if (reduced) {
      uniforms.uAmp.value = 1;
      uniforms.uOpacity.value = 1;
    } else {
      gsap.to(uniforms.uAmp, { value: 1, duration: 2.4, ease: "power3.out", delay: 0.15 });
      gsap.to(uniforms.uOpacity, { value: 1, duration: 1.8, ease: "power2.out", delay: 0.15 });
    }

    /* Interaction + loop state */
    let mouseX = 0;
    let mouseY = 0;
    let raf = 0;
    let active = true;
    const clock = new THREE.Clock();
    let spin = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });
    io.observe(mount);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += delta;

      spin += delta * (reduced ? 0.02 : 0.07);
      group.rotation.y += (spin + mouseX * 0.35 - group.rotation.y) * 0.04;
      group.rotation.x += (mouseY * 0.22 - group.rotation.x) * 0.04;
      group.position.y = window.scrollY * 0.0012;

      renderer.render(scene, camera);
    };
    tick();

    window.addEventListener("mousemove", onMouse, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      orbGeo.dispose();
      starGeo.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
