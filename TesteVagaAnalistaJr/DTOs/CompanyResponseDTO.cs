namespace TesteVagaAnalistaJr.DTOs;

public record CompanyResponseDTO(Guid Id, string FantasyName, string CNPJ, string CorporateReason,
    DateTime RegistrationDate, bool Status);
