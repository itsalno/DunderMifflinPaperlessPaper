using Api.Controllers;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Services.Services;
using Services.TransferModels.Requests;

namespace Tests;

public class PapersTests
{
    
    private readonly PapersController _controller;
        private readonly Mock<PaperService> _mockPaperService;

        public PapersTests()
        {
            _mockPaperService = new Mock<PaperService>();
            _controller = new PapersController(_mockPaperService.Object);
        }

        [Fact]
        public void GetAllPapers_ReturnsOkResult_WithListOfPapers()
        {
            // Arrange
            var mockPapers = new List<PaperDto>
            {
                new PaperDto { Id = 1, Name = "Paper 1", Price = 2.50, Stock = 100 },
                new PaperDto { Id = 2, Name = "Paper 2", Price = 3.00, Stock = 50 }
            };

            _mockPaperService.Setup(service => service.GetAllPapers()).Returns(mockPapers);

           
            var result = _controller.GetAllPapers();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<PaperDto>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);  // Check the returned number of papers
        }

    

        [Fact]
        public void GetPaper_ReturnsOkResult_WithPaperDto()
        {
            // Arrange
            int paperId = 1;
            var mockPaper = new PaperDto { Id = paperId, Name = "Paper 1", Price = 2.50, Stock = 100 };

            _mockPaperService.Setup(service => service.GetPaper(paperId)).Returns(mockPaper);

            // Act
            var result = _controller.GetPaper(paperId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<PaperDto>(okResult.Value);
            Assert.Equal(paperId, returnValue.Id);
        }

        [Fact]
        public void CreatePaper_ReturnsCreatedAtAction_WithNewPaper()
        {
            // Arrange
            var newPaper = new CreatePaperDto { Name = "New Paper", Price = 4.50, Stock = 200 };
            var createdPaper = new Paper() { Id = 3, Name = "New Paper", Price = 4.50, Stock = 200 };

            _mockPaperService.Setup(service => service.CreatePaper(newPaper)).Returns(createdPaper);

            // Act
            var result = _controller.CreatePaper(newPaper);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<PaperDto>(createdAtActionResult.Value);
            Assert.Equal(3, returnValue.Id);
        }

        [Fact]
        public void UpdatePaper_ReturnsNoContent_WhenPaperIsUpdated()
        {
            // Arrange
            var paperDto = new PaperDto { Id = 1, Name = "Updated Paper", Price = 5.00, Stock = 150 };

            _mockPaperService.Setup(service => service.UpdatePaper(paperDto));

            // Act
            var result = _controller.UpdatePaper(1, paperDto);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void DeletePaper_ReturnsNoContent_WhenPaperIsDeleted()
        {
            // Arrange
            int paperId = 1;

            _mockPaperService.Setup(service => service.DeletePaper(paperId));

            // Act
            var result = _controller.DeletePaper(paperId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }
}