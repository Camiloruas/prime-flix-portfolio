import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Filme from "./pages/Filme/index";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Favoritos from "./pages/favoritos";
import Footer from "./components/Footer";


function RoutesApp() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filme/:id" element={<Filme />} />
          <Route path="/favoritos" element={<Favoritos />} />

          {/* o NotFound precisar ser o ultimo salvarFilme */}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>

    </BrowserRouter>
  );
}

export default RoutesApp;
