import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import useCompanyData from '../store/useCompanyData';
import { Company, CompanyEditable, RegisterCompany } from '../types';
import {
    deleteCompany,
    fetchData,
    registerCompany,
    updateCompany,
} from './api';

export const useDataService = () => {
    const { companies, setCompaniesData, setCompanyData, removeCompanyById } =
        useCompanyData();

    const queryClient = useQueryClient();

    const { isLoading, isError, error } = useQuery('data', fetchData, {
        onSuccess: (data: Company[]) => setCompaniesData(data),
    });

    const registerCompanyMutation = useMutation(registerCompany, {
        onSuccess: (company: Company) => setCompanyData(company),
    });

    const registerNewCompany = async (newData: RegisterCompany) => {
        try {
            await registerCompanyMutation.mutateAsync(newData);
            toast.success('Empresa adicionada com sucesso.');
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const updateCompanyMutation = useMutation(updateCompany, {
        onSuccess: async () => {
            // Invalida dados antigos e força a busca de dados atualizados
            await queryClient.invalidateQueries('data');
        },
    });

    const updateCompanyItem = async (updatedData: CompanyEditable) => {
        try {
            await updateCompanyMutation.mutateAsync(updatedData);

            toast.success('Item atualizado com sucesso.');
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const deleteCompanyMutation = useMutation(deleteCompany);

    const deleteCompanyById = async (id: string) => {
        try {
            await deleteCompanyMutation.mutateAsync(id);
            removeCompanyById(id);
            toast.success('Item deletado com sucesso.');
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return {
        companies,
        isLoading,
        isError,
        error,
        registerNewCompany,
        updateCompanyItem,
        deleteCompanyById,
    };
};
