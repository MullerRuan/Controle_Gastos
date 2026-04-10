// import { useEffect, useState } from "react"
// import api from "../services/api"
// import { TextField, Button, Container, Typography, List, ListItem, Table, TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions } from "@mui/material"

// type Pessoa = {
//   id: number
//   nome: string
//   idade: number
// }

// export default function Pessoas() {
//   const [pessoas, setPessoas] = useState<Pessoa[]>([])
//   const [nome, setNome] = useState("")
//   const [idade, setIdade] = useState(0)
  
//   const [openDialog, setOpenDialog] = useState(false)
//   const [pessoaSelecionada, setPessoaSelecionada] = useState<number | null>(null)
  
//   useEffect(() => {
//     carregarPessoas()
//   }, [])

//   function carregarPessoas() {
//     api.get("/pessoas").then(res => setPessoas(res.data))
//   }

//   function criarPessoa() {
//     api.post("/pessoas", { nome, idade }).then(() => {
//       setNome("")
//       setIdade(0)
//       carregarPessoas()
//     })
//   }

//   function confirmarExclusao(id: number) {
//   setPessoaSelecionada(id)
//   setOpenDialog(true)
// }

// function deletarPessoa() {
//   if (!pessoaSelecionada) return

//   api.delete(`/pessoas/${pessoaSelecionada}`).then(() => {
//     setOpenDialog(false)
//     setPessoaSelecionada(null)
//     carregarPessoas()
//   })
// }

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Cadastro de Pessoas
//       </Typography>

//       <TextField
//         label="Nome"
//         value={nome}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
//         style={{ marginRight: 10 }}
//       />

//       <TextField
//         label="Idade"
//         type="number"
//         value={idade}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdade(Number(e.target.value))}
//         style={{ marginRight: 10 }}
//       />

//       <Button variant="contained" onClick={criarPessoa}>
//         Cadastrar
//       </Button>

//       <Typography variant="h5" style={{ marginTop: 20 }}>
//         Lista de Pessoas
//       </Typography>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Nome</TableCell>
//             <TableCell>Idade</TableCell>
//             <TableCell>Ações</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {pessoas.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4}>Nenhuma pessoa cadastrada</TableCell>
//             </TableRow>
//           ) : (
//             pessoas.map(p => (
//               <TableRow key={p.id}>
//                 <TableCell>{p.id}</TableCell>
//                 <TableCell>{p.nome}</TableCell>
//                 <TableCell>{p.idade}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => confirmarExclusao(p.id)}
//                   >
//                     Excluir
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//       <DialogTitle>Confirmar exclusão</DialogTitle>

//       <DialogContent>
//         Tem certeza que deseja excluir essa pessoa?
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={() => setOpenDialog(false)}>Não</Button>
//         <Button color="error" onClick={deletarPessoa}>
//           Sim
//         </Button>
//       </DialogActions>
//     </Dialog>
//     </Container>
//   )
// }