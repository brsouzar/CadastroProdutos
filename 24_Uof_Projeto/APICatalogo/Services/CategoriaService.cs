using APICatalogo.Controllers;
using APICatalogo.Models;
using APICatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace APICatalogo.Services
{
    public class CategoriaService
    {
        private readonly IUnitOfWork _uof;
        private readonly ILogger<CategoriaService> _logger;

        public CategoriaService(IUnitOfWork uof,
        ILogger<CategoriaService> logger)
        { 
            _uof = uof;
            _logger = logger;
        }

        public IEnumerable<Categoria> GetCategorias()
        {
            var categorias = _uof.CategoriaRepository.GetAll();
            return categorias!;
        }
    }
}
