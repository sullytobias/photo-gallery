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
    onBack: (position: { x: number; y: number; z: number }) => void;
    onSwitchGallery: (
        direction: "next" | "prev",
        position: { x: number; y: number; z: number }
    ) => void;
};

const tableauxData: TableauType[] = [
    {
        title: "Macro World",
        position: [-6, 2, -4.9],
        content: "/photos/oaky.jpg",
    },
    { title: "Urban Exploration", position: [0, 2, -4.9] },
    { title: "Landscape View", position: [6, 2, -4.9] },
    { title: "Macro World", position: [-6, -2, -4.9] },
    { title: "Urban Exploration", position: [0, -2, -4.9] },
    { title: "Landscape View", position: [6, -2, -4.9] },
];

const Gallery: React.FC<GalleryProps> = ({
    onBack,
    currentGallery,
    onSwitchGallery,
}) => {
    const { color, title, id } = currentGallery;

    const { cameraControls } = useCameraControls();

    const handleTableauClick = (position: [number, number, number]) => {
        if (cameraControls) {
            const closestOffset = 0.1;

            const cameraPosition = [
                position[0],
                position[1],
                position[2] + closestOffset,
            ];

            setCameraView(cameraControls, {
                positionX: cameraPosition[0],
                positionY: cameraPosition[1],
                positionZ: cameraPosition[2],
                targetX: position[0],
                targetY: position[1],
                targetZ: position[2],
            });
        }
    };

    const handleDoorClick = (
        direction: "next" | "prev",
        position: { x: number; y: number; z: number }
    ) => {
        onSwitchGallery(direction, position);
    };

    return (
        <group key={id}>
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

            <pointLight position={[0, 0, 0]} intensity={30} />
            <pointLight position={[-5, 0, 0]} intensity={30} />
            <pointLight position={[5, 0, 0]} intensity={30} />

            {/* Tableaux */}
            {tableauxData.map((tableau, index) => (
                <Tableau
                    key={index}
                    title={tableau.title}
                    texture={tableau.content}
                    position={tableau.position}
                    handleClick={handleTableauClick}
                />
            ))}
            {/* Title Text */}
            <Text
                position={[0, 4.5, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                rotation={[Math.PI / 2, 0, 0]}
            >
                {title || "Gallery"}
            </Text>

            {/* Doors to Other Galleries */}
            <group>
                {/* Door to Previous Gallery */}
                <mesh
                    position={[-9.9, -3, 0]}
                    onClick={() =>
                        handleDoorClick("prev", { x: -9.9, y: -3, z: 0 })
                    }
                    rotation={[0, -Math.PI / 2, 0]}
                >
                    <planeGeometry args={[2, 4]} />
                    <meshStandardMaterial
                        emissive={color}
                        emissiveIntensity={0.3}
                        color="brown"
                        side={BackSide}
                    />
                </mesh>
                <Text
                    position={[-9.8, -3, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Previous
                </Text>

                {/* Door to Next Gallery */}
                <mesh
                    position={[9.9, -3, 0]}
                    onClick={() =>
                        handleDoorClick("next", { x: 9.9, y: -3, z: 0 })
                    }
                    rotation={[0, Math.PI / 2, 0]}
                >
                    <planeGeometry args={[2, 4]} />
                    <meshStandardMaterial
                        emissive={color}
                        emissiveIntensity={0.3}
                        color="brown"
                        side={BackSide}
                    />
                </mesh>
                <Text
                    position={[9.8, -3, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Next
                </Text>
            </group>

            {/* Exit Door */}
            <mesh
                position={[0, -3, 4.9]}
                onClick={() => onBack({ x: 0, y: -3, z: 4.9 })}
            >
                <planeGeometry args={[2, 4]} />
                <meshStandardMaterial
                    emissive={color}
                    emissiveIntensity={0.3}
                    color="brown"
                    side={BackSide}
                />
            </mesh>
            <Text
                position={[0, -3, 4.8]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Exit
            </Text>
        </group>
    );
};

export default Gallery;