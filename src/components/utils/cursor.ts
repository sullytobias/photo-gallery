export const setCursor = (state: "pointer" | "grab") => {
    document.body.classList.toggle("cursor-pointer", state === "pointer");
    document.body.classList.toggle("cursor-grab", state === "grab");
};
