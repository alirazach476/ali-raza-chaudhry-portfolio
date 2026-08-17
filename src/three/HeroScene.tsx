import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SceneProps {
  mouse: { x: number; y: number }
}

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c1 = new THREE.Color('#7C3AED')
    const c2 = new THREE.Color('#22D3EE')

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const mix = Math.random()
      const c = c1.clone().lerp(c2, mix)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.12
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1.current) ring1.current.rotation.z = state.clock.elapsedTime * 0.15
    if (ring2.current) ring2.current.rotation.x = state.clock.elapsedTime * 0.1
  })

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.8, 0.018, 12, 80]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[3.2, 0.012, 12, 80]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

function CoreSphere({ mouse, isMobile }: { mouse: { x: number; y: number }; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = mouse.y * 0.35 + Math.sin(state.clock.elapsedTime * 0.2) * 0.12
    groupRef.current.rotation.y = mouse.x * 0.35 + state.clock.elapsedTime * 0.18
    groupRef.current.position.x = mouse.x * 0.6
    groupRef.current.position.y = mouse.y * 0.4
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <Sphere args={[1.2, isMobile ? 24 : 40, isMobile ? 24 : 40]} scale={1.5}>
          <MeshDistortMaterial
            color="#7C3AED"
            emissive="#4F46E5"
            emissiveIntensity={0.55}
            roughness={0.15}
            metalness={0.85}
            distort={0.4}
            speed={2.5}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>
      <mesh scale={2.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 6, 6]} intensity={1.8} color="#7C3AED" />
      <pointLight position={[-6, -4, 4]} intensity={1.2} color="#22D3EE" />
      <pointLight position={[0, -6, -6]} intensity={0.6} color="#F472B6" />
    </>
  )
}

function SceneContent({
  mouse,
  particleCount,
  isMobile,
}: SceneProps & { particleCount: number; isMobile: boolean }) {
  return (
    <group scale={2.4} position={[0, 0.2, 0]}>
      <SceneLights />
      <CoreSphere mouse={mouse} isMobile={isMobile} />
      <OrbitRings />
      <ParticleField count={particleCount} />
    </group>
  )
}

interface HeroSceneProps {
  mouse: { x: number; y: number }
  className?: string
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-72 h-72 rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.5), rgba(34,211,238,0.2), transparent)',
        }}
      />
    </div>
  )
}

export function HeroScene({ mouse, className = '' }: HeroSceneProps) {
  const reduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 180 : 420
  const [active, setActive] = useState(true)

  useEffect(() => {
    const onVisibility = () => setActive(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (reduced) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #7C3AED, #22D3EE, transparent)',
          }}
        />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          frameloop={active ? 'always' : 'never'}
          style={{ background: 'transparent' }}
        >
          <SceneContent mouse={mouse} particleCount={particleCount} isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  )
}
