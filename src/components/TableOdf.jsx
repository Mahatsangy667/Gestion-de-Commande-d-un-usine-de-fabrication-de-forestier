import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from '../img/deleted.png';
import {Modal,Button} from "react-bootstrap"



const ListeODF = () => {
  const [ODF, setODF] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showDependencyModal, setShowDependencyModal] = useState(false);

  const handleDeleteClickcli = async (numOrdFab) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/checkDependencies.php?numOrdFab=${numOrdFab}`);
      const hasDependencies = response.data.hasDependencies;

      if (hasDependencies) {
        setShowDependencyModal(true);
      } else {
        setClientToDelete(numOrdFab);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des dépendances : ", error);
    }
  };
 
  useEffect(() => {
    loadODF(); // Appelez la fonction ici

  }, []); 
  const loadODF = async () => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/listeODF.php`);
      const jsonData = response.data;
      setODF(jsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des ODF : ", error);
    }
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.post("http://localhost/gestionCommande_PHP/deleteOrdreFab.php", JSON.stringify({ numOrdFab: clientToDelete }));

      // Mise à jour de la liste après la suppression
      setODF(ODF.filter(ODF => ODF.codeClient !== clientToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du client : ", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="tableodf">
      <table className="content-tableodf">
        <thead>
          <tr>
            <th>Numéro de l' ODF</th>
            <th>Numéro de l'article commandés</th>
            <th>Numéro du devis</th>
            <th>Delai de fabrication</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ODF.map((odf) => (
            <tr key={odf.numOrdFab}>
              <td>{odf.numOrdFab}</td>
              <td>{odf.numArtCom}</td>
              <td>{odf.numDevis}</td> 
              <td>{odf.delaiFab}</td>
              <td id="ovainaodf">
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => handleDeleteClickcli(odf.numOrdFab)}
                  />
                </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Confirmation Modal */}
       <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette Odre De Fabrication ?
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
    </div>
    
  );
};

export default ListeODF;
