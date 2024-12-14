import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { CameraControls, Environment } from "@react-three/drei";

import { GalleryType } from "./types/galleries";

import MainMenu from "./components/MainMenu";
import Gallery from "./components/Gallery";
import { Galleries } from "./const/galleries";
import { Vector3 } from "three";

function App() {
    const [view, setView] = useState<"menu" | "gallery">("menu");
    const [currentGallery, setCurrentGallery] = useState<GalleryType>(
        Galleries[0]
    );

    const cameraControlsRef = useRef<CameraControls | null>(null);

    const doorPosition = { x: 0, y: -3, z: 4.9 };

    const checkCameraPosition = () => {
        if (cameraControlsRef.current) {
            const position = cameraControlsRef.current.getPosition(
                new Vector3()
            );

            const distance = Math.sqrt(
                (position.x - doorPosition.x) ** 2 +
                    (position.y - doorPosition.y) ** 2 +
                    (position.z - doorPosition.z) ** 2
            );

            if (distance < 1) {
                setView("gallery");
            }
        }
    };

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas camera={{ position: [0, 2, 5] }}>
                <Suspense fallback={null}>
                    {view !== "gallery" && (
                        <>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 10]} />
                        </>
                    )}

                    <CameraControls
                        ref={cameraControlsRef}
                        onUpdate={checkCameraPosition}
                        truckSpeed={0}
                        maxDistance={0}
                        minDistance={5}
                    />

                    {view !== "gallery" && (
                        <Environment background preset="dawn" blur={1} />
                    )}

                    {view === "menu" && (
                        <MainMenu
                            galleries={Galleries}
                            onEnterGallery={(galleryId) => {
                                setCurrentGallery(
                                    Galleries.find((g) => g.id === galleryId) ||
                                        Galleries[0]
                                );
                                setView("gallery");
                            }}
                            cameraControls={cameraControlsRef.current}
                        />
                    )}
                    {view === "gallery" && (
                        <Gallery
                            currentGallery={currentGallery}
                            onBack={() => setView("menu")}
                            cameraControls={cameraControlsRef.current}
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;