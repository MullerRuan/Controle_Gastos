using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Classes;
using WebApi.Models;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context;
    public PessoasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Pessoas.ToList());
    }

    [HttpPost]
    public IActionResult Post(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        _context.SaveChanges();

        return Ok(pessoa);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var pessoa = _context.Pessoas.FirstOrDefault(p => p.Id == id);

        if (pessoa == null)
            return NotFound();

        var transacoes = _context.Transacoes
            .Where(t => t.PessoaId == id)
            .ToList();

        _context.Transacoes.RemoveRange(transacoes);

        _context.Pessoas.Remove(pessoa);
        _context.SaveChanges();

        return NoContent();
    }
}