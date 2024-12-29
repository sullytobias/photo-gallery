import { BackSide, FrontSide } from "three";

import { Text } from "@react-three/drei";

import { DoorType } from "../../types/door";

const Door = ({
    position,
    rotation,
    onClick,
    color,
    text,
    isFrontSide,
    placeTextWithZAxis,
    operator,
}: DoorType) => (
    <group>
        <mesh
            position={position}
            rotation={rotation && rotation}
            onClick={onClick}
        >
            <planeGeometry args={[2, 4]} />
            <meshStandardMaterial
                emissive={color}
                emissiveIntensity={0.3}
                color="brown"
                side={isFrontSide ? FrontSide : BackSide}
            />
        </mesh>
        {text && (
            <Text
                position={[
                    placeTextWithZAxis
                        ? position[0]
                        : operator === "+"
                        ? position[0] + 0.1
                        : position[0] - 0.1,
                    position[1],
                    placeTextWithZAxis ? position[2] - 0.1 : position[2],
                ]}
                rotation={rotation && [rotation[0], -rotation[1], rotation[2]]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        )}
    </group>
);

export default Door;
