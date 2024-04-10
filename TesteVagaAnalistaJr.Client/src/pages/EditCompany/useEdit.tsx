import { useRef } from 'react';

import { useDataService } from '../../services/services';
import useCompanyData from '../../store/useCompanyData';
import { CompanyEditable } from '../../types';
import useRedirect from '../../utils/useRedirect';

const useEdit = () => {
    const { redirectTo } = useRedirect();
    const { updateCompanyItem } = useDataService();
    const { companyEditableItem, resetCompanyEditableItem } = useCompanyData();
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleEditCompanyAction = (company: CompanyEditable) => {
        updateCompanyItem(company);
        resetCompanyEditableItem();
        redirectTo('/home');
    };

    const handleFormSubmit = () => {
        if (btnRef) {
            btnRef.current?.click();
        }
    };

    return {
        redirectTo,
        handleEditCompanyAction,
        handleFormSubmit,
        companyEditableItem,
        btnRef,
    };
};

export default useEdit;
