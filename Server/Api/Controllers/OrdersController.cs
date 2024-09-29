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
    public ActionResult<List<Order>> getAllOrders()
    {
        var orders = orderService.GetAllOrders();
        return Ok(orders);
    }

    [HttpPost]
    public ActionResult<Order> CreateOrder(Order order)
    {
        var createdorder = orderService.CreateOrder(order);
        return Ok(createdorder);
    }
}