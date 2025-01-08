import { motion } from "framer-motion-3d";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Environment, Text } from "@react-three/drei";

const CircularBall = ({
    onBallClick,
    isClickable,
}: {
    onBallClick: () => void;
    isClickable: boolean;
}) => {
    const ballRef = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const radius = 3;

        // Circular motion
        if (ballRef.current) {
            ballRef.current.position.x =
                (radius * Math.cos(elapsedTime * 2)) / 2; // Faster motion
            ballRef.current.position.z =
                (radius * Math.sin(elapsedTime * 2)) / 2; // Faster motion
        }
    });

    return (
        <group>
            {/* Ball */}
            <mesh
                ref={ballRef}
                onClick={isClickable ? onBallClick : undefined}
                castShadow
            >
                <sphereGeometry args={[0.5, 32, 32]} />
                <motion.meshStandardMaterial
                    animate={{
                        color: isClickable ? "#000" : "#fff",
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                />
                {/* Text on the Ball */}
                <Text
                    position={[0, 0.1, 0.5]} // Slightly above the ball
                    fontSize={0.2}
                    color="#fff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Here
                    <motion.meshStandardMaterial
                        color="#fff"
                        emissive="#fff"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isClickable ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </Text>
            </mesh>
        </group>
    );
};

const Loader = ({
    onComplete,
}: {
    onComplete: (response: boolean) => void;
}) => {
    const [isClickable, setIsClickable] = useState(false);

    useEffect(() => {
        // Enable clickability after 3 seconds
        const timer = setTimeout(() => {
            setIsClickable(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleBallClick = () => {
        if (isClickable) {
            setIsClickable(false);
            setTimeout(onComplete, 1000);
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
            />

            {/* Message */}
            <Text
                fontSize={0.3}
                color="#fff"
                anchorX="center"
                anchorY="middle"
                position={[0, 1.5, 0]}
            >
                Enter The Gallery
                <motion.meshStandardMaterial
                    color="#fff"
                    emissive="#fff"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isClickable ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </Text>
        </group>
    );
};

export default Loader;
