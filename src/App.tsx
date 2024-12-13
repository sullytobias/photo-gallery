import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { CameraControls, Environment } from "@react-three/drei";

import { GalleryType } from "./types/galleries";

import MainMenu from "./components/MainMenu";
import Gallery from "./components/Gallery";
import { Galleries } from "./const/galleries";

function App() {
    const [view, setView] = useState<"menu" | "gallery">("menu");
    const [currentGallery, setCurrentGallery] = useState<GalleryType>(
        Galleries[0]
    );

    const cameraControlsRef = useRef<CameraControls | null>(null);

    const setGallery = (galleryId: string) => {
        const currentG = Galleries.find((g) => g.id === galleryId);
        setCurrentGallery(currentG || Galleries[0]);
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
                        ref={cameraControlsRef} // Pass the ref
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
                                setGallery(galleryId);
                                setView("gallery");
                            }}
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