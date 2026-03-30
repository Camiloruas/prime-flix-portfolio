import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Camilo Ruas</h3>
          <p>Full Stack Developer focado em soluções modernas, automação e integrações de API.</p>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h4>Social</h4>
            <a href="https://www.linkedin.com/in/camilo-ruas-3a2a6425" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/Camiloruas" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          
          <div className="link-column">
            <h4>Contato</h4>
            <a href="mailto:miloruas@gmail.com">Email</a>
            <a href="https://wa.me/5579998448030" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>

          <div className="link-column">
            <h4>Portfolio</h4>
            <a href="https://camiloruas.dev/" target="_blank" rel="noreferrer">Website</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Prime-Flix. Criado por Camilo Ruas para fins de portfólio.</p>
      </div>
    </footer>
  );
}

export default Footer;
