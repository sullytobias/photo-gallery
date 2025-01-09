import Slider from "./Slider";

import { MainMenuProps } from "../../types/mainMenu";

import GlobalLights from "../lights/global";

const MainMenu = ({ onEnterGallery }: MainMenuProps) => (
    <group>
        <GlobalLights />

        <Slider onEnterGallery={onEnterGallery} />
    </group>
);

export default MainMenu;
