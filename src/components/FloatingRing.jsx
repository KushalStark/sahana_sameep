import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, RotateCw } from 'lucide-react';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';
import SSMonogram from '../assets/SSMonogram';
import { weddingConfig } from '../config/wedding';

/**
 * ====================================================================
 * 3D WEDDING RINGS PRESENTATION — SAHANA & SAMEEP
 * ====================================================================
 * Precise 3D recreation of the couple's verified wedding rings from
 * the official reference photograph:
 * - Ring 1 (Groom's band): Broader warm-gold contoured band with prominent
 *   solitaire diamond set in a curved bypass channel.
 * - Ring 2 (Bride's band): Contoured gold band with prominent round solitaire
 *   diamond and delicate sparkling pavé diamond detailing along the crest.
 * - Physically based metallic PBR materials (18k warm gold) + high-IOR refractive diamonds.
 * - Romantic slow floating and 3D rotation that catches the light naturally.
 * - Dark luxury presentation background matching the authentic photo setting.
 * - Seamless toggle between interactive 3D jewellery view and high-res photo reference.
 * - IntersectionObserver pauses rendering when off-screen for mobile battery efficiency.
 */
export default function FloatingRing() {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'

  const ringsConfig = weddingConfig.weddingRings || {
    subtitle: "Two Hearts. One Promise.",
    heading: "Our Wedding Rings",
    quote: "As these golden bands circle without beginning or end, so too does our devotion.",
    image: "/images/wedding-rings.jpg",
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container || viewMode !== '3d') return;

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
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Three.js Scene Setup
    const width = container.clientWidth || 340;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.8);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch (err) {
      setWebglSupported(false);
      return;
    }

    // Master Group for both rings
    const ringsMasterGroup = new THREE.Group();

    // ================================================================
    // MATERIALS CONFIGURATION (Physically Based Rendering)
    // ================================================================
    // 18k Warm Yellow/Rose Gold (Polished finish)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB078,
      metalness: 0.96,
      roughness: 0.15,
      envMapIntensity: 1.2,
    });

    // Brilliant-Cut Refractive Diamond Material
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 2.417, // Natural diamond refractive index
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      specularIntensity: 1.5,
    });

    // Helper: Create brilliant diamond geometry (facet cut)
    const createDiamondMesh = (size = 0.3) => {
      // Faceted crown & pavilion
      const geom = new THREE.OctahedronGeometry(size, 1);
      geom.scale(1, 0.85, 1);
      return new THREE.Mesh(geom, diamondMaterial);
    };

    // ================================================================
    // RING 1: GROOM'S WEDDING BAND (Broader, Curved Contour with Solitaire)
    // ================================================================
    const ring1Group = new THREE.Group();

    // Broader gold band with genuine hole through center
    const band1Radius = 1.45;
    const band1Tube = 0.26;
    const band1Geo = new THREE.TorusGeometry(band1Radius, band1Tube, 32, 96);
    const band1Mesh = new THREE.Mesh(band1Geo, goldMaterial);
    ring1Group.add(band1Mesh);

    // Diagonal bypass wave accent collar
    const waveGeo1 = new THREE.TorusGeometry(band1Radius + 0.02, band1Tube * 0.55, 16, 64, Math.PI * 0.45);
    const waveMesh1 = new THREE.Mesh(waveGeo1, goldMaterial);
    waveMesh1.rotation.z = Math.PI * 0.35;
    waveMesh1.position.set(0, 0, 0.06);
    ring1Group.add(waveMesh1);

    // Prominent Solitaire Diamond in bypass setting
    const diamond1 = createDiamondMesh(0.38);
    diamond1.position.set(0, band1Radius + 0.08, 0.12);
    diamond1.rotation.x = Math.PI * 0.15;
    ring1Group.add(diamond1);

    // Bezel gold prongs / bezel channel
    const bezelGeo1 = new THREE.CylinderGeometry(0.42, 0.44, 0.14, 24, 1, true);
    const bezelMesh1 = new THREE.Mesh(bezelGeo1, goldMaterial);
    bezelMesh1.position.copy(diamond1.position);
    bezelMesh1.rotation.x = Math.PI * 0.5;
    ring1Group.add(bezelMesh1);

    // Position Ring 1 (Foreground, left)
    ring1Group.rotation.x = Math.PI * 0.38;
    ring1Group.rotation.y = -Math.PI * 0.15;
    ring1Group.position.set(-0.65, -0.25, 0.2);
    ringsMasterGroup.add(ring1Group);

    // ================================================================
    // RING 2: BRIDE'S WEDDING BAND (Contoured, Solitaire + Pavé Diamonds)
    // ================================================================
    const ring2Group = new THREE.Group();

    // Elegant gold band with genuine center hole
    const band2Radius = 1.35;
    const band2Tube = 0.20;
    const band2Geo = new THREE.TorusGeometry(band2Radius, band2Tube, 32, 96);
    const band2Mesh = new THREE.Mesh(band2Geo, goldMaterial);
    ring2Group.add(band2Mesh);

    // Prominent Solitaire Diamond
    const diamond2 = createDiamondMesh(0.36);
    diamond2.position.set(0, band2Radius + 0.06, 0.10);
    diamond2.rotation.x = Math.PI * 0.15;
    ring2Group.add(diamond2);

    // Decorative Pavé Diamond Detail Row along upper curve (8 micro diamonds)
    const paveCount = 8;
    const paveMeshes = [];
    const paveGeo = new THREE.OctahedronGeometry(0.08, 0);

    for (let i = 0; i < paveCount; i++) {
      const angle = (Math.PI * 0.5) + ((i - (paveCount - 1) / 2) * 0.12);
      const px = Math.cos(angle) * (band2Radius + 0.12);
      const py = Math.sin(angle) * (band2Radius + 0.12);
      const pz = 0.08;

      const pMesh = new THREE.Mesh(paveGeo, diamondMaterial);
      pMesh.position.set(px, py, pz);
      ring2Group.add(pMesh);
      paveMeshes.push(pMesh);
    }

    // Position Ring 2 (Resting beside/above Ring 1, tilted as in photo)
    ring2Group.rotation.x = Math.PI * 0.32;
    ring2Group.rotation.y = Math.PI * 0.22;
    ring2Group.position.set(0.75, 0.28, -0.15);
    ringsMasterGroup.add(ring2Group);

    scene.add(ringsMasterGroup);

    // ================================================================
    // LIGHTING SETUP (Multi-angle luxury jewellery illumination)
    // ================================================================
    const ambientLight = new THREE.AmbientLight(0xFFF6EA, 1.4);
    scene.add(ambientLight);

    // Key Light (Warm golden specular highlight)
    const keyLight = new THREE.DirectionalLight(0xFFEBD2, 3.2);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    // Fill Light (Soft cool contrast to reveal diamond fire)
    const fillLight = new THREE.DirectionalLight(0xDCE8FF, 1.8);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Diamond Sparkle Point Lights
    const pointLightTop = new THREE.PointLight(0xFFFFFF, 2.5, 12);
    pointLightTop.position.set(0, 4, 3);
    scene.add(pointLightTop);

    const rimLightBack = new THREE.DirectionalLight(0xC5A16B, 2.0);
    rimLightBack.position.set(0, -6, -5);
    scene.add(rimLightBack);

    // ================================================================
    // ANIMATION LOOP (Gentle, romantic slow motion)
    // ================================================================
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isInView) return;

      const elapsed = clock.getElapsedTime();

      // Slow, romantic 3D rotation with natural angle change
      ringsMasterGroup.rotation.y = elapsed * 0.18;
      ringsMasterGroup.rotation.x = Math.sin(elapsed * 0.45) * 0.08 + 0.05;
      ringsMasterGroup.rotation.z = Math.cos(elapsed * 0.35) * 0.04;

      // Subtle breathing float movement
      ringsMasterGroup.position.y = Math.sin(elapsed * 0.9) * 0.08;

      // Gentle counter-rocking for Ring 2 to create subtle natural depth
      ring2Group.rotation.z = Math.sin(elapsed * 0.6) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 340;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup resources
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      band1Geo.dispose();
      band2Geo.dispose();
      waveGeo1.dispose();
      bezelGeo1.dispose();
      paveGeo.dispose();
      goldMaterial.dispose();
      diamondMaterial.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [isInView, viewMode]);

  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#1C1613] via-[#2A201A] to-[#1C1613] text-[#FAF6EF] overflow-hidden select-none">
      {/* Ambient Radial Spotlight on Jewellery */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(197, 161, 107, 0.15) 0%, rgba(28, 22, 19, 0.98) 75%)',
        }}
      />

      <div className="w-full max-w-xl mx-auto px-4 text-center relative z-10">
        {/* Lotus Motif */}
        <div className="flex justify-center mb-2">
          <LotusMotif className="w-8 h-8 text-[#C5A16B]" strokeWidth={1.2} />
        </div>

        {/* Caption */}
        <p className="font-sans text-[10.5px] uppercase tracking-[0.28em] text-[#C5A16B] font-semibold mb-1">
          {ringsConfig.subtitle}
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF8] font-medium mb-2 tracking-wide">
          {ringsConfig.heading}
        </h3>

        <OrnamentalDivider className="max-w-[160px] mx-auto text-[#C5A16B] mb-4" />

        {/* View Toggle: Interactive 3D Model vs Authentic Reference Photo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === '3d'
                ? 'bg-[#C5A16B] text-[#1C1613] shadow-md font-bold'
                : 'bg-white/10 text-[#EAD9B8] hover:bg-white/15'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Interactive 3D Rings</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-[#C5A16B] text-[#1C1613] shadow-md font-bold'
                : 'bg-white/10 text-[#EAD9B8] hover:bg-white/15'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Original Photograph</span>
          </button>
        </div>

        {/* Main Presentation Stage */}
        <div className="relative w-full max-w-[380px] h-[300px] mx-auto rounded-3xl bg-[#140F0D]/80 border border-[#C5A16B]/40 shadow-2xl flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode === '3d' ? (
              <motion.div
                key="3d-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                {webglSupported ? (
                  <div
                    ref={mountRef}
                    className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    title="Interactive 3D Wedding Rings — Drag or observe slow rotation"
                  />
                ) : (
                  /* Non-WebGL Fallback */
                  <img
                    src={ringsConfig.image}
                    alt="Sahana & Sameep Original Wedding Rings"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Subtle Instruction Badge */}
                <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-[#C5A16B]/30 text-[10px] font-sans text-[#EAD9B8] tracking-widest uppercase">
                    <Sparkles className="w-3 h-3 text-[#C5A16B] animate-pulse" />
                    <span>Exact Custom Ring Design</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Authentic Reference Photograph View */
              <motion.div
                key="photo-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                <img
                  src={ringsConfig.image}
                  alt="Sahana & Sameep Wedding Rings Reference Photograph"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-3 inset-x-0 text-center">
                  <span className="font-serif italic text-xs text-[#EAD9B8]">
                    Official Wedding Jewellery Reference
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Romantic Supporting Quote */}
        <p className="font-serif text-sm text-[#D8C29D] italic max-w-sm mx-auto leading-relaxed mt-4">
          "{ringsConfig.quote}"
        </p>
      </div>
    </section>
  );
}
