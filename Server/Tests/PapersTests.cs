using Api.Controllers;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using PgCtx;
using Services.Services;
using Services.TransferModels.Requests;
using Tests.Stubbing;

namespace Tests;

public class PapersTests
{
    private readonly PaperService _paperService;

    public PapersTests()
    {
        var pgCtxSetup = new PgCtxSetup<DMDbContext>();
        _paperService = new PaperService(new StubPaperRepo() , pgCtxSetup.DbContextInstance,NullLogger<PaperService>.Instance);
    }

    [Fact]
    public void CreatePaper_Should_Successfully_Return_A_Paper()
    {
        var createPaperDto = new CreatePaperDto()
        {
            Name = "Paper",
            Stock = 20,
            Price = 29,
            Discontinued = false
        };
        var result = _paperService.CreatePaper(createPaperDto);
        Assert.Equal(1, result.Id);
        Assert.Equal("Paper", result.Name);
        Assert.Equal(20, result.Stock);
        Assert.Equal(29, result.Price);
        Assert.False(result.Discontinued);
    }

    [Fact]
    public void DeletePaper_ShouldSuccessfully_Delete_A_Paper()
    {
        
    }
        

    

    
        

    
}