import type { TaskCategory, TaskState } from "../../types/task";

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
        <section>
            <select
                value={category}
                onChange={(event) =>
                    onChangeCategory((event.target.value as TaskCategory | "") || "")
                }
            >
                <option value="">All Category</option>
                <option value="GENERAL">GENERAL</option>
            </select>

            <select
                value={state}
                onChange={(event) =>
                    onChangeState((event.target.value as TaskState | "") || "")
                }
            >
                <option value="">All State</option>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="ARCHIVED">ARCHIVED</option>
            </select>

            <button type="button" onClick={onApply}>
                Apply
            </button>
        </section>
    );
}

export default TaskFilter;