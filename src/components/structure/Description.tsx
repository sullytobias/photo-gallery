import { useState, useEffect } from "react";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";

import { useMediaQuery } from "react-responsive";

const useResponsiveStyles = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const isMediumScreen = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

    return {
        fontSize: isSmallScreen ? 0.25 : isMediumScreen ? 0.4 : 0.5,
        lineSpacing: isSmallScreen ? 0.4 : isMediumScreen ? 0.6 : 0.8,
        textPosition: isSmallScreen
            ? ([0, 1, 0] as [number, number, number])
            : isMediumScreen
            ? ([0, 1.3, 0] as [number, number, number])
            : ([0, 2, 0] as [number, number, number]),
    };
};

const FloatingDescription = ({
    lines,
    onComplete,
    disappearingDuration = 1000,
    textPosition,
}: {
    lines: string[];
    onComplete: () => void;
    disappearingDuration?: number;
    textPosition?: [number, number, number];
}) => {
    const {
        fontSize,
        lineSpacing,
        textPosition: responsivePosition,
    } = useResponsiveStyles();

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
        <group position={textPosition ?? responsivePosition}>
            {lines.slice(0, visibleLines).map((line, index) => (
                <motion.group
                    key={index}
                    animate={{
                        y: [
                            -index * lineSpacing,
                            -index * lineSpacing + 0.1,
                            -index * lineSpacing,
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    <Text
                        fontSize={fontSize}
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
    textPosition?: [number, number, number];
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