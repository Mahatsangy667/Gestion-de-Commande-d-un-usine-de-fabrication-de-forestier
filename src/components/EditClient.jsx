import React, { useState, useEffect } from "react";
import axios from "axios";  
import { Link, useParams } from "react-router-dom";
import HeadImage from "./HeadImage";
import return2 from '../img/return2.png';
import EditCli from "../img/update.jpg"

export default function UpdateClient(props) {
  const { codeClient } = useParams();

  const [clientData, setClientData] = useState({
    CodeClient: codeClient,
    nomClient: "",
    prenomClient: "",
  });

  useEffect(() => {
    // Chargez les données du client en utilisant le codeClient
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`http://localhost/gestionCommande_PHP/getClientDetails.php?codeClient=${codeClient}`);
        const client = response.data;
        setClientData(client);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du client : ", error);
      }
    };

    fetchClientData();
  }, [codeClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost/gestionCommande_PHP/updateClient.php", clientData);
      console.log("Client mis à jour avec succès :", clientData);
      // Rediriger vers la page 'TableClient.js' après la mise à jour réussie
      window.location.href = "/Client";
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client : ", error);
    }
  };

  return (
    <>
    <HeadImage/>
    <div className="BodyUpdate">
      <nav className="titreCli">
       <div data-aos="flip-right" data-aos-duration="3000">
        <p>Faite Votre Modification</p>
        <hr></hr>
       </div>
      </nav>
      <Link className="return" to="/Client">
        <img src={return2} alt="Logout" />
      </Link>
      <section className="get_in_touch">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="container_addcli">
            <div className="contact-form_addcli rowww">
              <div className="form-field_addcli">
                <input
                  id="nif"
                  className="input-text"
                  type="text"
                  name="CodeClient"
                  value={clientData.CodeClient}
                  onChange={e => handleChange(e)}
                  required disabled// Champ obligatoire
                />
                <label htmlFor="CodeClient" className="label_add">
                  Code Client
                </label>
              </div>
              <div className="form-field_addcli">
                <input
                  id="name1"
                  className="input-text"
                  type="text"
                  name="nomClient"
                  value={clientData.nomClient}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="nomClient" className="label_add">
                  Nom
                </label>
              </div>

              <div className="form-field_addcli">
                <input
                  id="cin"
                  className="input-text"
                  type="text"
                  name="prenomClient"
                  value={clientData.prenomClient}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="prenomClient" className="label_add">
                  Prénom
                </label>
              </div>

              <div className="form-field_addcli">
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
