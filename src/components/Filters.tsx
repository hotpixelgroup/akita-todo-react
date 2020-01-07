import * as React from 'react';

export type FiltersProps = {
  onChange: (filter: string) => void;
  selectedFilter: string;
}

export const Filters: React.FC<FiltersProps> = ({onChange,selectedFilter}) => {
  return (
    <div>
      <span>Show: </span>
      <select onChange={(e) => onChange(e.target.value)} value={selectedFilter}>
        <option value="SHOW_ALL">All</option>
        <option value="SHOW_ACTIVE">Active</option>
        <option value="SHOW_COMPLETED">Completed</option>
      </select>
    </div>
  );
}
