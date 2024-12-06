import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { CameraControls, Environment } from "@react-three/drei";

import MainMenu from "./components/MainMenu";
import Gallery from "./components/Gallery";

function App() {
    const [view, setView] = useState<"menu" | "gallery">("menu");
    const [currentGallery, setCurrentGallery] = useState<string>("Urbex");

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas>
                <Suspense fallback={null}>
                    {view !== "gallery" && (
                        <>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 10]} />
                        </>
                    )}

                    <CameraControls
                        truckSpeed={0}
                        maxDistance={0}
                        minDistance={5}
                    />

                    {view !== "gallery" && (
                        <Environment background preset="dawn" blur={1} />
                    )}

                    {view === "menu" && (
                        <MainMenu
                            onEnterGallery={(galleryId) => {
                                setCurrentGallery(galleryId);
                                setView("gallery");
                            }}
                        />
                    )}
                    {view === "gallery" && (
                        <Gallery
                            galleryId={currentGallery}
                            onBack={() => setView("menu")}
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;