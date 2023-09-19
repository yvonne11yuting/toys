"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MainSolar from "./MainSolar";

const WrapperSolar = () => {
    return (
        <>
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 3, 3] }}>
                <OrbitControls />
                <MainSolar />
            </Canvas>
            <button className="absolute top-0 right-0 m-4 p-2 bg-gray-800 text-white rounded-md" onClick={() => window.location.href = '/'}>Back</button>
        </>
    )
}

export default WrapperSolar