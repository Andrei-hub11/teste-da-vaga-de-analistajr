import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Checkbox from '../../assets/icons/ri_checkbox-blank-line.svg';
import CheckboxActive from '../../assets/icons/ri_checkbox-line.svg';
import { FormkitProps } from '../../types';
import './_Formikit.scss';
import useFormikit from './useFormikit';

dayjs.locale('pt-br');

function Formkit({
    propsFields,
    companyToEdit,
    companyItem,
    handleEditCompanyAction,
    handleAddCompanyAction,
    btnRef,
}: FormkitProps) {
    const {
        values,
        errors,
        touched,
        currentStatus,
        handleBlur,
        handleChange,
        handleSubmit,
        handleGetDate,
        handleGetStatus,
        handleSubmitClick,
    } = useFormikit({
        propsFields: propsFields,
        companyItem: companyItem,
        companyToEdit: companyToEdit,
        handleEditCompanyAction: handleEditCompanyAction,
        handleAddCompanyAction: handleAddCompanyAction,
    });

    /* const defaultDate = dayjs('2022-04-17').format('YYYY-MM-DD'); */

    return (
        <form action="" className="form" onSubmit={handleSubmit}>
            {propsFields.map((field) => (
                <div className="form__control" key={field.name}>
                    <input
                        className={`form__input ${
                            errors[field.name] && touched[field.name]
                                ? 'form__input--variant'
                                : ''
                        }`}
                        type="text"
                        placeholder={field.label}
                        value={values[field.name] || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id={field.name}
                    />
                    <small
                        className={`form__msg 
                ${errors[field.name] && touched[field.name] ? 'form__msg--variant' : ''}`}
                    >
                        {errors[field.name] && touched[field.name] ? (
                            <>{errors[field.name]}</>
                        ) : (
                            <>'error'</>
                        )}
                    </small>
                </div>
            ))}

            <div className="form__calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Data de cadastro">
                        <DesktopDatePicker
                            onChange={(e) => handleGetDate(e)}
                            sx={{
                                border: '1px solid white',
                                color: 'white',
                                '& input::placeholder': {
                                    color: 'white',
                                },
                                '& .MuiIconButton-root': {
                                    color: 'white',
                                },
                                '& input:focus': {
                                    borderColor: 'grey',
                                    outline: 'none',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                            }}
                            format="DD-MM-YYYY"
                            defaultValue={
                                companyItem?.RegistrationDate
                                    ? dayjs(companyItem.RegistrationDate)
                                    : dayjs('2022-04-17')
                            }
                        />
                    </DemoItem>
                </LocalizationProvider>
            </div>
            <div className="form__status">
                <div className="form__status-container">
                    <p className="form__status-label">Status</p>
                    <img
                        className="btn--status"
                        src={currentStatus ? CheckboxActive : Checkbox}
                        alt="ícone checkbox"
                        onClick={() => handleGetStatus(!currentStatus)}
                    />
                </div>
            </div>
            <button
                className="btn--hiden"
                onClick={() => handleSubmitClick}
                ref={btnRef}
            ></button>
        </form>
    );
}

export default Formkit;
