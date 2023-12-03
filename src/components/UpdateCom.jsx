import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import HeadImage from "./HeadImage";
import return2 from "../img/return2.png";
import EditCli from "../img/update.jpg"

export default function UpdateCommande() {
  const { numCom } = useParams();
  const [commandeData, setCommandeData] = useState({
    numRef: "",
    typeRef: "",
    dateCom: "",
    statut: "",
    nombreArticle: "",
    codeClient: "",
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getNomClient");
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des clients : ", error);
    }
  };

  useEffect(() => {
    // Chargez les données de la commande en utilisant le numéro de commande (numCom)
    const fetchCommandeData = async () => {
      try {
        const response = await axios.get(`http://localhost/gestionCommande_PHP/getCommande.php?numCom=${numCom}`);
        const commande = response.data;
        setCommandeData(commande);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de la commande : ", error);
      }
    };

    fetchCommandeData();
  }, [numCom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommandeData({
      ...commandeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost/gestionCommande_PHP/updateCommande.php", commandeData);
      console.log("Commande mise à jour avec succès :", commandeData);
      // Rediriger vers la page 'TableCommande.js' après la mise à jour réussie
      window.location.href = "/Commande";
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande : ", error);
    }
  };

  return (
    <>
      <HeadImage />
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

        <section className="get_in_touch">
          <form onSubmit={handleSubmit}>
            <div className="container_addcom">
              <div className="contact-form_addcommodif rowww">
                <div className="form-field_addcommodif">
                  <input
                    className="input-text"
                    type="text"
                    name="numRef"
                    value={commandeData.numRef}
                    onChange={handleChange}
                    required disabled // Champ obligatoire
                  />
                  <label htmlFor="numRef" className="label_add">
                    Numéro de Référence
                  </label>
                </div>
                <div className="form-field_addcommodif">
                  <input
                    className="input-text"
                    type="text"
                    name="typeRef"
                    value={commandeData.typeRef}
                    onChange={handleChange}
                    required // Champ obligatoire
                  />
                  <label htmlFor="typeRef" className="label_add">
                    Type de Référence
                  </label>
                </div>
                <div className="form-field_addcommodif">
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
                <div className="form-field_addcommodif">
                  <input
                    className="input-text"
                    type="text"
                    name="statut"
                    value={commandeData.statut}
                    onChange={handleChange}
                    required // Champ obligatoire
                  />
                  <label htmlFor="statut" className="label_add">
                    Statut
                  </label>
                </div>
                <div className="form-field_addcommodif">
                  <input
                    className="input-text"
                    type="text"
                    name="nombreArticle"
                    value={commandeData.nombreArticle}
                    onChange={handleChange}
                    required disabled// Champ obligatoire
                  />
                  <label htmlFor="nombreArticle" className="label_add">
                    Nombre d'Articles
                  </label>
                </div>
                <div className="form-field_addcommodif">
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
                <div className="form-field_addcommodif">
                  <input type="submit" className="btn4" name="submit" value="Modifier" />
                </div>
              </div>
            </div>
          </form>
        </section>
        <div class="content_imagecli">
        <img src= {EditCli} alt ="editcli" />
      </div>
      </div>
    </>
  );
}
