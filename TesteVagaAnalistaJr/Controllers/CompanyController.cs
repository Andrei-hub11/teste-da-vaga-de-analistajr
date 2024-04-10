using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using TesteVagaAnalistaJr.DTOs;
using TesteVagaAnalistaJr.Models;
using TesteVagaAnalistaJr.Services;
using TesteVagaAnalistaJr.Validators;

namespace TesteVagaAnalistaJr.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService _companyService;
        private readonly IMapper _mapper;

        public CompanyController(CompanyService companyService, IMapper mapper)
        {
            _companyService = companyService;
            _mapper = mapper;
        }

        [HttpGet("companies")]
        public async Task<IActionResult> GetCompaniesAsync(CancellationToken cancellationToken)
        {
            try
            {
                var companies = await _companyService.GetCompaniesAsync(cancellationToken);

                var companiesDTO = _mapper.Map<ICollection<CompanyResponseDTO>>(companies);

                return Ok(companiesDTO);
            } catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Ocorreu um erro durante a busca das empresas.", Error = ex.Message });
            }
        }

        [HttpPost("create-company")]
        public async Task<IActionResult> RegisterCompany([FromBody] CreateCompanyRequestDTO 
            createCompanyRequestDTO)
        {
            try
            {
                var validator = new CompanyValidator();
                var validationResult = validator.Validate(createCompanyRequestDTO);

                // se o modelo for inválido, uma ValidationException será lançada
                if (!validationResult.IsValid)
                {
                   await validator.ValidateAndThrowAsync(createCompanyRequestDTO);
                }

                var company = _mapper.Map<CreateCompanyRequestDTO, Company>(createCompanyRequestDTO);

                var result = await _companyService.CreateCompanyAsync(company);

                return Ok(result);

            } catch (ValidationException ex)
            {
                var erros = ex.Errors.Select(erro => erro.ErrorMessage).ToList();
                return BadRequest(new { Message = "Os campos não foram corretamente preenchidos", Errors = erros });
            } catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Ocorreu um erro durante a adição da empresa.", Error = ex.Message });
            }
        }

        [HttpPut("update-company")]
        public async Task<IActionResult> UpdateCompany([FromBody] UpdateCompanyRequestDTO updateCompanyRequestDTO,
            CancellationToken cancellationToken)
        {
            try
            {
                var validator = new UpdateCompanyValidator();
                var validationResult = validator.Validate(updateCompanyRequestDTO);

                // se o modelo for inválido, uma ValidationException será lançada
                if (!validationResult.IsValid)
                {
                    await validator.ValidateAndThrowAsync(updateCompanyRequestDTO);
                }

                var company = _mapper.Map<UpdateCompanyRequestDTO, Company>(updateCompanyRequestDTO);

                var result = await _companyService.UpdateCompanyAsync(company, cancellationToken);

                return Ok(result);

            }
            catch (ValidationException ex)
            {
                var erros = ex.Errors.Select(erro => erro.ErrorMessage).ToList();
                return BadRequest(new { Message = "Os campos não foram corretamente preenchidos", Errors = erros });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Ocorreu um erro durante a atualização da empresa.", Error = ex.Message });
            }
        }

        [HttpDelete("delete-company/{companyId}")]
        public async Task<IActionResult> DeleteCompany(Guid companyId, CancellationToken cancellationToken)
        {
            try
            {
                var isDeleted = await _companyService.DeleteCompanyAsync(companyId, cancellationToken);

                return Ok(isDeleted);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Ocorreu um erro durante a exclusão da empresa.", Error = ex.Message });
            }
        }
    }
}
