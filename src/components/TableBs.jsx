import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modal,Button} from "react-bootstrap";
import Delete from '../img/deleted.png';

const ListeBS = () => {
  const [bonSortieData, setBonSortieData] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [comToDelete, setComToDelete] = useState(null);
  useEffect(() => {
 
    loadBonSortieData(); // Call the function here

  }, []); 
  const loadBonSortieData = async () => {
    try {
      // Replace the URL with the actual API endpoint for your "Bon de Sortie" data.
      const response = await axios.get(`http://localhost/gestionCommande_PHP/listeBS.php`);
      const bonSortieJsonData = response.data;
      setBonSortieData(bonSortieJsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des Bon de Sortie : ", error);
    }
  };
  
  const handleDeleteClick = (numBS) => {
    setComToDelete(numBS);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.post("http://localhost/gestionCommande_PHP/deleteBs.php", JSON.stringify({ numBS: comToDelete }));
      console.log("Commande à supprimer : ", comToDelete);
      setBonSortieData(bonSortieData.filter(bs => bs.numBS !== comToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande : ", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="tablebs">
      <table className="content-table">
        <thead>
          <tr>
            <th>Numéro de Bon de Sortie</th>
            <th>Quantité Livrée</th>
            <th>Date de Livraison</th>
            <th>Code de l'Article</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bonSortieData.map((bs) => (
            <tr key={bs.numBS}>
              <td>{bs.numBS}</td>
              <td>{bs.quantiteLiv}</td>
              <td>{bs.dateLiv}</td>
              <td>{bs.codeArticle}</td> {/* Display the codeArticle instead of numArtCom */}
              <td id="ovainaodf">
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => handleDeleteClick(bs.numBS)}
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
          Êtes-vous sûr de vouloir supprimer cette Bon Sortie ?
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
    </div>
  );
};

export default ListeBS;
