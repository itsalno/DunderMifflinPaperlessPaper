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
    
    

    [HttpGet]
    public ActionResult<IEnumerable<PaperDto>> GetAllPapers()
    {
        var papers = paperService.GetAllPapers();
        return Ok(papers);
    }

    
    [HttpGet("{id}", Name = "GetPaper")]
    public ActionResult<PaperDto> GetPaper(int id)
    {
        var paper = paperService.GetPaper(id);
        if (paper == null) return NotFound();
        return Ok(paper);
    }
    

    
    [HttpPost("AddPaper")]
    public ActionResult<PaperDto> CreatePaper(CreatePaperDto paperDto)
    {
        var createdPaper = paperService.CreatePaper(paperDto);
        return CreatedAtAction(nameof(GetPaper), new { id = createdPaper.Id }, createdPaper);
    }

    
    [HttpPut("UpdatePaper/{id}")]
    public IActionResult UpdatePaper(int id, PaperDto paperDto)
    {
        if (id != paperDto.Id) return BadRequest();
        paperService.UpdatePaper(paperDto);
        return NoContent();
    }

    
    [HttpDelete("DeletePaper/{id}")]
    public IActionResult DeletePaper(int id)
    {
        paperService.DeletePaper(id);
        return NoContent();
    }
    
    
    
}