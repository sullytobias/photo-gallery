import { useState, useEffect } from "react";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";

const FloatingDescription = ({
    lines,
    onComplete,
    disappearingDuration = 1000,
    textPosition,
}: {
    lines: string[];
    onComplete: () => void;
    disappearingDuration?: number;
    textPosition: [number, number, number];
}) => {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines((prev) => {
                const next = prev + 1;

                if (next === lines.length) {
                    clearInterval(timer);
                    setTimeout(
                        () => setIsFadingOut(true),
                        disappearingDuration
                    );
                }

                return next;
            });
        }, 800);

        return () => clearInterval(timer);
    }, [lines, disappearingDuration]);

    useEffect(() => {
        if (isFadingOut) setTimeout(onComplete, disappearingDuration);
    }, [isFadingOut, disappearingDuration, onComplete]);

    return (
        <group position={textPosition}>
            {lines.slice(0, visibleLines).map((line, index) => (
                <motion.group
                    key={index}
                    animate={{
                        y: [-index * 0.4, -index * 0.4 + 0.1, -index * 0.4],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    <Text
                        fontSize={0.2}
                        color="#fff"
                        position={[0, -index * 0.4, 0]}
                    >
                        {line}
                        <motion.meshBasicMaterial
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFadingOut ? 0 : 1 }}
                            transition={{
                                duration: disappearingDuration / 1000,
                            }}
                        />
                    </Text>
                </motion.group>
            ))}
        </group>
    );
};

const AppDescription = ({
    onComplete,
    descriptionLines,
    disappearingDuration = 1000,
    textPosition,
}: {
    onComplete: (isComplete: boolean) => void;
    descriptionLines: string[];
    disappearingDuration?: number;
    textPosition: [number, number, number];
}) => {
    return (
        <group>
            <FloatingDescription
                textPosition={textPosition}
                disappearingDuration={disappearingDuration}
                lines={descriptionLines}
                onComplete={() => onComplete(true)}
            />
        </group>
    );
};

export default AppDescription;
