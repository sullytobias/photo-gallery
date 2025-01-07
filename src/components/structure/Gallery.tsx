import React from "react";
import { Text } from "@react-three/drei";
import { BackSide } from "three";

import Tableau from "./Tableau";
import Door from "../atoms/Door";
import { useCameraControls } from "../../context/cameraControls";
import { setCameraView } from "../utils/cameraControls";
import GalleryLights from "../lights/gallery";

import {
    EXIT_DOOR_POSITION,
    Galleries,
    NEXT_DOOR_POSITION,
    PREV_DOOR_POSITION,
} from "../../const/galleries";

import { GalleryProps } from "../../types/galleries";
import { type TableauType } from "../../types/tableau";

const tableauxData: TableauType[] = [
    { title: "Abstract", position: [-6, 3, -4.9] },
    { title: "Abstract", position: [-3, 3, -4.9] },
    { title: "Abstract", position: [0, 3, -4.9] },
    { title: "Night Sky", position: [3, 3, -4.9] },
    { title: "Seascape", position: [6, 3, -4.9] },
    { title: "Forest Trails", position: [-6, 1, -4.9] },
    { title: "Abstract Colors", position: [-3, 1, -4.9] },
    { title: "Mountains", position: [0, 1, -4.9] },
    { title: "City Lights", position: [3, 1, -4.9] },
    { title: "Wildlife", position: [6, 1, -4.9] },
    { title: "Vintage Art", position: [-6, -1, -4.9] },
    { title: "Ocean Depths", position: [-3, -1, -4.9] },
    { title: "Autumn Leaves", position: [0, -1, -4.9] },
    { title: "Desert Sands", position: [3, -1, -4.9] },
    { title: "Rainforest", position: [6, -1, -4.9] },
    { title: "Evening Glow", position: [-6, -3, -4.9] },
    { title: "Snow Peaks", position: [-3, -3, -4.9] },
    { title: "River Flow", position: [0, -3, -4.9] },
    { title: "Cherry Blossoms", position: [3, -3, -4.9] },
    { title: "Starry Night", position: [6, -3, -4.9] },
];

import { useState } from "react";

const Gallery = ({ currentGallery, onBack, onSwitchGallery }: GalleryProps) => {
    const { color, title, id } = currentGallery;
    const { cameraControls } = useCameraControls();

    const [focusedTableau, setFocusedTableau] = useState<number | null>(null);

    const currentIndex = React.useMemo(
        () => Galleries.findIndex((gallery) => gallery.id === id),
        [id]
    );

    const nextGallery = Galleries[(currentIndex + 1) % Galleries.length];
    const prevGallery =
        Galleries[(currentIndex - 1 + Galleries.length) % Galleries.length];

    const handleTableauClick = (position: [number, number, number]) => {
        if (cameraControls) {
            const offset = 0.1;
            setCameraView(cameraControls, {
                positionX: position[0],
                positionY: position[1],
                positionZ: position[2] + offset,
                targetX: position[0],
                targetY: position[1],
                targetZ: position[2],
            });
        }
    };

    const handleEtiquetteClick = (index: number) => setFocusedTableau(index);

    return (
        <group key={id}>
            {/* Gallery Box */}
            <mesh>
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial
                    color={color}
                    side={BackSide}
                    emissive={color}
                    emissiveIntensity={0.05}
                />
            </mesh>

            {/* Lighting */}
            <GalleryLights />

            {/* Tableaux */}
            {tableauxData.map(({ title, position, content }, index) => (
                <Tableau
                    key={index}
                    title={title}
                    texture={content}
                    position={position}
                    handleClick={handleTableauClick}
                    handleEtiquetteClick={handleEtiquetteClick}
                    isFocused={focusedTableau === index}
                    tableauKey={index} // Pass the key here
                />
            ))}

            {/* Gallery Title */}
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

            {/* Navigation Doors */}
            <group>
                <Door
                    position={[
                        PREV_DOOR_POSITION.x,
                        PREV_DOOR_POSITION.y,
                        PREV_DOOR_POSITION.z,
                    ]}
                    rotation={[0, -Math.PI / 2, 0]}
                    onClick={() => onSwitchGallery("prev")}
                    color={color}
                    text={prevGallery.title}
                    operator="+"
                />
                <Door
                    position={[
                        NEXT_DOOR_POSITION.x,
                        NEXT_DOOR_POSITION.y,
                        NEXT_DOOR_POSITION.z,
                    ]}
                    rotation={[0, Math.PI / 2, 0]}
                    onClick={() => onSwitchGallery("next")}
                    color={color}
                    text={nextGallery.title}
                />
                <Door
                    position={[
                        EXIT_DOOR_POSITION.x,
                        EXIT_DOOR_POSITION.y,
                        EXIT_DOOR_POSITION.z,
                    ]}
                    rotation={[0, Math.PI, 0]}
                    onClick={onBack}
                    isFrontSide
                    placeTextWithZAxis
                    color={color}
                    text="Exit"
                />
            </group>
        </group>
    );
};

export default Gallery;
