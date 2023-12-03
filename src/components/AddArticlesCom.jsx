import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import return2 from '../img/return2.png';
import HeadImage from "./HeadImage";
import ajoucli from '../img/client.png';

const AddArticleCom = () => {
  const { numCom } = useParams();
  const navigate = useNavigate();

  const [articleComData, setArticleComData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadCommandeData(numCom);
    loadArticles();
  }, [numCom]);

  const loadCommandeData = async (numCom) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/getCommande.php?numCom=${numCom}`);
      const commande = response.data;
      const articlesToAdd = Array.from({ length: commande.nombreArticle }, () => ({
        codeArticle: "",
        quantite: "",
      }));
      setArticleComData(articlesToAdd);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de la commande : ", error);
    }
  };

  const loadArticles = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getAllArticles.php");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des articles : ", error);
    }
  };

  const handleArticleChange = (index, field, value) => {
    const updatedData = [...articleComData];
    updatedData[index][field] = value;
    setArticleComData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const areAllFieldsFilled = articleComData.every(
        (article) => article.quantite !== "" && article.codeArticle !== ""
      );

      if (!areAllFieldsFilled) {
        setErrorMessage("Veuillez remplir tous les champs d'articles.");
        return;
      }

      // Vérification pour ne pas ajouter le même article plusieurs fois
      const uniqueArticles = new Set();
      const areAllArticlesUnique = articleComData.every((article) => {
        if (uniqueArticles.has(article.codeArticle)) {
          setErrorMessage("Vous ne pouvez pas ajouter le même article plusieurs fois.");
          return false;
        }
        uniqueArticles.add(article.codeArticle);
        return true;
      });

      if (!areAllArticlesUnique) {
        return;
      }

      const articlesToAdd = articleComData.filter(
        (article) => article.quantite !== "" && article.codeArticle !== ""
      );
      await axios.post("http://localhost/gestionCommande_PHP/addArticleCom.php", {
        numCom,
        articles: articlesToAdd,
      });

      setSuccessMessage("Articles de commande ajoutés avec succès.");
      navigate("/Commande");
    } catch (error) {
      console.error("Erreur lors de l'ajout des articles de commande : ", error);
      setErrorMessage("Erreur lors de l'ajout des articles de commande.");
    }
  };

  return (
    <>
    <HeadImage/>
    <div className="BodyAdd">
      <nav className="titrearcom">
       <div data-aos="flip-right" data-aos-duration="3000">
        <p >Ajouter Les Articles Commandés</p>
        <hr></hr>
      </div>
      </nav>
      <Link className="return" to="/Commande">
        <img src={return2} alt="Logout" />
      </Link>

      <form onSubmit={handleSubmit}>
      <div className="contact-form_addarcom ">
        {articleComData.map((article, index) => (
          <div key={index} className="form-field_addarcom">
            <select
              value={article.codeArticle}
              onChange={(e) => handleArticleChange(index, "codeArticle", e.target.value)}
              className="input-text"
            >
              <option value="">Sélectionner un article</option>
              {articles.map((article) => (
                <option key={article.codeArticle} value={article.codeArticle}>
                  {article.design} - {article.dimension}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantité"
              value={article.quantite}
              onChange={(e) => handleArticleChange(index, "quantite", e.target.value)}
              className="input-text"
            />
          </div>
        ))}
        <br/>
        <input type="submit" value="Ajouter les Articles" className="btnarcom" />
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="content_imagearticle">
        <img src={ajoucli} alt="client" />
      </div>
    </div>
    
    </>
  );
};

export default AddArticleCom;
