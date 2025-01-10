export const setCursor = (state: "pointer" | "default") => {
    document.body.classList.toggle("cursor-pointer", state === "pointer");
    document.body.classList.toggle("cursor-default", state === "default");
};
