import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import Slider from "./Slider";

type MainMenuProps = {
    onEnterGallery: (galleryId: number) => void;
};

const MainMenu: React.FC<MainMenuProps> = ({ onEnterGallery }) => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    return (
        <group>
            <Slider onEnterGallery={onEnterGallery} />
        </group>
    );
};

export default MainMenu;
