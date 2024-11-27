import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three";

type GalleryProps = {
    galleryId: number;
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
        [key: number]: { color: string; objects: number };
    } = {
        0: { color: "red", objects: 5 },
        1: { color: "blue", objects: 3 },
        2: { color: "green", objects: 7 },
    };

    const currentGallery = galleryContent[galleryId] || {
        color: "gray",
        objects: 1,
    };

    return (
        <group>
            {Array.from({ length: currentGallery.objects }).map((_, index) => (
                <mesh key={index} position={[index * 1.5 - 2, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={currentGallery.color} />
                </mesh>
            ))}

            <mesh position={[-2, 2, 0]} onClick={onBack}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="yellow" />
            </mesh>
        </group>
    );
};

export default Gallery;
