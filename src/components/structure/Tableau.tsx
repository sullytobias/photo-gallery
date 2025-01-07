import { useMemo, useState } from "react";
import { Text } from "@react-three/drei";
import { type Vector3 } from "@react-three/fiber";
import { TextureLoader } from "three";
import { TableauProps } from "../../types/tableau";
import { motion } from "framer-motion-3d";

const Tableau = ({
    title,
    position,
    size = [2.5, 1.5],
    texture,
    handleClick,
    handleEtiquetteClick,
    isFocused,
    tableauKey,
}: TableauProps) => {
    const [showDescription, setShowDescription] = useState(false);

    const textureMap = useMemo(
        () => (texture ? new TextureLoader().load(texture) : undefined),
        [texture]
    );

    const frameSize = size;
    const contentPosition: Vector3 = [0, 0, 0.06];
    const titlePosition: Vector3 = [
        size[0] / 2 - 0.25,
        -size[1] / 2 + 0.1,
        0.1,
    ];

    const toggleDescription = (index: number) => {
        setShowDescription(!showDescription);
        handleEtiquetteClick(index);
    };

    const maxTitleLength = 8;
    const truncatedTitle =
        title.length > maxTitleLength
            ? `${title.substring(0, maxTitleLength)}...`
            : title;

    return (
        <group
            position={position}
            onClick={() =>
                handleClick([position[0], position[1], position[2] + 5])
            }
        >
            {/* Frame */}
            <mesh>
                <boxGeometry
                    args={[frameSize[0] + 0.1, frameSize[1] + 0.1, 0.1]}
                />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Content */}
            <mesh position={contentPosition}>
                <planeGeometry args={frameSize} />
                <meshStandardMaterial
                    map={textureMap}
                    color={textureMap ? "white" : "gray"}
                />
            </mesh>

            {/* Title */}
            <group
                position={titlePosition}
                onClick={() => toggleDescription(tableauKey)}
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
            <motion.group>
                <mesh position={[0, 0, 0.1]}>
                    <planeGeometry args={frameSize} />
                    <motion.meshStandardMaterial
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: showDescription && isFocused ? 0.7 : 0,
                        }}
                        transition={{ duration: 0.6 }}
                        color="wheat"
                        transparent
                    />
                </mesh>
                <mesh position={[0, 0, 0.11]}>
                    <Text fontSize={0.1}>
                        This is a description for {title}.
                        <motion.meshStandardMaterial
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: showDescription && isFocused ? 1 : 0,
                            }}
                            transition={{ duration: 0.6 }}
                            color="black"
                        />
                    </Text>
                </mesh>
            </motion.group>
        </group>
    );
};
export default Tableau;
