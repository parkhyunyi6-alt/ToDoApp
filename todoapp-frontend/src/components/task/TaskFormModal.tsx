import { useState } from "react";
import {createTask} from "../../api/taskApi.ts";
import type { CreateTaskRequest, TaskCategory, TaskState } from "../../types/task";

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

function TaskFormModal({
    isOpen,
    onClose,
    onSuccess
}: TaskFormModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [category, setCategory] = useState<TaskCategory>("GENERAL");
    const [state, setState] = useState<TaskState>("TODO");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");


    if(!isOpen) {
        return null;
    }


    const handleSbmit = async () => {
        if(!title.trim()) {
            setErrorMessages("Title is required");
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessages("");

            const request: CreateTaskRequest = {
                title: title.trim(),
                description: description.trim() || undefined,
                taskDate: taskDate || undefined,
                category,
                state,
            };

            await createTask(request);

            setTitle("");
            setDescription("");
            setTaskDate("");
            setCategory("GENERAL");
            setState("TODO");

            onClose();
            onSuccess();
        } catch (error) {
            console.error("Failed to create task", error);
            setErrorMessages("Failed to create task");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <div>
          <div>
              <h2>Create Task</h2>
              {errorMessages && <p>{errorMessages}</p>}
              <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
              />

              <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
              />

              <input
                  type="date"
                  value={taskDate}
                  onChange={(event) => setTaskDate(event.target.value)}
              />

              <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as TaskCategory)}
              >
                  <option value="GENERAL">GENERAL</option>
                  <option value="WORK">WORK</option>
                  <option value="PERSONAL">PERSONAL</option>
                  <option value="STUDY">STUDY</option>
                  <option value="HEALTH">HEALTH</option>
                  <option value="FINANCE">FINANCE</option>
              </select>

              <select
                  value={state}
                  onChange={(event) => setState(event.target.value as TaskState)}
                  >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                  <option value="ARCHIVED">ARCHIVED</option>
              </select>

              {errorMessages && <p>{errorMessages}</p>}

              <button type="button" onClick={onClose}>Cancel</button>
              <button type="button" onClick={handleSbmit} disabled={isSubmitting}>Create</button>
          </div>
      </div>
    );
}

export default TaskFormModal;