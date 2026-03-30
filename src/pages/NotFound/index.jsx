import { Link } from "react-router-dom";
import "./notfound.css";

// Pagina exibida quando a rota digitada nao existe.
function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Parece que essa pagina não existe</h2>
      <div className="notfound-menu">
        {/* Link para levar o usuario de volta para a pagina inicial. */}
        <Link to="/">Voltar para a Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
