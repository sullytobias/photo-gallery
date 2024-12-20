import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { CameraControls, Environment } from "@react-three/drei";

import { GalleryType } from "./types/galleries";

import MainMenu from "./components/MainMenu";
import Gallery from "./components/Gallery";
import GlobalLights from "./components/lights/global";

import { Galleries } from "./const/galleries";
import { INITIAL_CAMERA_VIEW } from "./const/camera";

import { setCameraView } from "./components/utils/cameraControls";

import CameraControlsContext from "./context/cameraControls";

function App() {
    const [view, setView] = useState<"menu" | "gallery">("menu");
    const [currentGallery, setCurrentGallery] = useState<GalleryType>(
        Galleries[0]
    );

    const cameraControlsRef = useRef<CameraControls | null>(null);

    const handleBackToMenu = () => {
        setCameraView(cameraControlsRef.current, INITIAL_CAMERA_VIEW);
        setView("menu");
    };

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

    const handleSwitchGallery = (direction: "next" | "prev") => {
        const currentIndex = Galleries.findIndex(
            (gallery) => gallery.id === currentGallery.id
        );

        const nextIndex =
            direction === "next"
                ? (currentIndex + 1) % Galleries.length
                : (currentIndex - 1 + Galleries.length) % Galleries.length;

        const targetGallery = Galleries[nextIndex];

        setCurrentGallery(targetGallery);
    };

    const isGalleryView = view === "gallery";
    const isMenuView = view === "menu";

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas
                camera={{
                    position: [
                        INITIAL_CAMERA_VIEW.positionX,
                        INITIAL_CAMERA_VIEW.positionY,
                        INITIAL_CAMERA_VIEW.positionZ,
                    ],
                }}
            >
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
                                onSwitchGallery={handleSwitchGallery}
                                currentGallery={currentGallery}
                                onBack={handleBackToMenu}
                            />
                        )}
                    </Suspense>
                </CameraControlsContext.Provider>
            </Canvas>
        </div>
    );
}

export default App;