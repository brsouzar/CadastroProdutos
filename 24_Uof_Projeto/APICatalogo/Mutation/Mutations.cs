using APICatalogo.Models;
using APICatalogo.Services;


namespace APICatalogo.Mutation;

public class Mutations
{   
    public Categoria RegistrarCategoria(Categoria categoria, 
        [Service] RegistrarCategoriasService registrarCategoriasService)
    {        
        return registrarCategoriasService.Registrar(categoria)!;
    }

    public string ExcluirCategoria(int id,
        [Service] ExcluirCategoria excluirCategoria)
    {  
        return excluirCategoria.Excluir(id)!;
    }
    public Produto RegistrarProdutoService(Produto produto,
        [Service] RegistrarProdutoService registrarProdutoService)
    {
        produto.Estoque = 1;
        produto.ImageUrl = "image.jpg";
        return registrarProdutoService.Execute(produto);
    }
}
