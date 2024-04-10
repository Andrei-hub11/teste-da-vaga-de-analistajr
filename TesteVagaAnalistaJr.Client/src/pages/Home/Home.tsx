import dayjs from 'dayjs';

import Radio from '../../assets/icons/akar-icons_radio.svg';
import RadioActive from '../../assets/icons/formkit_radio.svg';
import EditIcon from '../../assets/icons/ic_outline-edit.svg';
import DeleteIcon from '../../assets/icons/material-symbols_delete-outline.svg';
import Checkbox from '../../assets/icons/ri_checkbox-blank-line.svg';
import CheckboxActive from '../../assets/icons/ri_checkbox-line.svg';
import PlusIcon from '../../assets/icons/typcn_plus.svg';
import Header from '../../components/Header/Header';
import './_Home.scss';
import useHome from './useHome';

function Home() {
    const {
        companies,
        currentFilter,
        handleChangeCurrentFilter,
        redirectTo,
        CNPJFormat,
        handleSearch,
        companiesFiltered,
        handleDeleteMenu,
        deleteIsOpen,
        handleItemToDelete,
        handleDeleteItem,
        handleSetCompanyEditable,
    } = useHome();
    return (
        <section className="home">
            <Header>Menu Principal</Header>
            <div className="home__container">
                <input
                    role="search-input"
                    type="text"
                    placeholder="Pesquise aqui..."
                    className="home__input-search"
                    onChange={(e) => handleSearch(e.currentTarget.value)}
                />
                <div className="home__container-inner">
                    <p className="home__filter-title">Filtro</p>
                    <div className="home__filter-container">
                        <div className="home__filter-img">
                            <img
                                src={
                                    currentFilter == 'Ativos'
                                        ? RadioActive
                                        : Radio
                                }
                                alt="ícone de checkbox"
                                width={24}
                                height={24}
                                onClick={() =>
                                    handleChangeCurrentFilter('Ativos')
                                }
                            />
                            <p className="home__filter-option">Ativos</p>
                        </div>
                        <div className="home__filter-img">
                            <img
                                src={
                                    currentFilter == 'Inativos'
                                        ? RadioActive
                                        : Radio
                                }
                                alt="ícone de checkbox"
                                width={24}
                                height={24}
                                onClick={() =>
                                    handleChangeCurrentFilter('Inativos')
                                }
                            />
                            <p className="home__filter-option">Inativos</p>
                        </div>
                        <div className="home__filter-img">
                            <img
                                src={
                                    currentFilter == 'Todos'
                                        ? RadioActive
                                        : Radio
                                }
                                alt="ícone de checkbox"
                                width={24}
                                height={24}
                                onClick={() =>
                                    handleChangeCurrentFilter('Todos')
                                }
                            />
                            <p className="home__filter-option">Todos</p>
                        </div>
                    </div>
                </div>
            </div>
            <table className="home__table">
                <thead className="home__table-header">
                    <tr className="home__table-row">
                        <th className="home__header-row">Nome Fantasia</th>
                        <th className="home__header-row">Cpnj</th>
                        <th className="home__header-row">Data de Cadastro</th>
                        <th className="home__header-row">Botão</th>
                    </tr>
                </thead>
                {companiesFiltered.length === 0
                    ? companies.map((company) => (
                          <tbody className="home__table-body" key={company.Id}>
                              <tr className="table-row--variant">
                                  <td
                                      data-label="Nome Fantasia"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {company.FantasyName}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Cnpj"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {CNPJFormat(company.CNPJ)}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Data de Cadastro"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {dayjs(
                                              company.RegistrationDate,
                                          ).format('DD/MM/YYYY')}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Razão Social"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {company.CorporateReason}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Status"
                                      className="home__table-data"
                                  >
                                      <div className="home__table-icon">
                                          <img
                                              src={
                                                  company.Status
                                                      ? CheckboxActive
                                                      : Checkbox
                                              }
                                              alt="ícone de checkbox"
                                              width={24}
                                              height={24}
                                          />
                                      </div>
                                  </td>
                                  <td className="home__table-data">
                                      <div className="home__table-action">
                                          <div
                                              className="home__action"
                                              onClick={() => {
                                                  handleSetCompanyEditable(
                                                      company,
                                                  );
                                                  redirectTo('/editar-empresa');
                                              }}
                                          >
                                              <img
                                                  src={EditIcon}
                                                  alt="ícone de edição"
                                                  width={24}
                                                  height={24}
                                              />
                                              <a className="btn--table">
                                                  Editar
                                              </a>
                                          </div>
                                          <div
                                              className="home__action"
                                              onClick={() => {
                                                  handleDeleteMenu(true);
                                                  handleItemToDelete(
                                                      company.Id,
                                                  );
                                              }}
                                          >
                                              <img
                                                  src={DeleteIcon}
                                                  alt="ícone de deletar"
                                                  width={24}
                                                  height={24}
                                              />
                                              <a className="btn--table">
                                                  Deletar
                                              </a>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                          </tbody>
                      ))
                    : companiesFiltered.map((company) => (
                          <tbody className="home__table-body" key={company.Id}>
                              <tr className="table-row--variant">
                                  <td
                                      data-label="Nome Fantasia"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {company.FantasyName}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Cnpj"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {CNPJFormat(company.CNPJ)}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Data de Cadastro"
                                      className="home__table-data"
                                  >
                                      <p className="home__table-p">
                                          {dayjs(
                                              company.RegistrationDate,
                                          ).format('DD/MM/YYYY')}
                                      </p>
                                  </td>
                                  <td
                                      data-label="Status"
                                      className="home__table-data"
                                  >
                                      <div className="home__table-icon">
                                          <img
                                              src={
                                                  company.Status
                                                      ? CheckboxActive
                                                      : Checkbox
                                              }
                                              alt="ícone de checkbox"
                                              width={24}
                                              height={24}
                                          />
                                      </div>
                                  </td>
                                  <td className="home__table-data">
                                      <div className="home__table-action">
                                          <div
                                              className="home__action"
                                              onClick={() => {
                                                  handleSetCompanyEditable(
                                                      company,
                                                  );
                                                  redirectTo('/editar-empresa');
                                              }}
                                          >
                                              <img
                                                  src={EditIcon}
                                                  alt="ícone de edição"
                                                  width={24}
                                                  height={24}
                                              />
                                              <a className="btn--table">
                                                  Editar
                                              </a>
                                          </div>
                                          <div className="home__action">
                                              <img
                                                  src={DeleteIcon}
                                                  alt="ícone de deletar"
                                                  width={24}
                                                  height={24}
                                              />
                                              <a
                                                  className="btn--table"
                                                  onClick={() => {
                                                      handleDeleteMenu(true);
                                                      handleItemToDelete(
                                                          company.Id,
                                                      );
                                                  }}
                                              >
                                                  Deletar
                                              </a>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                          </tbody>
                      ))}
            </table>
            {companies.length === 0 && deleteIsOpen !== true ? (
                <div className="home__information">
                    <p className="home__information-text">
                        Nenhum item foi adicionado ainda.
                    </p>
                </div>
            ) : deleteIsOpen ? (
                //herdando estilos
                <div className="home__menu home__information">
                    <p className="home__menu-text home__information-text">
                        Deseja deletar este item?
                    </p>
                    <div className="home__menu-container">
                        <a
                            className="menu__action-btn "
                            onClick={() => handleDeleteMenu(false)}
                        >
                            Cancelar
                        </a>
                        <a
                            className="menu__action-btn btn--variant"
                            onClick={() => handleDeleteItem()}
                        >
                            Sim
                        </a>
                    </div>
                </div>
            ) : null}
            <div
                role="btn--add"
                className="home__icon"
                onClick={() => redirectTo('/adicionar-empresa')}
            >
                <img
                    src={PlusIcon}
                    alt="ícone de adicionar"
                    width={24}
                    height={24}
                />
            </div>
        </section>
    );
}

export default Home;
