import Formkit from '../../components/Formkit/Formkit';
import Header from '../../components/Header/Header';
import { addCompany } from '../../utils/fields';
import './_AddCompany.scss';
import useAdd from './useAdd';

function AddCompany() {
    const { redirectTo, handleAddCompanyAction, handleFormSubmit, btnRef } =
        useAdd();

    return (
        <section className="add">
            <Header>Adicionar</Header>
            <Formkit
                propsFields={addCompany}
                handleAddCompanyAction={handleAddCompanyAction}
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
                    Adicionar
                </a>
            </div>
        </section>
    );
}

export default AddCompany;
