import type { TaskResponse } from "../../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
    taskList: TaskResponse[];
}

function TaskList({ taskList }: TaskListProps) {
    if (taskList.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <section>
            {taskList.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </section>
    );
}

export default TaskList;