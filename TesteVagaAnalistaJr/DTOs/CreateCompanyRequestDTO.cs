namespace TesteVagaAnalistaJr.DTOs;

public record CreateCompanyRequestDTO(string FantasyName, string CNPJ, string CorporateReason,
    DateTime RegistrationDate, bool Status);
