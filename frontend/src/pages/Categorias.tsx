import { useEffect, useState } from "react"
import api from "../services/api"
import { TextField, Button, Container, Typography, List, ListItem, MenuItem } from "@mui/material"

type Categoria = {
  id: number
  descricao: string
  finalidade: number
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [descricao, setDescricao] = useState("")
  const [finalidade, setFinalidade] = useState(0)

  useEffect(() => {
    carregarCategorias()
  }, [])

  function carregarCategorias() {
    api.get("/categorias").then(res => setCategorias(res.data))
  }

  function criarCategoria() {
    api.post("/categorias", { descricao, finalidade }).then(() => {
      setDescricao("")
      setFinalidade(0)
      carregarCategorias()
    })
  }

  return (
    <Container>
      <Typography variant="h4">Categorias</Typography>

      <TextField
        label="Descrição"
        value={descricao}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <TextField
        select
        label="Finalidade"
        value={finalidade}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFinalidade(Number(e.target.value))}
        style={{ marginRight: 10 }}
      >
        <MenuItem value={0}>Receita</MenuItem>
        <MenuItem value={1}>Despesa</MenuItem>
        <MenuItem value={2}>Ambas</MenuItem>
      </TextField>

      <Button variant="contained" onClick={criarCategoria}>
        Cadastrar
      </Button>

      <Typography variant="h5" style={{ marginTop: 20 }}>
        Lista
      </Typography>

      <List>
        {categorias.map(c => (
          <ListItem key={c.id}>
            {c.descricao} - {["Receita", "Despesa", "Ambas"][c.finalidade]}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}