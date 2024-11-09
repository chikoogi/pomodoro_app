'use client';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className={`w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}; 