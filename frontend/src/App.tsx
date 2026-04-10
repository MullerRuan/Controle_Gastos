import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Pessoas from "./pages/Pessoas"
import Categorias from "./pages/Categorias"
import Transacoes from "./pages/Transacoes"
import Relatorio from "./pages/Relatorio"

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        
        {/* MENU */}
        <nav style={{ marginBottom: 20 }}>
          <Link to="/">Pessoas</Link> |{" "}
          <Link to="/categorias">Categorias</Link> |{" "}
          <Link to="/transacoes">Transações</Link> |{" "}
          <Link to="/relatorio">Relatório</Link>
        </nav>

        {/* ROTAS */}
        <Routes>
          <Route path="/" element={<Pessoas />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/transacoes" element={<Transacoes />} />
          <Route path="/relatorio" element={<Relatorio />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App