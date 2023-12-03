import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Delete from '../img/Delete.png';
import { Modal, Button } from "react-bootstrap";

const Article = () => {
  const [Articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [ArticlesToDelete, setArticlesToDelete] = useState(null);
  const [chercher, setChercher] = useState("");
  const [showDependencyModal, setShowDependencyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get(`http://localhost/gestionCommande_PHP/listeArticles.php`);
        const jsonData = response.data;
        setArticles(jsonData);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles commandés : ", error);
      }
    };

    loadArticles();
  }, []);

  const handleDeleteClickpers = async (codeArticle) => {
    try {
      const response = await axios.get(`http://localhost/gestionCommande_PHP/checkDependenciesArticles.php?codeArticle=${codeArticle}`);
      const hasDependencies = response.data.hasDependencies;

      if (hasDependencies) {
        setShowDependencyModal(true);
      } else {
        setArticlesToDelete(codeArticle);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des dépendances : ", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.post("http://localhost/gestionCommande_PHP/deleteArticle.php", JSON.stringify({ codeArticle: ArticlesToDelete }));
      // Mise à jour de la liste après la suppression
      setArticles(Articles.filter(Article => Article.codeArticle !== ArticlesToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du personnel : ", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleChange = (e) => {
    setChercher(e.target.value);
  };

  return (
    <>
      <div className="search_Adminpers">
        <select value={chercher} onChange={handleChange}>
          <option value="">Tous les dépôts</option>
          <option value="Menuiserie">Menuiserie</option>
          <option value="Scierie">Scierie</option>
        </select>
      </div>
      <div className="tableAr" data-aos="zoom-out-left" data-aos-delay="1000" data-aos-duration="1000">
        <table className="content-tablearticles">
          <thead>
            <tr>
              <th>Code Article</th>
              <th>Designation</th>
              <th>Dimension</th>
              <th>Unité</th>
              <th>Depôt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Articles
              .filter((article) => {
                if (chercher === "") {
                  return true; // Afficher tous les articles si rien n'est sélectionné
                }
                return article.depot === chercher;
              })
              .map((article) => {
                return (
                  <tr key={article.codeArticle}>
                    <td>{article.codeArticle}</td>
                    <td>{article.design}</td>
                    <td>{article.dimension}</td>
                    <td>{article.unite}</td>
                    <td>{article.depot}</td>
                    <td id="deletear">
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => handleDeleteClickpers(article.codeArticle)}
                  />
                </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette article ?
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

export default Article;
