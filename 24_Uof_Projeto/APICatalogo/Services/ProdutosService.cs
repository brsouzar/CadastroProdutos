using APICatalogo.Models;
using APICatalogo.Repositories;

namespace APICatalogo.Services
{
    public class ProdutosService
    {
        private readonly IUnitOfWork _uof;

        public ProdutosService(IUnitOfWork uof)
        {
            _uof = uof;
        }

        public IEnumerable<Produto> Execute(int id) 
        {
            var produtos = _uof.ProdutoRepository.GetProdutosPorCategoria(id);
            if (produtos is null)
                return new List<Produto>();
            
            return produtos!;
        } 

    }
}
