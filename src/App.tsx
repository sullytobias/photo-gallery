import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import PhotoFrame from "./components/PhotoFrame";

import "./index.scss";

const photos = [
    {
        title: "Oaky",
        file: "/photos/oaky.jpg",
        position: [0, 0, 0],
    },
];

export default function App() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <color attach="background" args={["#f0f0f0"]} />
            <ambientLight intensity={2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

            {photos.map((photo, index) => (
                <PhotoFrame
                    key={index}
                    title={photo.title}
                    file={photo.file}
                    position={photo.position}
                />
            ))}

            <OrbitControls />
        </Canvas>
    );
}
