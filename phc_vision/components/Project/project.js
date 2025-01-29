import styles from "./project.module.css";
import { DeleteFilled } from "@ant-design/icons";

export default function Project({ projectName, onDelete }) {
  return (
    <div className={styles.projectContainer}>
      <h2 style={{ paddingTop: "20px", paddingLeft: "10%" }}>
        {projectName}
      </h2>
      <div className={styles.projectItemsContainer}>
        <div className={styles.firstHalf}>
          <p className={styles.dynamicItemLabel}>
            Membros: <a className={styles.dynamicItem}>1</a>
          </p>
          <p className={styles.dynamicItemLabel}>
            Tarefas a serem feitas:{" "}
            <a className={styles.dynamicItem}>5</a>
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