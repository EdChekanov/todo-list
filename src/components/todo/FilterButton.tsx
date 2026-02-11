import type { Filters } from '../../types/todo.types';
import { useToDoContext } from '../../сontext/Context';

type PropsType = {
  content: string;
  method: Filters;
};

const FilterButton = ({ content, method }: PropsType) => {
  const { filter, setFilter } = useToDoContext();

  return (
    <button
      onClick={() => setFilter(method)}
      className={filter === method ? 'active' : ''}
    >
      {content}
    </button>
  );
};

export default FilterButton;
