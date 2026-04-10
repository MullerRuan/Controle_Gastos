using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Classes;
using WebApi.Models;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _context;
    public CategoriasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Categorias.ToList());
    }

    [HttpPost]
    public IActionResult Post(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
        _context.SaveChanges();

        return Ok(categoria);
    }
}