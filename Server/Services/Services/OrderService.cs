using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Microsoft.Extensions.Logging;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;

public class OrderService(IOrderRepository orderRepository,DMDbContext context,ILogger<OrderService> logger,IValidator<CreateOrderDto> createOrderValidator)
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
        createOrderValidator.ValidateAndThrow(createOrderDto);
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

    public void UpdateOrder(OrderDto orderDto)
    {
        var order = orderDto.ToEntity();
        orderRepository.UpdateOrder(order);
    }
    
}
    