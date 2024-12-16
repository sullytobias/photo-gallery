import React from "react";
import { Text } from "@react-three/drei";
import { BackSide } from "three";

import Tableau from "./Tableau";

import { type GalleryType } from "../types/galleries";
import { type TableauType } from "../types/tableau";

import { useCameraControls } from "../context/cameraControls";

import { setCameraView } from "./utils/cameraControls";

type GalleryProps = {
    currentGallery: GalleryType;
    onBack: () => void;
};

const tableauxData: TableauType[] = [
    { title: "Macro World", position: [-6, 2, -4.9] },
    { title: "Urban Exploration", position: [0, 2, -4.9] },
    { title: "Landscape View", position: [6, 2, -4.9] },
    { title: "Macro World", position: [-6, -2, -4.9] },
    { title: "Urban Exploration", position: [0, -2, -4.9] },
    { title: "Landscape View", position: [6, -2, -4.9] },
];

const Gallery: React.FC<GalleryProps> = ({ onBack, currentGallery }) => {
    const { color, title } = currentGallery;

    const { cameraControls } = useCameraControls();

    const handleTableauClick = (position: [number, number, number]) => {
        if (cameraControls) {
            setCameraView(cameraControls, {
                positionX: position[0],
                positionY: position[1],
                positionZ: position[2] + 1.5,
                targetX: position[0],
                targetY: position[1],
                targetZ: position[2],
            });
        }
    };

    const handleDoorClick = () => {
        if (cameraControls) {
            setCameraView(cameraControls, {
                positionX: 0,
                positionY: -2,
                positionZ: 3.5,
                targetX: 0,
                targetY: -3,
                targetZ: 4.9,
            });

            setTimeout(() => {
                onBack();
            }, 1000);
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
            {tableauxData.map((tableau, index) => (
                <Tableau
                    key={index}
                    title={tableau.title}
                    position={tableau.position}
                    handleClick={handleTableauClick}
                />
            ))}
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
            <mesh position={[0, -3, 4.9]} onClick={handleDoorClick}>
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