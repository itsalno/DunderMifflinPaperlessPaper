using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPaperRepository
{
     List<Paper> GetAllPapers();
     Paper CreatePaper(Paper paper);
     Paper GetById(int id);
     void UpdatePaper(Paper paper);
     void DeletePaper(int id);
     List<Paper> GetAllPapersSortedByPrice();
     List<Paper> GetAllPapersSortedByStockAmount();
     List<Paper> GetAllPapersSortedByDiscount();

}