import { CameraControls } from "@react-three/drei";

export const setCameraView = (
    cameraControlsRef: CameraControls | null,
    view: {
        positionX: number;
        positionY: number;
        positionZ: number;
        targetX: number;
        targetY: number;
        targetZ: number;
    }
) => {
    if (cameraControlsRef) {
        cameraControlsRef.setLookAt(
            view.positionX,
            view.positionY,
            view.positionZ,
            view.targetX,
            view.targetY,
            view.targetZ,
            true
        );
    }
};
