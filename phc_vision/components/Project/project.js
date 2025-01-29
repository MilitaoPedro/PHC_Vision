import React, { useState, useEffect } from "react";
import styles from "./project.module.css";
import { DeleteFilled } from "@ant-design/icons";

export default function Project({ idProjeto, projectName, onDelete }) {
  const [numMembros, setNumMembros] = useState(0);
  const [numTarefas, setNumTarefas] = useState(0);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projeto/${idProjeto}/membros`);
        if (!response.ok) {
          throw new Error("Erro ao buscar membros do projeto");
        }
        const data = await response.json();
        setNumMembros(data.count);
      } catch (error) {
        console.error("Error fetching project members:", error.message);
      }
    };

    const fetchTarefas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projeto/${idProjeto}/tarefas`);
        if (!response.ok) {
          throw new Error("Erro ao buscar tarefas do projeto");
        }
        const data = await response.json();
        setNumTarefas(data.count);
      } catch (error) {
        console.error("Error fetching project tasks:", error.message);
      }
    };

    fetchMembros();
    fetchTarefas();
  }, [idProjeto]);

  return (
    <div className={styles.projectContainer}>
      <h2 style={{ paddingTop: "20px", paddingLeft: "10%" }}>
        {projectName}
      </h2>
      <div className={styles.projectItemsContainer}>
        <div className={styles.firstHalf}>
          <p className={styles.dynamicItemLabel}>
            Membros: <a className={styles.dynamicItem}>{numMembros}</a>
          </p>
          <p className={styles.dynamicItemLabel}>
            Tarefas a serem feitas:{" "}
            <a className={styles.dynamicItem}>{numTarefas}</a>
          </p>
          <p className={styles.dynamicItemLabel}>
            Criado por:{" "}
            <a className={styles.dynamicItem}>Você (Pedro Militão)</a>
          </p>
        </div>
        <div className={styles.secondHalf}>
          <p
            className={styles.dynamicItemLabel}
            style={{ color: "red", cursor: "pointer" }}
            onClick={onDelete}
          >
            <DeleteFilled style={{ paddingRight: "10px" }} />
            Excluir Projeto
          </p>
        </div>
      </div>
    </div>
  );
}