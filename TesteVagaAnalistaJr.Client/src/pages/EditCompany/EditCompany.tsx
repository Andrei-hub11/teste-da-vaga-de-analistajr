import Formkit from '../../components/Formkit/Formkit';
import Header from '../../components/Header/Header';
import { addCompany } from '../../utils/fields';
import useEdit from './useEdit';

function EditCompany() {
    const {
        redirectTo,
        handleEditCompanyAction,
        handleFormSubmit,
        companyEditableItem,
        btnRef,
    } = useEdit();

    return (
        <section className="edit">
            <Header>Editar</Header>
            <Formkit
                propsFields={addCompany}
                companyItem={companyEditableItem ?? undefined}
                companyToEdit={{
                    CorporateReason: companyEditableItem?.CorporateReason ?? '',
                    CNPJ: companyEditableItem?.CNPJ ?? '',
                    FantasyName: companyEditableItem?.FantasyName ?? '',
                }}
                handleEditCompanyAction={handleEditCompanyAction}
                btnRef={btnRef}
            />
            <div className="add__action">
                <a
                    className="add__action-btn btn--variant"
                    onClick={() => redirectTo('/home')}
                >
                    Voltar
                </a>
                <a
                    className="add__action-btn "
                    onClick={() => handleFormSubmit()}
                >
                    Salvar
                </a>
            </div>
        </section>
    );
}

export default EditCompany;
