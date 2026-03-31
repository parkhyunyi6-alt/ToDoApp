import type { TaskResponse } from "../../types/task";
import styles from "./TaskItem.module.css";
import ArrowRight from "@/assets/icons/ArrowRight.svg?react"

interface TaskListProps {
    task: TaskResponse;
}

function TaskItem({ task }: TaskListProps) {
   return (
       <article className={styles.taskItem}>
           <div className={styles.itemWrapper}>
               <div className={styles.itemHeader}>
                   <div className={styles.title}>{task.title}</div>
                   <ArrowRight className={styles.arrowRight} />
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