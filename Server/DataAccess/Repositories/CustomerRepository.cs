using DataAccess.Interfaces;

namespace DataAccess.Models;

public class CustomerRepository(DMDbContext context):ICustomerRepository
{
    
    
    public List<Customer> GetAllCustomers()
    {
        return context.Customers.ToList();
    }
}