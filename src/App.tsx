import { useState } from "react";
import { Edital } from "./types/Edital";
import { Candidatura } from "./types/Candidatura";
import { editaisIniciais } from "./data/editais";
import EditalCard from "./components/EditalCard";
import BuscaEdital from "./components/BuscaEdital";
import NovoEditalForm from "./components/NovoEditalForm";
import InscricaoMonitoriaForm from "./components/InscricaoMonitoriaForm";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App(): React.ReactElement {
  const [editais, setEditais] = useState<Edital[]>(editaisIniciais);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);

  const editaisFiltrados = editais
    .filter((edital) => {
      const termo = termoBusca.toLowerCase();
      const correspondeTexto =
        edital.disciplina.toLowerCase().includes(termo) ||
        edital.professor.toLowerCase().includes(termo) ||
        edital.curso.toLowerCase().includes(termo);

      const correspondeStatus =
        filtroStatus === "Todos" ||
        (filtroStatus === "Destaque" ? edital.destaque === true : edital.status === filtroStatus);

      return correspondeTexto && correspondeStatus;
    })
    .sort((a, b) => new Date(b.dataEncerramento).getTime() - new Date(a.dataEncerramento).getTime());

  function adicionarEdital(novoEdital: Edital) {
    setEditais((prev) => [novoEdital, ...prev]);
  }

  function adicionarCandidatura(novaCandidatura: Candidatura) {
    setCandidaturas((prev) => [novaCandidatura, ...prev]);
  }

  const editaisAbertos = editais.filter((e) => e.status === "Aberto");

  const totalAbertos = editais.filter((e) => e.status === "Aberto").length;
  const totalEncerrados = editais.filter((e) => e.status === "Encerrado").length;

  return (
    <>
      <header className="hero text-white py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">
            <i className="bi bi-mortarboard-fill me-2"></i>
            Sistema de Monitorias
          </h1>
          <p className="lead">IF Sudeste MG – Campus Rio Pomba</p>

          <div className="row justify-content-center g-3 mt-2">
            {[
              { valor: editais.length, label: "Total de editais", icone: "bi-file-earmark-text" },
              { valor: totalAbertos, label: "Editais abertos", icone: "bi-check-circle" },
              { valor: totalEncerrados, label: "Editais encerrados", icone: "bi-x-circle" },
            ].map((stat) => (
              <div className="col-auto" key={stat.label}>
                <div className="bg-white bg-opacity-25 rounded px-4 py-2">
                  <div className="fw-bold fs-4">{stat.valor}</div>
                  <div className="small">
                    <i className={`bi ${stat.icone} fs-5 me-1`}></i>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="container py-5">
        <InscricaoMonitoriaForm
          editaisAbertos={editaisAbertos}
          proximoId={candidaturas.length + 1}
          onInscrever={adicionarCandidatura}
        />

        {candidaturas.length > 0 && (
          <div className="alert alert-secondary" role="status">
            <i className="bi bi-inbox-fill me-2"></i>
            {candidaturas.length} candidatura(s) recebida(s) nesta sessão.
          </div>
        )}

        <NovoEditalForm
          onAdicionar={adicionarEdital}
          proximoId={editais.length + 1}
        />

        <BuscaEdital
          termoBusca={termoBusca}
          onBuscaChange={setTermoBusca}
          totalEncontrados={editaisFiltrados.length}
          totalEditais={editais.length}
        />

        <div className="d-flex gap-2 mb-4">
          {["Todos", "Aberto", "Encerrado", "Destaque"].map((filtro) => (
            <button
              key={filtro}
              className={`btn btn-sm ${
                filtroStatus === filtro ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => setFiltroStatus(filtro)}
            >
              {filtro === "Aberto" ? "Abertos" : filtro === "Encerrado" ? "Encerrados" : filtro}
            </button>
          ))}
        </div>

        {editaisFiltrados.length > 0 ? (
          <div className="row g-4">
            {editaisFiltrados.map((edital) => (
              <div className="col-md-6 col-lg-4" key={edital.id}>
                <EditalCard edital={edital} destaque={edital.destaque} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-5">
            Nenhum edital encontrado para <em>"{termoBusca}"</em>.{" "}
            <button className="btn btn-link p-0" onClick={() => { setTermoBusca(""); setFiltroStatus("Todos"); }}>
              Limpar busca
            </button>
          </p>
        )}
      </main>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-1">Sistema de Monitorias – IF Sudeste MG</p>
          <p className="mb-0 small">Desenvolvido para a disciplina Tecnologias Front-End</p>
        </div>
      </footer>
    </>
  );
}

export default App;