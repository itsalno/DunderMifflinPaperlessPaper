using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class OrdersController:ControllerBase

{
    private readonly OrderService orderService;
    
    [HttpGet]
    public ActionResult<Order> getAllOrders()
    {
        var orders = orderService.GetAllOrders();
        return Ok(orders);
    }
}