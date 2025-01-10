import { useState, useMemo } from "react";

import { motion } from "framer-motion-3d";

import { Text } from "@react-three/drei";

import { MainBoxProps, SliderProps } from "../../types/slider";

import { Galleries } from "../../const/galleries";
import { setCursor } from "../utils/cursor";

const motionProps = {
    initial: { scale: 0, y: 1 },
    animate: { scale: 1, y: 0 },
    exit: { scale: 0, y: 0 },
    transition: { type: "spring", stiffness: 110, damping: 12 },
};

const glowingDoorAnimation = {
    animate: { scale: [0.4, 0.5, 0.4] },
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

const NavButton = ({
    position,
    onClick,
    title,
    direction,
}: {
    position: [number, number, number];
    onClick: () => void;
    title: string;
    direction: "left" | "right";
}) => {
    const Arrows = () => (
        <group
            onPointerEnter={() => setCursor("pointer")}
            onPointerLeave={() => setCursor("default")}
        >
            <mesh
                position={[direction === "left" ? 0.3 : -0.3, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                <meshStandardMaterial color="darkslategray" />
            </mesh>
            <mesh
                position={[direction === "left" ? -0.4 : 0.4, 0, 0]}
                rotation={[
                    0,
                    0,
                    direction === "left" ? Math.PI / 2 : -Math.PI / 2,
                ]}
            >
                <coneGeometry args={[0.2, 0.4, 16]} />
                <meshStandardMaterial color="darkgray" />
            </mesh>
        </group>
    );

    return (
        <motion.group
            scale={0.6}
            position={position}
            whileHover={{ scale: 0.7 }}
            onClick={onClick}
        >
            <motion.group
                key={title}
                initial={{ scale: 0, x: direction === "left" ? -1 : 1 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: 0 }}
            >
                <Text
                    position={[0, 0.6, 0]}
                    fontSize={0.15}
                    color="white"
                    fontWeight={700}
                    anchorX="center"
                    anchorY="middle"
                >
                    {title}
                </Text>
                <Arrows />
            </motion.group>
        </motion.group>
    );
};

const MainBox = ({ onEnterGallery, currentIndex }: MainBoxProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onEnterGalleryHandler = (id: string) => {
        setIsOpen(true);
        onEnterGallery(id);
    };

    return (
        <motion.group
            key={Galleries[currentIndex].id}
            position={[0, 0, 0]}
            {...motionProps}
        >
            <Text
                position={[0, 0.3, 0.51]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {Galleries[currentIndex].title}
            </Text>

            {/* House Shape */}
            <group>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 0.8, 1]} />
                    <meshStandardMaterial color="dimgray" />
                </mesh>
                <mesh position={[0, 0.6, 0]} rotation={[0, 183, 0]}>
                    <coneGeometry args={[0.7, 0.5, 4]} />
                    <meshStandardMaterial color="darkslategray" />
                </mesh>
            </group>

            {/* Glowing Door */}
            <motion.mesh
                onPointerEnter={() => setCursor("pointer")}
                onPointerLeave={() => setCursor("default")}
                position={[0, -0.2, 0.51]}
                {...glowingDoorAnimation}
                onClick={() =>
                    onEnterGalleryHandler(Galleries[currentIndex].id)
                }
            >
                <planeGeometry args={[0.4, 0.6]} />
                <motion.meshStandardMaterial
                    animate={{
                        color: isOpen ? "#000" : "#fff",
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                />
            </motion.mesh>
        </motion.group>
    );
};

const Slider = ({ onEnterGallery }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextIndex = useMemo(
        () => (currentIndex + 1) % Galleries.length,
        [currentIndex]
    );

    const prevIndex = useMemo(
        () => (currentIndex - 1 + Galleries.length) % Galleries.length,
        [currentIndex]
    );

    const handleNext = () => setCurrentIndex(nextIndex);
    const handlePrev = () => setCurrentIndex(prevIndex);

    return (
        <group scale={1.6}>
            {/* Left Navigation */}
            <NavButton
                position={[-1.3, 0, 0]}
                onClick={handlePrev}
                title={Galleries[prevIndex].title}
                direction="left"
            />

            {/* Main Box */}
            <MainBox
                onEnterGallery={onEnterGallery}
                currentIndex={currentIndex}
            />

            {/* Right Navigation */}
            <NavButton
                position={[1.3, 0, 0]}
                onClick={handleNext}
                title={Galleries[nextIndex].title}
                direction="right"
            />
        </group>
    );
};

export default Slider;
