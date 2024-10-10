using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Responses;


namespace Services.Services;

public class CustomerService(ICustomerRepository customerRepository)
{

    public List<CustomerDto> getAllCustomers()
    {
        var customers = customerRepository.GetAllCustomers();
        return customers.Select(CustomerDto.FromEntity).ToList();
    }
    
    
}