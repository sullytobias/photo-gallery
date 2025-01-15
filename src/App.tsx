import { Suspense, useState, useRef, useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls, Environment } from "@react-three/drei";

import { GalleryType } from "./types/galleries";

import MainMenu from "./components/structure/MainMenu";
import Gallery from "./components/structure/Gallery";

import { useSound } from "./components/utils/hooks/useSound";

import {
    EXIT_DOOR_POSITION,
    Galleries,
    NEXT_DOOR_POSITION,
    PREV_DOOR_POSITION,
} from "./const/galleries";
import { INITIAL_CAMERA_VIEW, INITIAL_GALLERY_VIEW } from "./const/camera";

import { setCameraView } from "./components/utils/cameraControls";

import CameraControlsContext from "./components/utils/context/cameraControls";
import { useBackgroundSound } from "./components/utils/hooks/useBackgroundSound";

import Loader from "./components/structure/Loader";
import AppDescription from "./components/structure/Description";

import { DESCRIPTION_APP_LINES } from "./const/descriptionLines";

import SoundElements from "./components/atoms/SoundsButtons";

import "./styles/global.scss";

function App() {
    const [view, setView] = useState<"menu" | "gallery">("menu");
    const [currentGallery, setCurrentGallery] = useState<GalleryType>(
        Galleries[0]
    );

    const { playSound } = useSound();

    const [isLoading, setIsLoading] = useState(true);
    const [isDescriptingCompleted, setIsDescriptingCompleted] = useState(false);

    const cameraControlsRef = useRef<CameraControls | null>(null);

    const {
        isBackgroundPlaying,
        isFxPlaying,
        toggleBackgroundSound,
        toggleFxSound,
    } = useSound();

    useEffect(() => {
        if (isBackgroundPlaying) playSound?.(useBackgroundSound);
        else useBackgroundSound.pause();
    }, [isBackgroundPlaying, playSound]);

    const handleBackToMenu = () => {
        const position = EXIT_DOOR_POSITION;

        setCameraView(cameraControlsRef.current, {
            positionX: position.x,
            positionY: position.y,
            positionZ: position.z - 2,
            targetX: position.x,
            targetY: position.y,
            targetZ: position.z,
        });

        setTimeout(() => {
            setCameraView(cameraControlsRef.current, INITIAL_CAMERA_VIEW);
            setView("menu");
        }, 800);
    };

    const handleDoorClick = (galleryId: string) => {
        setCameraView(cameraControlsRef.current, INITIAL_GALLERY_VIEW);

        setCurrentGallery(
            Galleries.find((g) => g.id === galleryId) || Galleries[0]
        );

        setTimeout(() => {
            setView("gallery");
        }, 800);
    };

    const handleSwitchGallery = (direction: "next" | "prev") => {
        const currentIndex = Galleries.findIndex(
            (gallery) => gallery.id === currentGallery.id
        );

        const isNext = direction === "next";
        const position = isNext ? NEXT_DOOR_POSITION : PREV_DOOR_POSITION;

        const nextIndex = isNext
            ? (currentIndex + 1) % Galleries.length
            : (currentIndex - 1 + Galleries.length) % Galleries.length;

        const targetGallery = Galleries[nextIndex];

        setCameraView(cameraControlsRef.current, {
            positionX: position.x - (isNext ? 2 : -2),
            positionY: position.y,
            positionZ: position.z,
            targetX: position.x,
            targetY: position.y,
            targetZ: position.z,
        });

        setTimeout(() => {
            setCurrentGallery(targetGallery);
            setCameraView(cameraControlsRef.current, INITIAL_GALLERY_VIEW);
        }, 800);
    };

    const isGalleryView = view === "gallery";
    const isMenuView = view === "menu";

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <Canvas
                camera={{
                    position: [
                        INITIAL_CAMERA_VIEW.positionX,
                        INITIAL_CAMERA_VIEW.positionY,
                        INITIAL_CAMERA_VIEW.positionZ,
                    ],
                }}
            >
                {isLoading && (
                    <Loader
                        isLoading={(loadingResponse) =>
                            setIsLoading(loadingResponse)
                        }
                    />
                )}

                <CameraControlsContext.Provider
                    value={{ cameraControls: cameraControlsRef.current }}
                >
                    {
                        <>
                            <Environment background preset="night" blur={1} />

                            {!isDescriptingCompleted && !isLoading && (
                                <AppDescription
                                    disappearingDuration={2000}
                                    descriptionLines={DESCRIPTION_APP_LINES}
                                    onComplete={(isComplete) =>
                                        setIsDescriptingCompleted(isComplete)
                                    }
                                />
                            )}

                            {isDescriptingCompleted && (
                                <Suspense fallback={null}>
                                    <CameraControls
                                        ref={cameraControlsRef}
                                        makeDefault
                                        truckSpeed={0}
                                        maxDistance={5}
                                        minDistance={5}
                                    />

                                    {isMenuView && (
                                        <MainMenu
                                            onEnterGallery={(galleryId) =>
                                                handleDoorClick(galleryId)
                                            }
                                        />
                                    )}

                                    {isGalleryView && (
                                        <Gallery
                                            onSwitchGallery={
                                                handleSwitchGallery
                                            }
                                            currentGallery={currentGallery}
                                            onBack={handleBackToMenu}
                                        />
                                    )}
                                </Suspense>
                            )}
                        </>
                    }
                </CameraControlsContext.Provider>
            </Canvas>
            <SoundElements
                isBackgroundPlaying={isBackgroundPlaying}
                isFxPlaying={isFxPlaying}
                toggleBackgroundSound={toggleBackgroundSound}
                toggleFxSound={toggleFxSound}
            />
        </div>
    );
}

export default App;
