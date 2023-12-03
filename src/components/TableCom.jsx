import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from '../img/deleted.png';
import list from '../img/list.png';
import Edit from '../img/Edit.png';
import AC from '../img/add2.png';
import Ldf from '../img/pdf.png';
import BS from '../img/expedie.png';
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoFA from "../img/logoFA.png";
import XLSX from 'xlsx';

const customModalStyles = {
  content: {
    width: '300px',
    margin: 'auto',
    height: '200px',
    background: 'white'
  }
};

const TableCom = () => {
  const [infoCom, setInfoCom] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [comToDelete, setComToDelete] = useState(null);
  const navigate = useNavigate();
  const [annee, setAnnee] = useState("");
  const [mois, setMois] = useState("");
  const [showDependencyModal, setShowDependencyModal] = useState(false);

  const generateExcelFile = () => {
    // Créez la feuille Excel
    const ws = XLSX.utils.json_to_sheet(infoCom);
  
    // Personnalisez la largeur des colonnes si nécessaire
    ws['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 15 }];
  
    // Ajoutez les entêtes améliorées du tableau à partir de la ligne 2
    XLSX.utils.sheet_add_json(ws, [
      {
        'Numéro Du Commande': 'Numéro Du Commande',
        'Numéro du Référence': 'Numéro du Référence',
        'Type du Référence': 'Type du Référence',
        'Date Du Commande': 'Date Du Commande',
        'Statut': 'Statut',
        'Nombre Article Commandé': 'Nombre Article Commandé',
        'Code du Client': 'Code du Client'
      }
    ], { skipHeader: true, origin: 'A1' });
  
    // Créez un classeur
    const wb = XLSX.utils.book_new();
  
    // Ajoutez la feuille Excel au classeur
    XLSX.utils.book_append_sheet(wb, ws, "Commande Data");
  
    // Enregistrez le fichier Excel avec le titre personnalisé
    XLSX.writeFile(wb, "Liste_des_Commandes.xlsx");
  };
  
  
  
  
  useEffect(() => {
    loadCommandes();
  }, [annee, mois]);


  const handleDeleteClickcli = async (numCom) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/checkDependenciesCommande.php?numCom=${numCom}`);
      const hasDependencies = response.data.hasDependencies;

      if (hasDependencies) {
        setShowDependencyModal(true);
      } else {
        setComToDelete(numCom);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des dépendances : ", error);
    }
  };

  const loadCommandes = async () => {
    try {
      const response = await axios.get("http://localhost/gestionCommande_PHP/listeCommande.php");
      const jsonData = response.data;

      const filteredCommandes = jsonData.filter(info => {
        const date = new Date(info.dateCom);
        const selectedAnnee = annee ? parseInt(annee, 10) : date.getFullYear();
        const selectedMois = mois ? parseInt(mois, 10) : date.getMonth() + 1;
        return (
          (selectedAnnee === date.getFullYear()) &&
          (selectedMois === date.getMonth() + 1)
        );
      });

      setInfoCom(filteredCommandes);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const handleDeleteClick = (numCom) => {
    setComToDelete(numCom);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.post("http://localhost/gestionCommande_PHP/deleteCommande.php", JSON.stringify({ numCom: comToDelete }));
      console.log("Commande à supprimer : ", comToDelete);
      setInfoCom(infoCom.filter(com => com.numCom !== comToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande : ", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleACClick = async (numCom) => {
    try {
      const response = await axios.post("http://localhost/gestionCommande_PHP/getExistingArticles.php", {
        numCom: numCom
      });

      const articlesCount = response.data.count;
      if (articlesCount > 0) {
        alert("Les articles commandés de cette commande sont déjà ajoutés.");
      } else {
        navigate(`/AC/${numCom}`);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des articles commandés : ", error);
    }
  };

  const generatePDFByNumCom = async (numCom) => {
    const response = await axios.get(`http://localhost/gestionCommande_PHP/getdetldf.php?numCom=${numCom}`);
    const commandeDetails = response.data;

    const {
      numRef,
      typeRef,
      dateCom,
      nomClient,
      prenomClient,
      articles,
      delaiFab,
      numOrdFab,
    } = commandeDetails;

    const dateCommande = new Date(dateCom);
    dateCommande.setDate(dateCommande.getDate() + parseInt(delaiFab, 10));

    const jour = dateCommande.getDate().toString().padStart(2, '0');
    const mois = (dateCommande.getMonth() + 1).toString().padStart(2, '0');
    const annee = dateCommande.getFullYear().toString();

    const dateFormate = `${jour}-${mois}-${annee}`;

    const doc = new jsPDF();

    doc.setFont("Spy Agency");
    doc.setFontSize(11);
    doc.text("              FANALAMANGA SA", 10, 10);
    doc.text("                        DPCM", 10, 15);
    doc.text("SERVICE DE TRANSFORMATION", 10, 20);
    doc.text("                ANALAVOATRA", 10, 25);

    doc.addImage(logoFA, 'PNG', 172, 2, 30, 30);

    doc.setFont('Spy Agency', 'bold');
    doc.setFontSize(16);
    doc.text(`                                       LANCEMENT DE FABRICATION                     N° ${numCom}`, 10, 55);
    doc.setFont('Spy Agency', 'normal');
    doc.setFontSize(12);
    doc.text(`Référence:  ` + `${typeRef} ` + ` ${numRef}                                                                                              Date de Commande: ${dateFormate}`, 10, 70);
    doc.text(`Nom du Demandeur: ${nomClient} ${prenomClient}`, 10, 77);

    doc.text("Tableau des Articles:", 10, 90);
    const tableHeaders = ["Code Article", "Désignation", "Dimension", "Unité", "Quantité", "N° ODF"];
    const tableData = articles && Array.isArray(articles) ? articles.map((article) => [
      article.codeArticle,
      article.design,
      article.dimension,
      article.unite,
      article.quantite,
      article.numOrdFab,
    ]) : [];

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 100,
    });

    doc.text("Accordé par le Chef de Service Transformation                                                               Analavoatra le ", 10, 230);
    doc.text("Ce ..../..../.......                                                                                                    Le Responsable de Fabrication", 10, 240);
    doc.save("commande_details.pdf");
  };

  return (
    <>
      <div className="search_Admincom">
        <input value="Excel"  className="btn btn-success mb-3" onClick={generateExcelFile}/>
        <input
          className="mb-3"
          type="number" min="2020"
          placeholder="Année"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
        />
        <input
          className="mb-3"
          type="number" min="1"
          max="12"
          placeholder="Mois"
          value={mois}
          onChange={(e) => setMois(e.target.value)}
        />
      </div>
      <div className="tablecom">
        <table className="content-table">
          <thead>
            <tr>
              <th>Numéro Du Commande</th>
              <th>Numéro du Référence</th>
              <th>Type du Référence</th>
              <th>Date Du Commande</th>
              <th>Statut</th>
              <th>Nombre Article Commandé</th>
              <th>Code du  Client</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {infoCom.map(info => {
              return (
                <tr key={info.numCom}>
                  <td>{info.numCom}</td>
                  <td>{info.numRef}</td>
                  <td>{info.typeRef}</td>
                  <td>{info.dateCom}</td>
                  <td>{info.statut}</td>
                  <td>{info.nombreArticle}</td>
                  <td>{info.codeClient}</td>
                  <td id="ovainacom">
                    <img
                      src={AC}
                      alt="AC"
                      onClick={() => handleACClick(info.numCom)}
                    />
                    <Link className="Link" to={`/articleCommande/${info.numCom}`}>
                      <img src={list} alt="list" />
                    </Link>
                    <Link className="Link" to={`/updateCom/${info.numCom}`}>
                      <img src={Edit} alt="Modifier" />
                    </Link>
                    <img
                      src={Delete}
                      alt="Delete"
                      onClick={() => handleDeleteClickcli(info.numCom)}
                    />
                    <img
                      src={Ldf}
                      alt="LDF"
                      onClick={() => generatePDFByNumCom(info.numCom)}
                    />
                    <Link className="Link" to={`/addBS/${info.numCom}`}>
                      <img src={BS} alt="BON DE SORTIE" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette commande ?
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

export default TableCom;
