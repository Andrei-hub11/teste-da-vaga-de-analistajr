namespace TesteVagaAnalistaJr.DTOs;

public record UpdateCompanyRequestDTO(Guid Id, string FantasyName, string CNPJ, string CorporateReason,
    DateTime RegistrationDate, bool Status);
