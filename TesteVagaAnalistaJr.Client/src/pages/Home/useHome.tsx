import { useMemo, useState } from 'react';

import { useDataService } from '../../services/services';
import useCompanyData from '../../store/useCompanyData';
import { Company, OptionsFilter } from '../../types';
import { CNPJFormat } from '../../utils/CNPJFormat';
import useRedirect from '../../utils/useRedirect';

const useHome = () => {
    const { redirectTo } = useRedirect();
    const { companies, deleteCompanyById } = useDataService();
    const { setCompanyEditableItem } = useCompanyData();

    const [currentFilter, setCurrentFilter] = useState<OptionsFilter>('Todos');
    const [searchTerm, setCurrentSearchTerm] = useState<string>('');
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
    const [idItemToDelete, setIdItemToDelete] = useState<string>('');

    const handleChangeCurrentFilter = (newFilter: OptionsFilter) => {
        setCurrentFilter(newFilter);
    };

    const handleSearch = (search: string) => {
        setCurrentSearchTerm(search);
    };

    const handleDeleteMenu = (newState: boolean) => {
        setDeleteIsOpen(newState);
    };

    const handleItemToDelete = (id: string) => {
        setIdItemToDelete(id);
    };

    const handleDeleteItem = () => {
        if (idItemToDelete.length === 0) {
            return;
        }
        deleteCompanyById(idItemToDelete);
        setDeleteIsOpen(false);
    };

    const handleSetCompanyEditable = (company: Company) => {
        setCompanyEditableItem(company);
    };

    const companiesFiltered = useMemo(() => {
        if (currentFilter === 'Todos' && searchTerm.trim() === '') {
            return [];
        }

        if (currentFilter === 'Todos' && searchTerm.trim() !== '') {
            return companies.filter((company) =>
                company.FantasyName.toLowerCase().includes(
                    searchTerm.toLowerCase(),
                ),
            );
        }

        if (currentFilter === 'Ativos' && searchTerm.trim() === '') {
            return companies.filter((company) => company.Status === true);
        }

        if (currentFilter === 'Ativos' && searchTerm.trim() !== '') {
            return companies.filter(
                (company) =>
                    company.Status === true &&
                    company.FantasyName.toLowerCase().includes(
                        searchTerm.toLowerCase(),
                    ),
            );
        }

        if (currentFilter === 'Inativos' && searchTerm.trim() !== '') {
            return companies.filter(
                (company) =>
                    company.Status === false &&
                    company.FantasyName.toLowerCase().includes(
                        searchTerm.toLowerCase(),
                    ),
            );
        }

        return companies.filter((company) => company.Status === false);
    }, [searchTerm, currentFilter, companies]);

    return {
        redirectTo,
        companies,
        currentFilter,
        handleChangeCurrentFilter,
        CNPJFormat,
        handleSearch,
        handleDeleteMenu,
        handleItemToDelete,
        handleDeleteItem,
        handleSetCompanyEditable,
        companiesFiltered,
        deleteIsOpen,
    };
};

export default useHome;
