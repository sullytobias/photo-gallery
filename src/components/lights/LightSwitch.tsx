import { motion } from "framer-motion-3d";
import { useState } from "react";
import { Box, Text } from "@react-three/drei";

import { setCursor } from "../utils/cursor";
import { uselightSwitchSound } from "../utils/hooks/useLightSwitchSound";
import { useSound } from "../utils/hooks/useSound";

const WallLightTrigger = ({
    position,
    rotation,
    initialLightOn = true,
    onLightToggle,
}: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    initialLightOn?: boolean;
    onLightToggle: (isLightOn: boolean) => void;
}) => {
    const [isLightOn, setIsLightOn] = useState(initialLightOn);

    const { playSound } = useSound();

    const toggleLight = () => {
        const newLightState = !isLightOn;

        setIsLightOn(newLightState);
        onLightToggle(newLightState);
    };

    return (
        <motion.group
            position={position}
            rotation={rotation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onPointerEnter={() => setCursor("pointer")}
            onPointerLeave={() => setCursor("default")}
            onClick={() => playSound?.(uselightSwitchSound, true)}
        >
            <Box args={[0.6, 0.6, 0.1]} onClick={toggleLight}>
                <motion.meshStandardMaterial
                    animate={{
                        color: isLightOn ? "#555" : "#FFD700",
                    }}
                    transition={{ duration: 0.3 }}
                />
            </Box>
            <Text position={[0, 0.5, 0.1]} fontSize={0.2}>
                {isLightOn ? "On" : "Off"}
            </Text>
        </motion.group>
    );
};

export default WallLightTrigger;
