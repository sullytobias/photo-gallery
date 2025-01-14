import { motion } from "framer-motion-3d";
import { useState } from "react";
import { Text } from "@react-three/drei";
import { BackSide, FrontSide } from "three";

import { DoorPanelType, DoorType, FrameType, TextType } from "../../types/door";
import { setCursor } from "../utils/cursor";
import { useDoorSound } from "../utils/hooks/useDoorSound";
import { useSound } from "../utils/hooks/useSound";

const Frame = ({ position, args }: FrameType) => (
    <mesh position={position}>
        <boxGeometry args={args} />
        <meshStandardMaterial color="black" />
    </mesh>
);

const DoorPanel = ({ isFrontSide, isOpen, rotation }: DoorPanelType) => (
    <mesh rotation={rotation}>
        <planeGeometry args={[2.1, 4.1]} />
        <motion.meshStandardMaterial
            animate={{
                color: isOpen ? "#000" : "#fff",
            }}
            transition={{
                duration: 0.8,
            }}
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
    isOpen,
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
    >
        {text}

        <motion.meshStandardMaterial
            animate={{
                opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.8 }}
            color="black"
        />
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
}: DoorType) => {
    const [isOpen, setIsOpen] = useState(false);
    const { playSound } = useSound();

    const handleDoorClick = () => {
        setIsOpen(!isOpen);
        playSound?.(useDoorSound, true);

        if (onClick) onClick();
    };

    return (
        <group
            onPointerEnter={() => setCursor("pointer")}
            onPointerLeave={() => setCursor("default")}
        >
            <group onClick={handleDoorClick} position={position}>
                {/* Frame */}
                <group rotation={rotation}>
                    <Frame position={[0, 2.1, 0.05]} args={[2.3, 0.1, 0.1]} />
                    <Frame position={[-1.1, 0, 0.05]} args={[0.1, 4.2, 0.1]} />
                    <Frame position={[1.1, 0, 0.05]} args={[0.1, 4.2, 0.1]} />
                </group>

                {/* Door Panel */}
                <motion.group>
                    <DoorPanel
                        isOpen={isOpen}
                        color={color}
                        isFrontSide={isFrontSide}
                        rotation={rotation}
                    />
                </motion.group>
            </group>

            {/* Text */}
            {text && (
                <DoorText
                    isOpen={isOpen}
                    text={text}
                    placeTextWithZAxis={placeTextWithZAxis}
                    position={position}
                    operator={operator}
                    rotation={rotation}
                />
            )}
        </group>
    );
};

export default Door;
