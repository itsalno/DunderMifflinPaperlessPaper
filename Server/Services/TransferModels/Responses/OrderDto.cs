using DataAccess.Models;

namespace Services.TransferModels.Responses;

public class OrderDto
{
    public int Id { get; set; }
    public string OrderDate { get; set; }
    public string DeliveryDate { get; set; }
    public string Status { get; set; }
    public double TotalAmount{ get; set; }
    public int? CustomerId { get; set; }
    
    
    public Order ToEntity()
    {
        return new Order()
        {
            Id = Id,
            OrderDate = OrderDate,
            DeliveryDate = DeliveryDate,
            Status = Status,
            TotalAmount = TotalAmount,
            CustomerId = CustomerId
        };
    }
    
    public static OrderDto FromEntity(Order order)
    {
        return new OrderDto()
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId
        };
    }
}