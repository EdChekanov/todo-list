import { useRef, useState } from 'react';
import { useToDoContext } from '../../сontext/Context';

const InputTask = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleAddTask } = useToDoContext();
  const [inputText, setInputText] = useState('');

  const handleClick = async () => {
    if (!inputText.trim()) {
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = 'tomato';
      }
      setInputText('');
      return;
    }
    await handleAddTask(inputText);
    setInputText('');
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
        onChange={(e) => setInputText(e.target.value)}
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
