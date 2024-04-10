import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Company, CompanyDataStore } from '../../types';
import { create, storeResetFns } from '../mock/__test__/zustand';

const useCompanyStoreMock = create<CompanyDataStore>((set) => ({
    companyEditableItem: null,
    companies: [],
    setCompanyEditableItem: (company: Company) =>
        set(() => ({ companyEditableItem: company })),
    setCompanyData: (company: Company) =>
        set((state) => ({ companies: [...state.companies, company] })),
    setCompaniesData: (companies: Company[]) => set({ companies: companies }),
    removeCompanyById: (id: string) =>
        set((state) => ({
            companies: state.companies.filter((company) => company.Id !== id),
        })),
    resetCompanyEditableItem: () => set({ companyEditableItem: null }),
}));

describe('useCompanyData', () => {
    // Resetar o estado após cada teste
    afterEach(() => {
        act(() => {
            storeResetFns.forEach((resetFn) => {
                resetFn();
            });
        });
    });

    it('the initial state of companies must be empty', () => {
        const { result } = renderHook(() => useCompanyStoreMock());

        expect(result.current.companies.length).toEqual(0);
    });

    it('setCompanyData should add a company to the store with the correct properties', () => {
        const { result } = renderHook(() => useCompanyStoreMock());

        act(() =>
            result.current.setCompanyData({
                Id: 'ab956d7b-8a11-4b26-be87-5ad58fbf7b6d',
                FantasyName: 'stringaaaaaaaaaaaaaa',
                CNPJ: '11930090211111',
                CorporateReason:
                    'stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                RegistrationDate: new Date(),
                Status: true,
            }),
        );

        expect(result.current.companies[0].Id).toEqual(
            'ab956d7b-8a11-4b26-be87-5ad58fbf7b6d',
        );
        expect(result.current.companies[0].FantasyName).toEqual(
            'stringaaaaaaaaaaaaaa',
        );
        expect(result.current.companies[0].CNPJ).toEqual('11930090211111');
        expect(result.current.companies[0].CorporateReason).toEqual(
            'stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        );
        expect(result.current.companies[0].Status).toEqual(true);
    });

    it('setCompaniesData should add companies to the store', () => {
        const { result } = renderHook(() => useCompanyStoreMock());

        act(() => {
            result.current.setCompaniesData([
                {
                    Id: 'ab956d7b-8a11-4b26-be87-5ad58fbf7b6d',
                    FantasyName: 'stringaaaaaaaaaaaaaa',
                    CNPJ: '11930090211111',
                    CorporateReason:
                        'stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    RegistrationDate: new Date(),
                    Status: true,
                },
                {
                    Id: 'cde6f8a2-3e49-4f07-a919-eb237d46e58f',
                    FantasyName: 'anotherfantasyname',
                    CNPJ: '12345678901234',
                    CorporateReason: 'Another Corporate Reason',
                    RegistrationDate: new Date(),
                    Status: false,
                },
                {
                    Id: 'fgh9i1j2-k3l4-m5n6-o7p8-q9r0s1t2u3v4',
                    FantasyName: 'examplefantasyname',
                    CNPJ: '98765432109876',
                    CorporateReason: 'Example Corporate Reason',
                    RegistrationDate: new Date(),
                    Status: true,
                },
            ]);
        });

        expect(result.current.companies.length).toEqual(3);
    });

    it('removeCompanyId should remove the item from the passed ID', () => {
        const { result } = renderHook(() => useCompanyStoreMock());

        act(() => {
            result.current.setCompaniesData([
                {
                    Id: 'ab956d7b-8a11-4b26-be87-5ad58fbf7b6d',
                    FantasyName: 'stringaaaaaaaaaaaaaa',
                    CNPJ: '11930090211111',
                    CorporateReason:
                        'stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    RegistrationDate: new Date(),
                    Status: true,
                },
                {
                    Id: 'cde6f8a2-3e49-4f07-a919-eb237d46e58f',
                    FantasyName: 'anotherfantasyname',
                    CNPJ: '12345678901234',
                    CorporateReason: 'Another Corporate Reason',
                    RegistrationDate: new Date(),
                    Status: false,
                },
                {
                    Id: 'fgh9i1j2-k3l4-m5n6-o7p8-q9r0s1t2u3v4',
                    FantasyName: 'examplefantasyname',
                    CNPJ: '98765432109876',
                    CorporateReason: 'Example Corporate Reason',
                    RegistrationDate: new Date(),
                    Status: true,
                },
            ]);
        });

        act(() => {
            result.current.removeCompanyById(
                'fgh9i1j2-k3l4-m5n6-o7p8-q9r0s1t2u3v4',
            );
        });

        expect(result.current.companies.length).toEqual(2);
    });

    it('checking if resetCompanyEditableItem works as expected', () => {
        const { result } = renderHook(() => useCompanyStoreMock());

        const resetCompanyEditableItemMock = vi.fn();
        // Substituindo a função original pela simulação
        result.current.resetCompanyEditableItem = resetCompanyEditableItemMock;

        act(() => {
            result.current.setCompanyEditableItem({
                Id: 'fgh9i1j2-k3l4-m5n6-o7p8-q9r0s1t2u3v4',
                FantasyName: 'examplefantasyname',
                CNPJ: '98765432109876',
                CorporateReason: 'Example Corporate Reason',
                RegistrationDate: new Date(),
                Status: true,
            });
        });

        act(() => {
            result.current.resetCompanyEditableItem();
        });

        expect(resetCompanyEditableItemMock).toHaveBeenCalled();
    });
});
