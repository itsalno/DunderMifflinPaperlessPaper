using DataAccess.Models;

namespace Services.TransferModels.Requests;

public class CreatePaperDto
{
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }

    public Paper ToEntity()
    {
        return new Paper
        {
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price
        };
    }
}