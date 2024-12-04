import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { BackSide, Vector3 } from "three";
import { Text } from "@react-three/drei";

type GalleryProps = {
    galleryId: string;
    onBack: () => void;
};

const Gallery: React.FC<GalleryProps> = ({ galleryId, onBack }) => {
    const { camera } = useThree();

    useEffect(() => {
        const targetPosition = new Vector3(0, 2, 5);
        const duration = 1000;

        const start = performance.now();
        const initialPosition = camera.position.clone();

        const animate = () => {
            const elapsed = performance.now() - start;
            const progress = Math.min(elapsed / duration, 1);

            camera.position.lerpVectors(
                initialPosition,
                targetPosition,
                progress
            );
            camera.lookAt(0, 0, 0);

            if (progress < 1) requestAnimationFrame(animate);
        };

        animate();
    }, [camera]);

    const galleryContent: {
        [key: string]: { title: string };
    } = {
        Macro: { title: "Macro" },
        Urbex: { title: "Urbex" },
        Landscape: { title: "Landscape" },
    };

    const currentGallery = galleryContent[galleryId] || {};

    return (
        <group>
            {/* Gallery Box */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[10, 10, 10]} />
                <meshStandardMaterial color="lightgray" side={BackSide} />
            </mesh>

            {/* Title Text */}
            <Text
                position={[0, 4.5, 0]}
                fontSize={0.5}
                color="black"
                anchorX="center"
                anchorY="middle"
                rotation={[Math.PI / 2, 0, 0]}
            >
                {currentGallery.title || "Gallery"}
            </Text>

            {/* Door */}
            <mesh position={[0, -3, -4.9]} onClick={onBack}>
                <planeGeometry args={[2, 4]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Exit Label on the Door */}
            <Text
                position={[0, 0, -4.9]}
                fontSize={0.3}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                Exit
            </Text>
        </group>
    );
};

export default Gallery;