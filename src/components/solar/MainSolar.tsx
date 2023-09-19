"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimatedStars from "@/app/solar/AnimatedStars";


const MainSolar = () => {
    return (
        <Canvas>
            <color attach="background" args={['black']} />
            <OrbitControls />
            <AnimatedStars />
        </Canvas>
    )
}

export default MainSolar;
