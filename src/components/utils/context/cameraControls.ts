import { createContext, useContext } from "react";
import { CameraControls } from "@react-three/drei";

interface CameraControlsContextType {
    cameraControls: CameraControls | null;
}

const CameraControlsContext = createContext<CameraControlsContextType>({
    cameraControls: null,
});

export const useCameraControls = () => useContext(CameraControlsContext);

export default CameraControlsContext;
