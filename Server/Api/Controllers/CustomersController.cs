using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using Services.TransferModels.Responses;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CustomersController(CustomerService customerService):ControllerBase
{
    
    
    [HttpGet]
    [Route("")]
    public ActionResult<List<CustomerDto>> getAllCustomers()
    {
        var customers = customerService.getAllCustomers();
        return Ok(customers);
    }

}