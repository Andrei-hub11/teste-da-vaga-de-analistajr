import { describe, expect, it } from 'vitest';

import { CNPJFormat } from '../CNPJFormat';

describe('CNPJFormat', () => {
    it('throws an Error if invalid cnpj', () => {
        expect(() => {
            CNPJFormat('004040220');
        }).toThrowError('Esse cnpj não está no formato esperado');
    });

    it('return a string and expected format if valid cnpj', () => {
        const result = CNPJFormat('12345678911212');

        expect(typeof result).toBe('string');
        expect(result).toBe('12.345.678/9112-12');
    });
});
