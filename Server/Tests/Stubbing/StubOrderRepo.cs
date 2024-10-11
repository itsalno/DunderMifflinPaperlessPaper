using DataAccess.Interfaces;
using DataAccess.Models;

namespace Tests.Stubbing;

public class StubOrderRepo:IOrderRepository
{
    public List<Order> GetAllOrders()
    {
        throw new NotImplementedException();
    }

    public Order GetOrderByCustomerId(int id)
    {
        throw new NotImplementedException();
    }

    public Order CreateOrder(Order order)
    {
        
    }

    public void UpdateOrder(Order order)
    {
        throw new NotImplementedException();
    }
}