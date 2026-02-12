type PropsType = {
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  handleClickEdit: (
    id: string,
    newTitle: string,
    ref: {
      current: HTMLInputElement | null;
    },
  ) => void;
  taskId: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onCancelClick: (e: MouseEvent | TouchEvent | null) => void;
};

const TaskEditMode = ({
  editText,
  setEditText,
  handleClickEdit,
  taskId,
  inputRef,
  onCancelClick,
}: PropsType) => {
  return (
    <input
      type="text"
      value={editText}
      ref={inputRef}
      onChange={(e) => setEditText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClickEdit(taskId, editText, inputRef);
        if (e.key === 'Escape') {
          onCancelClick(null);
        }
      }}
    />
  );
};

export default TaskEditMode;
