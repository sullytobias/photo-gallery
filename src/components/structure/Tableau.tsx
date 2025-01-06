import { useMemo, useState } from "react";
import { Text } from "@react-three/drei";
import { type Vector3 } from "@react-three/fiber";
import { TextureLoader } from "three";
import { TableauProps } from "../../types/tableau";
import { motion } from "framer-motion-3d"; // Import from framer-motion-3d

const Tableau = ({
    title,
    position,
    size = [2.5, 1.5],
    texture,
    handleClick,
}: TableauProps) => {
    const [showDescription, setShowDescription] = useState(false);

    const textureMap = useMemo(
        () => (texture ? new TextureLoader().load(texture) : undefined),
        [texture]
    );

    const frameSize = size;
    const contentPosition: Vector3 = [0, 0, 0.06];

    // Adjust the position to place the etiquette at the bottom right
    const titlePosition: Vector3 = [
        size[0] / 2 - 0.25, // Offset to the right side
        -size[1] / 2 + 0.1, // Offset to the bottom
        0.1,
    ];

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

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

            {/* Title as an Etiquette at Bottom Right */}
            <group position={titlePosition} onClick={toggleDescription}>
                <mesh>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshStandardMaterial
                        transparent
                        opacity={0.7}
                        color="wheat"
                    />
                </mesh>
                <Text
                    position={[0, 0, 0.06]}
                    fontSize={0.1}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {title}
                </Text>
            </group>

            {/* Description */}
            <motion.group
                initial={{ scale: 0 }}
                animate={{
                    scale: showDescription ? 1 : 0,
                }}
                exit={{ scale: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                }}
            >
                <mesh position={[0, 0, 0.1]}>
                    <planeGeometry args={frameSize} />
                    <meshStandardMaterial
                        color="wheat"
                        opacity={0.7}
                        transparent
                    />
                </mesh>
                <Text
                    position={[0, 0, 0.2]}
                    fontSize={0.1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    This is a description for {title}.
                </Text>
            </motion.group>
        </group>
    );
};

export default Tableau;
