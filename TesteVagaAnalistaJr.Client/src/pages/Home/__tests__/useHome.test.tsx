import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Home from '../Home';

const handleSearchMock = vi.fn();

describe('useHome', () => {
    vi.mock('../useHome', () => ({
        __esModule: true,
        default: vi.fn(() => ({
            companies: [],
            currentFilter: 'Todos',
            handleChangeCurrentFilter: vi.fn(),
            redirectTo: vi.fn(),
            CNPJFormat: vi.fn(),
            handleSearch: handleSearchMock,
            companiesFiltered: [],
        })),
    }));

    it('changing the value of must call the function present in the handler', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/home']}>
                <Home />
            </MemoryRouter>,
        );

        const input = getByRole('search-input');

        fireEvent.change(input, { target: { value: 'search term' } });

        // Verificar se a função handleSearch foi chamada corretamente
        expect(handleSearchMock).toHaveBeenCalled();
        expect(handleSearchMock).toHaveBeenCalledWith('search term');
    });
});
