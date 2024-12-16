import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { CameraControls, Environment } from "@react-three/drei";

import { GalleryType } from "./types/galleries";

import MainMenu from "./components/MainMenu";
import Gallery from "./components/Gallery";
import GlobalLights from "./components/lights/global";

import { Galleries } from "./const/galleries";

import { setCameraView } from "./components/utils/cameraControls";

import CameraControlsContext from "./context/cameraControls";

function App() {
    const [view, setView] = useState<"menu" | "gallery">("menu");
    const [currentGallery, setCurrentGallery] = useState<GalleryType>(
        Galleries[0]
    );

    const cameraControlsRef = useRef<CameraControls | null>(null);

    const handleDoorClick = (galleryId: string) => {
        setCameraView(cameraControlsRef.current, {
            positionX: 0,
            positionY: 0,
            positionZ: 2.5,
            targetX: 0,
            targetY: -0.2,
            targetZ: 0.51,
        });

        setCurrentGallery(
            Galleries.find((g) => g.id === galleryId) || Galleries[0]
        );

        setTimeout(() => {
            setView("gallery");
        }, 1000);
    };

    const isGalleryView = view === "gallery";
    const isMenuView = view === "menu";

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas camera={{ position: [0, 2, 5] }}>
                <CameraControlsContext.Provider
                    value={{ cameraControls: cameraControlsRef.current }}
                >
                    <Suspense fallback={null}>
                        <CameraControls
                            ref={cameraControlsRef}
                            makeDefault
                            truckSpeed={0}
                            maxDistance={0}
                            minDistance={5}
                        />

                        {!isGalleryView && <GlobalLights />}

                        {!isGalleryView && (
                            <Environment background preset="dawn" blur={1} />
                        )}

                        {isMenuView && (
                            <MainMenu
                                galleries={Galleries}
                                onEnterGallery={(galleryId) =>
                                    handleDoorClick(galleryId)
                                }
                            />
                        )}

                        {isGalleryView && (
                            <Gallery
                                currentGallery={currentGallery}
                                onBack={() => setView("menu")}
                            />
                        )}
                    </Suspense>
                </CameraControlsContext.Provider>
            </Canvas>
        </div>
    );
}

export default App;