import { createContext, useContext } from "react";
import { CameraControlsContextType } from "../../../types/cameraControl";

const CameraControlsContext = createContext<CameraControlsContextType>({
    cameraControls: null,
});

export const useCameraControls = () => useContext(CameraControlsContext);

export default CameraControlsContext;
