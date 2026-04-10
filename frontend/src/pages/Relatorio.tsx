import { useEffect, useState } from "react"
import api from "../services/api"
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material"

export default function Relatorio() {
  const [dados, setDados] = useState<any[]>([])
  const [geral, setGeral] = useState<any>({})

  useEffect(() => {
    api.get("/relatorios/pessoas").then(res => setDados(res.data))
    api.get("/relatorios/geral").then(res => setGeral(res.data))
  }, [])

  return (
    <Container>
      <Typography variant="h4">Relatório</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Receitas</TableCell>
            <TableCell>Despesas</TableCell>
            <TableCell>Saldo</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dados.map((d, i) => (
            <TableRow key={i}>
              <TableCell>{d.nome}</TableCell>
              <TableCell>{d.totalReceitas}</TableCell>
              <TableCell>{d.totalDespesas}</TableCell>
              <TableCell>{d.saldo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h5" style={{ marginTop: 20 }}>
        Total Geral
      </Typography>

      <Typography>Receitas: {geral.totalReceitas}</Typography>
      <Typography>Despesas: {geral.totalDespesas}</Typography>
      <Typography>Saldo: {geral.saldo}</Typography>
    </Container>
  )
}