import * as yup from 'yup';

export type FormValues = Record<string, string>;

export type OptionsFilter = 'Ativos' | 'Inativos' | 'Todos';

export interface Field {
    name: string;
    label: string;
    validation: yup.StringSchema<string>;
    type?: string;
}

export type CompanyToEdit = {
    FantasyName: string;
    CNPJ: string;
    CorporateReason: string;
    [key: string]: string;
};

export type FormProps = {
    propsFields: Field[];
    companyToEdit?: CompanyToEdit;
    companyItem?: Company;
    handleEditCompanyAction?: (company: CompanyEditable) => void;
    handleAddCompanyAction?: (company: RegisterCompany) => void;
};

export type FormkitProps = FormProps & {
    propsFields: Field[];
    companyToEdit?: CompanyToEdit;
    companyItem?: Company;
    handleEditCompanyAction?: (company: CompanyEditable) => void;
    handleAddCompanyAction?: (company: RegisterCompany) => void;
    btnRef: React.MutableRefObject<HTMLButtonElement | null>;
};

export type CompanyDataStore = {
    companyEditableItem: null | Company;
    companies: Company[] | [];
    setCompanyEditableItem: (company: Company) => void;
    setCompanyData: (company: Company) => void;
    setCompaniesData: (companies: Company[]) => void;
    removeCompanyById: (id: string) => void;
    resetCompanyEditableItem: () => void;
};

export type Company = {
    Id: string;
    FantasyName: string;
    CNPJ: string;
    CorporateReason: string;
    RegistrationDate: Date;
    Status: boolean;
};

export type CompanyEditable = {
    Id: string;
    FantasyName: string;
    CNPJ: string;
    CorporateReason: string;
    RegistrationDate: string;
    Status: boolean;
};

export type RegisterCompany = {
    FantasyName: string;
    CNPJ: string;
    CorporateReason: string;
    RegistrationDate: Date;
    Status: boolean;
};
