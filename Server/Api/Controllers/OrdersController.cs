using System.Text.Json;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class OrdersController(OrderService orderService) : ControllerBase

{


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
    
    [HttpPut("Update/{id}")]
    public IActionResult UpdateOrder(int id, OrderDto orderDto)
    {
        if (id != orderDto.Id) return BadRequest();
        orderService.UpdateOrder(orderDto);
        return NoContent();
    }
}