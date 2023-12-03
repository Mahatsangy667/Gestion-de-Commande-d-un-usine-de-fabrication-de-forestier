import React, { useState, useEffect } from "react";
import axios from "axios";
import return2 from '../img/return2.png';
import { Link, useNavigate } from "react-router-dom";
import HeadImage from "./HeadImage";
import ajoucli from '../img/client.png';

export default function AddPersonnel() {
  const navigate = useNavigate();

  const [personnelData, setPersonnelData] = useState({
    numMatricule: "",
    nomEmp: "",
    prenomEmp: "",
    poste: ""
  });
  const [postes, setPostes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnelData({
      ...personnelData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost/gestionCommande_PHP/addPersonnel.php", personnelData);
      console.log("Réponse du serveur :", response.data);

      if (response.data.message === "Numéro de Matricule déjà existant") {
        setErrorMessage("Numéro de Matricule déjà existant");
      } else if (response.data.message === "Personnel ajouté avec succès") {
        setSuccessMessage("Personnel ajouté avec succès");
        navigate("/Personnel")
        setErrorMessage(""); // Réinitialisez les messages d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du personnel : ", error);
      setErrorMessage("Erreur lors de l'ajout du personnel.");
    }
  };

  const fetchPostes = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/getPosts.php");
      setPostes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des postes : ", error);
    }
  };

  useEffect(() => {
    fetchPostes();
  }, []);

  return (
    <>
    <HeadImage/>
    <div className="BodyAdd">
      <nav className="titreCli">
        <div data-aos="flip-right" data-aos-duration="3000">
          <p>Ajouter les nouveaux Employés</p>
          <hr></hr>
        </div>
      </nav>
      <Link className="return" to="/Personnel">
        <img src={return2} alt="Logout" />
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
                  name="numMatricule"
                  value={personnelData.numMatricule}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="numMatricule" className="label_add">
                  Numéro de Matricule
                </label>
              </div>
              <div className="form-field_addcli">
                <input
                  id="name1"
                  className="input-text"
                  type="text"
                  name="nomEmp"
                  value={personnelData.nomEmp}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="nomEmp" className="label_add">
                  Nom
                </label>
              </div>
              <div className="form-field_addcli">
                <input
                  id="cin"
                  className="input-text"
                  type="text"
                  name="prenomEmp"
                  value={personnelData.prenomEmp}
                  onChange={handleChange}
                  required // Champ obligatoire
                />
                <label htmlFor="prenomEmp" className="label_add">
                  Prénom
                </label>
              </div>
              <div className="form-field_addcli">
                <label htmlFor="poste" className="label_add">
                  Poste
                </label>
                <select
                  id="poste"
                  className="input-text"
                  name="poste"
                  value={personnelData.poste}
                  onChange={handleChange}
                  required // Champ obligatoire
                >
                  <option value="">Sélectionnez un poste</option>
                  {postes.map((poste) => (
                    <option key={poste} value={poste}>
                      {poste}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field_addcli">
                <input
                  type="submit"
                  className="btn4"
                  name="submit"
                  value="Ajouter" // Bouton "Ajouter" plutôt que "Add"
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
