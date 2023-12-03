import React, { useState } from "react";
import axios from "axios";
import return2 from '../img/return2.png';
import ajoucli from '../img/client.png';
import { Link, useNavigate } from "react-router-dom";
import HeadImage from "./HeadImage";

export default function Add() {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    CodeClient: "",
    nomClient: "",
    prenomClient: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/gestionCommande_PHP/addClient.php", clientData);
      if (response.data.message === "Client ajouté avec succès") {
        console.log("Client ajouté avec succès :", response.data);
        setSuccessMessage("Client ajouté avec succès");
        setErrorMessage("");
        setClientData({
          CodeClient: "",
          nomClient: "",
          prenomClient: ""
        });
        navigate("/Client");
      } else if (response.data.message === "CodeClient déjà existant") {
        setErrorMessage("CodeClient déjà existant");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du client : ", error);
      setErrorMessage("Erreur lors de l'ajout du client.");
      setSuccessMessage("");
    }};

  return (
    <>
    <HeadImage/>
    <div className="BodyAdd">
      
      <nav className="titreCli">
     
       <div data-aos="flip-right" data-aos-duration="3000">
      
        <p>Ajouter les nouveaux Clients</p>
        
                                <hr></hr>
                            </div>
      </nav>
      <Link className="return" to="/choices">
        <img src={return2} alt="Retour" />
      </Link>
      <section className="get_in_touch">
        <form onSubmit={handleSubmit}>
          <div className="container_addcli">
            <div className="contact-form_addcli rowww">
              <div className="form-field_addcli">
                <input
                  id="nif"
                  className="input-text"
                  type="text"
                  name="CodeClient"
                  value={clientData.CodeClient}
                  onChange={handleChange}
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
                  required="required"
                />
                <label htmlFor="prenomClient" className="label_add">
                  Prénom
                </label>
              </div>

              <div className="form-field_addcli">
                <input
                  type="submit"
                  className="btn4"
                  name="submit"
                  value="Valider"
                />
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
}
