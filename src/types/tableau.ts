export type TableauType = {
    title: string;
    position: [number, number, number];
    content?: string;
};


export type TableauProps = {
    title: string;
    position: [number, number, number];
    size?: [number, number];
    texture?: string;
    handleClick: (position: [number, number, number]) => void;
    handleEtiquetteClick: (index: number) => void;
    isFocused: boolean;
    tableauKey: number;
};
