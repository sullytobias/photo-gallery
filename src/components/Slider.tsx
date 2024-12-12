import { useState } from "react";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";

type SliderProps = {
    onEnterGallery: (galleryId: string) => void;
};

const Slider: React.FC<SliderProps> = ({ onEnterGallery }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const galleries = ["Urbex", "Macro", "Landscape"];

    const handleNext = () =>
        setCurrentIndex((prev) => (prev + 1) % galleries.length);
    const handlePrev = () =>
        setCurrentIndex(
            (prev) => (prev - 1 + galleries.length) % galleries.length
        );

    const getNextIndex = () => (currentIndex + 1) % galleries.length;
    const getPrevIndex = () =>
        (currentIndex - 1 + galleries.length) % galleries.length;

    return (
        <motion.group>
            {/* Left Navigation */}
            <motion.group
                scale={0.6}
                position={[-1.3, 0, 0]}
                whileHover={{ scale: 0.7 }}
                onClick={handlePrev}
            >
                {/* Previous Gallery Title */}
                <motion.group
                    key={galleries[getPrevIndex()]}
                    initial={{ scale: 0, x: -1 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 0 }}
                >
                    <Text
                        position={[0, 0.6, 0]}
                        fontSize={0.12}
                        anchorX="center"
                        anchorY="middle"
                        color="blue"
                    >
                        {galleries[getPrevIndex()]}
                    </Text>
                </motion.group>

                <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
                <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <coneGeometry args={[0.2, 0.4, 16]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </motion.group>

            {/* Main Box */}
            <motion.group
                key={currentIndex}
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
                    color="black"
                >
                    {galleries[currentIndex]}
                </Text>

                {/* Main Gallery Box */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="red" />
                </mesh>

                {/* Door */}
                <mesh
                    onClick={() => onEnterGallery(galleries[currentIndex])}
                    position={[0, -0.25, 0.51]}
                    scale={0.2}
                >
                    <planeGeometry args={[1, 2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
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
                    key={galleries[getNextIndex()]}
                    initial={{ scale: 0, x: 1 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 0 }}
                >
                    <Text
                        position={[0, 0.6, 0]}
                        fontSize={0.12}
                        anchorX="center"
                        anchorY="middle"
                        color="blue"
                    >
                        {galleries[getNextIndex()]}
                    </Text>
                </motion.group>

                <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                    <meshStandardMaterial color="blue" />
                </mesh>

                <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                    <coneGeometry args={[0.2, 0.4, 16]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </motion.group>
        </motion.group>
    );
};

export default Slider;