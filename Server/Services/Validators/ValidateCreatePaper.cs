using FluentValidation;
using Services.TransferModels.Requests;

namespace Services.Validators;

public class ValidateCreatePaper : AbstractValidator<CreatePaperDto>

{
    
    public ValidateCreatePaper()
    {
        RuleFor(p => p.Name.Length).GreaterThan(3);
        RuleFor(p => p.Price).NotEmpty();
        RuleFor(p => p.Stock).NotEmpty();
        RuleFor(p => p.Name).NotEmpty();
        
    }
    
}