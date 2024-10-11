using DataAccess.Interfaces;
using DataAccess.Models;

namespace Tests.Stubbing;

public class StubPaperRepo:IPaperRepository
{
    public List<Paper> GetAllPapers()
    {
        throw new NotImplementedException();
    }

    public Paper CreatePaper(Paper paper)
    {
        paper.Id = 1;
        paper.Name = "Paper";
        paper.Discontinued = false;
        paper.Price = 29;
        paper.Stock = 20;
        return paper;
    }

    public Paper GetById(int id)
    {
        throw new NotImplementedException();
    }

    public void UpdatePaper(Paper paper)
    {
        throw new NotImplementedException();
    }

    public void DeletePaper(int id)
    {
        throw new NotImplementedException();
    }

    public List<Paper> GetAllPapersSortedByPrice()
    {
        throw new NotImplementedException();
    }

    public List<Paper> GetAllPapersSortedByStockAmount()
    {
        throw new NotImplementedException();
    }

    public List<Paper> GetAllPapersSortedByDiscount()
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Paper> SearchPapersByName(string name)
    {
        throw new NotImplementedException();
    }
}