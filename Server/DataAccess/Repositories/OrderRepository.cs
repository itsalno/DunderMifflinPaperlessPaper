using DataAccess.Interfaces;

namespace DataAccess.Models;

public class OrderRepository:IOrderRepository
{
    
    private readonly DMDbContext context;
    
    public List<Order> GetAllOrders()
    {
        return context.Orders.ToList();
    }

    public Order GetOrderByCustomerId(int id)
    {
        return context.Orders.Find(id);
    }
    
}