using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Classes;
using WebApi.Models;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;
    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Transacoes.ToList());
    }

    [HttpPost]
    public IActionResult Post(Transacao transacao)
    {
        var pessoa = _context.Pessoas.Find(transacao.PessoaId);
        var categoria = _context.Categorias.Find(transacao.CategoriaId);

        if (pessoa == null || categoria == null)
            return BadRequest("Pessoa ou categoria inválida");

        // REGRA 1
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            return BadRequest("Menor de idade só pode ter despesas");

        // REGRA 2
        if (categoria.Finalidade == Finalidade.Receita && transacao.Tipo == TipoTransacao.Despesa)
            return BadRequest("Categoria incompatível");

        if (categoria.Finalidade == Finalidade.Despesa && transacao.Tipo == TipoTransacao.Receita)
            return BadRequest("Categoria incompatível");

        _context.Transacoes.Add(transacao);
        _context.SaveChanges();

        return Ok(transacao);
    }
}