import { useRef } from 'react';

import { useDataService } from '../../services/services';
import { RegisterCompany } from '../../types';
import useRedirect from '../../utils/useRedirect';

const useAdd = () => {
    const { redirectTo } = useRedirect();
    const { registerNewCompany } = useDataService();
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleAddCompanyAction = (company: RegisterCompany) => {
        registerNewCompany(company);
        redirectTo('/home');
    };

    const handleFormSubmit = () => {
        if (btnRef) {
            btnRef.current?.click();
        }
    };

    return { redirectTo, handleAddCompanyAction, handleFormSubmit, btnRef };
};

export default useAdd;
