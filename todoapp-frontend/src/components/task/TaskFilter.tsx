import type { TaskCategory, TaskState } from "../../types/task";
import {Button} from "../Common/Button.tsx";
import { Select } from "../Common/Select.tsx";
import styles from "./TaskFilter.module.css";

interface TaskFilterProps {
    category: TaskCategory | "";
    state: TaskState | "";
    onChangeCategory: (value: TaskCategory | "") => void;
    onChangeState: (value: TaskState | "") => void;
    onApply: () => void;
}

function TaskFilter({
                        category,
                        state,
                        onChangeCategory,
                        onChangeState,
                        onApply,
                    }: TaskFilterProps) {
    return (
        <section className={styles.taskFilter}>
            <Select
                value={category}
                onChange={(event) =>
                    onChangeCategory((event.target.value as TaskCategory | "") || "")
                }
                options={[
                    {value: "", label: "ALL Category"},
                    { value: "GENERAL", label: "GENERAL" },
                    { value: "WORK", label: "WORK" },
                    { value: "PERSONAL", label: "PERSONAL" },
                    { value: "STUDY", label: "STUDY" },
                    { value: "HEALTH", label: "HEALTH" },
                    { value: "FINANCE", label: "FINANCE" },
                ]}
            />
            <Select
                value={state}
                onChange={(event) =>
                    onChangeState((event.target.value as TaskState | "") || "")
                }
                options={[
                    { value: "", label: "Active State" },
                    { value: "TODO", label: "TODO" },
                    { value: "IN_PROGRESS", label: "IN_PROGRESS" },
                    { value: "DONE", label: "DONE" },
                    { value: "CANCELLED", label: "CANCELLED" },
                    { value: "ARCHIVED", label: "ARCHIVED" },
                ]}
            />
            <Button onClick={onApply}>
                Apply
            </Button>
        </section>
    );
}

export default TaskFilter;