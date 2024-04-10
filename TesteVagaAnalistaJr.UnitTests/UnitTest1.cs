using Microsoft.EntityFrameworkCore;
using TesteVagaAnalistaJr.Context;
using TesteVagaAnalistaJr.DTOs;
using TesteVagaAnalistaJr.Exceptions;
using TesteVagaAnalistaJr.Models;
using TesteVagaAnalistaJr.Services;

namespace TesteVagaAnalistaJr.UnitTests;

public class UnitTest1
{
    private CompanyService GetCompanyService()
    {
        // gerando um novo database único a cada chamada, para evitar interferências em testes 
        var _accountOptions = new DbContextOptionsBuilder<AppDbContext>()
           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
           .Options;
        var accountDbContext = new AppDbContext(_accountOptions);

        return new CompanyService(accountDbContext);
    }

    // teste de possível falha no GetCompanies
    [Fact]
    public async Task GetCompaniesAsync_WhenCalled_ReturnsListEmptyIfDontHaveData()
    {
        var _companyService = GetCompanyService();
        var cancellationToken = CancellationToken.None;

        var result = await _companyService.GetCompaniesAsync(cancellationToken);

        Assert.NotNull(result);
        Assert.Equal(0, result.Count);
    }

    // teste de retorno de items do GetCompanies
    [Fact]
    public async Task GetCompaniesAsync_WhenCalled_ReturnsListIfItsNotEmpty()
    {
        var _companyService = GetCompanyService();
        var companyDTO = new Company("stringaaaaaaaaaaaaaa", "11930090211111",
            "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", new DateTime(),
            true);

        var cancellationToken = CancellationToken.None;

        await _companyService.CreateCompanyAsync(companyDTO);

        var result = await _companyService.GetCompaniesAsync(cancellationToken);

        Assert.NotNull(result);
        Assert.NotEmpty(result);

        foreach (var item in result)
        {
            Assert.NotNull(item);
        }
    }

    // testando se o retorno do CreateCompany está correto
    [Fact]
    public async Task CreateCompanyAsync_WhenCalled_ReturnsTheCompanyItemAdded()
    {
        var _companyService = GetCompanyService();
        var expectedFantasyName = "stringtestaaaaaaanddoo";
        var expectedCNPJ = "11930090211111";
        var expectedCorporateReason = "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

        var companyDTO = new Company(expectedFantasyName, expectedCNPJ,
            expectedCorporateReason, new DateTime(), true);
        
        var result = await _companyService.CreateCompanyAsync(companyDTO);

        Assert.NotNull(result);
        Assert.Equal(expectedFantasyName, result.FantasyName);
        Assert.Equal(expectedCNPJ, result.CNPJ);
        Assert.Equal(expectedCorporateReason, result.CorporateReason);
        Assert.True(result.Status);
    }

    // testando se o retorno do UpdateCompany está correto
    [Fact]
    public async Task UpdateCompanyAsync_WithValidIdAndData_ReturnsTrue()
    {
        var _companyService = GetCompanyService();
        var companyDTO = new Company("stringaaaaaaaaaaaaaa", "11930090211111",
            "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", new DateTime(),
            true);

        var expectedFantasyName = "stringaaaaaaaaaaaabb";
        var expectedCNPJ = "11930090211199";
        var expectedCorporateReason = "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa44444444";
        var expectedStatus = false;

        var cancellationToken = CancellationToken.None;
        
        var company =  await _companyService.CreateCompanyAsync(companyDTO);

        var updateCompany = new Company(company.Id, expectedFantasyName, expectedCNPJ,
            expectedCorporateReason, company.RegistrationDate, expectedStatus);

        var isUpdated = await _companyService.UpdateCompanyAsync(updateCompany, cancellationToken);

        Assert.True(isUpdated);
    }

    // testando se NotFoundException do UpdateCompany é lançado corretamente
    [Fact]
    public async Task UpdateCompanyAsync_WithInvalidId_ReturnsThrowsException()
    {
        var _companyService = GetCompanyService();

        var cancellationToken = CancellationToken.None;
        var invalidCompany = new Company("stringaaaaaaaaaaaaaa", "11930090211111",
                   "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", new DateTime(),
                   true);

        await Assert.ThrowsAsync<NotFoundException>(() =>
           _companyService.UpdateCompanyAsync(invalidCompany, cancellationToken));
    }

    // testando se o retorno do DeleteCompany está correto
    [Fact]
    public async Task DeleteCompanyAsync_WithValidId_ReturnsTrue()
    {
        var _companyService = GetCompanyService();

        var cancellationToken = CancellationToken.None;
        var company = new Company("stringaaaaaaaaaaaaaa", "11930090211111",
                   "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", new DateTime(),
                   true);
        var result = await _companyService.CreateCompanyAsync(company);
        var isDeleted = await _companyService.DeleteCompanyAsync(result.Id, cancellationToken);

        Assert.True(isDeleted);
    }

    // testando se NotFoundException do DeleteCompany é lançado corretamente
    [Fact]
    public async Task DeleteCompanyAsync_WithInvalidId_ReturnsThrowsException()
    {
        var _companyService = GetCompanyService();

        var cancellationToken = CancellationToken.None;

        await Assert.ThrowsAsync<NotFoundException>(() =>
           _companyService.DeleteCompanyAsync(Guid.NewGuid(), cancellationToken));
    }
}