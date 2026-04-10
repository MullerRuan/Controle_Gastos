using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

[ApiController]
[Route("api/[controller]")]
public class RelatoriosController : ControllerBase
{
    private readonly AppDbContext _context;

    public RelatoriosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("pessoas")]
    public IActionResult GetRelatorioPorPessoa()
    {
        var transacoes = _context.Transacoes.ToList();

        var relatorio = _context.Pessoas.ToList().Select(p => new
        {
            Nome = p.Nome,

            TotalReceitas = transacoes
                .Where(t => t.PessoaId == p.Id && t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor),

            TotalDespesas = transacoes
                .Where(t => t.PessoaId == p.Id && t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor),

            Saldo = transacoes
                .Where(t => t.PessoaId == p.Id)
                .Sum(t => t.Tipo == TipoTransacao.Receita ? t.Valor : -t.Valor)
        });

        return Ok(relatorio);
    }

    [HttpGet("geral")]
    public IActionResult GetTotalGeral()
    {
        var receitas = _context.Transacoes
            .Where(t => t.Tipo == TipoTransacao.Receita)
            .ToList()
            .Sum(t => (decimal?)t.Valor) ?? 0;

        var despesas = _context.Transacoes
            .Where(t => t.Tipo == TipoTransacao.Despesa)
            .ToList()
            .Sum(t => (decimal?)t.Valor) ?? 0;

        return Ok(new
        {
            TotalReceitas = receitas,
            TotalDespesas = despesas,
            Saldo = receitas - despesas
        });
    }
}