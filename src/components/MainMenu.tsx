import Slider from "./Slider";

import { GalleriesType } from "../types/galleries";
import { CameraControls } from "@react-three/drei";

type MainMenuProps = {
    onEnterGallery: (galleryId: string) => void;
    galleries: GalleriesType;
    cameraControls: CameraControls | null;
};

const MainMenu: React.FC<MainMenuProps> = ({
    onEnterGallery,
    galleries,
    cameraControls,
}) => {
    return (
        <Slider
            cameraControls={cameraControls}
            onEnterGallery={onEnterGallery}
            galleries={galleries}
        />
    );
};

export default MainMenu;
