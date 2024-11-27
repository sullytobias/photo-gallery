import { useState } from "react";
import { Text } from "@react-three/drei";

type SliderProps = {
    onEnterGallery: (galleryId: number) => void;
};

const Slider: React.FC<SliderProps> = ({ onEnterGallery }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleries = ["Gallery 1", "Gallery 2", "Gallery 3"];

    const handleNext = () =>
        setCurrentIndex((prev) => (prev + 1) % galleries.length);
    const handlePrev = () =>
        setCurrentIndex(
            (prev) => (prev - 1 + galleries.length) % galleries.length
        );

    return (
        <group>
            <mesh position={[-2, 0, 0]} onClick={handlePrev}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="blue" />
            </mesh>

            <group position={[0, 0, 0]}>
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.5}
                    anchorX="center"
                    anchorY="middle"
                    color="black"
                >
                    {galleries[currentIndex]}
                </Text>
                <mesh
                    position={[0, 0, 0]}
                    onClick={() => onEnterGallery(currentIndex)}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </group>

            <mesh position={[2, 0, 0]} onClick={handleNext}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </group>
    );
};

export default Slider;
