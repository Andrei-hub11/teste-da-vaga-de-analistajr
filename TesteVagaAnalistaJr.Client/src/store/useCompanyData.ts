import { create } from 'zustand';

import { Company, CompanyDataStore } from '../types';

const useCompanyData = create<CompanyDataStore>((set) => ({
    companyEditableItem: null,
    companies: [],
    setCompanyEditableItem: (company: Company) =>
        set({ companyEditableItem: company }),
    setCompanyData: (company: Company) =>
        set((state) => ({ companies: [...state.companies, company] })),
    setCompaniesData: (companies: Company[]) => set({ companies: companies }),
    removeCompanyById: (id: string) =>
        set((state) => ({
            companies: state.companies.filter((company) => company.Id !== id),
        })),
    resetCompanyEditableItem: () => set({ companyEditableItem: null }),
}));

export default useCompanyData;
