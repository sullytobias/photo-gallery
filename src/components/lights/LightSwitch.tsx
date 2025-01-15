import { motion } from "framer-motion-3d";
import { useState } from "react";
import { Box, Text } from "@react-three/drei";

import { setCursor } from "../utils/cursor";
import { uselightSwitchSound } from "../utils/hooks/useLightSwitchSound";
import { useSound } from "../utils/hooks/useSound";

const WallLightTrigger = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
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
        playSound?.(uselightSwitchSound, true);
    };

    return (
        <motion.group
            position={position}
            rotation={rotation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onPointerEnter={() => setCursor("pointer")}
            onPointerLeave={() => setCursor("grab")}
            onClick={toggleLight}
        >
            <Box args={[0.6, 0.6, 0.1]}>
                <motion.meshStandardMaterial
                    animate={{ color: isLightOn ? "#555" : "#FFD700" }}
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