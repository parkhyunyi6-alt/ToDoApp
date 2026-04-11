import type { TaskResponse } from "../../types/task";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
    taskList: TaskResponse[];
    onClickDetail: (task: TaskResponse) => void;
}

function TaskList({ taskList, onClickDetail }: TaskListProps) {
    if (taskList.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <section className={styles.taskList}>
            {taskList.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onClickDetail={onClickDetail}
                />
            ))}
        </section>
    );
}

export default TaskList;