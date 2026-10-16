import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = {
  primary: 0x050b14,
  accent: 0x3a5a80,
};

export const WebGLBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.primary, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: COLORS.accent,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };
    window.addEventListener('mousemove', onDocumentMouseMove);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY * 0.0005;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      targetX = mouseX * 2;
      targetY = mouseY * 2;

      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      group.rotation.y += 0.0005;
      group.position.y = scrollY * 2;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen"
    />
  );
};
