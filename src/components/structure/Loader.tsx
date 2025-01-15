import { useRef, useState, useEffect, Fragment } from "react";
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
        const y = (3 * Math.sin(elapsedTime * 2)) / 6;

        if (ballRef.current) ballRef.current.position.y = y;
        if (lightRef.current) lightRef.current.position.y = y;
    });

    const handlePointerEnter = () => {
        if (isClickable) {
            setCursor("pointer");
            setIsHovered(true);
        }
    };

    const handlePointerLeave = () => {
        setCursor("grab");
        setIsHovered(false);
    };

    return (
        <mesh
            ref={ballRef}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onClick={isClickable ? onBallClick : undefined}
        >
            <sphereGeometry args={[0.8, 32, 32]} />
            <motion.meshStandardMaterial
                animate={{
                    opacity: isFadingOut ? 0 : 1,
                    color: isHovered ? "#ff8800" : "#000",
                }}
                transition={{
                    color: { duration: 0.3 },
                    opacity: { duration: 1 },
                }}
            />
            <Text position={[0, 0.3, 0.8]} letterSpacing={0.3} fontSize={0.3}>
                Enter
                <motion.meshStandardMaterial
                    color="#fff"
                    emissive="#fff"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: !isClickable || isFadingOut ? 0 : 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </Text>
        </mesh>
    );
};

const Loader = ({ isLoading }: { isLoading: (response: boolean) => void }) => {
    const [isClickable, setIsClickable] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const lightRef = useRef<PointLight>(null);
    const { playSound } = useSound();

    useEffect(() => {
        const timer = setTimeout(() => setIsClickable(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleBallClick = () => {
        if (!isClickable) return;
        setIsClickable(false);
        setIsFadingOut(true);

        playSound?.(useSliderSound, true);

        setTimeout(() => isLoading(false), 1000);
    };

    useFrame(({ clock }) => {
        if (lightRef.current) {
            const maxIntensity = 5.5;
            const intensity = isClickable
                ? Math.min(clock.elapsedTime * 1.5, maxIntensity)
                : 0;
            lightRef.current.intensity = intensity;
        }
    });

    return (
        <Fragment>
            <Environment background preset="night" blur={1} />
            <pointLight ref={lightRef} intensity={0} color="#fff" />
            <CircularBall
                onBallClick={handleBallClick}
                isClickable={isClickable}
                isFadingOut={isFadingOut}
                lightRef={lightRef}
            />
        </Fragment>
    );
};

export default Loader;
