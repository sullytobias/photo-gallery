import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { ThreeEvent, useLoader, type Vector3 } from "@react-three/fiber";
import { TextureLoader } from "three";
import { motion } from "framer-motion-3d";
import { TableauProps } from "../../types/tableau";
import { setCursor } from "../utils/cursor";
import { usePaperSound } from "../utils/hooks/usePaperSound";
import { useSound } from "../utils/hooks/useSound";

const Tableau = ({
    title,
    description,
    position,
    size = [2.5, 1.5],
    texture,
    handleClick,
    handleEtiquetteClick,
    isFocused,
    tableauKey,
}: TableauProps) => {
    const [showDescription, setShowDescription] = useState(false);
    const [adjustedSize, setAdjustedSize] = useState(size);
    const { playSound } = useSound();

    const textureMap = useLoader(TextureLoader, texture ?? "");

    useEffect(() => {
        if (textureMap.image) {
            const { width, height } = textureMap.image;
            const aspectRatio = width / height;

            if (aspectRatio > 1)
                setAdjustedSize([size[0], size[0] / aspectRatio]);
            else setAdjustedSize([size[1] * aspectRatio, size[1]]);
        }
    }, [textureMap, size]);

    const titlePosition: Vector3 = [
        adjustedSize[0] / 2 - 0.25,
        -adjustedSize[1] / 2 + 0.1,
        0.1,
    ];

    useEffect(() => {
        if (!isFocused) setShowDescription(false);
    }, [isFocused]);

    const toggleDescription = (
        event: ThreeEvent<MouseEvent>,
        index: number
    ) => {
        event.stopPropagation();
        const newShowDescription = !showDescription;

        setShowDescription(newShowDescription);
        if (newShowDescription) playSound?.(usePaperSound, true);

        handleEtiquetteClick(index);
        handleClick([position[0], position[1], position[2] + 5]);
    };

    const truncatedTitle =
        title.length > 8 ? `${title.substring(0, 8)}...` : title;

    const handleFrameClick = () =>
        handleClick([position[0], position[1], position[2] + 5], true);

    return (
        <group
            scale={1.3}
            position={position}
            onPointerEnter={() => setCursor("pointer")}
            onPointerLeave={() => setCursor("grab")}
        >
            {/* Frame */}
            <group onClick={handleFrameClick}>
                <mesh>
                    <boxGeometry
                        args={[
                            adjustedSize[0] + 0.1,
                            adjustedSize[1] + 0.1,
                            0.1,
                        ]}
                    />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* Content */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={adjustedSize} />
                    <meshStandardMaterial map={textureMap} />
                </mesh>
            </group>

            {/* Title */}
            <group
                position={titlePosition}
                onClick={(event) => toggleDescription(event, tableauKey)}
            >
                <mesh>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshStandardMaterial color="wheat" />
                </mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.08}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {truncatedTitle}
                </Text>
            </group>

            {/* Description */}
            {isFocused && description && (
                <group>
                    {/* Background Plane for Description */}
                    <mesh position={[0, 0, 0.1]}>
                        <planeGeometry args={adjustedSize} />
                        <motion.meshStandardMaterial
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showDescription ? 0.7 : 0 }}
                            transition={{ duration: 0.6 }}
                            color="wheat"
                            transparent
                        />
                    </mesh>

                    {/* Title Text */}
                    <mesh position={[0, adjustedSize[1] / 2 - 0.15, 0.11]}>
                        <Text
                            fontSize={0.15}
                            color="black"
                            anchorX="center"
                            anchorY="top"
                            maxWidth={adjustedSize[0] - 0.2}
                        >
                            {title}
                            <motion.meshStandardMaterial
                                initial={{ opacity: 0 }}
                                animate={{ opacity: showDescription ? 1 : 0 }}
                                transition={{ duration: 0.6 }}
                                color="black"
                                transparent
                            />
                        </Text>
                    </mesh>

                    {/* Description Text */}
                    <mesh position={[0, 0, 0.11]}>
                        <Text
                            fontSize={0.1}
                            color="black"
                            anchorX="center"
                            anchorY="top"
                            maxWidth={adjustedSize[0] - 0.2}
                            lineHeight={1.2}
                        >
                            {description}
                            <motion.meshStandardMaterial
                                initial={{ opacity: 0 }}
                                animate={{ opacity: showDescription ? 1 : 0 }}
                                transition={{ duration: 0.6 }}
                                color="black"
                                transparent
                            />
                        </Text>
                    </mesh>
                </group>
            )}
        </group>
    );
};

export default Tableau;
