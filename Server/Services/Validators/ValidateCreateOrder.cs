using FluentValidation;
using Services.TransferModels.Requests;

namespace Services.Validators;

public class ValidateCreateOrder :AbstractValidator<CreateOrderDto>
{
    public CreateOrderValidator()
    {
        RuleFor(o => o.OrderDate).NotEmpty();
        RuleFor(o => o.DeliveryDate).NotEmpty();
        RuleFor(o => o.Status).NotEmpty();
        RuleFor(o => o.TotalAmount).NotEmpty();
        
    }
}