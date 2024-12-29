import { Environment } from "@react-three/drei";

import Slider from "./Slider";

import { MainMenuProps } from "../../types/mainMenu";

import GlobalLights from "../lights/global";

const MainMenu = ({ onEnterGallery }: MainMenuProps) => (
    <group>
        <Environment background preset="dawn" blur={1} />

        <GlobalLights />

        <Slider onEnterGallery={onEnterGallery} />
    </group>
);

export default MainMenu;
