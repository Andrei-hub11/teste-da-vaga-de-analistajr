using System.ComponentModel.DataAnnotations.Schema;

namespace TesteVagaAnalistaJr.Models;


[Table("Company")]
public class Company
{
    public Guid Id { get; set; }
    public string FantasyName { get; set; } = string.Empty;
    public string CNPJ { get; set; } = string.Empty;
    public string CorporateReason { get; set; } = string.Empty;
    public DateTime RegistrationDate { get; set; }
    public bool Status { get; set; }

    public Company(Guid id, string fantasyName, string cnpj, string corporateReason, DateTime registrationDate,
       bool status)
    {
        Id = id;
        FantasyName = fantasyName;
        CNPJ = cnpj;
        CorporateReason = corporateReason;
        RegistrationDate = registrationDate;
        Status = status;
    }

    public Company(string fantasyName, string cnpj, string corporateReason, DateTime registrationDate,
        bool status) 
    {
        FantasyName = fantasyName;
        CNPJ = cnpj;
        CorporateReason = corporateReason;
        RegistrationDate = registrationDate;
        Status = status;
    }

    // necessário para o Entity Framework Core
    public Company()
    {
    }
}
