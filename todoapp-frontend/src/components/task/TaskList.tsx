import type {TaskResponse, TaskState} from "../../types/task";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
    taskList: TaskResponse[];
    onClickDetail: (task: TaskResponse) => void;
    onChangeState: (taskId: string, nextState: TaskState) => void;
}

function TaskList({ taskList, onClickDetail, onChangeState }: TaskListProps) {
    if (taskList.length === 0) {
        return <div className={styles.errorMessage}>No tasks found.</div>;
    }

    return (
        <section className={styles.taskList}>
            {taskList
                .filter((task): task is TaskResponse => task != null)
                .map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onClickDetail={onClickDetail}
                    onChangeState={onChangeState}
                />
            ))}
        </section>
    );
}

export default TaskList;