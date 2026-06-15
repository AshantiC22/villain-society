import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function LoadingScreen({ onComplete }) {
  const mountRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(220, 220);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/mascot.png");

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      metalness: 0.1,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
    const mascot = new THREE.Mesh(geometry, material);
    scene.add(mascot);

    const frontLight = new THREE.PointLight(0xffffff, 3, 10);
    frontLight.position.set(0, 0, 3);
    scene.add(frontLight);

    const sideLight = new THREE.PointLight(0xffffff, 1.5, 10);
    sideLight.position.set(3, 2, 1);
    scene.add(sideLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    let frame = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      mascot.rotation.y += 0.04;
      mascot.rotation.x = Math.sin(frame * 0.01) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    const fadeTimer = setTimeout(() => setOpacity(0), 2200);
    const removeTimer = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#030201",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          pointerEvents: "none",
        }}
      />

      {/* Mascot — pulled up */}
      <div
        ref={mountRef}
        style={{
          width: "220px",
          height: "400px",
          marginTop: "60px",
          marginBottom: "20px",
        }}
      />

      {/* VILLAIN CULTURE */}
      <p
        style={{
          fontFamily: "Metal Mania",
          fontSize: "18px",
          letterSpacing: "8px",
          color: "rgba(200,110,15,0.9)",
          textAlign: "center",
          textShadow: "0 0 20px rgba(200,110,15,0.5)",
          marginBottom: "6px",
          marginTop: "0px",
        }}
      >
        VILLAIN CULTURE
      </p>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "9px",
          letterSpacing: "5px",
          color: "rgba(245,240,232,0.2)",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        BUILT FOR THE ONES WHO NEVER FIT
      </p>

      {/* Loading bar */}
      <div
        style={{
          width: "140px",
          height: "1px",
          background: "rgba(200,110,15,0.15)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(to right, rgba(200,110,15,0.4), rgba(200,110,15,1), rgba(200,110,15,0.4))",
            borderRadius: "999px",
            animation: "loadBar 2.2s ease forwards",
            boxShadow: "0 0 8px rgba(200,110,15,0.8)",
          }}
        />
      </div>

      <style>{`
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
