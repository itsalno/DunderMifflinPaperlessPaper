using DataAccess.Models;
using Microsoft.Extensions.Logging.Abstractions;
using PgCtx;
using Services.Services;
using Services.TransferModels.Requests;
using Services.Validators;
using Tests.Stubbing;

namespace Tests;

public class OrdersTests
{
    private readonly OrderService _orderService;
    
    
    public OrdersTests()
    {
        var pgCtxSetup = new PgCtxSetup<DMDbContext>();
        _orderService = new OrderService(new StubOrderRepo() , pgCtxSetup.DbContextInstance,NullLogger<OrderService>.Instance,new ValidateCreateOrder());
    }
    
    
    [Fact]
    public void CreateOrder_Should_Successfully_Return_An_Order()
    {
        var createOrderDto = new CreateOrderDto()
        {
            OrderDate = "1111",
            DeliveryDate = "2222",
            Status = "pending",
            TotalAmount = 50,
            CustomerId = 1
        };
        var result = _orderService.CreateOrder(createOrderDto);
        Assert.Equal(1, result.Id);
        Assert.Equal("Paper", result.Name);
        Assert.Equal(20, result.Stock);
        Assert.Equal(29, result.Price);
        Assert.False(result.Discontinued);
    }
}