import type {TaskResponse, TaskState} from "../../types/task";
import styles from "./TaskItem.module.css";
import ArrowRight from "../../assets/icons/ArrowRight.svg?react";
import {Button} from "../Common/Button.tsx";

interface TaskItemProps {
    task: TaskResponse;
    onClickDetail: (task: TaskResponse) => void;
    onChangeState: (taskId: string, nextState: TaskState) => void;
}

function getStateActions(state: TaskState): { label: string; value: TaskState; }[] {
    switch (state) {
        case "TODO":
            return [
                { label: "In Progress", value: "IN_PROGRESS" },
                { label: "Done", value: "DONE" },
                { label: "Cancel", value: "CANCELLED" },
            ];
        case "IN_PROGRESS":
            return [
                { label: "Done", value: "DONE" },
                { label: "Cancel", value: "CANCELLED" },
            ];
        case "DONE":
            return [
                { label: "Rework", value: "TODO" },
                { label: "Archive", value: "ARCHIVED" },
            ];
        case "CANCELLED":
            return [
                { label: "Rework", value: "TODO" },
            ]
        case "ARCHIVED":
            return [
                { label: "Rework", value: "TODO" }
            ];
        default:
            return [];
    }
}

function TaskItem({ task, onClickDetail, onChangeState }: TaskItemProps) {
    const stateActions = getStateActions(task.state);

   return (
       <article className={styles.taskItem}>
           <div className={styles.itemHeader}>
               <div className={styles.itemInfo}>
                   <div className={styles.category}>{task.category}</div>
                   <div className={styles.state}>{task.state}</div>
               </div>
               <div>
                   {stateActions.map((action) => (
                       <Button
                           key={action.value}
                           type="button"
                           onClick={() => onChangeState(task.id, action.value)}
                           variant="secondary"
                           size="xs"
                       >
                           {action.label}
                       </Button>
                   ))}
               </div>
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