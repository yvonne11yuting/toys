"use client"
import { useHelper } from "@react-three/drei";
import AnimatedStars from "@/components/solar/AnimatedStars";
import { useRef } from "react";
import * as THREE from "three";

import Earth from "@/components/solar/Earth";

const MainSolar = () => {
    const directionalLightRef = useRef<any>(null!);
    const directionalLightRef2 = useRef<any>(null!);

    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'red');
    useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'red');

    return (
        <>
            <color attach="background" args={['black']} />
            <AnimatedStars />
            {/* <directionalLight ref={directionalLightRef} position={[0, 0, 10]} intensity={4} />
            <directionalLight ref={directionalLightRef2} position={[0, 0, -10]} intensity={4} /> */}
            <ambientLight intensity={3} />
            <Earth />
        </>
    )
}

export default MainSolar;
