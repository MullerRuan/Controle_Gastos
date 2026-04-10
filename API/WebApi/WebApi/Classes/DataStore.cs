using WebApi.Models;

namespace WebApi.Classes
{
    public static class DataStore
    {
        public static List<Pessoa> Pessoas = new List<Pessoa>();
        public static List<Categoria> Categorias = new List<Categoria>();
        public static List<Transacao> Transacoes = new List<Transacao>();
    }
}
