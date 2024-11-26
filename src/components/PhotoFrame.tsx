import { useTexture } from "@react-three/drei";
import { FC } from "react";

type PhotoFrameProps = {
    file: string;
    position: [number, number, number];
};

const PhotoFrame: FC<PhotoFrameProps> = ({ file, position }) => {
    const texture = useTexture(file);

    return (
        <group position={position}>
            {/* Photo */}
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[1.5, 1]} />
                <meshStandardMaterial map={texture} flatShading={true} />
            </mesh>

            {/* Frame */}
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[1.6, 1.1, 0.1]} />
                <meshStandardMaterial color="#2a2a2a" depthWrite={false} />
            </mesh>
        </group>
    );
};

export default PhotoFrame;
