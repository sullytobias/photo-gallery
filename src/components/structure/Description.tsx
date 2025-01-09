import { useState, useEffect } from "react";

import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";

const FloatingDescription = ({
    lines,
    onComplete,
    disappearingDuration,
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
        const timer = setInterval(
            () =>
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
                }),
            800
        );

        return () => clearInterval(timer);
    }, [disappearingDuration, lines]);

    useEffect(() => {
        if (isFadingOut) setTimeout(onComplete, disappearingDuration);
    }, [disappearingDuration, isFadingOut, onComplete]);

    return (
        <group position={textPosition}>
            {lines.slice(0, visibleLines).map((line, index) => (
                <group key={index}>
                    <Text
                        fontSize={0.2}
                        color="#fff"
                        position={[0, -index * 0.4, 0]}
                    >
                        {line}
                        <motion.meshStandardMaterial
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: isFadingOut ? 0 : 1,
                            }}
                            transition={{ duration: 1 }}
                        />
                    </Text>
                </group>
            ))}
        </group>
    );
};

const AppDescription = ({
    onComplete,
    descriptionLines,
    disappearingDuration,
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
