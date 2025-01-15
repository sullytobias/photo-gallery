import { motion } from "framer-motion-3d";

import { Text } from "@react-three/drei";

const DragIconAnimation = (visible: boolean) => ({
    initial: { opacity: 1, scale: 1 },
    animate: visible ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.5 },
    exit: { opacity: 0, scale: 0.5 },
    transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
    },
});

const DragMesh = (visible: boolean) => (
    <motion.meshStandardMaterial
        color="#00ffff"
        transparent
        {...DragIconAnimation(visible)}
    />
);

export const DragIcon = ({ visible }: { visible: boolean }) => (
    <group position={[0, 1.3, 0]}>
        <Text fontSize={0.1} color="#fff" position={[0, 0.3, 0]}>
            Drag to Move
            {DragMesh(visible)}
        </Text>
        <mesh>
            <circleGeometry args={[0.1, 32]} />
            {DragMesh(visible)}
        </mesh>
    </group>
);
