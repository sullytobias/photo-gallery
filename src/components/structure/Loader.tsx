import { useRef, useState, useEffect } from "react";
import { Mesh, PointLight } from "three";
import { motion } from "framer-motion-3d";
import { useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { setCursor } from "../utils/cursor";
import { useSound } from "../utils/hooks/useSound";
import { useSliderSound } from "../utils/hooks/useSliderSound";

const CircularBall = ({
    onBallClick,
    isClickable,
    isFadingOut,
    lightRef,
}: {
    onBallClick: () => void;
    isClickable: boolean;
    isFadingOut: boolean;
    lightRef: React.RefObject<PointLight>;
}) => {
    const ballRef = useRef<Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const radius = 3;

        if (ballRef.current) {
            const x = (radius * Math.cos(elapsedTime * 2)) / 2;
            const z = (radius * Math.sin(elapsedTime * 2)) / 2;

            ballRef.current.position.set(x, 0, z);

            if (lightRef.current) lightRef.current.position.set(x, 2, z);
        }
    });

    return (
        <mesh
            onPointerEnter={() => {
                if (isClickable) {
                    setCursor("pointer");
                    setIsHovered(true);
                }
            }}
            onPointerLeave={() => {
                setCursor("default");
                setIsHovered(false);
            }}
            ref={ballRef}
            onClick={isClickable ? onBallClick : undefined}
        >
            <sphereGeometry args={[0.5, 32, 32]} />
            <motion.meshStandardMaterial
                animate={{
                    opacity: isFadingOut ? 0 : 1,
                    color: isHovered ? "#ff8800" : "#000", // Glow effect on hover
                }}
                transition={{
                    color: {
                        duration: 0.3, // Smooth transition for glow
                    },
                    opacity: {
                        duration: 1.5,
                    },
                }}
            />
            {/* Text on the Ball */}
            <Text
                position={[0, 0.1, 0.5]}
                fontSize={0.2}
                anchorX="center"
                anchorY="middle"
            >
                Here
                <motion.meshStandardMaterial
                    color="#fff"
                    emissive="#fff"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: !isClickable || isFadingOut ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                />
            </Text>
        </mesh>
    );
};

const Loader = ({ isLoading }: { isLoading: (response: boolean) => void }) => {
    const [isClickable, setIsClickable] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [lightIntensity, setLightIntensity] = useState(0);
    const lightRef = useRef<PointLight>(null);

    const { playSound } = useSound();

    useEffect(() => {
        const timer = setTimeout(() => setIsClickable(true), 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isClickable) {
            let intensity = 0;

            const interval = setInterval(() => {
                intensity += 0.1;
                setLightIntensity(intensity);

                if (intensity >= 5.5) clearInterval(interval);
            }, 50);
        }
    }, [isClickable]);

    const handleBallClick = () => {
        if (isClickable) {
            setIsClickable(false);
            setIsFadingOut(true);

            playSound?.(useSliderSound, true);

            setTimeout(() => {
                isLoading(false);
            }, 1000);
        }
    };

    useFrame(() => {
        if (lightRef.current) lightRef.current.intensity = lightIntensity;
    });

    return (
        <group>
            {/* Black background */}
            <Environment background preset="night" blur={1} />

            <pointLight
                ref={lightRef}
                intensity={lightIntensity}
                color="#fff"
            />

            {/* Circular Ball */}
            <CircularBall
                onBallClick={handleBallClick}
                isClickable={isClickable}
                isFadingOut={isFadingOut}
                lightRef={lightRef}
            />
            {/* Floating Text */}
            <motion.group
                initial={{ y: 1.5 }}
                animate={{
                    y: 2,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            >
                <Text fontSize={0.3} color="#fff">
                    Enter The Gallery
                    <motion.meshStandardMaterial
                        color="#fff"
                        emissive="#fff"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: !isClickable || isFadingOut ? 0 : 1,
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </Text>
            </motion.group>
        </group>
    );
};

export default Loader;