using APICatalogo.Models;
using APICatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace APICatalogo.Services
{
    public class ExcluirCategoria
    {
        private readonly IUnitOfWork _uof;
        private readonly ILogger<ExcluirCategoria> _logger;

        public ExcluirCategoria(IUnitOfWork uof, ILogger<ExcluirCategoria> logger)
        {
            _uof = uof;
            _logger = logger;
        }

        public string Excluir(int id) 
        {
            var categoria = _uof.CategoriaRepository.Get(c => c.Id == id);
            if (categoria is null)
            {
                _logger.LogWarning($"Categoria com id={id} não encontrada...");
                return $"Categoria com id={id} não encontrada...";
            }

            var categoriaExcluida = _uof.CategoriaRepository.Delete(categoria);
            _uof.Commit();

            return $"Exclusao da categoria {categoriaExcluida.Nome}" ;
        }
    }
}
