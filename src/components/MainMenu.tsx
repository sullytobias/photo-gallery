import Slider from "./Slider";

type MainMenuProps = {
    onEnterGallery: (galleryId: string) => void;
};

const MainMenu: React.FC<MainMenuProps> = ({ onEnterGallery }) => {
    return <Slider onEnterGallery={onEnterGallery} />;
};

export default MainMenu;
