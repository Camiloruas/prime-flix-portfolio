import { useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    return JSON.parse(minhaLista) || [];
  });

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("Item removido com sucesso!");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes</h1>
      {filmes.length === 0 && <span>Você não possui nenhum filme salvo.</span>}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span className="movie-title">{item.title}</span>
              <div className="movie-actions">
                <Link to={`/filme/${item.id}`} className="details-link">Ver detalhes</Link>

                <button className="delete-button" onClick={() => excluirFilme(item.id)}>
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
