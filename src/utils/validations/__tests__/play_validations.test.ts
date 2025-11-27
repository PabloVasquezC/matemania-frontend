import play_validations from '../play_validations';
import type { ITile } from 'types/ITile';

describe('play_validations', () => {
    const createTile = (value: string, points: number = 1): ITile => ({
        id: Math.random().toString(36).substring(7),
        value,
        points,
        bgColor: 'bg-slate-100'
    });

    describe('Boundary Value Analysis', () => {
        it('should return invalid for empty tiles', () => {
            const result = play_validations([]);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('La expresión no contiene un signo de igual.');
        });

        it('should handle single tile expression (invalid)', () => {
            const tiles = [createTile('=')];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(false);
            // Expected result part would be empty string which Number("") is 0.
            // "=".split('=') -> ["", ""]
            // eval("") is undefined.
            // This might throw or return false.
            // Based on code:
            // equalsIndex = 0.
            // operationPart = "".
            // expectedResultPart = "".
            // Number("") is 0.
            // eval("") -> undefined.
            // undefined === 0 -> false.
        });
    });

    describe('Equivalence Partitioning', () => {
        it('should validate a correct simple addition', () => {
            const tiles = [
                createTile('2'),
                createTile('+'),
                createTile('2'),
                createTile('='),
                createTile('4')
            ];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(true);
            expect(result.totalPoints).toBe(5);
            expect(result.error).toBeNull();
        });

        it('should invalidate an incorrect addition', () => {
            const tiles = [
                createTile('2'),
                createTile('+'),
                createTile('2'),
                createTile('='),
                createTile('5')
            ];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('El resultado de la operación no coincide con el resultado esperado.');
        });

        it('should invalidate expression without equals sign', () => {
            const tiles = [
                createTile('2'),
                createTile('+'),
                createTile('2')
            ];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('La expresión no contiene un signo de igual.');
        });

        it('should invalidate if expected result is not a number', () => {
            const tiles = [
                createTile('2'),
                createTile('+'),
                createTile('2'),
                createTile('='),
                createTile('a')
            ];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('El resultado esperado no es un número.');
        });

        it('should handle syntax errors gracefully', () => {
            // Suppress expected console.error output
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            
            const tiles = [
                createTile('2'),
                createTile('+'),
                createTile('+'), // Syntax error
                createTile('='),
                createTile('4')
            ];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Error de sintaxis en la expresión matemática.');
            
            // Restore console.error
            consoleErrorSpy.mockRestore();
        });
    });

    describe('White Box / Path Coverage', () => {
        it('should calculate total points correctly', () => {
             const tiles = [
                createTile('1', 10),
                createTile('=', 5),
                createTile('1', 10)
            ];
            const result = play_validations(tiles);
            expect(result.isValid).toBe(true);
            expect(result.totalPoints).toBe(25);
        });
    });
});
