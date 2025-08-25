import type { ITile } from '../types/ITile';



interface PlayResult {
    isValid: boolean,
    result: number | null,
    expectedResult?: number | null,
    error?: string | null,
    totalPoints: number 
}

export default function play_validations(tiles: ITile[]): PlayResult {
    // Une los valores de las fichas para formar una cadena.
    const fullExpression = tiles.map(tile => tile.value).join('');

    // Busca el índice del operador de igualdad.
    const equalsIndex = fullExpression.indexOf('=');

    // Si no hay un '=' en la expresión, la considera inválida.
    if (equalsIndex === -1) {
        return { isValid: false, result: null, totalPoints: 0, error: 'La expresión no contiene un signo de igual.' };
    }

    // Separa la expresión en la parte de la operación y el resultado esperado.
    const operationPart = fullExpression.substring(0, equalsIndex);
    const expectedResultPart = fullExpression.substring(equalsIndex + 1);

    // Si el resultado esperado no es un número, la considera inválida.
    if (isNaN(Number(expectedResultPart))) {
        return { isValid: false, result: null, totalPoints: 0, error: 'El resultado esperado no es un número.' };
    }

    try {
        // Usa `eval` para calcular el resultado de la operación.
        const calculatedResult = eval(operationPart);
        const expectedResult = Number(expectedResultPart);

        // Compara el resultado calculado con el resultado esperado.
        const isValid = calculatedResult === expectedResult;

        // Calcula los puntos totales de las fichas.
        const totalPoints = tiles.reduce((acc, tile) => acc + tile.points, 0);

        return {
            isValid,
            result: calculatedResult,
            expectedResult,
            totalPoints,
            error: isValid ? null : 'El resultado de la operación no coincide con el resultado esperado.'
        };
    } catch (error) {
        console.error('Error al evaluar la expresión:', error);
        return { isValid: false, result: null, totalPoints: 0, error: 'Error de sintaxis en la expresión matemática.' };
    }
}


