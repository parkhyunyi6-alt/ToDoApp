import type { TaskResponse } from "../../types/task";

interface TaskListProps {
    task: TaskResponse;
}

function TaskItem({ task }: TaskListProps) {
   return (
       <article>
           <h3>{task.title}</h3>
           {task.description && <p>{task.description}</p>}
           <p>Category: {task.category}</p>
           <p>State: {task.state}</p>
           <p>Task Date: {task.taskDate}</p>
       </article>
   );
}

export default TaskItem;