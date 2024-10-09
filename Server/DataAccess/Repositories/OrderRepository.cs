using DataAccess.Interfaces;

namespace DataAccess.Models;

public class OrderRepository(DMDbContext context):IOrderRepository
{
    
    
    public List<Order> GetAllOrders()
    {
        return context.Orders.ToList();
    }

    public Order GetOrderByCustomerId(int id)
    {
        return context.Orders.Find(id);
    }

    public Order CreateOrder(Order order)
    {
        
        context.Orders.Add(order);
        context.SaveChanges(); 
        return order;
    }
    
    public Order UpdateOrder(Order order)
    {
        context.Orders.Update(order);
        context.SaveChanges(); 
        return order;
    }
}