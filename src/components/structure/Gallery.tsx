import { useMemo } from "react";

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

const Gallery = ({ currentGallery, onBack, onSwitchGallery }: GalleryProps) => {
    const { color, title, id } = currentGallery;
    const { cameraControls } = useCameraControls();

    const currentIndex = useMemo(
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
