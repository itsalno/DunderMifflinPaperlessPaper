using DataAccess.Interfaces;
using DataAccess.Models;

namespace Services.Services;

public class OrderService
{
    private readonly IOrderRepository orderRepository;
    
    public OrderService(IOrderRepository orderRepository)
    {
        this.orderRepository = orderRepository;
    }
    
    public List<Order> GetAllOrders()
    {
        return orderRepository.GetAllOrders();
    }

    public Order GetOrderByCustomerId(int id)
    {
        return orderRepository.GetOrderByCustomerId(id);
    }
    
}