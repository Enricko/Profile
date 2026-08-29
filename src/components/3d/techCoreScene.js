import * as THREE from 'three';

const AMBER = 0xff9d5c;
const AMBER_DEEP = 0xff7843;
const CYAN = 0x3ddcd0;
const CYAN_BRIGHT = 0x00e5ff;

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function makeOrbitRing(radiusX, radiusY, color, segments = 128) {
  const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(segments).map((p) => new THREE.Vector3(p.x, p.y, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 });
  return new THREE.LineLoop(geometry, material);
}

export function createTechCoreScene(canvas, { width, height, reducedMotion = false }) {
  const glowTexture = makeGlowTexture();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7);

  const group = new THREE.Group();
  scene.add(group);

  // --- Inner glowing core -------------------------------------------------
  const coreGeometry = new THREE.IcosahedronGeometry(0.85, 2);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: CYAN_BRIGHT,
    emissive: new THREE.Color(CYAN_BRIGHT),
    emissiveIntensity: 1.1,
    roughness: 0.35,
    metalness: 0.2,
    transparent: true,
    opacity: 0.92,
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);

  const glowSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: CYAN_BRIGHT,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  glowSprite.scale.set(3.2, 3.2, 1);
  group.add(glowSprite);

  // --- Polyhedral wireframe shell -----------------------------------------
  const shellGeometry = new THREE.IcosahedronGeometry(1.8, 1);
  const shellEdges = new THREE.EdgesGeometry(shellGeometry);
  const shellMaterial = new THREE.LineBasicMaterial({
    color: AMBER,
    transparent: true,
    opacity: 0.4,
  });
  const shellLines = new THREE.LineSegments(shellEdges, shellMaterial);
  group.add(shellLines);

  const vertexPositions = shellGeometry.attributes.position;
  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.09,
    map: glowTexture,
    color: AMBER_DEEP,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const shellPoints = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', vertexPositions.clone()), pointsMaterial);
  group.add(shellPoints);

  // --- Orbiting data rings --------------------------------------------------
  const ringConfigs = [
    { rx: 2.6, ry: 1.0, color: CYAN, tiltX: 0.35, tiltZ: 0.1, speed: 0.35 },
    { rx: 2.3, ry: 1.3, color: AMBER, tiltX: -0.55, tiltZ: 0.65, speed: -0.22 },
    { rx: 2.9, ry: 0.75, color: CYAN_BRIGHT, tiltX: 1.15, tiltZ: -0.3, speed: 0.16 },
  ];
  const rings = ringConfigs.map((cfg) => {
    const ring = makeOrbitRing(cfg.rx, cfg.ry, cfg.color);
    ring.rotation.x = cfg.tiltX;
    ring.rotation.z = cfg.tiltZ;
    group.add(ring);
    return { mesh: ring, speed: cfg.speed };
  });

  // --- Ambient particles / stardust ----------------------------------------
  const particleCount = 140;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = 3.4 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.045,
    map: glowTexture,
    color: 0xbfe9ff,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // --- Lights ---------------------------------------------------------------
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const coreLight = new THREE.PointLight(CYAN_BRIGHT, 6, 8);
  coreLight.position.set(0, 0, 0);
  scene.add(coreLight);
  const rimLight = new THREE.PointLight(AMBER, 3, 10);
  rimLight.position.set(3, 2, 4);
  scene.add(rimLight);

  // --- Interaction state ------------------------------------------------------
  const pointer = { x: 0, y: 0 };
  const rotationTarget = { x: 0, y: 0 };
  const currentRotation = { x: 0, y: 0 };
  const dragState = { active: false, lastX: 0, lastY: 0, velX: 0, velY: 0 };
  let pulseStrength = 0;
  const clock = new THREE.Clock();
  let rafId = null;
  let disposed = false;

  function setPointer(nx, ny) {
    pointer.x = nx;
    pointer.y = ny;
    if (!dragState.active) {
      rotationTarget.x = ny * 0.35;
      rotationTarget.y = nx * 0.5;
    }
  }

  function onDragStart(x, y) {
    dragState.active = true;
    dragState.lastX = x;
    dragState.lastY = y;
    dragState.velX = 0;
    dragState.velY = 0;
  }

  function onDragMove(x, y) {
    if (!dragState.active) return;
    const dx = x - dragState.lastX;
    const dy = y - dragState.lastY;
    dragState.lastX = x;
    dragState.lastY = y;
    dragState.velY = dx * 0.006;
    dragState.velX = dy * 0.006;
    currentRotation.y += dragState.velY;
    currentRotation.x += dragState.velX;
    rotationTarget.x = currentRotation.x;
    rotationTarget.y = currentRotation.y;
  }

  function onDragEnd() {
    dragState.active = false;
  }

  function pulse() {
    pulseStrength = 1;
  }

  function resize(w, h) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
  }

  function animate() {
    if (disposed) return;
    rafId = requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.getElapsedTime();

    if (dragState.active) {
      currentRotation.x = rotationTarget.x;
      currentRotation.y = rotationTarget.y;
    } else {
      currentRotation.x += (rotationTarget.x - currentRotation.x) * 0.05;
      currentRotation.y += (rotationTarget.y - currentRotation.y) * 0.05;
      // momentum glide after releasing a drag
      currentRotation.x += dragState.velX;
      currentRotation.y += dragState.velY;
      dragState.velX *= 0.92;
      dragState.velY *= 0.92;
      rotationTarget.x = currentRotation.x;
      rotationTarget.y = currentRotation.y;
    }

    const idleSpin = reducedMotion ? 0 : delta * 0.08;
    group.rotation.x = currentRotation.x;
    group.rotation.y = currentRotation.y + elapsed * 0.05;
    shellLines.rotation.y += idleSpin;
    shellPoints.rotation.y += idleSpin;

    rings.forEach(({ mesh, speed }) => {
      mesh.rotation.z += (reducedMotion ? speed * 0.2 : speed) * delta;
    });

    particles.rotation.y += delta * 0.015;

    const pulseGlow = 1 + Math.sin(elapsed * 1.6) * 0.08 + pulseStrength * 0.6;
    coreMesh.scale.setScalar(pulseGlow);
    glowSprite.material.opacity = 0.5 + Math.sin(elapsed * 1.6) * 0.12 + pulseStrength * 0.35;
    coreLight.intensity = 6 + pulseStrength * 8;
    pulseStrength *= 0.9;

    renderer.render(scene, camera);
  }

  function start() {
    if (rafId !== null || disposed) return;
    clock.start();
    animate();
  }

  function stop() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function dispose() {
    disposed = true;
    stop();
    glowTexture.dispose();
    coreGeometry.dispose();
    coreMaterial.dispose();
    glowSprite.material.dispose();
    shellGeometry.dispose();
    shellEdges.dispose();
    shellMaterial.dispose();
    shellPoints.geometry.dispose();
    pointsMaterial.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    rings.forEach(({ mesh }) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    renderer.dispose();
  }

  return { start, stop, resize, dispose, setPointer, onDragStart, onDragMove, onDragEnd, pulse };
}
