import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("/movie/now_playing", {
          params: {
            language: "pt-br",
            page: 1,
          },
        });
        const results = Array.isArray(response.data?.results) ? response.data.results : [];
        setFilmes(results.slice(0, 18));
      } catch (error) {
        const mensagemApi = error.response?.data?.status_message || error.message || "Erro de conexão.";
        setErro(`Não foi possível carregar os filmes. ${mensagemApi}`);
      } finally {
        setLoading(false);
      }
    }
    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (erro) {
    return <div className="loading"><h1>{erro}</h1></div>;
  }

  const featured = filmes[0];
  const otherMovies = filmes.slice(1);

  return (
    <div className="container">
      {featured && (
        <section 
          className="hero" 
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 95%), url(https://image.tmdb.org/t/p/original/${featured.backdrop_path})`
          }}
        >
          <div className="hero-content">
            <h1>{featured.title}</h1>
            <p className="hero-description">{featured.overview.substring(0, 200)}...</p>
            <div className="hero-btns">
              <Link to={`/filme/${featured.id}`} className="btn-play">Assistir</Link>
              <Link to={`/filme/${featured.id}`} className="btn-info">Mais Informações</Link>
            </div>
          </div>
        </section>
      )}

      <div className="lista-filmes">
        <h2>Filmes em Alta</h2>
        <div className="grid-list">
          {otherMovies.map((filme) => (
            <article key={filme.id} className="movie-card">
              <Link to={`/filme/${filme.id}`}>
                <div className="card-media">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} 
                    alt={filme.title} 
                    loading="lazy"
                  />
                  <div className="card-overlay">
                    <strong>{filme.title}</strong>
                    <span className="rating">⭐ {filme.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
