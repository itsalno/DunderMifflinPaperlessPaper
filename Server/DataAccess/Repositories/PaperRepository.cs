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
}
    