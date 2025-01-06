export type DoorType = {
    position: [number, number, number];
    onClick: () => void;
    color: string;
    rotation?: [number, number, number];
    text?: string;
    isFrontSide?: boolean;
    placeTextWithZAxis?: boolean;
    operator?: string;
};

export type DoorPanelType = {
    color: string;
    isFrontSide?: boolean;
};

export type FrameType = {
    position: [number, number, number];
    args: [number, number, number];
};

export type TextType = {
    position: [number, number, number];
    text: string;
    rotation?: [number, number, number];
    placeTextWithZAxis?: boolean;
    operator?: string;
};
