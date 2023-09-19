"use client"
import { Canvas } from "@react-three/fiber";
import MainSolar from "./MainSolar";

const WrapperSolar = () => {
    return (
        <Canvas>
            <MainSolar />
        </Canvas>
    )
}

export default WrapperSolar