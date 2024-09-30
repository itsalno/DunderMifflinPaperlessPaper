using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;

public class PaperService
{
    
    
    private readonly IPaperRepository paperRepository;
    
    

    public PaperService(IPaperRepository paperRepository)
    
    {
        this.paperRepository = paperRepository;
    }

    
    
    
    
    public PaperDto GetPaper(int id)
    {
        var paper = paperRepository.GetById(id);
        return PaperDto.FromEntity(paper);
    }

    
    public IEnumerable<PaperDto> GetAllPapers()
    {
        var papers = paperRepository.GetAllPapers();
        return papers.Select(PaperDto.FromEntity).ToList();
    }
    

    public Paper CreatePaper(CreatePaperDto paperDto)
    {
        var paper = paperDto.ToEntity();
        paperRepository.CreatePaper(paper);
        return paper;
    }

    
    public void UpdatePaper(PaperDto paperDto)
    {
        var paper = paperDto.ToEntity();
        paperRepository.UpdatePaper(paper);
    }

    
    public void DeletePaper(int id)
    {
        paperRepository.DeletePaper(id);
    }
    
    public List<Paper> GetAllPapersSortedByPrice()
    {
        return paperRepository.GetAllPapersSortedByPrice();
    }

    public List<Paper> GetAllPapersSortedByStockAmount()
    {
        return paperRepository.GetAllPapersSortedByStockAmount();
    }

    public List<Paper> GetAllPapersSortedByDiscount()
    {
        return paperRepository.GetAllPapersSortedByDiscount();
    }
    
    
}
