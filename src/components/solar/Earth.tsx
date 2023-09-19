import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Earth = () => {
    const earthRef = useRef<any>(null!);
    const [
        earthTexture,
        earthNormalMap,
        earthSpecularMap,
        // earthDisplacementMap
    ] = useTexture([
        '/earth_daymap.jpg',
        '/earth_normal.jpg',
        '/earth_specular.jpg',
        // '/earth_displacement.jpg'
    ]);

    useFrame(() => {
        earthRef.current.rotation.y += 0.002;
    });

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial
                map={earthTexture}
                normalMap={earthNormalMap}
                specularMap={earthSpecularMap}
            // displacementMap={earthDisplacementMap}
            // displacementScale={0.1}
            />
        </mesh>
    )
}

export default Earth