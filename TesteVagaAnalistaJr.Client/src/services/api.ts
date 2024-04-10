import { toast } from 'react-toastify';

import { CompanyEditable, RegisterCompany } from '../types';

export const fetchData = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/companies');
    if (!response.ok) {
        toast.error('falha ao buscar dados');
    }
    return response.json();
};

export const registerCompany = async (company: RegisterCompany) => {
    const response = await fetch(
        import.meta.env.VITE_API_URL + '/create-company',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(company),
        },
    );

    if (!response.ok) {
        const errorMessage = await response.json();
        toast.error(errorMessage.message);
    }
    return response.json();
};

export const updateCompany = async (company: CompanyEditable) => {
    const response = await fetch(
        import.meta.env.VITE_API_URL + '/update-company',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(company),
        },
    );

    if (!response.ok) {
        const errorMessage = await response.json();
        toast.error(errorMessage.message);
    }
    return response.json();
};

export const deleteCompany = async (id: string) => {
    const response = await fetch(
        import.meta.env.VITE_API_URL + `/delete-company/${id}`,
        {
            method: 'DELETE',
        },
    );

    if (!response.ok) {
        const errorMessage = await response.json();
        toast.error(errorMessage.message);
    }

    return true;
};
