namespace DataAccess.Models;

public class OrderRepository
{
    private readonly DMDbContext context;

    public OrderRepository(DMDbContext context)
    {
        this.context = context;
    }
    
    
    public Order? GetOpenOrderByCustomerId(int customerId)
    {
        return context.Orders
            .FirstOrDefault(o => o.CustomerId == customerId && o.Status == "Cart");
    }

    
    public void AddOrder(Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();
    }

    
    public void UpdateOrder(Order order)
    {
        context.Orders.Update(order);
        context.SaveChanges();
    }
}