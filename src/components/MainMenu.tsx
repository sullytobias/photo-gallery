import Slider from "./Slider";

import { GalleriesType } from "../types/galleries";


type MainMenuProps = {
    onEnterGallery: (galleryId: string) => void;
    galleries: GalleriesType;
};

const MainMenu: React.FC<MainMenuProps> = ({ onEnterGallery, galleries }) => {
    return <Slider onEnterGallery={onEnterGallery} galleries={galleries} />;
};

export default MainMenu;
