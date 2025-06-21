using APICatalogo.Context;
using APICatalogo.Services;

namespace APICatalogo.Models;
public class QueryCat
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IEnumerable<Categoria> GetCategorias([Service] CategoriaService categoriaService) =>
        categoriaService.GetCategorias();

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public Categoria GetCategoriaById(int id, [Service] AppDbContext context)
    {
      return context.Categorias!.FirstOrDefault(c => c.Id == id)!;
    }
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IEnumerable<Produto> ProdutosGetAll(int id, [Service] ProdutosService produtosService)
    {
      return produtosService.Execute(id);
    }
}
