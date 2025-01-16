import { TableauType } from "../types/tableau";

const macro: TableauType[] = [
    {
        title: "Forest Jewel",
        position: [-6, 3, -4.9],
        texture: "/photos/macro/1.jpg",
        description:
            "close-up of a butterfly resting on a sunlit leaf, its intricate wing patterns blending earthy browns and vibrant yellows",
    },
    {
        title: "Nature’s Minimalism",
        position: [0, 3, -4.9],
        texture: "/photos/macro/2.jpg",
        description: "A single stalk of grass",
    },
    {
        title: "A Busy Bumblebee",
        position: [4, 3, -4.9],
        texture: "/photos/macro/3.jpg",
        description:
            "A vibrant orange and black bumblebee delicately clings to budding green flora, immersed in its pollination ritual",
    },
    {
        title: "Intricate Spiral",
        position: [-6, -2, -4.9],
        texture: "/photos/macro/4.jpg",
        description:
            "A close-up shot of a delicate snail shell, highlighting its intricate spiral pattern",
    },
    {
        title: "The Window to the Soul",
        position: [2, -1, -4.9],
        texture: "/photos/macro/5.jpg",
        description:
            "A captivating macro shot of an eye, revealing the intricate golden and amber hues of the iris contrasted by deep veins in the sclera",
    },
];

const urbex: TableauType[] = [
    {
        title: "Stairway to Forgotten Stories",
        position: [-6, 3, -4.9],
        texture: "/photos/urbex/1.jpg",
    },
    {
        title: "Forgotten Artistry in Decay",
        position: [0, 3, -4.9],
        texture: "/photos/urbex/2.jpg",
        description: "Inside a crumbling, abandoned room",
    },
    {
        title: "Urban Starry Night",
        position: [4, 3, -4.9],
        texture: "/photos/urbex/3.jpg",
        description:
            "A vibrant mural inspired by Van Gogh’s Starry Night brings life to an abandoned building",
    },
    {
        title: "Whiskers in the Wreckage",
        position: [-6, -2, -4.9],
        texture: "/photos/urbex/4.jpg",
        description:
            "An abandoned room, its decaying walls and graffiti tell stories of neglect and creativity",
    },
];

const people: TableauType[] = [
    {
        title: "A Shared Moment of Connection",
        position: [-6, 3, -4.9],
        texture: "/photos/people/1.jpg",
        description:
            "An intimate street scene capturing two elderly men sharing a moment of connection as they navigate a phone together",
    },
    {
        title: "Little Wanderer",
        position: [0, 3, -4.9],
        texture: "/photos/people/2.jpg",
        description:
            "A young student, adorned in purple, walks confidently with her vibrant randoseru backpack",
    },
    {
        title: "Crossing Together",
        position: [4, 3, -4.9],
        texture: "/photos/people/3.jpg",
        description:
            "An elderly man gently pushes a wheelchair-bound woman across train tracks in a quiet, residential area",
    },
    {
        title: "A Moment of Pure Serenity",
        position: [-6, -2, -4.9],
        texture: "/photos/people/4.jpg",
        description:
            "A man and his Shiba Inu share a peaceful moment on a bench",
    },
    {
        title: "In Motion",
        position: [3, 0, -4.9],
        texture: "/photos/people/5.jpg",
        description:
            "A candid moment of a child in a red shirt running joyfully down a quiet urban street",
    },
];

const animals: TableauType[] = [
    {
        title: "Contemplation Above the City",
        position: [-6, 3, -4.9],
        texture: "/photos/animals/1.jpg",
        description:
            "A contemplative Japanese macaque sits calmly against a backdrop of distant mountains and a sprawling cityscape, creating a beautiful contrast between wildlife and human civilization",
    },
    {
        title: "Buckingham Horse",
        position: [0, 3, -4.9],
        texture: "/photos/animals/2.jpg",
        description: "A majestic horse in front of Buckingham Palace",
    },
    {
        title: "Curious Cat in the Sun",
        position: [4, 3, -4.9],
        texture: "/photos/animals/3.jpg",
        description:
            "A curious cat standing on a wooden path, bathed in sunlight",
    },
    {
        title: "Vivid Companions",
        position: [-6, -2, -4.9],
        texture: "/photos/animals/4.jpg",
        description:
            "Two vibrantly colored macaws perch together on a thick rope against a brilliant blue sky",
    },
    {
        title: "Forest Guardian",
        position: [0, -2, -4.9],
        texture: "/photos/animals/5.jpg",
        description:
            "A proud and vigilant French Bulldog standing amidst a serene forest floor, blanketed with pine needles and cones",
    },
    {
        title: "Urban Explorer",
        position: [6, -2, -4.9],
        texture: "/photos/animals/6.jpg",
        description:
            "A joyful Chihuahua enjoying a ride in a custom backpack, tongue out and ears perked up, radiating happiness",
    },
];

const architecture: TableauType[] = [
    {
        title: "Majestic Castle Under the Sky",
        position: [-6, 3, -4.9],
        texture: "/photos/architecture/1.jpg",
        description:
            "Discover the architectural beauty of a historic Japanese castle juxtaposed against a modern sky. an airplane soars, blending the past and present in a single frame",
    },
    {
        title: "Urban Calm",
        position: [0, 3, -4.9],
        texture: "/photos/architecture/2.jpg",
        description:
            "A quiet street in Japan, lined with apartment buildings and crisscrossing power lines",
    },
    {
        title: "The Purple Line to Arashiyama",
        position: [4, 3, -4.9],
        texture: "/photos/architecture/3.jpg",
        description:
            "A charming purple tram prepares to depart toward the scenic Arashiyama area",
    },
    {
        title: "Tranquility Amidst the Clouds",
        position: [-6, -2, -4.9],
        texture: "/photos/architecture/4.jpg",
        description:
            "A traditional Japanese pagoda rises gracefully against a dramatic backdrop of rolling mountains and billowing clouds",
    },
    {
        title: "Bridge of Golden Reflections",
        position: [0, -2, -4.9],
        texture: "/photos/architecture/5.jpg",
        description:
            "Under the serene darkness of the night, a gracefully arched bridge is illuminated by warm, golden lights",
    },
    {
        title: "Tangled Streets of Tokyo",
        position: [6, -2, -4.9],
        texture: "/photos/architecture/6.jpg",
        description:
            "A quiet alleyway in Tokyo reveals the intricate network of power lines crisscrossing overhead, a signature sight in many Japanese urban areas",
    },
];

export const tableauxData: {
    macro: TableauType[];
    urbex: TableauType[];
    architecture: TableauType[];
    people: TableauType[];
    animals: TableauType[];
} = {
    macro,
    urbex,
    architecture,
    people,
    animals,
};