'use client';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import React, { useEffect, useRef, useState } from 'react';

interface STLViewerProps {
  stlPath: string;
  containerId?: string;
  initialColor?: string;
}

const STLViewerComponent: React.FC<STLViewerProps> = ({ 
  stlPath, 
  containerId = 'stl-viewer',
  initialColor = '#aaaaaa'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Color state for UI controls
  const [modelColor, setModelColor] = useState<string>(initialColor);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let cleanup: () => void = () => {};

    try {
      // Initialize scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f5f5); // Light gray background
      sceneRef.current = scene;

      // Initialize camera
      const camera = new THREE.PerspectiveCamera(
        60,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(20, 10, 20);
      cameraRef.current = camera;

      // Initialize renderer with antialiasing and correct pixel ratio
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add lighting for better material appearance
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(1, 1, 1);
      directionalLight1.castShadow = true;
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(-1, 0.5, -1);
      scene.add(directionalLight2);

      // Add grid helper for reference
      const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0xdddddd);
      scene.add(gridHelper);

      // Add axes helper to show orientation
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // Initialize material with better appearance
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(modelColor), 
        specular: 0x444444, 
        shininess: 30,
        flatShading: false 
      });
      materialRef.current = material;

      // Setup OrbitControls for user interaction
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.8;
      controls.panSpeed = 0.8;
      controls.zoomSpeed = 1.2;
      controls.update();
      controlsRef.current = controls;

      // Load STL
      setIsLoading(true);
      setError(null);
      const loader = new STLLoader();
      loader.load(
        stlPath,
        (geometry: THREE.BufferGeometry) => {
          if (meshRef.current) {
            scene.remove(meshRef.current);
            meshRef.current.geometry.dispose();
          }
          
          // Compute normals for smoother shading
          geometry.computeVertexNormals();
          
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          meshRef.current = mesh;

          // Scale and center the model
          geometry.computeBoundingBox();
          const boundingBox = geometry.boundingBox;
          
          if (boundingBox) {
            const size = boundingBox.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            // Scale to reasonable size
            const scaleFactor = 10 / maxDim;
            mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

            // Center the model
            const center = boundingBox.getCenter(new THREE.Vector3());
            mesh.position.set(
              -center.x * scaleFactor, 
              -center.y * scaleFactor, 
              -center.z * scaleFactor
            );

            // Reset controls target to center of model
            controls.target.set(0, 0, 0);
            
            // Position camera based on scaled model
            const distance = maxDim * scaleFactor * 1.5;
            camera.position.set(distance, distance * 0.8, distance);
            camera.lookAt(0, 0, 0);
            
            controls.update();
          }

          scene.add(mesh);
          setIsLoading(false);
        },
        (xhr) => {
          // Progress event if needed
          const loadPercentage = Math.round((xhr.loaded / xhr.total) * 100);
          console.log(`Loading model: ${loadPercentage}%`);
        },
        (error) => {
          console.error('Error loading STL file:', error);
          setError('Failed to load STL file');
          setIsLoading(false);
        }
      );

      // Animation loop for smooth rendering
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      };
      
      window.addEventListener('resize', handleResize);

      // Update material color when modelColor changes
      if (materialRef.current && modelColor) {
        materialRef.current.color.set(modelColor);
      }

      // Cleanup function
      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameRef.current);
        
        if (controlsRef.current) {
          controlsRef.current.dispose();
        }
        
        if (meshRef.current && sceneRef.current) {
          sceneRef.current.remove(meshRef.current);
          if (meshRef.current.geometry) {
            meshRef.current.geometry.dispose();
          }
        }
        
        if (materialRef.current) {
          materialRef.current.dispose();
        }
        
        if (rendererRef.current && containerRef.current) {
          rendererRef.current.dispose();
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      };
    } catch (err) {
      console.error('Error initializing STL viewer:', err);
      setError('Failed to initialize STL viewer');
      setIsLoading(false);
    }

    return cleanup;
  }, [stlPath, modelColor, initialColor]);

  // Change model color function
  const handleColorChange = (color: string) => {
    setModelColor(color);
    if (materialRef.current) {
      materialRef.current.color.set(color);
    }
  };

  return (
    <div className="w-full">
      <div 
        id={containerId} 
        ref={containerRef} 
        className="relative w-full h-96 rounded-lg shadow-md overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
            <div className="text-gray-700">Loading model...</div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-70">
            <div className="text-red-700 p-4 rounded-md bg-white shadow-md">
              {error}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Drag to rotate • Scroll to zoom • Shift+drag to pan
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="colorPicker" className="text-sm text-gray-700">
            Model Color:
          </label>
          <input 
            type="color" 
            id="colorPicker" 
            value={modelColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-8 border rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default STLViewerComponent;