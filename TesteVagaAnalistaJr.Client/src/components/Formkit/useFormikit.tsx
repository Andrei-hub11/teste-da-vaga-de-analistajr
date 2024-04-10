import dayjs, { Dayjs } from 'dayjs';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Company, FormProps, FormValues, RegisterCompany } from '../../types';

const useFormikit = ({
    propsFields,
    companyToEdit,
    companyItem,
    handleAddCompanyAction,
    handleEditCompanyAction,
}: FormProps) => {
    const [currentDate, setCurrentDate] = useState<string>();
    const [currentStatus, setCurrentStatus] = useState<boolean>(
        companyItem?.Status ? companyItem.Status : false,
    );
    const initialValues: FormValues = Object.fromEntries(
        propsFields.map((field) => [
            field.name,
            companyToEdit ? companyToEdit[field.name] || '' : '',
        ]),
    );

    const validations = yup
        .object()
        .shape(
            Object.fromEntries(
                propsFields.map((field) => [
                    field.name,
                    field.validation ||
                        yup.string().required(`${field.label} é requerido`),
                ]),
            ),
        );

    const handleGetDate = (date: Dayjs | null) => {
        if (date) {
            const dateString = dayjs(date).format('YYYY-MM-DD HH:mm:ss');

            setCurrentDate(dateString);
        }
    };

    const handleGetStatus = (status: boolean) => {
        setCurrentStatus(status);
    };

    function isCompanyData(
        data: Partial<RegisterCompany>,
    ): data is RegisterCompany {
        return (
            typeof data?.CNPJ === 'string' &&
            typeof data?.FantasyName === 'string' &&
            typeof data?.CorporateReason === 'string'
        );
    }

    function isCompanyEditable(data: Partial<Company>): data is Company {
        return (
            typeof data?.CNPJ === 'string' &&
            typeof data?.FantasyName === 'string' &&
            typeof data?.CorporateReason === 'string'
        );
    }

    const onSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>,
    ) => {
        if (!companyToEdit && isCompanyData(values)) {
            handleAddCompanyAction &&
                handleAddCompanyAction({
                    CNPJ: values.CNPJ,
                    FantasyName: values.FantasyName,
                    CorporateReason: values.CorporateReason,
                    RegistrationDate: dayjs(currentDate).toDate(),
                    Status: currentStatus,
                });
        }

        if (companyToEdit && isCompanyEditable(values)) {
            if (!companyItem) {
                toast.error('O id do item do está disponível');
                return;
            }

            handleEditCompanyAction &&
                handleEditCompanyAction({
                    Id: companyItem?.Id,
                    CNPJ: values.CNPJ,
                    FantasyName: values.FantasyName,
                    CorporateReason: values.CorporateReason,
                    RegistrationDate: dayjs(currentDate).format(
                        'YYYY-MM-DDTHH:mm:ss',
                    ),
                    Status: currentStatus,
                });
        }
        actions.resetForm();
    };

    const handleSubmitClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        event.preventDefault();
        handleSubmit();
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik<FormikValues>({
        initialValues,
        validationSchema: validations,
        onSubmit,
    });

    return {
        values,
        errors,
        touched,
        isSubmitting,
        initialValues,
        validations,
        currentStatus,
        handleBlur,
        handleChange,
        onSubmit,
        handleSubmit,
        handleSubmitClick,
        handleGetDate,
        handleGetStatus,
    };
};

export default useFormikit;
