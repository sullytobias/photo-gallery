import { useMemo } from "react";

import { Text } from "@react-three/drei";
import { type Vector3 } from "@react-three/fiber";

import { TextureLoader } from "three";
import { TableauProps } from "../../types/tableau";

const Tableau = ({
    title,
    position,
    size = [2.5, 1.5],
    texture,
    handleClick,
}: TableauProps) => {
    const textureMap = useMemo(
        () => (texture ? new TextureLoader().load(texture) : undefined),
        [texture]
    );

    const frameSize = size;
    const contentPosition: Vector3 = [0, 0, 0.06];
    const titlePosition: Vector3 = [0, -size[1] / 2 - 0.2, 0.2];

    return (
        <group
            position={position}
            onClick={() =>
                handleClick([position[0], position[1], position[2] + 5])
            }
        >
            {/* Frame */}
            <mesh>
                <boxGeometry args={[frameSize[0], frameSize[1], 0.1]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Content */}
            <mesh position={contentPosition}>
                <planeGeometry args={frameSize} />
                <meshStandardMaterial
                    map={textureMap}
                    color={textureMap ? "white" : "gray"}
                />
            </mesh>

            {/* Title */}
            <Text
                position={titlePosition}
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
