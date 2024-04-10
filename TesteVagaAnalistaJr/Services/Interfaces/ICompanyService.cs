using TesteVagaAnalistaJr.Models;

namespace TesteVagaAnalistaJr.Services.Interfaces;

public interface ICompanyService
{
    Task<ICollection<Company>> GetCompaniesAsync(CancellationToken cancellationToken);
    Task<Company> CreateCompanyAsync(Company company);
    Task<bool> UpdateCompanyAsync(Company company, CancellationToken cancellationToken);
    Task<bool> DeleteCompanyAsync(Guid companyId, CancellationToken cancellationToken);
}
