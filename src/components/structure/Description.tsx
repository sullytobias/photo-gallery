import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";
import { useState, useEffect } from "react";

const FloatingDescription = ({
    lines,
    onComplete,
}: {
    lines: string[];
    onComplete: () => void;
}) => {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines((prev) => {
                const next = prev + 1;
                if (next === lines.length) {
                    clearInterval(timer);

                    setTimeout(() => {
                        setIsFadingOut(true);
                    }, 1000);
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [lines]);

    useEffect(() => {
        if (isFadingOut) {
            setTimeout(onComplete, 1500);
        }
    }, [isFadingOut, onComplete]);

    return (
        <motion.group position={[0, 2, 2]}>
            {lines.slice(0, visibleLines).map((line, index) => (
                <motion.group key={index}>
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
                </motion.group>
            ))}
        </motion.group>
    );
};

const AppDescription = ({
    onComplete,
}: {
    onComplete: (isComplete: boolean) => void;
}) => {
    const descriptionLines = [
        "Bienvenue dans mon projet.",
        "Explorez une galerie en 3D.",
        "Chaque détail a été conçu pour l'immersion.",
        "Cliquez sur les éléments pour découvrir plus.",
        "Profitez de cette expérience unique.",
    ];

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} />

            <FloatingDescription
                lines={descriptionLines}
                onComplete={() => onComplete(true)}
            />
        </group>
    );
};

export default AppDescription;
