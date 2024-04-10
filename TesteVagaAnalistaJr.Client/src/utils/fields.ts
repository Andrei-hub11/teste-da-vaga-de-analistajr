import * as yup from 'yup';

import { Field } from '../types/index';

export const addCompany: Field[] = [
    {
        name: 'FantasyName',
        label: 'Nome Fantasia',
        validation: yup
            .string()
            .required('O Nome Fantasia é obrigatório')
            .min(20, 'O Nome Fantasia requer, no mínimo, 20 caracteres'),
    },
    {
        name: 'CNPJ',
        label: 'Adicione o CNPJ',
        validation: yup
            .string()
            .matches(/^[0-9]*$/, 'CNPJ deve conter apenas números')
            .min(14, 'Mínimo de 14 dígitos')
            .max(14, 'Máximo de 14 dígitos')
            .required('O CNPJ é obrigatório'),
    },
    {
        name: 'CorporateReason',
        label: 'Razão Social',
        validation: yup.string().required('O assunto é obrigatório'),
    },
];
