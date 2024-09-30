using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Api.Controllers;



[ApiController]
[Route("api/[controller]")]
public class PapersController : ControllerBase

{
    
    private readonly PaperService paperService;
    

    public PapersController(PaperService paperService)
    {
        this.paperService = paperService;
    }
    
    

    [HttpGet("GetAllPapers")]
    public ActionResult<IEnumerable<PaperDto>> GetAllPapers()
    {
        var papers = paperService.GetAllPapers();
        return Ok(papers);
    }

    
    [HttpGet("GetPaper/{id}")]
    public ActionResult<PaperDto> GetPaper(int id)
    {
        var paper = paperService.GetPaper(id);
        if (paper == null) return NotFound();
        return Ok(paper);
    }
    

    
    [HttpPost("Create")]
    public ActionResult<PaperDto> CreatePaper(CreatePaperDto paperDto)
    {
        var createdPaper = paperService.CreatePaper(paperDto);
        return CreatedAtAction(nameof(GetPaper), new { id = createdPaper.Id }, createdPaper);
    }

    
    [HttpPut("Update/{id}")]
    public IActionResult UpdatePaper(int id, PaperDto paperDto)
    {
        if (id != paperDto.Id) return BadRequest();
        paperService.UpdatePaper(paperDto);
        return NoContent();
    }

    
    [HttpDelete("Delete/{id}")]
    public IActionResult DeletePaper(int id)
    {
        paperService.DeletePaper(id);
        return NoContent();
    }
    
    [HttpGet]
    [Route("SortByPrice")]
    public ActionResult<IEnumerable<PaperDto>> GetPapersSortedByPrice()
    {
        var papers = paperService.GetAllPapersSortedByPrice();
        return Ok(papers);
    }
    
    [HttpGet]
    [Route("SortByStock")]
    public ActionResult<IEnumerable<PaperDto>> GetPapersSortedByStock()
    {
        var papers = paperService.GetAllPapersSortedByStockAmount();
        return Ok(papers);
    }
    
    [HttpGet]
    [Route("SortByDiscount")]
    public ActionResult<IEnumerable<PaperDto>> GetPapersSortedByDiscount()
    {
        var papers = paperService.GetAllPapersSortedByDiscount();
        return Ok(papers);
    }
    
    
    
}