import styles from "./tarefa.module.css";
import { DeleteFilled } from "@ant-design/icons";

export default function Tarefa({ priority, taskName, onClickDiv, onDelete, date, description }) {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.taskTitleIcon}>
        <h4 className={styles.taskTitle}>
          {taskName}
        </h4>
        <DeleteFilled onClick={onDelete}
          style={{color: "red", padding: "5px"}}/>
      </div>
      <div className={styles.taskDescription}  onClick={onClickDiv}>
        {description}
      </div>
      <div className={styles.taskPriorityDate}  onClick={onClickDiv}>
        <div className={styles.taskPriority}  onClick={onClickDiv}>
          Prioridade: {priority}
        </div>
        <div className={styles.taskDate}  onClick={onClickDiv}>
          Criada em: {date}
        </div>
      </div>
    </div>
  );
}