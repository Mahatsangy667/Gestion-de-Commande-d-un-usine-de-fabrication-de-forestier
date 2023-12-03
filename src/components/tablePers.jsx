import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from '../img/Delete.png';
import Edit from '../img/Edit.png';
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from '../img/search.png';

const TablePersonnel = () => {
  const [infoPersonnel, setInfoPersonnel] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [personnelToDelete, setPersonnelToDelete] = useState(null);
  const [chercher,setChercher] = useState("");
  const [showDependencyModal, setShowDependencyModal] = useState(false);

  const handleChange =(e)=>{
    //setSear({...sear,[e.target.name] : e.target.value})        
    let value = e.target.value;
    setChercher(value);
 }
  useEffect(() => {
    loadPersonnel();
  }, []);
  const handleDeleteClickpers = async (numMatricule) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/checkDependenciesPersonnel.php?numMatricule=${numMatricule}`);
      const hasDependencies = response.data.hasDependencies;

      if (hasDependencies) {
        setShowDependencyModal(true);
      } else {
        setPersonnelToDelete(numMatricule);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des dépendances : ", error);
    }
  };

  const loadPersonnel = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/listePersonnel.php");
      const jsonData = response.data;
      setInfoPersonnel(jsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };



  const handleConfirmDelete = async () => {
    try {
      await axios.post("http://localhost/gestionCommande_PHP/deletePersonnel.php", JSON.stringify({ numMatricule: personnelToDelete }));
      console.log("Numéro de matricule à supprimer : ", personnelToDelete);
      // Mise à jour de la liste après la suppression
      setInfoPersonnel(infoPersonnel.filter(personnel => personnel.numMatricule !== personnelToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du personnel : ", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className="search_Adminpers">
                                <input type="texte" placeholder="Recherche"
                                    onChange = {handleChange}
                                />
                                <img src={Search} />
                            </div>
      <div className="tablepers">
        <table className="content-table">
          <thead>
            <tr>
              <th>Numéro de Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Poste</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {infoPersonnel.filter((info) => { return ( info.numMatricule.includes(chercher) || info.nomEmp.includes(chercher) || info.prenomEmp.includes(chercher) || info.nomPoste.includes(chercher))}).map(info=>{ return (
              <tr key={info.numMatricule}>
                <td>{info.numMatricule}</td>
                <td>{info.nomEmp}</td>
                <td>{info.prenomEmp}</td>
                <td>{info.nomPoste}</td>
                <td id="ovaina">
                  <Link className="Link" to={`/updatePersonnel/${info.numMatricule}`}>
                    <img src={Edit} alt="Modifier" />
                  </Link>
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => handleDeleteClickpers(info.numMatricule)}
                  />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer ce personnel ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDependencyModal} onHide={() => setShowDependencyModal(false)} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Dépendances détectées</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          Cet élément a des dépendances et ne peut pas être supprimé.
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="primary" onClick={() => setShowDependencyModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TablePersonnel;
