import { useEffect, useState } from "react"
import api from "../services/api"
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem
} from "@mui/material"

export default function Transacoes() {
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [tipo, setTipo] = useState(0)
  const [pessoaId, setPessoaId] = useState(0)
  const [categoriaId, setCategoriaId] = useState(0)

  const [pessoas, setPessoas] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])

  useEffect(() => {
    api.get("/pessoas").then(res => setPessoas(res.data))
    api.get("/categorias").then(res => setCategorias(res.data))
  }, [])

  function criarTransacao() {
    api.post("/transacoes", {
      descricao,
      valor,
      tipo,
      pessoaId,
      categoriaId
    })
    .then(() => alert("Sucesso"))
    .catch(err => alert(err.response.data))
  }

  return (
    <Container>
      <Typography variant="h4">Transações</Typography>

      <TextField
        label="Descrição"
        value={descricao}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />

      <TextField
        label="Valor"
        type="number"
        value={valor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValor(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: 10 }}
      />

      <TextField
        select
        label="Tipo"
        value={tipo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTipo(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: 10 }}
      >
        <MenuItem value={0}>Receita</MenuItem>
        <MenuItem value={1}>Despesa</MenuItem>
      </TextField>

      <TextField
        select
        label="Pessoa"
        value={pessoaId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPessoaId(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: 10 }}
      >
        {pessoas.map(p => (
          <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Categoria"
        value={categoriaId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoriaId(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: 10 }}
      >
        {categorias.map(c => (
          <MenuItem key={c.id} value={c.id}>{c.descricao}</MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={criarTransacao}>
        Cadastrar
      </Button>
    </Container>
  )
}