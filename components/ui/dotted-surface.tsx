'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore - three library types
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<any>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted || !containerRef.current) return;
		
		// Wait for container to have dimensions
		const containerWidth = containerRef.current.clientWidth;
		const containerHeight = containerRef.current.clientHeight;
		
		if (containerWidth === 0 || containerHeight === 0) {
			// Schedule retry if dimensions aren't ready yet
			const timeout = setTimeout(() => {
				const event = new Event('resize');
				window.dispatchEvent(event);
			}, 100);
			return () => clearTimeout(timeout);
		}

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		// Get container dimensions
		const width = containerWidth;
		const height = containerHeight;

		// Scene setup
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			width / height,
			1,
			10000,
		);
		// Position camera to show wave horizon in center-upper area of viewport
		camera.position.set(0, 150, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		renderer.setClearColor(scene.fog.color, 0);

		// Style the canvas to fill the container
		const canvas = renderer.domElement;
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.display = 'block';

		containerRef.current.appendChild(canvas);

		// Create particles
		const positions: number[] = [];
		const colors: number[] = [];

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
				if (theme === 'dark') {
					colors.push(200, 200, 200);
				} else {
					colors.push(0, 0, 0);
				}
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Create material
		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId: number = 0;

		// Animation function
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Animate Y position with sine waves
					positions[index + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;

					i++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.1;
		};

		// Handle container resize with ResizeObserver
		const handleResize = () => {
			if (!containerRef.current) return;

			const newWidth = containerRef.current.clientWidth;
			const newHeight = containerRef.current.clientHeight;

			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(newWidth, newHeight);
		};

		// Create ResizeObserver to watch for container size changes
		resizeObserverRef.current = new ResizeObserver(handleResize);
		resizeObserverRef.current.observe(containerRef.current);

		// Start animation
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			points,
			animationId,
			count,
		};

		// Cleanup function
		return () => {
			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
			}

			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);

				// Clean up Three.js objects
				sceneRef.current.scene.traverse((object: any) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((m: any) => m.dispose());
						} else {
							object.material.dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				if (containerRef.current && sceneRef.current.renderer.domElement.parentNode === containerRef.current) {
					containerRef.current.removeChild(
						sceneRef.current.renderer.domElement,
					);
				}
			}
		};
	}, [theme, isMounted]);

	return (
		<div
			ref={containerRef}
			className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
			{...props}
		/>
	);
}
