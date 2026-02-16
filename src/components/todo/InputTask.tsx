import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { change, clear } from '../../redux/slices/inputTextSlice';
import { addNewTask } from '../../redux/api/tasksApi';

const InputTask = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputText = useAppSelector((store) => store.inputText.value);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!inputText.trim()) {
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = 'tomato';
      }
      dispatch(clear());
      return;
    }
    dispatch(addNewTask(inputText));
    dispatch(clear());
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = 'field';
    }
  };

  return (
    <div className="input-task">
      <input
        ref={inputRef}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick();
        }}
        onChange={(e) => dispatch(change(e.target.value))}
        onFocus={handleFocus}
        type="text"
        name="task"
      />
      <button className="add-btn" onClick={handleClick}>
        Добавить
      </button>
    </div>
  );
};

export default InputTask;
