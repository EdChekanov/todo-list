import FilterButton from './FilterButton';

const Filters = () => {
  return (
    <ul className="filters">
      <li>
        <FilterButton content="Все" method="all" />
      </li>
      <li>
        <FilterButton content="Активные" method="active" />
      </li>
      <li>
        <FilterButton content="Завершённые" method="completed" />
      </li>
    </ul>
  );
};

export default Filters;
