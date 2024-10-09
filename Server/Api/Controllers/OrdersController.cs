using System.Text.Json;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using Services.TransferModels.Requests;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase

{
    private readonly OrderService orderService;
    
    public OrdersController(OrderService orderService)
    {
        this.orderService = orderService; 
    }


    [HttpGet]
    [Route("")]
    public ActionResult<List<Order>> getAllOrders()
    {
        var orders = orderService.GetAllOrders();
        return Ok(orders);
    }

    [HttpPost]
    [Route("")]
    public IActionResult CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
            orderService.CreateOrder(createOrderDto);
            return Ok();
    }
}