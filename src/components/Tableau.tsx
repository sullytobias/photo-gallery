import React from "react";
import { Text } from "@react-three/drei";
import { TextureLoader } from "three";

type TableauProps = {
    title: string;
    position: [number, number, number];
    size?: [number, number];
    texture?: string;
    handleClick: (position: [number, number, number]) => void;
};

const Tableau: React.FC<TableauProps> = ({
    title,
    position,
    size = [2.5, 1.5],
    texture,
    handleClick,
}) => {
    return (
        <group
            position={position}
            onClick={() =>
                handleClick([position[0], position[1], position[2] + 5])
            }
        >
            {/* Tableau Frame */}
            <mesh>
                <boxGeometry args={[size[0], size[1], 0.1]} />
                <meshStandardMaterial />
            </mesh>

            {/* Tableau Content */}
            <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={size} />
                <meshStandardMaterial
                    map={
                        texture ? new TextureLoader().load(texture) : undefined
                    }
                    color="black"
                />
            </mesh>

            {/* Tableau Title */}
            <Text
                position={[0, -size[1] / 2 - 0.2, 0.2]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {title}
            </Text>
        </group>
    );
};

export default Tableau;
