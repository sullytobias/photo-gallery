import React, { useState } from "react";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";
import { BackSide } from "three";
import Tableau from "./Tableau";

type GalleryProps = {
    galleryId: string;
    onBack: () => void;
};

const Gallery: React.FC<GalleryProps> = ({ galleryId, onBack }) => {
    const [targetPosition, setTargetPosition] = useState<
        [number, number, number]
    >([0, 2, 5]);

    const handleCameraMove = (position: [number, number, number]) => {
        setTargetPosition(position);
    };

    const galleryContent: {
        [key: string]: { title: string };
    } = {
        Macro: { title: "Macro" },
        Urbex: { title: "Urbex" },
        Landscape: { title: "Landscape" },
    };

    const currentGallery = galleryContent[galleryId] || {};

    return (
        <motion.group
            animate={{
                x: -targetPosition[0],
                y: -targetPosition[1],
                z: 1,
            }}
            transition={{ duration: 1 }}
        >
            {/* Gallery Box */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial
                    color="black"
                    side={BackSide}
                    emissive="white"
                    emissiveIntensity={0.02}
                />
            </mesh>

            <pointLight position={[0, 0, 0]} power={3500} />

            {/* Tableaux */}
            <Tableau
                title="Macro World"
                position={[-6, 2, -4.9]}
                handleClick={handleCameraMove}
            />
            <Tableau
                title="Urban Exploration"
                position={[0, 2, -4.9]}
                handleClick={handleCameraMove}
            />
            <Tableau
                title="Landscape View"
                position={[6, 2, -4.9]}
                handleClick={handleCameraMove}
            />

            <Tableau
                title="Macro World"
                position={[-6, -2, -4.9]}
                handleClick={handleCameraMove}
            />
            <Tableau
                title="Urban Exploration"
                position={[0, -2, -4.9]}
                handleClick={handleCameraMove}
            />
            <Tableau
                title="Landscape View"
                position={[6, -2, -4.9]}
                handleClick={handleCameraMove}
            />

            {/* Title Text */}
            <Text
                position={[0, 4.5, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                rotation={[Math.PI / 2, 0, 0]}
            >
                {currentGallery.title || "Gallery"}
            </Text>

            {/* Door */}
            <mesh position={[0, -3, 4.9]} onClick={onBack}>
                <planeGeometry args={[2, 4]} />
                <meshStandardMaterial
                    emissive="white"
                    emissiveIntensity={0.004}
                    color="brown"
                    side={BackSide}
                />
            </mesh>

            {/* Exit Label on the Door */}
            <Text
                position={[0, 0, 4.9]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Exit
            </Text>
        </motion.group>
    );
};

export default Gallery;
