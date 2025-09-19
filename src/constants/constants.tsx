import type { ITile } from "../types/ITile";

export const OPERATORS = {
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
    EQUALS: '=',
    SQRT: '√',
    POW: '^',
    PI: 'π',
    E: 'e',
    INFINITY: '∞',
};

export const TILES_COLORS = {
    OPERATOR: 'bg-red-300',
    NUMBER: 'bg-amber-200',
    EQUAL: 'bg-green-500',
};

export const TILES_POINTS = {
    '=': 0,
    '<': 1,
    '>': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    '√': 4,
    '^': 4,
    'π': 5,
    'e': 5,
    '∞': 6,
    '0': 1,
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
    '7': 1,
    '8': 1,
    '9': 1,
};

export const navigation = [
    { name: 'Inicio', path: '/' },
    { name: 'Jugar', path: '/game' },
    { name: 'Acerca de', path: '/about' },
    { name: 'Configuraciones', path: '/settings' },
    { name: 'Perfil', path: '/profile' },
    { name: 'Ranking', path: '/ranking' },
    { name: 'Notificaciones', path: '/notifications' },
];


export const TILES: ITile[] =[
    {
    id: '18271873874',
    value: OPERATORS.ADD,
    points: TILES_POINTS["+"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873875',
    value: OPERATORS.SUBTRACT,
    points: TILES_POINTS["-"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873876',
    value: OPERATORS.MULTIPLY,
    points: TILES_POINTS["*"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873877',
    value: OPERATORS.DIVIDE,
    points: TILES_POINTS["/"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873878',
    value: OPERATORS.EQUALS,
    points: TILES_POINTS["="],
    bgColor: TILES_COLORS.EQUAL,
    },
    {
    id: '18271873879',
    value: OPERATORS.SQRT,
    points: TILES_POINTS["√"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873880',
    value: OPERATORS.POW,
    points: TILES_POINTS["^"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873881',
    value: OPERATORS.PI,
    points: TILES_POINTS["π"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873882',
    value: OPERATORS.E,
    points: TILES_POINTS["e"],
    bgColor: TILES_COLORS.OPERATOR,
    },
    {
    id: '18271873883',
    value: OPERATORS.INFINITY,
    points: TILES_POINTS["∞"],
    bgColor: TILES_COLORS.OPERATOR,
    },

    {
    id: '18271873884',
    value: 0,
    points: TILES_POINTS["0"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873885',
    value: 1,
    points: TILES_POINTS["1"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873886',
    value: 2,
    points: TILES_POINTS["2"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873887',
    value: 3,
    points: TILES_POINTS["3"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873888',
    value: 4,
    points: TILES_POINTS["4"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873889',
    value: 5,
    points: TILES_POINTS["5"],
    bgColor: TILES_COLORS.NUMBER,   
    },
    {
    id: '18271873890',
    value: 6,
    points: TILES_POINTS["6"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873891',
    value: 7,
    points: TILES_POINTS["7"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873892',
    value: 8,
    points: TILES_POINTS["8"],
    bgColor: TILES_COLORS.NUMBER,
    },
    {
    id: '18271873893',
    value: 9,
    points: TILES_POINTS["9"],
    bgColor: TILES_COLORS.NUMBER,
    },
]

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/";
export { API_URL };