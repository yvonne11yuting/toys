import { useTexture } from "@react-three/drei";


const Earth = () => {
    const [earthTexture] = useTexture(['/earth_daymap.jpg']);

    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={earthTexture} />
        </mesh>
    )
}

export default Earth