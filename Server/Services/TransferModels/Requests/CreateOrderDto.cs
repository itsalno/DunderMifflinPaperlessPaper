namespace Services.TransferModels.Requests;

public class CreateOrderDto
{
    public string? OrderDate { get; set; } 
    public string? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }

    public List<CreateOrderEntryDto> OrderEntries { get; set; } = new List<CreateOrderEntryDto>();
    
}