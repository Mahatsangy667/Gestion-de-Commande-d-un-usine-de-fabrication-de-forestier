import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from '../img/deleted.png';
import Edit from '../img/Edit.png';
import {Modal,Button} from "react-bootstrap"
import { Link } from "react-router-dom";
import Search from '../img/search.png';

const TableClient = () => {
  const [infoClient, setInfoClient] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [chercher,setChercher] = useState("");
  const [showDependencyModal, setShowDependencyModal] = useState(false);

  const handleChange =(e)=>{
      //setSear({...sear,[e.target.name] : e.target.value})        
      let value = e.target.value;
      setChercher(value);
   }
   
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteClickcli = async (codeClient) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/checkDependenciesClient.php?codeClient=${codeClient}`);
      const hasDependencies = response.data.hasDependencies;

      if (hasDependencies) {
        setShowDependencyModal(true);
      } else {
        setClientToDelete(codeClient);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des dépendances : ", error);
    }
  };
  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/listeClient.php");
      const jsonData = response.data;
      setInfoClient(jsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };


  const handleConfirmDelete = async () => {
    try {
      await axios.post("http://localhost/gestionCommande_PHP/deleteClient.php", JSON.stringify({ codeClient: clientToDelete }));
      console.log("Code client à supprimer : ", clientToDelete);
      // Mise à jour de la liste après la suppression
      setInfoClient(infoClient.filter(client => client.codeClient !== clientToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du client : ", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
    <div className="search_Admin">
                                <input type="texte" placeholder="Recherche"
                                    onChange = {handleChange}
                                />
                                <img src={Search} />
                            </div>
      <div className="table1" data-aos="fade-up" data-aos-delay="10000" data-aos-duration="1000">
        <table className="content-table">
          <thead>
            <tr>
              <th>Code Du Client</th>
              <th>Nom Du Client</th>
              <th>Prenom Du Client</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {infoClient.filter((info) => { return ( info.codeClient.includes(chercher) || info.nomClient.includes(chercher) || info.prenomClient.includes(chercher))}).map(info=>{ return ( 
              <tr key={info.codeClient}>
                <td>{info.codeClient}</td>
                <td>{info.nomClient}</td>
                <td>{info.prenomClient}</td>
                <td id="ovaina">
                  <Link className ="Link" to={`/updateCli/${info.codeClient}`}>
                    <img src={Edit} alt="Modifier"/>
                  </Link>
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => handleDeleteClickcli(info.codeClient)}
                  />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
     
      <Modal show={showConfirmationModal} onHide={handleCloseModal} centered className="custom-modal">
  <Modal.Header closeButton>
    <Modal.Title className="modal-title">Confirmation de suppression</Modal.Title>
  </Modal.Header>
  <Modal.Body className="modal-body">
    Êtes-vous sûr de vouloir supprimer ce client ?
  </Modal.Body>
  <Modal.Footer className="modal-footer">
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

export default TableClient;
