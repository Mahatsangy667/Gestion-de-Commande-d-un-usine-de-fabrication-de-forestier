import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import return2 from '../img/return2.png';
import HeadImage from "./HeadImage";
import ajoucli from '../img/client.png';

const AddArticle = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState({
    codeArticle: "",
    design: "",
    dimension: "",
    unite: "",
    depot: "",
  });
  const [depots, setDepots] = useState([]); // État pour stocker les données de la table 'reference'
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadDepot(); // Chargez les données de la table 'reference' lors de l'initialisation du composant
  }, []);

  

  const loadDepot = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getDepot.php");
      setDepots(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de référence : ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticles({
      ...articles,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si les champs obligatoires sont remplis
    if (
      !articles.codeArticle ||
      !articles.design ||
      !articles.unite ||
      !articles.depot 
    ) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await axios.post("http://localhost/gestionCommande_PHP/addArticle.php", articles);
      console.log("Commande ajoutée avec succès :", response.data);
      setSuccessMessage("Commande ajoutée avec succès.");

      // Réinitialiser les champs du formulaire après l'ajout
      setArticles({
        codeArticle: "",
        design: "",
        dateCom: "",
        dimension: "",
        unite: "",
        depot: "",
      });

      // Rediriger vers la page 'Commande' après un ajout réussi
      navigate("/Articles");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande : ", error);
      setErrorMessage("Erreur lors de l'ajout de la commande.");
    }
  };

  return (
    <>
    <HeadImage/>
    <div className="BodyAdd">
      <nav className="titrecom">
       <div data-aos="flip-right" data-aos-duration="3000">
        <p>Ajouter Les Nouveaux Articles</p>
        <hr></hr>
      </div>
      </nav>
      <Link className="return" to="/Articles">
        <img src={return2} alt="Logout" />
      </Link>

      <section className="get_in_touch">
        <form onSubmit={handleSubmit}>
          <div className="container_addcom">
            <div className="contact-form_addcom rowww">
              <div className="form-field_addcom">
                <input
                  className="input-text"
                  type="text"
                  name="codeArticle"
                  value={articles.codeArticle}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="codeArticle" className="label_add">
                  Code Article
                </label>
              </div>
              <div className="form-field_addcom">
                <input
                  className="input-text"
                  type="text"
                  name="design"
                  value={articles.design}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="design" className="label_add">
                  Designation
                </label>
              </div>
             
              <div className="form-field_addcom">
                <input
                  className="input-text"
                  type="text"
                  name="dimension"
                  value={articles.dimension}
                  onChange={handleChange}
                
                />
                <label htmlFor="dimension" className="label_add">
                  Dimension
                </label>
              </div>
              <div className="form-field_addcom">
                <input
                  className="input-text"
                  type="text"
                  name="unite"
                  value={articles.unite}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="unite" className="label_add">
                  Unite
                </label>
              </div>
              <div className="form-field_addcom">
                <select
                  name="depot"
                  value={articles.depot}
                  onChange={handleChange}
                  className="input-text"
                  required // Champ obligatoire
                >
                  <option value="">Sélectionnez Un Depôt</option>
                  {depots.map((depot) => (
                    <option key={depot} value={depot}>
                      {depot}
                    </option>
                  ))}
                </select>
                <label htmlFor="depot" className="label_add">
                  Depôt
                </label>
              </div>
              <div className="form-field_addcom">
                <input type="submit" className="btn4" name="submit" value="Add" />
              </div>
            </div>
          </div>
        </form>
      </section>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="content_imagecli">
        <img src={ajoucli} alt="client" />
      </div>
    </div>
    </>
  );
};

export default AddArticle;
