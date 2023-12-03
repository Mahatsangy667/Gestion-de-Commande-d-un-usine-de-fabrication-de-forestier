import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import return2 from '../img/return2.png';
import HeadImage from "./HeadImage";
import ajoucli from '../img/client.png';
const AddCommande = () => {
  const navigate = useNavigate();

  const [commandeData, setCommandeData] = useState({
    numRef: "",
    typeRef: "",
    dateCom: "",
    statut: "",
    nombreArticle: "",
    codeClient: "",
  });
  const [clients, setClients] = useState([]);
  const [references, setReferences] = useState([]); // État pour stocker les données de la table 'reference'
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadClients();
    loadReferences(); // Chargez les données de la table 'reference' lors de l'initialisation du composant
  }, []);

  const loadClients = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getNomClient.php");
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des clients : ", error);
    }
  };

  const loadReferences = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getRef.php");
      setReferences(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de référence : ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommandeData({
      ...commandeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si les champs obligatoires sont remplis
    if (
      !commandeData.numRef ||
      !commandeData.typeRef ||
      !commandeData.dateCom ||
      !commandeData.statut ||
      !commandeData.nombreArticle ||
      !commandeData.codeClient
    ) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await axios.post("http://localhost/gestionCommande_PHP/addCommande.php", commandeData);
      console.log("Commande ajoutée avec succès :", response.data);
      setSuccessMessage("Commande ajoutée avec succès.");

      // Réinitialiser les champs du formulaire après l'ajout
      setCommandeData({
        numRef: "",
        typeRef: "",
        dateCom: "",
        statut: "",
        nombreArticle: "",
        codeClient: "",
      });

      // Rediriger vers la page 'Commande' après un ajout réussi
      navigate("/Commande");
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
        <p>Ajouter Les Nouveaux Commandes</p>
        <hr></hr>
      </div>
      </nav>
      <Link className="return" to="/Commande">
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
                  name="numRef"
                  value={commandeData.numRef}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="numRef" className="label_add">
                  Numéro de Référence
                </label>
              </div>
              <div className="form-field_addcom">
                <select
                  name="typeRef"
                  value={commandeData.typeRef}
                  onChange={handleChange}
                  className="input-text"
                  required // Champ obligatoire
                >
                  <option value="">Sélectionnez un type de référence</option>
                  {references.map((reference) => (
                    <option key={reference} value={reference}>
                      {reference}
                    </option>
                  ))}
                </select>
                <label htmlFor="codeClient" className="label_add">
                  Type De Référence
                </label>
              </div>
              <div className="form-field_addcom">
                <input
                  className="input-text"
                  type="date"
                  name="dateCom"
                  value={commandeData.dateCom}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="dateCom" className="label_add">
                  Date de Commande
                </label>
              </div>
              <div className="form-field_addcom">
                <input
                  className="input-text"
                  type="text"
                  name="nombreArticle"
                  value={commandeData.nombreArticle}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="nombreArticle" className="label_add">
                  Nombre d'Articles
                </label>
              </div>
              <div className="form-field_addcom">
              <select
                  name="statut"
                  value={commandeData.statut}
                  onChange={handleChange}
                  className="input-text"
                  required // Champ obligatoire
                >
                  <option value="">Sélectionner le statut</option>
                  <option value="En cours">En cours</option>
                </select>
                <label htmlFor="statut" className="label_add">
                  Statut
                </label>
              </div>
              <div className="form-field_addcom">
                <select
                  name="codeClient"
                  value={commandeData.codeClient}
                  onChange={handleChange}
                  className="input-text"
                  required // Champ obligatoire
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.codeClient} value={client.codeClient}>
                      {client.nomClient} {client.prenomClient}
                    </option>
                  ))}
                </select>
                <label htmlFor="codeClient" className="label_add">
                  Code Client
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

export default AddCommande;
