import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import HeadImage from "./HeadImage";
import return2 from "../img/return2.png";
import EditCli from "../img/update.jpg"

export default function UpdatePersonnel() {
  const { numMatricule } = useParams();
  const [postes, setPostes] = useState([]);
  const [personnelData, setPersonnelData] = useState({
    numMatricule: numMatricule,
    nomEmp: "",
    prenomEmp: "",
    poste: ""
  });

  useEffect(() => {
    const fetchPersonnelData = async () => {
      try {
        const response = await axios.get(`http://localhost/gestionCommande_PHP/getPersonnelDetails.php?numMatricule=${numMatricule}`);
        const personnel = response.data;
        setPersonnelData(personnel);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du personnel : ", error);
      }
    };
    fetchPersonnelData();
    const fetchPostes = async () => {
      try {
        const response = await axios.get("http://localhost/gestionCommande_PHP/getPosts.php");
        setPostes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des postes : ", error);
      }
    };

    fetchPostes();
  }, [numMatricule]);

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
      await axios.post("http://localhost/gestionCommande_PHP/updatePersonnel.php", personnelData);
      console.log("Personnel mis à jour avec succès :", personnelData);
      // Rediriger vers la page 'TablePersonnel.js' après la mise à jour réussie
      window.location.href = "/Personnel";
    } catch (error) {
      console.error("Erreur lors de la mise à jour du personnel : ", error);
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
      <Link className="return" to="/Personnel">
        <img src={return2} alt="Logout" />
      </Link>

      <section className="get_in_touch">
        <form onSubmit={handleSubmit}>
          <div className="container_addcli">
            <div className="contact-form_addcli rowww">
              <div className="form-field_addcli">
                <input
                  id="numMatricule" // Mettez à jour l'ID de l'input
                  className="input-text"
                  type="text"
                  name="numMatricule"
                  value={personnelData.numMatricule}
                  onChange={handleChange} disabled
                />
                <label htmlFor="numMatricule" className="label_add">
                  Numéro de Matricule
                </label>
              </div>
              <div className="form-field_addcli">
                <input
                  id="nomEmp"
                  className="input-text"
                  type="text"
                  name="nomEmp"
                  value={personnelData.nomEmp}
                  onChange={handleChange}
                />
                <label htmlFor="nomEmp" className="label_add">
                  Nom
                </label>
              </div>

              <div className="form-field_addcli">
                <input
                  id="prenomEmp"
                  className="input-text"
                  type="text"
                  name="prenomEmp"
                  value={personnelData.prenomEmp}
                  onChange={handleChange}
                  required="required"
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
                  name="poste"
                  className="input-text"
                  value={personnelData.poste}
                  onChange={handleChange}
                  required
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
                  value="Modifier"
                />
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
