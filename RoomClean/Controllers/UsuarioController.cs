using Microsoft.AspNetCore.Mvc;
using RoomClean.Services;

namespace RoomClean.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        public readonly IUsuarioService _usuarioService;
        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        //[HttpGet]
        //public async Task<IActionResult> ObtenerLista()
        //{
        //    var result = await _usuarioService.ObtenerUsuarios();
        //    return Ok(result);
        //}
    }
}
