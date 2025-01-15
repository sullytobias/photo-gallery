import { CSSProperties } from "react";
import { useMediaQuery } from "react-responsive";
import { SoundContextType } from "../../types/soundContext";

const SoundElements = ({
    isBackgroundPlaying,
    toggleBackgroundSound,
    isFxPlaying,
    toggleFxSound,
}: SoundContextType) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });

    const buttonStyles = {
        common: {
            padding: "10px 15px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
        } as CSSProperties,

        container: isSmallScreen
            ? ({
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "10px",
              } as CSSProperties)
            : undefined,

        background: {
            position: isSmallScreen ? "static" : "absolute",
            top: isSmallScreen ? undefined : "20px",
            right: isSmallScreen ? undefined : "20px",
            backgroundColor: isBackgroundPlaying ? "#4caf50" : "#f44336",
        } as CSSProperties,

        fx: {
            position: isSmallScreen ? "static" : "absolute",
            top: isSmallScreen ? undefined : "80px",
            right: isSmallScreen ? undefined : "20px",
            backgroundColor: isFxPlaying ? "#4caf50" : "#f44336",
        } as CSSProperties,
    };

    return (
        <div style={buttonStyles.container}>
            <button
                style={{
                    ...buttonStyles.common,
                    ...buttonStyles.background,
                }}
                onClick={toggleBackgroundSound}
            >
                {isBackgroundPlaying ? "Music: On" : "Music: Off"}
            </button>

            <button
                style={{
                    ...buttonStyles.common,
                    ...buttonStyles.fx,
                }}
                onClick={toggleFxSound}
            >
                {isFxPlaying ? "Fx: On" : "Fx: Off"}
            </button>
        </div>
    );
};

export default SoundElements;
