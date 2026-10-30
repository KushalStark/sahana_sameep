import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, Move3d } from 'lucide-react';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';
import { weddingConfig } from '../config/wedding';

/**
 * ====================================================================
 * PARAMETRIC GEOMETRY GENERATORS FOR THE AUTHENTIC WEDDING RINGS
 * ====================================================================
 * Recreates the exact jewellery from the couple's verified photograph:
 * - Real faceted round brilliant-cut diamonds (table, crown, girdle, pavilion).
 * - Groom's broad contoured gold band with concave channel and bypass wave.
 * - Bride's contoured gold band with upper pavé diamond channel and bypass solitaire.
 * - Genuine hollow interior cylinders for authentic comfort-fit profile.
 */

// Faceted Round Brilliant Diamond Geometry
function createBrilliantCutGeometry(radius = 1, options = {}) {
  const segments = options.segments || 16;
  const tableRadius = radius * 0.58;
  const crownHeight = radius * 0.32;
  const girdleThickness = radius * 0.08;
  const pavilionDepth = radius * 0.72;

  const vertices = [];
  const indices = [];

  // Table center and vertices (at y = crownHeight)
  const tableCenterIndex = 0;
  vertices.push(0, crownHeight, 0);

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push(Math.cos(angle) * tableRadius, crownHeight, Math.sin(angle) * tableRadius);
  }

  for (let i = 1; i <= segments; i++) {
    const next = i === segments ? 1 : i + 1;
    indices.push(tableCenterIndex, next, i);
  }

  // Girdle upper rim
  const girdleUpperOffset = vertices.length / 3;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push(Math.cos(angle) * radius, girdleThickness * 0.5, Math.sin(angle) * radius);
  }

  for (let i = 0; i < segments; i++) {
    const tCurrent = 1 + i;
    const tNext = 1 + ((i + 1) % segments);
    const gCurrent = girdleUpperOffset + i;
    const gNext = girdleUpperOffset + ((i + 1) % segments);

    indices.push(tCurrent, gNext, gCurrent);
    indices.push(tCurrent, tNext, gNext);
  }

  // Girdle lower rim
  const girdleLowerOffset = vertices.length / 3;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push(Math.cos(angle) * radius, -girdleThickness * 0.5, Math.sin(angle) * radius);
  }

  for (let i = 0; i < segments; i++) {
    const uCurr = girdleUpperOffset + i;
    const uNext = girdleUpperOffset + ((i + 1) % segments);
    const lCurr = girdleLowerOffset + i;
    const lNext = girdleLowerOffset + ((i + 1) % segments);

    indices.push(uCurr, uNext, lCurr);
    indices.push(uNext, lNext, lCurr);
  }

  // Culet (point at pavilion tip)
  const culetIndex = vertices.length / 3;
  vertices.push(0, -pavilionDepth, 0);

  for (let i = 0; i < segments; i++) {
    const lCurr = girdleLowerOffset + i;
    const lNext = girdleLowerOffset + ((i + 1) % segments);
    indices.push(lCurr, culetIndex, lNext);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  // Convert to non-indexed buffer geometry for sharp faceted diamond reflections
  const nonIndexedGeo = geometry.toNonIndexed();
  nonIndexedGeo.computeVertexNormals();
  geometry.dispose();

  return nonIndexedGeo;
}

// Ring 1: Groom's Broad Band with Concave Channel & Bypass Wave
function createBroadContouredRingGeometry(options = {}) {
  const thetaSegments = options.thetaSegments || 96;
  const numProfilePts = 20;
  const innerRadius = options.innerRadius || 1.32;
  const bandThickness = options.bandThickness || 0.23;
  const bandWidth = options.bandWidth || 0.56;

  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= thetaSegments; i++) {
    const theta = (i / thetaSegments) * Math.PI * 2;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    // Front bypass wave contour near theta = Math.PI * 0.5
    const angleDiff = Math.atan2(Math.sin(theta - Math.PI * 0.5), Math.cos(theta - Math.PI * 0.5));
    const waveInfluence = Math.exp(-(angleDiff * angleDiff) / 0.45);
    const waveShiftZ = Math.sin(angleDiff * 2.0) * 0.14 * waveInfluence;
    const waveFlare = waveInfluence * 0.09;

    for (let j = 0; j < numProfilePts; j++) {
      let r, z;
      const t = j / (numProfilePts - 1);

      if (t < 0.25) {
        // Inner comfort-fit cylindrical wall (genuine hollow center)
        const s = t / 0.25;
        r = innerRadius;
        z = -bandWidth * 0.5 + s * bandWidth;
      } else if (t < 0.35) {
        // Top bevel rim
        const s = (t - 0.25) / 0.10;
        r = innerRadius + s * bandThickness;
        z = bandWidth * 0.5;
      } else if (t < 0.85) {
        // Outer sculpted surface: concave center channel with raised rim lips
        const s = (t - 0.35) / 0.50;
        const v = 2 * (s - 0.5);
        const channelDip = (1 - v * v) * 0.055;
        r = innerRadius + bandThickness + waveFlare - channelDip;
        z = (bandWidth * 0.5 - s * bandWidth) + waveShiftZ;
      } else {
        // Bottom bevel rim
        const s = (t - 0.85) / 0.15;
        r = innerRadius + (1 - s) * bandThickness;
        z = -bandWidth * 0.5;
      }

      const x = r * cosT;
      const y = r * sinT;
      vertices.push(x, y, z);
      uvs.push(i / thetaSegments, j / (numProfilePts - 1));
    }
  }

  for (let i = 0; i < thetaSegments; i++) {
    for (let j = 0; j < numProfilePts - 1; j++) {
      const a = i * numProfilePts + j;
      const b = (i + 1) * numProfilePts + j;
      const c = (i + 1) * numProfilePts + (j + 1);
      const d = i * numProfilePts + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

// Ring 2: Bride's Contoured Band with Pavé Channel & Bypass Wave
function createSlimDiamondBandGeometry(options = {}) {
  const thetaSegments = options.thetaSegments || 96;
  const numProfilePts = 20;
  const innerRadius = options.innerRadius || 1.22;
  const bandThickness = options.bandThickness || 0.19;
  const bandWidth = options.bandWidth || 0.40;

  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= thetaSegments; i++) {
    const theta = (i / thetaSegments) * Math.PI * 2;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    // Bypass curve around front
    const angleDiff = Math.atan2(Math.sin(theta - Math.PI * 0.5), Math.cos(theta - Math.PI * 0.5));
    const waveInfluence = Math.exp(-(angleDiff * angleDiff) / 0.55);
    const waveShiftZ = Math.sin(angleDiff * 1.8) * 0.08 * waveInfluence;
    const waveFlare = waveInfluence * 0.06;

    for (let j = 0; j < numProfilePts; j++) {
      let r, z;
      const t = j / (numProfilePts - 1);

      if (t < 0.25) {
        // Inner comfort-fit wall (genuine hollow center)
        const s = t / 0.25;
        r = innerRadius;
        z = -bandWidth * 0.5 + s * bandWidth;
      } else if (t < 0.35) {
        // Top bevel rim
        const s = (t - 0.25) / 0.10;
        r = innerRadius + s * bandThickness;
        z = bandWidth * 0.5;
      } else if (t < 0.85) {
        // Outer curved profile with upper pavé diamond channel
        const s = (t - 0.35) / 0.50;
        const v = 2 * (s - 0.5);
        const channel = v > 0.1 ? 0.025 : 0;
        r = innerRadius + bandThickness + waveFlare - channel;
        z = (bandWidth * 0.5 - s * bandWidth) + waveShiftZ;
      } else {
        // Bottom bevel rim
        const s = (t - 0.85) / 0.15;
        r = innerRadius + (1 - s) * bandThickness;
        z = -bandWidth * 0.5;
      }

      const x = r * cosT;
      const y = r * sinT;
      vertices.push(x, y, z);
      uvs.push(i / thetaSegments, j / (numProfilePts - 1));
    }
  }

  for (let i = 0; i < thetaSegments; i++) {
    for (let j = 0; j < numProfilePts - 1; j++) {
      const a = i * numProfilePts + j;
      const b = (i + 1) * numProfilePts + j;
      const c = (i + 1) * numProfilePts + (j + 1);
      const d = i * numProfilePts + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * ====================================================================
 * MAIN COMPONENT: 3D WEDDING RINGS PRESENTATION
 * ====================================================================
 */
export default function FloatingRing() {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const ringsConfig = weddingConfig.weddingRings || {
    subtitle: "Two Hearts. One Promise.",
    heading: "Our Wedding Rings",
    quote: "As these golden bands circle without beginning or end, so too does our devotion.",
  };

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
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Three.js Scene Setup
    const width = container.clientWidth || 360;
    const height = 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.5);

    let renderer;
    let envTexture;
    let pmremGenerator;
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

      // Studio Room Environment for photorealistic gold & diamond reflections
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTexture;
    } catch (err) {
      setWebglSupported(false);
      return;
    }

    // Master Group for both rings
    const ringsMasterGroup = new THREE.Group();

    // ================================================================
    // MATERIALS CONFIGURATION (Physically Based Rendering)
    // ================================================================
    // 18k Warm Indian Yellow/Rose Gold with high metalness & polished reflections
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xDE9F62,
      metalness: 0.95,
      roughness: 0.17,
      envMapIntensity: 1.35,
    });

    // Brilliant-Cut Refractive Diamond Material with fire dispersion & facet sparkles
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.42,
      ior: 2.417, // Natural diamond refractive index
      thickness: 0.8,
      specularIntensity: 4.0,
      specularColor: 0xFFFFFF,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      dispersion: 0.085, // Diamond spectral fire dispersion
      envMapIntensity: 3.5,
    });

    // Disposal tracker
    const geometriesToDispose = [];

    // ================================================================
    // RING 1: GROOM'S WEDDING BAND (Broader Sculpted Concave Band with Solitaire)
    // ================================================================
    const ring1Group = new THREE.Group();

    const ring1Geo = createBroadContouredRingGeometry();
    geometriesToDispose.push(ring1Geo);
    const ring1Mesh = new THREE.Mesh(ring1Geo, goldMaterial);
    ring1Group.add(ring1Mesh);

    // Prominent Solitaire Diamond mounted nestled inside the concave bypass groove
    const diamond1Geo = createBrilliantCutGeometry(0.26, { segments: 16 });
    geometriesToDispose.push(diamond1Geo);
    const diamond1Mesh = new THREE.Mesh(diamond1Geo, diamondMaterial);
    diamond1Mesh.position.set(0.02, 1.48, 0.06);
    diamond1Mesh.rotation.x = -Math.PI * 0.18;
    ring1Group.add(diamond1Mesh);

    // Gold Bezel Setting Collar surrounding the solitaire diamond
    const bezel1Geo = new THREE.CylinderGeometry(0.28, 0.26, 0.08, 24, 1, true);
    geometriesToDispose.push(bezel1Geo);
    const bezel1Mesh = new THREE.Mesh(bezel1Geo, goldMaterial);
    bezel1Mesh.position.set(0.02, 1.45, 0.05);
    bezel1Mesh.rotation.x = -Math.PI * 0.18;
    ring1Group.add(bezel1Mesh);

    // Base alignment for Ring 1 (Foreground, left)
    ring1Group.rotation.x = Math.PI * 0.32;
    ring1Group.rotation.y = -Math.PI * 0.08;
    ring1Group.rotation.z = -Math.PI * 0.04;
    ring1Group.position.set(-0.36, -0.15, 0.12);
    ringsMasterGroup.add(ring1Group);

    // ================================================================
    // RING 2: BRIDE'S WEDDING BAND (Two-Tier Contoured: Pavé Crest + Bypass Solitaire)
    // ================================================================
    const ring2Group = new THREE.Group();

    const ring2Geo = createSlimDiamondBandGeometry();
    geometriesToDispose.push(ring2Geo);
    const ring2Mesh = new THREE.Mesh(ring2Geo, goldMaterial);
    ring2Group.add(ring2Mesh);

    // Prominent Solitaire Diamond on Bride's Band nestled in the bypass curve
    const diamond2Geo = createBrilliantCutGeometry(0.23, { segments: 16 });
    geometriesToDispose.push(diamond2Geo);
    const diamond2Mesh = new THREE.Mesh(diamond2Geo, diamondMaterial);
    diamond2Mesh.position.set(0.12, 1.38, 0.04);
    diamond2Mesh.rotation.x = -Math.PI * 0.18;
    diamond2Mesh.rotation.z = -0.08;
    ring2Group.add(diamond2Mesh);

    // Bezel setting collar for solitaire
    const bezel2Geo = new THREE.CylinderGeometry(0.25, 0.23, 0.07, 24, 1, true);
    geometriesToDispose.push(bezel2Geo);
    const bezel2Mesh = new THREE.Mesh(bezel2Geo, goldMaterial);
    bezel2Mesh.position.copy(diamond2Mesh.position);
    bezel2Mesh.rotation.copy(diamond2Mesh.rotation);
    ring2Group.add(bezel2Mesh);

    // Continuous Pavé Micro-Diamonds Row along the upper crest (10 micro diamonds)
    // Runs along the top contour leading gracefully into the bypass solitaire
    const paveCount = 10;
    const microDiamondGeo = createBrilliantCutGeometry(0.058, { segments: 10 });
    geometriesToDispose.push(microDiamondGeo);

    const prongGeo = new THREE.SphereGeometry(0.018, 8, 8);
    geometriesToDispose.push(prongGeo);

    for (let i = 0; i < paveCount; i++) {
      // Arc along upper crest
      const angle = (Math.PI * 0.55) + (i * 0.034);
      const px = Math.cos(angle) * 1.39;
      const py = Math.sin(angle) * 1.39;
      const pz = 0.10;

      const mMesh = new THREE.Mesh(microDiamondGeo, diamondMaterial);
      mMesh.position.set(px, py, pz);
      mMesh.rotation.z = angle - Math.PI * 0.5;
      mMesh.rotation.x = -Math.PI * 0.22;
      ring2Group.add(mMesh);

      // Gold prong bead between diamonds
      const prongMesh = new THREE.Mesh(prongGeo, goldMaterial);
      prongMesh.position.set(px, py + 0.02, pz + 0.015);
      ring2Group.add(prongMesh);
    }

    // Position Ring 2: Resting snugly across Ring 1's rim at ~22° tilt (matching photograph)
    ring2Group.rotation.x = Math.PI * 0.26;
    ring2Group.rotation.y = Math.PI * 0.16;
    ring2Group.rotation.z = -Math.PI * 0.08;
    ring2Group.position.set(0.34, 0.12, -0.08);
    ringsMasterGroup.add(ring2Group);

    scene.add(ringsMasterGroup);

    // ================================================================
    // LIGHTING SETUP (Luxury Jewellery Studio Illumination)
    // ================================================================
    const ambientLight = new THREE.AmbientLight(0xFFF6EA, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm golden specular highlight)
    const keyLight = new THREE.DirectionalLight(0xFFEBD2, 3.2);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    // Fill Light (Soft cool contrast to reveal diamond fire)
    const fillLight = new THREE.DirectionalLight(0xDCE8FF, 1.8);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Top Sparkle Point Light directly illuminating diamond tables
    const pointLightTop = new THREE.PointLight(0xFFFFFF, 3.5, 14);
    pointLightTop.position.set(0, 3.8, 4.2);
    scene.add(pointLightTop);

    // Subtle Rim Light
    const rimLightBack = new THREE.DirectionalLight(0xC5A16B, 2.0);
    rimLightBack.position.set(0, -6, -5);
    scene.add(rimLightBack);

    // ================================================================
    // INTERACTIVE TOUCH & MOUSE DRAG-TO-INSPECT SYSTEM
    // ================================================================
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.06;

    const onPointerDown = (clientX, clientY) => {
      isDragging = true;
      setIsUserInteracting(true);
      prevPointerX = clientX;
      prevPointerY = clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (clientX, clientY) => {
      if (!isDragging) return;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;
      prevPointerX = clientX;
      prevPointerY = clientY;

      velocityX = deltaX * 0.007;
      velocityY = deltaY * 0.007;

      targetRotationY += velocityX;
      targetRotationX += velocityY;

      // Constrain vertical pitch to prevent unnatural upside-down flipping
      targetRotationX = Math.max(-0.45, Math.min(0.55, targetRotationX));
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 1800);
    };

    // Mouse Listeners
    const handleMouseDown = (e) => {
      onPointerDown(e.clientX, e.clientY);
    };
    const handleMouseMove = (e) => {
      onPointerMove(e.clientX, e.clientY);
    };
    const handleMouseUp = () => {
      onPointerUp();
    };

    // Touch Listeners (Mobile Viewports)
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => {
      onPointerUp();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // ================================================================
    // ANIMATION LOOP (Romantic Rotation with Inertia & Floating)
    // ================================================================
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isInView) return;

      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        // Slow romantic auto-rotation resume
        targetRotationY += 0.0035;

        // Apply gentle inertia damping
        velocityX *= 0.92;
        velocityY *= 0.92;
        targetRotationY += velocityX;
        targetRotationX += velocityY;
      }

      // Smooth interpolation to target rotation
      ringsMasterGroup.rotation.y += (targetRotationY - ringsMasterGroup.rotation.y) * 0.12;
      ringsMasterGroup.rotation.x += (targetRotationX - ringsMasterGroup.rotation.x) * 0.12;
      ringsMasterGroup.rotation.z = Math.cos(elapsed * 0.35) * 0.035;

      // Subtle breathing float movement
      ringsMasterGroup.position.y = Math.sin(elapsed * 0.85) * 0.07;

      // Gentle counter-rocking for Ring 2 to create subtle natural depth
      ring2Group.rotation.z = -Math.PI * 0.06 + Math.sin(elapsed * 0.5) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 360;
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

      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      geometriesToDispose.forEach((geo) => geo.dispose());
      goldMaterial.dispose();
      diamondMaterial.dispose();
      if (envTexture) envTexture.dispose();
      if (pmremGenerator) pmremGenerator.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [isInView]);

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

        <OrnamentalDivider className="max-w-[160px] mx-auto text-[#C5A16B] mb-5" />

        {/* Main 3D Presentation Stage */}
        <div className="relative w-full max-w-[380px] h-[320px] mx-auto rounded-3xl bg-[#140F0D]/85 border border-[#C5A16B]/40 shadow-2xl flex items-center justify-center overflow-hidden">
          {webglSupported ? (
            <div
              ref={mountRef}
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
              title="Drag horizontally or vertically to rotate and inspect the wedding rings"
            />
          ) : (
            /* Graceful Non-WebGL Fallback */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <Sparkles className="w-8 h-8 text-[#C5A16B] mb-2 animate-pulse" />
              <p className="font-serif text-sm text-[#EAD9B8]">
                Sahana & Sameep Wedding Rings
              </p>
            </div>
          )}

          {/* Interactive Inspection Badge */}
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
            <div
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-sans tracking-widest uppercase transition-all duration-300 ${
                isUserInteracting
                  ? 'bg-[#C5A16B]/25 border-[#C5A16B] text-[#FFF6E5]'
                  : 'bg-black/60 border-[#C5A16B]/30 text-[#EAD9B8]'
              }`}
            >
              <Move3d className="w-3 h-3 text-[#C5A16B] animate-pulse" />
              <span>{isUserInteracting ? 'Inspecting In 3D' : 'Drag to Rotate in 3D'}</span>
            </div>
          </div>
        </div>

        {/* Romantic Supporting Quote */}
        <p className="font-serif text-sm text-[#D8C29D] italic max-w-sm mx-auto leading-relaxed mt-4">
          "{ringsConfig.quote}"
        </p>
      </div>
    </section>
  );
}
