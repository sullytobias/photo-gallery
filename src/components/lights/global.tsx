import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GlobalLights = () => {
    const directionalLightRef = useRef<THREE.DirectionalLight>(null);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (directionalLightRef.current) {
            const radius = 15;
            directionalLightRef.current.position.x = Math.cos(time) * radius;
            directionalLightRef.current.position.z = Math.sin(time) * radius;
            directionalLightRef.current.position.y =
                Math.sin(time * 0.5) * 10 + 10;

            directionalLightRef.current.target.position.set(0, 0, 0);
            directionalLightRef.current.target.updateMatrixWorld();
        }
    });

    return (
        <group>
            <ambientLight intensity={1} />
            <directionalLight
                ref={directionalLightRef}
                intensity={3}
                color="white"
            />
        </group>
    );
};

export default GlobalLights;
