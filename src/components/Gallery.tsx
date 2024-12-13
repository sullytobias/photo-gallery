import React from "react";
import { CameraControls, Text } from "@react-three/drei";
import { BackSide } from "three";
import Tableau from "./Tableau";
import { GalleryType } from "../types/galleries";

type GalleryProps = {
    currentGallery: GalleryType;
    onBack: () => void;
    cameraControls: CameraControls | null;
};

const Gallery: React.FC<GalleryProps> = ({
    onBack,
    currentGallery,
    cameraControls,
}) => {
    const { color, title } = currentGallery;

    const handleCameraMove = (position: [number, number, number]) => {
        if (cameraControls) {
            // Compute a closer position in front of the tableau
            const closerPosition: [number, number, number] = [
                position[0], // Maintain the same X position
                position[1], // Maintain the same Y position
                position[2], // Move closer along the Z-axis (in front of the tableau)
            ];

            // Update the camera position and target
            cameraControls.setLookAt(
                closerPosition[0],
                closerPosition[1],
                closerPosition[2], // Camera position (in front of tableau)
                position[0],
                position[1],
                position[2] * 0.3, // Look at the tableau's position
                true // Smooth transition
            );
        }
    };

    return (
        <group>
            {/* Gallery Box */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial
                    color={color}
                    side={BackSide}
                    emissive={color}
                    emissiveIntensity={0.05}
                />
            </mesh>

            <pointLight position={[0, 0, 0]} intensity={2} color={color} />

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
                color={color}
                anchorX="center"
                anchorY="middle"
                rotation={[Math.PI / 2, 0, 0]}
            >
                {title || "Gallery"}
            </Text>

            {/* Door */}
            <mesh position={[0, -3, 4.9]} onClick={onBack}>
                <planeGeometry args={[2, 4]} />
                <meshStandardMaterial
                    emissive={color}
                    emissiveIntensity={0.3}
                    color="brown"
                    side={BackSide}
                />
            </mesh>

            {/* Exit Label on the Door */}
            <Text
                position={[0, 0, 4.9]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.3}
                color={color}
                anchorX="center"
                anchorY="middle"
            >
                Exit
            </Text>
        </group>
    );
};

export default Gallery;
