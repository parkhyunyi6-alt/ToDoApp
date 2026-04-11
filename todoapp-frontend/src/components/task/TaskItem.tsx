import type { TaskResponse } from "../../types/task";
import styles from "./TaskItem.module.css";
import ArrowRight from "../../assets/icons/ArrowRight.svg?react";

interface TaskItemProps {
    task: TaskResponse;
    onClickDetail: (task: TaskResponse) => void;
}

function TaskItem({ task, onClickDetail }: TaskItemProps) {
   return (
       <article className={styles.taskItem}>
           <div className={styles.itemHeader}>
               <div className={styles.category}>{task.category}</div>
               <div className={styles.state}>{task.state}</div>
           </div>
           <div className={styles.itemWrapper}>
               <div className={styles.itemInfo}>
                   <div className={styles.title}>{task.title}</div>
                   <button type="button"
                           className={styles.iconButton}
                           onClick={() => onClickDetail(task)}
                           aria-label="Open task detail">
                   <ArrowRight className={styles.arrowRight} />
                   </button>
               </div>
               {task.description && <div className={styles.description}>{task.description}</div>}
               {/*<p>Category: {task.category}</p>*/}
               {/*<p>State: {task.state}</p>*/}
               <div className={styles.taskDate}>{task.taskDate}</div>
           </div>
       </article>
   );
}

export default TaskItem;