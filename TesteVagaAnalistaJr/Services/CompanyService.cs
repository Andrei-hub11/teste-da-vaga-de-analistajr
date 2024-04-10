using ErrorOr;
using Microsoft.EntityFrameworkCore;
using TesteVagaAnalistaJr.Context;
using TesteVagaAnalistaJr.Exceptions;
using TesteVagaAnalistaJr.Models;
using TesteVagaAnalistaJr.Services.Interfaces;

namespace TesteVagaAnalistaJr.Services;

public class CompanyService : ICompanyService
{
    private readonly AppDbContext _context;

    public CompanyService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Company>> GetCompaniesAsync(CancellationToken cancellationToken)
    {
        var companies = await _context.Company.ToListAsync(cancellationToken);

        // para ajudar a evitar erros de referência nula.
        if(!companies.Any())
        {
            return Enumerable.Empty<Company>().ToList();
        }

        return companies;
    }

    public async Task<Company> CreateCompanyAsync(Company company)
    {
         _context.Company.Add(company);
        await _context.SaveChangesAsync();
        return company;
    }

    public async Task<bool> UpdateCompanyAsync(Company company, CancellationToken cancellationToken)
    {
        var existingCompany = await _context.Company.FirstOrDefaultAsync(c => c.Id == company.Id, 
            cancellationToken);

        if(existingCompany == null)
        {
            throw new NotFoundException($"A empresa com o id ${company.Id} não existe.");
        }

        existingCompany.FantasyName = company.FantasyName;
        existingCompany.CorporateReason = company.CorporateReason;
        existingCompany.RegistrationDate = company.RegistrationDate;
        existingCompany.CNPJ = company.CNPJ;
        existingCompany.Status = company.Status;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteCompanyAsync(Guid companyId, CancellationToken cancellationToken)
    {
        var existingCompany = await _context.Company.FirstOrDefaultAsync(company => company.Id == company.Id,
              cancellationToken);

        if (existingCompany == null)
        {
            throw new NotFoundException($"A empresa com o id ${companyId} não existe.");
        }

        _context.Company.Remove(existingCompany);
        await _context.SaveChangesAsync();
        return true;
    }
}
