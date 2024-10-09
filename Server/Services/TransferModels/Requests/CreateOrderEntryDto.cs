namespace Services.TransferModels.Requests;

public class CreateOrderEntryDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public int OrderId { get; set; }
}