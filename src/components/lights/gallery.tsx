const GalleryLights = ({ lightOn }: { lightOn: boolean }) => {
    const positions: [number, number, number][] = lightOn
        ? [
              [0, 0, 0],
              [-5, 0, 0],
              [5, 0, 0],
          ]
        : [[0, 1.5, -4]];
    const intensity = lightOn ? 30 : 5;

    return (
        <>
            {positions.map((position, index) => (
                <pointLight
                    key={index}
                    position={position}
                    intensity={intensity}
                />
            ))}
        </>
    );
};

export default GalleryLights;