using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IOrderRepository
{
    Order? GetOpenOrderByCustomerId(int customerId);
    void AddOrder(Order order);
    void UpdateOrder(Order order);
}