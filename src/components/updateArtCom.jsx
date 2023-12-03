import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams, useNavigate } from "react-router-dom";
import HeadImage from "./HeadImage";
import return2 from "../img/return2.png"
import EditCli from "../img/update.jpg"

const EditArticleCom = () => {
  const { numArtCom } = useParams();
  const navigate = useNavigate();
 

  const [articleComData, setArticleComData] = useState({ codeArticle: "", quantite: "" });
  const [articles, setArticles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadArticleComData(numArtCom);
    loadArticles();
  }, [numArtCom]);

  const loadArticleComData = async (numArtCom) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/getArticleComDetails.php?numArtCom=${numArtCom}`);
      setArticleComData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'article de commande : ", error);
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

  const handleArticleChange = (field, value) => {
    setArticleComData({
      ...articleComData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { codeArticle, quantite } = articleComData;

      if (codeArticle === "" || quantite === "") {
        setErrorMessage("Veuillez remplir tous les champs d'article.");
        return;
      }

      await axios.post("http://localhost/gestionCommande_PHP/updateArticleCom.php", {
        numArtCom,
        codeArticle,
        quantite,
      });

      setSuccessMessage("Article de commande mis à jour avec succès");
      navigate(`/Commande`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article de commande : ", error);
      setErrorMessage("Erreur lors de la mise à jour de l'article de commande.");
    }
  };

  return (
    <>
    <HeadImage/>
    <div className="BodyUpdate">
     <nav className="titrecom">
      
       <div data-aos="flip-right" data-aos-duration="3000">
      
        <p>Faite Votre Modification</p>
        
                                <hr></hr>
                            </div>
      </nav>
      <Link className="return" to="/Commande">
        <img src={return2} alt="Logout" />
      </Link>
      <form onSubmit={handleSubmit}>
      <div className="container_addcom">
            <div className="contact-form_addarmodif rowww">
        <div className="form-field_addarmodif">
    <p>Article</p>
          <select
            value={articleComData.codeArticle}
            onChange={(e) => handleArticleChange("codeArticle", e.target.value)}
            className="input-text"
          >
            {articles.map((article) => (
              <option key={article.codeArticle} value={article.codeArticle}>
                {article.design} - {article.dimension}
              </option>
            ))}
          </select>
        
          <input
            type="number"
            placeholder="Quantité"
            value={articleComData.quantite}
            onChange={(e) => handleArticleChange("quantite", e.target.value)}
            className="input-text"
          />
           <label htmlFor="nombreArticle" className="label_add">
                  Quantité
                </label>
        </div>
        <br />
        <div className="form-field_addarmodif">
        <input type="submit" value="Valider" className="btn4" />
        </div>
        </div>
        
    </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
    </div>
    <div class="content_imagearc">
        <img src= {EditCli} alt ="editcli" />
      </div>
    </>
  );
};

export default EditArticleCom;
