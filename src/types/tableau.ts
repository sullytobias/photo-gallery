export type TableauType = {
    title: string;
    description?: string;
    position: [number, number, number];
    texture?: string;
};

export type TableauProps = {
    title: string;
    description?: string;
    position: [number, number, number];
    size?: [number, number];
    texture?: string;
    handleClick: (position: [number, number, number], sound?: boolean) => void;
    handleEtiquetteClick: (index: number) => void;
    isFocused: boolean;
    tableauKey: number;
};
