using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface ICustomerRepository
{
    List<Customer> GetAllCustomers();
}