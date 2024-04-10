using FluentValidation;
using TesteVagaAnalistaJr.DTOs;

namespace TesteVagaAnalistaJr.Validators;

public class CompanyValidator: AbstractValidator<CreateCompanyRequestDTO>
{
    public CompanyValidator()
    {
        RuleFor(company => company.FantasyName).NotNull().WithMessage("A propriedade FantasyName é obrigatória")
            .NotEmpty().WithMessage("A propriedade FantasyName não pode estar em branco.")
            .MinimumLength(20).WithMessage("A propriedade FantasyName precisa ter pelo menos 20 caracteres.");
        RuleFor(company => company.CNPJ).NotNull().WithMessage("A propriedade CNPJ é obrigatória")
            .NotEmpty().WithMessage("A propriedade CNPJ não pode estar em branco.")
            .MinimumLength(14).WithMessage("CNPJ deve ter 14 dígitos.").
            MaximumLength(14).WithMessage("CNPJ deve ter 14 dígitos.").
            Matches("^[0-9]*$").WithMessage("CNPJ deve conter apenas números.");
        RuleFor(company => company.CorporateReason).NotNull().WithMessage("A propriedade CorporateReason é obrigatória")
            .NotEmpty().WithMessage("A propriedade CorporateReason não pode estar em branco.")
            .MinimumLength(60).WithMessage("A propriedade CorporateReason precisa ter pelo menos 60 caracteres.");
        RuleFor(company => company.Status).NotNull().WithMessage("A propriedade Status é obrigatória");
    }
}
