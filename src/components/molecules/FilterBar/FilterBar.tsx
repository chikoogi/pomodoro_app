'use client';

import { TodoFilter, Priority } from '@/types/todo.types';
import { Select } from '@/components/atoms/Select/Select';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';

interface FilterBarProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <Select
        value={filter.priority || ''}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange({
          ...filter,
          priority: e.target.value as Priority || undefined
        })}
      >
        <option value="">모든 우선순위</option>
        <option value="HIGH">높음</option>
        <option value="MEDIUM">중간</option>
        <option value="LOW">낮음</option>
      </Select>
      <Checkbox
        label="완료된 항목 표시"
        checked={filter.showCompleted}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange({
          ...filter,
          showCompleted: e.target.checked
        })}
      />
    </div>
  );
}; 