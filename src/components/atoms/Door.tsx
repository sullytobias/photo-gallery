import { BackSide, FrontSide } from "three";

import { Text } from "@react-three/drei";

import { DoorPanelType, DoorType, FrameType, TextType } from "../../types/door";

const Frame = ({ position, args }: FrameType) => (
    <mesh position={position}>
        <boxGeometry args={args} />
        <meshStandardMaterial color="black" />
    </mesh>
);

const DoorPanel = ({ color, isFrontSide }: DoorPanelType) => (
    <mesh>
        <planeGeometry args={[2.1, 4.1]} />
        <meshStandardMaterial
            emissive={color}
            emissiveIntensity={0.3}
            color="white"
            side={isFrontSide ? FrontSide : BackSide}
        />
    </mesh>
);

const DoorText = ({
    text,
    placeTextWithZAxis,
    position,
    operator,
    rotation,
}: TextType) => (
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
        color="black"
    >
        {text}
    </Text>
);

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
        <group
            onClick={onClick}
            rotation={rotation && rotation}
            position={position}
        >
            {/* Frame */}
            <group>
                {/* Top Frame */}
                <Frame position={[0, 2.1, 0.05]} args={[2.3, 0.1, 0.1]} />
                {/* Left Frame */}
                <Frame position={[-1.1, 0, 0.05]} args={[0.1, 4.2, 0.1]} />
                {/* Right Frame */}
                <Frame position={[1.1, 0, 0.05]} args={[0.1, 4.2, 0.1]} />
            </group>

            {/* Door Panel */}
            <DoorPanel color={color} isFrontSide={isFrontSide} />
        </group>

        {/* Text */}
        {text && (
            <DoorText
                text={text}
                placeTextWithZAxis={placeTextWithZAxis}
                position={position}
                operator={operator}
                rotation={rotation}
            />
        )}
    </group>
);

export default Door;
