import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GlobalLights = () => {
    const directionalLightRef = useRef<THREE.DirectionalLight>(null);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const light = directionalLightRef.current;

        if (light) {
            const radius = 15;
            light.position.set(
                Math.cos(time) * radius,
                Math.sin(time * 0.5) * 10 + 10,
                Math.sin(time) * radius
            );
            light.target.position.set(0, 0, 0);
            light.target.updateMatrixWorld();
        }
    });

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight
                ref={directionalLightRef}
                intensity={3}
                color="white"
            />
        </>
    );
};

export default GlobalLights;