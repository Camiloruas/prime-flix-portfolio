import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            language: "pt-br",
          },
        });
        setFilme(response.data);
        setloading(false);
      } catch {
        setloading(false);
        navigate("/", { replace: true });
      }
    }
    loadFilme();
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn("Esse Filme já está na sua lista!");
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="loading-container">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="filme-container">
      <div 
        className="backdrop" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(20,20,20,1) 30%, rgba(20,20,20,0) 100%), url(https://image.tmdb.org/t/p/original/${filme.backdrop_path})`
        }}
      >
        <div className="details-wrapper">
          <div className="poster-side">
             <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} />
          </div>
          
          <div className="info-side">
            <h1>{filme.title}</h1>
            <div className="meta">
              <span className="rating-badge">⭐ {filme.vote_average?.toFixed(1)}</span>
              <span>{filme.release_date?.split('-')[0]}</span>
              <span>{filme.runtime} min</span>
            </div>
            
            <p className="overview">{filme.overview}</p>
            
            <div className="actions">
              <button className="btn-save" onClick={salvarFilme}>Adicionar à Lista</button>
              <a 
                className="btn-trailer"
                target="_blank" 
                rel="noreferrer" 
                href={`https://youtube.com/results?search_query=${filme.title} Trailer Oficial`}
              >
                Assistir Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filme;
