import React, { useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";
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
import AppDescription from "./Description";
import { DESCRIPTION_GALLERY_LINES } from "../../const/descriptionLines";
import WallLightTrigger from "../lights/LightSwitch";
import { setCursor } from "../utils/cursor";
import { motion } from "framer-motion-3d";

const tableauxData: TableauType[] = [
    { title: "Abstract", position: [-6, 3, -4.9] },
    { title: "Abstract", position: [-3, 3, -4.9] },
    { title: "Mountains", position: [0, 3, -4.9] },
    { title: "Night Sky", position: [3, 3, -4.9] },
    { title: "Seascape", position: [6, 3, -4.9] },
    { title: "Forest Trails", position: [-6, 1, -4.9] },
    { title: "Abstract Colors", position: [-3, 1, -4.9] },
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

const Gallery = ({ currentGallery, onBack, onSwitchGallery }: GalleryProps) => {
    const { color, title, id } = currentGallery;
    const { cameraControls } = useCameraControls();

    const [focusedTableau, setFocusedTableau] = useState<number | null>(null);
    const [lightOn, setLightOn] = useState(false);

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
            <AppDescription
                textPosition={[0, 0, -2]}
                onComplete={() => {}}
                disappearingDuration={2000}
                descriptionLines={DESCRIPTION_GALLERY_LINES(title)}
            />

            <mesh>
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial
                    color={color}
                    side={BackSide}
                    emissive={color}
                    emissiveIntensity={lightOn ? 0.05 : 0}
                />
            </mesh>

            {/* Lighting */}
            <GalleryLights lightOn={lightOn} />

            <WallLightTrigger
                position={[0, 1, -4.9]}
                rotation={[0, 0, 0]}
                initialLightOn={lightOn}
                onLightToggle={(isLightOn) => setLightOn(isLightOn)}
            />

            {/* 500px Button */}
            <motion.group
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <RoundedBox
                    position={[0, -4.3, -4.5]}
                    args={[1.2, 0.3, 0.2]}
                    radius={0.1}
                    smoothness={4}
                    onClick={() =>
                        window.open(
                            "https://500px.com/p/sullytobias?view=photos",
                            "_blank"
                        )
                    }
                    onPointerEnter={() => setCursor("pointer")}
                    onPointerLeave={() => setCursor("default")}
                >
                    <meshStandardMaterial color="lightblue" />
                    <Text
                        position={[0, 0.1, 0.2]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        My 500px
                    </Text>
                </RoundedBox>
            </motion.group>

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
                    tableauKey={index}
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
                {title || "GALLERY"}
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
                    text="EXIT"
                />
            </group>
        </group>
    );
};

export default Gallery;