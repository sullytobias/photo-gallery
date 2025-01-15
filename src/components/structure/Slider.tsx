import { useState, useMemo, useEffect } from "react";

import { motion } from "framer-motion-3d";

import { Text } from "@react-three/drei";

import { MainBoxProps, SliderProps } from "../../types/slider";

import { Galleries } from "../../const/galleries";

import { setCursor } from "../utils/cursor";

import { useDoorSound } from "../utils/hooks/useDoorSound";
import { useSliderSound } from "../utils/hooks/useSliderSound";
import { useSound } from "../utils/hooks/useSound";
import { useMediaQuery } from "react-responsive";
import { DragIcon } from "../atoms/Drag";

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
        <group>
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
            scale={0.8}
            position={position.map((p) => p) as [number, number, number]}
            whileHover={{ scale: 0.7 }}
            onClick={onClick}
        >
            <motion.group
                key={title}
                initial={{ scale: 0, x: direction === "left" ? -1 : 1 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: 0 }}
                onPointerEnter={() => setCursor("pointer")}
                onPointerLeave={() => setCursor("grab")}
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

const MainBox = ({ onEnterGallery, currentIndex, playSound }: MainBoxProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onEnterGalleryHandler = (id: string) => {
        setIsOpen(true);
        onEnterGallery(id);

        playSound?.(useDoorSound, true);
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

            {/* Door Contour */}
            <motion.mesh position={[0, -0.2, 0.52]} {...glowingDoorAnimation}>
                <planeGeometry args={[0.5, 0.7]} />
                {/* Slightly larger than door */}
                <meshStandardMaterial
                    color="#00ffff"
                    transparent
                    opacity={0.5}
                    emissive="#00ffff"
                    emissiveIntensity={1}
                />
            </motion.mesh>

            {/* Glowing Door */}
            <motion.mesh
                onPointerEnter={() => setCursor("pointer")}
                onPointerLeave={() => setCursor("grab")}
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
    const [hasDragged, setHasDragged] = useState(false);

    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const isMediumScreen = useMediaQuery({ maxWidth: 1024 });

    const scale = isSmallScreen ? 1 : isMediumScreen ? 1.2 : 1.4;

    const handleDragStart = () => setHasDragged(true);

    const { playSound } = useSound();

    const nextIndex = useMemo(
        () => (currentIndex + 1) % Galleries.length,
        [currentIndex]
    );

    const prevIndex = useMemo(
        () => (currentIndex - 1 + Galleries.length) % Galleries.length,
        [currentIndex]
    );

    const handleNext = () => {
        setCurrentIndex(nextIndex);

        playSound?.(useSliderSound, true);
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex);

        playSound?.(useSliderSound, true);
    };

    useEffect(() => {
        window.addEventListener("pointerdown", handleDragStart);
        return () => {
            window.removeEventListener("pointerdown", handleDragStart);
        };
    }, []);

    return (
        <group scale={scale}>
            <DragIcon visible={!hasDragged} />

            <NavButton
                position={[-1.3, 0, 0]}
                onClick={handlePrev}
                title={Galleries[prevIndex].title}
                direction="left"
            />

            <MainBox
                playSound={playSound}
                onEnterGallery={onEnterGallery}
                currentIndex={currentIndex}
            />

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
