import { useState, useRef } from 'react';
import TaskEditMode from './TaskEditMode';
import useClickOutside from '../../hooks/useClickOutside';
import type { TaskType } from '../../types/todo.types';
import { useAppDispatch } from '../../redux/hooks';
import {
  deleteTask,
  editTaskTitle,
  switchCompleteStatus,
} from '../../redux/actions/tasksActions';

type PropsType = {
  task: TaskType;
};

const Task = ({ task }: PropsType) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickEdit = (
    id: string,
    newTitle: string,
    ref: React.RefObject<HTMLInputElement | null>,
  ) => {
    if (!newTitle.trim()) {
      const input = ref.current;

      if (input) {
        input.style.backgroundColor = 'tomato';
      }
      return;
    }
    dispatch(editTaskTitle({ id, newTitle }));
    setIsEdit((v) => !v);
  };

  const handleClickComplete = (id: string) =>
    dispatch(switchCompleteStatus({ id }));

  const handleClickDelete = (id: string) => dispatch(deleteTask({ id }));

  const onCancelClick = (e: MouseEvent | TouchEvent | null) => {
    if (e?.target === document.querySelector('.edit-btn')) return;
    setEditText(task.title);
    setIsEdit(false);
  };

  const liRef = useClickOutside<HTMLLIElement>((e) => onCancelClick(e));
  const labelRef = useClickOutside<HTMLLabelElement>((e) => onCancelClick(e));

  return (
    <li className="task-item" ref={liRef}>
      <input
        id={task.id}
        type="checkbox"
        onChange={() => handleClickComplete(task.id)}
        checked={task.isCompleted}
      />
      <label
        ref={labelRef}
        className={task.isCompleted ? 'done' : ''}
        htmlFor={task.id}
      >
        {isEdit ? (
          <TaskEditMode
            editText={editText}
            setEditText={setEditText}
            handleClickEdit={handleClickEdit}
            taskId={task.id}
            setIsEdit={setIsEdit}
            inputRef={inputRef}
            onCancelClick={(e) => onCancelClick(e)}
          />
        ) : (
          <p>{task.title}</p>
        )}
      </label>
      <div className="task-btns">
        {isEdit ? (
          <button
            className="edit-btn"
            onClick={() => handleClickEdit(task.id, editText, inputRef)}
          >
            &#10003;
          </button>
        ) : (
          <button onClick={() => setIsEdit(true)}>&#x270E;</button>
        )}
        <button onClick={() => handleClickDelete(task.id)}>X</button>
      </div>
    </li>
  );
};

export default Task;
