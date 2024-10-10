using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Requests;

namespace Services.Services;

public class OrderService(IOrderRepository orderRepository)
{
    
    
    
    public List<Order> GetAllOrders()
    {
        return orderRepository.GetAllOrders();
    }

    public Order GetOrderByCustomerId(int id)
    {
        return orderRepository.GetOrderByCustomerId(id);
    }

    public void CreateOrder(CreateOrderDto createOrderDto)
    {
        var order = new Order
        {
            OrderDate = createOrderDto.OrderDate,
            DeliveryDate = createOrderDto.DeliveryDate,
            Status = createOrderDto.Status,
            TotalAmount = createOrderDto.TotalAmount,
            CustomerId = createOrderDto.CustomerId,
        };
        
        orderRepository.CreateOrder(order);
        
        foreach (var entryDto in createOrderDto.OrderEntries)
        {
            var orderEntry = new OrderEntry
            {
                ProductId = entryDto.ProductId,
                Quantity = entryDto.Quantity,
                OrderId = order.Id
            };
            
            order.OrderEntries.Add(orderEntry);
        }
        
        orderRepository.UpdateOrder(order);
    }
}
    