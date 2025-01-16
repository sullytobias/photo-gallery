import { useState, useMemo } from "react";
import { RoundedBox, Text } from "@react-three/drei";
import { BackSide } from "three";
import { motion } from "framer-motion-3d";

import Tableau from "./Tableau";
import Door from "../atoms/Door";

import { useCameraControls } from "../utils/context/cameraControls";
import { setCameraView } from "../utils/cameraControls";

import GalleryLights from "../lights/gallery";
import WallLightTrigger from "../lights/LightSwitch";

import { setCursor } from "../utils/cursor";
import { useSound } from "../utils/hooks/useSound";
import { usePhotoSound } from "../utils/hooks/usePhotoSound";
import { usePxSound } from "../utils/hooks/use500pxSound";

import { tableauxData } from "../../data/tableaux";

import {
    EXIT_DOOR_POSITION,
    Galleries,
    NEXT_DOOR_POSITION,
    PREV_DOOR_POSITION,
} from "../../const/galleries";

import { DESCRIPTION_GALLERY_LINES } from "../../const/descriptionLines";

import { GalleryProps } from "../../types/galleries";

import AppDescription from "./Description";

const Gallery = ({ currentGallery, onBack, onSwitchGallery }: GalleryProps) => {
    const { color, title, id } = currentGallery;
    const { cameraControls } = useCameraControls();
    const { playSound } = useSound();

    const [focusedTableau, setFocusedTableau] = useState<number | null>(null);
    const [lightOn, setLightOn] = useState(false);

    const currentIndex = useMemo(
        () => Galleries.findIndex((gallery) => gallery.id === id),
        [id]
    );

    const nextGallery = useMemo(
        () => Galleries[(currentIndex + 1) % Galleries.length],
        [currentIndex]
    );

    const prevGallery = useMemo(
        () =>
            Galleries[(currentIndex - 1 + Galleries.length) % Galleries.length],
        [currentIndex]
    );

    const handleTableauClick = (
        position: [number, number, number],
        sound?: boolean
    ) => {
        if (sound) playSound?.(usePhotoSound, true);
        if (cameraControls) {
            setCameraView(cameraControls, {
                positionX: position[0],
                positionY: position[1],
                positionZ: position[2] + 0.1,
                targetX: position[0],
                targetY: position[1],
                targetZ: position[2],
            });
        }
    };

    const handle500pxClick = () => {
        window.open("https://500px.com/p/sullytobias?view=photos", "_blank");
        playSound?.(usePxSound, true);
    };

    const handleLightToggle = (isLightOn: boolean) => setLightOn(isLightOn);

    const handleEtiquetteClick = (index: number) => setFocusedTableau(index);

    return (
        <group key={id}>
            {/* Gallery Description */}
            <AppDescription
                onComplete={() => {}}
                textPosition={[0, 0, -4.8]}
                disappearingDuration={2000}
                descriptionLines={DESCRIPTION_GALLERY_LINES(title)}
            />

            {/* Gallery Box */}
            <mesh>
                <boxGeometry args={[20, 10, 10]} />
                <meshStandardMaterial
                    color={color}
                    side={BackSide}
                    emissive={color}
                    emissiveIntensity={lightOn ? 0.05 : 0}
                />
            </mesh>

            {/* Gallery Lights */}
            <GalleryLights lightOn={lightOn} />

            {/* Wall Light Toggle */}
            <WallLightTrigger
                position={[0, 1, -4.9]}
                initialLightOn={lightOn}
                onLightToggle={handleLightToggle}
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
                    onClick={handle500pxClick}
                    onPointerEnter={() => setCursor("pointer")}
                    onPointerLeave={() => setCursor("grab")}
                >
                    <meshStandardMaterial color="lightblue" />
                    <Text position={[0, 0.1, 0.2]} fontSize={0.2} color="black">
                        My 500px
                    </Text>
                </RoundedBox>
            </motion.group>

            {/* Tableaux */}
            {tableauxData[id].map((data, index) => (
                <Tableau
                    key={index}
                    {...data}
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
