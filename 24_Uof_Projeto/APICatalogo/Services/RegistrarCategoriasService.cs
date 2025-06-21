using APICatalogo.Models;
using APICatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace APICatalogo.Services
{
    public class RegistrarCategoriasService 
    {
        private readonly IUnitOfWork _uof;
        private readonly ILogger<RegistrarCategoriasService> _logger;

        public RegistrarCategoriasService(IUnitOfWork uof,
        ILogger<RegistrarCategoriasService> logger)
        {
            _uof = uof;
            _logger = logger;
        }
        

        public Categoria? Registrar(Categoria categoria)
        {
            if (categoria is null)
            {
                _logger.LogWarning($"Dados inválidos...");
                return null;
            }

            if (categoria.Id == 0)
            {
                var categoriaCriada = _uof.CategoriaRepository.Create(categoria);
                _uof.Commit();

                return categoriaCriada;
            }
            else {

                //if (id != categoria.Id)
                //{
                //    _logger.LogWarning($"Dados inválidos...");
                //    return null;
                //}

                _uof.CategoriaRepository.Update(categoria);
                _uof.Commit();

                return categoria;
            }
            
        }
    }
}
