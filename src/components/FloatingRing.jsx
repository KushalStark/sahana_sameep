import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';
import SSMonogram from '../assets/SSMonogram';

export default function FloatingRing() {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // Viewport Intersection Observer: Pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(container);

    // Three.js Scene Setup
    const width = container.clientWidth || 300;
    const height = 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch (err) {
      setWebglSupported(false);
      return;
    }

    // Two Interlocking Romantic Wedding Bands (Sahana & Sameep)
    const ringGroup = new THREE.Group();

    // Band 1: Warm Champagne Gold (Sahana)
    const bandGeo1 = new THREE.TorusGeometry(1.4, 0.18, 30, 80);
    const goldMat1 = new THREE.MeshStandardMaterial({
      color: 0xE4C795,
      metalness: 0.96,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(bandGeo1, goldMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.set(-0.4, 0, 0);

    // Band 2: Deep Rose-Gold (Sameep)
    const bandGeo2 = new THREE.TorusGeometry(1.4, 0.18, 30, 80);
    const goldMat2 = new THREE.MeshStandardMaterial({
      color: 0xD4A373,
      metalness: 0.94,
      roughness: 0.18,
    });
    const ring2 = new THREE.Mesh(bandGeo2, goldMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = -Math.PI / 6;
    ring2.position.set(0.4, 0, 0);

    // Solitaire Diamond Gem on Band 1
    const diamondGeo = new THREE.OctahedronGeometry(0.32, 0);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.7,
      opacity: 0.95,
      transparent: true,
      roughness: 0.05,
      ior: 2.4,
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.position.set(0, 1.48, 0);
    ring1.add(diamond);

    ringGroup.add(ring1);
    ringGroup.add(ring2);
    scene.add(ringGroup);

    // Luxury Warm Studio Lights
    const ambientLight = new THREE.AmbientLight(0xFFF9F0, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFF0D4, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xC5A16B, 1.8);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 10);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isInView) return;

      const elapsed = clock.getElapsedTime();
      // Smooth continuous slow rotation
      ringGroup.rotation.y = elapsed * 0.45;
      ringGroup.rotation.x = Math.sin(elapsed * 0.7) * 0.15 + 0.25;
      ringGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 300;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      // Dispose resources
      bandGeo1.dispose();
      bandGeo2.dispose();
      diamondGeo.dispose();
      goldMat1.dispose();
      goldMat2.dispose();
      diamondMat.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [isInView]);

  return (
    <section className="relative py-16 bg-gradient-to-b from-[#FAF6EF] via-[#F4EFE6] to-[#FAF6EF] overflow-hidden select-none">
      <div className="max-w-[390px] mx-auto px-6 text-center">
        {/* Subtle Lotus Crest */}
        <div className="flex justify-center mb-2">
          <LotusMotif className="w-8 h-8 text-gold" strokeWidth={1.2} />
        </div>

        {/* Caption Requirement from Prompt */}
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold mb-1">
          Two Hearts. One Promise.
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-deep font-medium mb-3">
          Bound in Eternal Love
        </h3>

        <OrnamentalDivider className="max-w-[180px] mx-auto text-gold mb-4" />

        {/* 3D Canvas Container */}
        <div className="relative w-full h-[260px] flex items-center justify-center my-2">
          {/* Subtle Ambient Radial Glow Behind Ring */}
          <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

          {/* Three.js Canvas Mount */}
          {webglSupported ? (
            <div ref={mountRef} className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing" />
          ) : (
            /* CSS 3D Fallback if WebGL is disabled */
            <div className="relative w-36 h-36 rounded-full border-4 border-gold shadow-wax flex items-center justify-center animate-float-slow">
              <SSMonogram size={72} variant="gold" />
            </div>
          )}

          {/* Contact Soft Shadow */}
          <div className="absolute bottom-4 inset-x-12 h-6 bg-black/15 blur-lg rounded-full pointer-events-none" />
        </div>

        <p className="font-serif text-sm text-charcoal-light italic max-w-xs mx-auto leading-relaxed mt-2">
          "As these golden bands circle without beginning or end, so too does our devotion."
        </p>
      </div>
    </section>
  );
}
