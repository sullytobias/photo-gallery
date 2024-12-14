import { useState } from "react";
import { motion } from "framer-motion-3d";
import { CameraControls, Text } from "@react-three/drei";
import { GalleriesType } from "../types/galleries";

type SliderProps = {
    onEnterGallery: (galleryId: string) => void;
    galleries: GalleriesType;
    cameraControls: CameraControls | null;
};

const Slider: React.FC<SliderProps> = ({
    onEnterGallery,
    galleries,
    cameraControls,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () =>
        setCurrentIndex((prev) => (prev + 1) % galleries.length);
    const handlePrev = () =>
        setCurrentIndex(
            (prev) => (prev - 1 + galleries.length) % galleries.length
        );

    const getNextIndex = () => (currentIndex + 1) % galleries.length;
    const getPrevIndex = () =>
        (currentIndex - 1 + galleries.length) % galleries.length;

    const handleDoorClick = () => {
        if (cameraControls) {
            cameraControls.setLookAt(0, 0, 2.5, 0, -0.2, 0.51, true);

            setTimeout(() => {
                onEnterGallery(galleries[currentIndex].id);
            }, 1000);
        } else {
            onEnterGallery(galleries[currentIndex].id);
        }
    };

    return (
        <motion.group scale={1.4}>
            {/* Left Navigation */}
            <motion.group
                scale={0.6}
                position={[-1.3, 0, 0]}
                whileHover={{ scale: 0.7 }}
                onClick={handlePrev}
            >
                {/* Previous Gallery Title */}
                <motion.group
                    key={galleries[getPrevIndex()].id}
                    initial={{ scale: 0, x: -1 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 0 }}
                >
                    <Text
                        position={[0, 0.6, 0]}
                        fontSize={0.12}
                        anchorX="center"
                        anchorY="middle"
                        color="gray"
                    >
                        {galleries[getPrevIndex()].title}
                    </Text>
                </motion.group>

                <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                    <meshStandardMaterial color="darkslategray" />
                </mesh>
                <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <coneGeometry args={[0.2, 0.4, 16]} />
                    <meshStandardMaterial color="darkgray" />
                </mesh>
            </motion.group>

            {/* Main Box */}
            <motion.group
                key={galleries[currentIndex].id}
                position={[0, 0, 0]}
                initial={{ scale: 0, y: 1 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
            >
                {/* Gallery Title */}
                <Text
                    position={[0, 0.3, 0.51]}
                    fontSize={0.15}
                    anchorX="center"
                    anchorY="middle"
                    color="white"
                >
                    {galleries[currentIndex].title}
                </Text>

                {/* House Shape */}
                <group>
                    {/* House Base */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1, 0.8, 1]} />
                        <meshStandardMaterial color="dimgray" />
                    </mesh>
                    {/* Roof */}
                    <mesh position={[0, 0.6, 0]} rotation={[0, 183, 0]}>
                        <coneGeometry args={[0.7, 0.5, 4]} />
                        <meshStandardMaterial color="darkslategray" />
                    </mesh>
                </group>

                {/* Glowing Door */}
                <motion.mesh
                    onClick={handleDoorClick}
                    position={[0, -0.2, 0.51]}
                    animate={{
                        scale: [0.4, 0.5, 0.4],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <planeGeometry args={[0.4, 0.6]} />
                    <meshStandardMaterial
                        color="lightgray"
                        emissive="white"
                        emissiveIntensity={2}
                    />
                </motion.mesh>
            </motion.group>

            {/* Right Navigation */}
            <motion.group
                scale={0.6}
                position={[1.3, 0, 0]}
                whileHover={{ scale: 0.7 }}
                onClick={handleNext}
            >
                {/* Next Gallery Title */}
                <motion.group
                    key={galleries[getNextIndex()].id}
                    initial={{ scale: 0, x: 1 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 0 }}
                >
                    <Text
                        position={[0, 0.6, 0]}
                        fontSize={0.12}
                        anchorX="center"
                        anchorY="middle"
                        color="gray"
                    >
                        {galleries[getNextIndex()].title}
                    </Text>
                </motion.group>

                <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                    <meshStandardMaterial color="darkslategray" />
                </mesh>

                <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                    <coneGeometry args={[0.2, 0.4, 16]} />
                    <meshStandardMaterial color="darkgray" />
                </mesh>
            </motion.group>
        </motion.group>
    );
};

export default Slider;
