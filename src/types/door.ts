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
