import React, { useState, useMemo } from "react";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";

import { GalleriesType } from "../types/galleries";

type SliderProps = {
    onEnterGallery: (galleryId: string) => void;
    galleries: GalleriesType;
};

const Slider: React.FC<SliderProps> = ({ onEnterGallery, galleries }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextIndex = useMemo(
        () => (currentIndex + 1) % galleries.length,
        [currentIndex, galleries.length]
    );

    const prevIndex = useMemo(
        () => (currentIndex - 1 + galleries.length) % galleries.length,
        [currentIndex, galleries.length]
    );

    const handleNext = () => setCurrentIndex(nextIndex);
    const handlePrev = () => setCurrentIndex(prevIndex);

    const motionProps = {
        initial: { scale: 0, y: 1 },
        animate: { scale: 1, y: 0 },
        exit: { scale: 0, y: 0 },
        transition: { type: "spring", stiffness: 180, damping: 12 },
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
    }) => (
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
            </motion.group>
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
        </motion.group>
    );

    return (
        <motion.group scale={1.4}>
            {/* Left Navigation */}
            <NavButton
                position={[-1.3, 0, 0]}
                onClick={handlePrev}
                title={galleries[prevIndex].title}
                direction="left"
            />

            {/* Main Box */}
            <motion.group
                key={galleries[currentIndex].id}
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
                    {galleries[currentIndex].title}
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
                    position={[0, -0.2, 0.51]}
                    {...glowingDoorAnimation}
                    onClick={() => onEnterGallery(galleries[currentIndex].id)}
                >
                    <planeGeometry args={[0.4, 0.6]} />
                    <meshStandardMaterial
                        color="lightgray"
                        emissive="white"
                        emissiveIntensity={2}
                    />
                </motion.mesh>
            </motion.group>

            {/* Right Navigation */}
            <NavButton
                position={[1.3, 0, 0]}
                onClick={handleNext}
                title={galleries[nextIndex].title}
                direction="right"
            />
        </motion.group>
    );
};

export default Slider;
