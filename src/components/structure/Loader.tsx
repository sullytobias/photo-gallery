import { useRef, useState, useEffect } from "react";

import { Mesh } from "three";

import { motion } from "framer-motion-3d";

import { useFrame } from "@react-three/fiber";

import { Environment, Text } from "@react-three/drei";

const CircularBall = ({
    onBallClick,
    isClickable,
    isFadingOut,
}: {
    onBallClick: () => void;
    isClickable: boolean;
    isFadingOut: boolean;
}) => {
    const ballRef = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const radius = 3;

        if (ballRef.current) {
            ballRef.current.position.x =
                (radius * Math.cos(elapsedTime * 2)) / 2;
            ballRef.current.position.z =
                (radius * Math.sin(elapsedTime * 2)) / 2;
        }
    });

    return (
        <mesh ref={ballRef} onClick={isClickable ? onBallClick : undefined}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <motion.meshStandardMaterial
                animate={{
                    opacity: isFadingOut ? 0 : 1,
                }}
                transition={{
                    duration: 1.5,
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
                    color="#000"
                    emissive="#000"
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClickable(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleBallClick = () => {
        if (isClickable) {
            setIsClickable(false);
            setIsFadingOut(true);

            setTimeout(() => {
                isLoading(false);
            }, 1000);
        }
    };

    return (
        <group>
            {/* Black background */}
            <Environment background preset="night" blur={1} />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.0} />

            {/* Circular Ball */}
            <CircularBall
                onBallClick={handleBallClick}
                isClickable={isClickable}
                isFadingOut={isFadingOut}
            />

            {/* Message */}
            <Text fontSize={0.3} color="#fff" position={[0, 1.5, 0]}>
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
        </group>
    );
};

export default Loader;
