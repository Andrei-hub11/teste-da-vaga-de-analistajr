export const CNPJFormat = (cnpj: string): string => {
    if (cnpj.length !== 14 || !/^[0-9]*$/.test(cnpj)) {
        throw new Error('Esse cnpj não está no formato esperado');
    }

    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5',
    );
};
