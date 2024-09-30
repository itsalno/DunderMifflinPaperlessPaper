using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

public class PaperRepository:IPaperRepository
{
    private readonly DMDbContext context;

    public PaperRepository(DMDbContext context)
    {
        this.context = context;
    }

    public List<Paper> GetAllPapers()
    {
        var papers = context.Papers
            .Include(p => p.Properties) 
            .ToList();
    
        return papers;
    }

    public Paper CreatePaper(Paper paper)
    {
        context.Papers.Add(paper);
        context.SaveChanges(); 
        return paper;
    }

    public Paper GetById(int id)
    {
        return context.Papers.Find(id); 
    }

    public void UpdatePaper(Paper paper)
    {
        context.Papers.Update(paper);
        context.SaveChanges(); 
    }

    public void DeletePaper(int id)
    {
        var paper = GetById(id);
        context.Papers.Remove(paper);
        context.SaveChanges(); 
    }

    public List<Paper> GetAllPapersSortedByPrice()
    {
        return context.Papers.OrderBy(p => p.Price).ToList();
    }

    public List<Paper> GetAllPapersSortedByStockAmount()
    {
        return context.Papers.OrderBy(p => p.Stock).ToList();
    }

    public List<Paper> GetAllPapersSortedByDiscount()
    {
        return context.Papers.OrderBy(p => p.Discontinued).ToList();
    }
}
    