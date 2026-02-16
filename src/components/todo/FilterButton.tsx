import { setFilter } from '../../redux/slices/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { Filters } from '../../types/todo.types';

type PropsType = {
  content: string;
  method: Filters;
};

const FilterButton = ({ content, method }: PropsType) => {
  const { filter } = useAppSelector((store) => store.tasks);
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(setFilter(method))}
      className={filter === method ? 'active' : ''}
    >
      {content}
    </button>
  );
};

export default FilterButton;
