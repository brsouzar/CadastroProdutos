using APICatalogo.Models;
using APICatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace APICatalogo.Services
{
    public class RegistrarProdutoService
    {
        private readonly IUnitOfWork _uof;
        private readonly ILogger<RegistrarProdutoService> _logger;

        public RegistrarProdutoService(IUnitOfWork uof, 
            ILogger<RegistrarProdutoService> logger)
        {
            _uof = uof;
            _logger = logger;
        }

        public Produto Execute(Produto produto) 
        {
            
            if (produto is null)
            {
                _logger.LogWarning($"Dados inválidos...");
                return null;
            }
            var novoProduto = _uof.ProdutoRepository.Create(produto);
            _uof.Commit();
            
            
            return novoProduto;
        }
    }
}
