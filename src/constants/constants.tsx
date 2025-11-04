export const OPERATORS = {
  // Versión Matemática (Base)
  "matematico": {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    EQUALS: "=",
    SQRT: "√",
    POW: "^",
    PI: "π",
    E: "e",
    INFINITY: "∞",
  },
  // ⭐️ Versión Científica: Funciones y notación
  "cientifico": {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    EQUALS: "=",
    SIN: "sin",
    COS: "cos",
    TAN: "tan",
    LOG: "log",
    E_NOTATION: "E", // Para notación científica
    COMMA: ".",     // Separador decimal
  },
  // ⭐️ Versión Sonora: Acciones y notas musicales
  "sonoro": {
    PLAY: "▶",     // Play/Inicio
    STOP: "■",     // Stop
    LOOP: "⟲",     // Loop
    NOTE_C: "C4",
    NOTE_D: "D4",
    NOTE_E: "E4",
    VOLUME_UP: "🔊+",
    VOLUME_DOWN: "🔊-",
  },
  // Versión Visual/Color: Nombres de color descriptivos
  "visual": {
    RED: "Red",
    BLUE: "Blue",
    GREEN: "Green",
    YELLOW: "Yellow",
    PURPLE: "Purple",
    ORANGE: "Orange",
  },
};

export const TILES_COLORS = {
  "matematico": {
    OPERATOR: "bg-indigo-300",
    NUMBER: "bg-yellow-300",
    EQUAL: "bg-green-300",
  },
  // ⭐️ Colores visuales con clases más intensas
  "visual": {
    "Red" : "bg-red-500",
    "Blue": "bg-blue-500",
    "Green": "bg-green-500",
    "Yellow": "bg-yellow-500",
    "Purple": "bg-purple-500",
    "Orange": "bg-orange-500",
  },
  // ⭐️ Colores sonoros (clasificación por tipo de ficha)
  "sonoro": {
    ACTION: "bg-red-300",   // Fichas de acción (Play, Stop, Loop)
    NOTE: "bg-blue-300",    // Fichas de notas musicales
    MODIFIER: "bg-yellow-300", // Fichas de volumen/modificadores
  },
  // ⭐️ Colores científicos (funciones y notación)
  "cientifico": {
    OPERATOR: "bg-gray-300",
    FUNCTION: "bg-cyan-500", // Funciones (sin, cos, log)
    NUMBER: "bg-white",
    EQUAL: "bg-black",
    NOTATION: "bg-purple-300", // Notación científica o separador
  },
};


export const TILES_POINTS = {
  // Puntos Matemáticos (Existentes)
  "=": 0, "<": 1, ">": 1, "+": 2, "-": 2, "*": 3, "/": 3, "√": 4, "^": 4, "π": 5, "e": 5, "∞": 6,
  "0": 1, "1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1, "9": 1,
  
  // ⭐️ Puntos Científicos (Nuevos)
  "sin": 5, "cos": 5, "tan": 5, "log": 6, "E": 3, ".": 1,
  
  // ⭐️ Puntos Sonoros (Nuevos)
  "▶": 3, "■": 2, "⟲": 4, "C4": 2, "D4": 2, "E4": 2, "🔊+": 3, "🔊-": 3,

  // ⭐️ Puntos Visuales/Color
  "Red": 1, "Blue": 1, "Green": 1, "Yellow": 1, "Purple": 1, "Orange": 1,
};

// ... navigation y API_URL permanecen iguales
export const navigation = [
  { name: "Inicio", path: "/" },
  { name: "Jugar", path: "/game" },
  { name: "Acerca de", path: "/about" },
  { name: "Configuraciones", path: "/settings" },
  { name: "Perfil", path: "/profile" },
  { name: "Ranking", path: "/ranking" },
  { name: "Notificaciones", path: "/notifications" },
];

const API_URL = "https://api.matemania.cl/";
export { API_URL };

// Definición básica de la interfaz ITile para que TypeScript no arroje errores
export interface ITile {
  id: string;
  value: string | number | null;
  points: number;
  bgColor: string;
}

// ⭐️ FUNCIÓN AUXILIAR PARA GENERAR FICHAS FÁCILMENTE
// Usa Date.now() y Math.random() para generar un ID único, ya que TILES debe tener IDs únicos.
const createTile = (value: string | number | null, points: number, bgColor: string): ITile => ({
  id: `${value}-${Date.now()}-${Math.random()}`, 
  value,
  points,
  bgColor,
});

// ⭐️ Generador eficiente de números de 0 a 9
const generateNumberTiles = (color: string, pointsMap: typeof TILES_POINTS) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => 
        createTile(num, pointsMap[String(num) as keyof typeof pointsMap], color)
    );
}

// --- FICHAS FINALES (TILES) ---
export const TILES = {
  // ⭐️ Versión Matemática (Optimización de la lista original)
  "matematico": [
    // Operadores
    createTile(OPERATORS.matematico.ADD, TILES_POINTS["+"], TILES_COLORS.matematico.OPERATOR),
    createTile(OPERATORS.matematico.SUBTRACT, TILES_POINTS["-"], TILES_COLORS.matematico.OPERATOR),
    createTile(OPERATORS.matematico.MULTIPLY, TILES_POINTS["*"], TILES_COLORS.matematico.OPERATOR),
    createTile(OPERATORS.matematico.DIVIDE, TILES_POINTS["/"], TILES_COLORS.matematico.OPERATOR),
    createTile(OPERATORS.matematico.EQUALS, TILES_POINTS["="], TILES_COLORS.matematico.EQUAL),
    // Números
    ...generateNumberTiles(TILES_COLORS.matematico.NUMBER, TILES_POINTS),
  ],
  
  // ⭐️ Versión Científica (Fichas extendidas)
  "cientifico": [
    // Operadores Básicos (Reutilizados, pero con color científico)
    createTile(OPERATORS.cientifico.ADD, TILES_POINTS["+"], TILES_COLORS.cientifico.OPERATOR),
    createTile(OPERATORS.cientifico.MULTIPLY, TILES_POINTS["*"], TILES_COLORS.cientifico.OPERATOR),
    createTile(OPERATORS.cientifico.EQUALS, TILES_POINTS["="], TILES_COLORS.cientifico.EQUAL),
    // Funciones
    createTile(OPERATORS.cientifico.SIN, TILES_POINTS.sin, TILES_COLORS.cientifico.FUNCTION),
    createTile(OPERATORS.cientifico.LOG, TILES_POINTS.log, TILES_COLORS.cientifico.FUNCTION),
    // Números y Notación
    ...generateNumberTiles(TILES_COLORS.cientifico.NUMBER, TILES_POINTS),
    createTile(OPERATORS.cientifico.E_NOTATION, TILES_POINTS.E, TILES_COLORS.cientifico.NOTATION),
    createTile(OPERATORS.cientifico.COMMA, TILES_POINTS["."], TILES_COLORS.cientifico.NOTATION),
  ],

  // ⭐️ Versión Sonora (Fichas con valores para representar comandos/notas)
  "sonoro": [
    // Acciones (ACTION)
    createTile(OPERATORS.sonoro.PLAY, TILES_POINTS["▶"], TILES_COLORS.sonoro.ACTION),
    createTile(OPERATORS.sonoro.LOOP, TILES_POINTS["⟲"], TILES_COLORS.sonoro.ACTION),
    createTile(OPERATORS.sonoro.STOP, TILES_POINTS["■"], TILES_COLORS.sonoro.ACTION),
    // Notas Musicales (NOTE)
    createTile(OPERATORS.sonoro.NOTE_C, TILES_POINTS.C4, TILES_COLORS.sonoro.NOTE),
    createTile(OPERATORS.sonoro.NOTE_D, TILES_POINTS.D4, TILES_COLORS.sonoro.NOTE),
    createTile(OPERATORS.sonoro.NOTE_E, TILES_POINTS.E4, TILES_COLORS.sonoro.NOTE),
    // Modificadores (MODIFIER)
    createTile(OPERATORS.sonoro.VOLUME_UP, TILES_POINTS["🔊+"], TILES_COLORS.sonoro.MODIFIER),
    createTile(OPERATORS.sonoro.VOLUME_DOWN, TILES_POINTS["🔊-"], TILES_COLORS.sonoro.MODIFIER),
  ],

  // ⭐️ Versión Visual/Color (Fichas simples de color)
  "visual": [
    createTile(OPERATORS.visual.RED, TILES_POINTS.Red, TILES_COLORS.visual.Red),
    createTile(OPERATORS.visual.BLUE, TILES_POINTS.Blue, TILES_COLORS.visual.Blue),
    createTile(OPERATORS.visual.GREEN, TILES_POINTS.Green, TILES_COLORS.visual.Green),
    createTile(OPERATORS.visual.YELLOW, TILES_POINTS.Yellow, TILES_COLORS.visual.Yellow),
    createTile(OPERATORS.visual.PURPLE, TILES_POINTS.Purple, TILES_COLORS.visual.Purple),
    createTile(OPERATORS.visual.ORANGE, TILES_POINTS.Orange, TILES_COLORS.visual.Orange),
  ],
};