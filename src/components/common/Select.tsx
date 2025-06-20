import React, { type ChangeEvent } from 'react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    selectedValue: string | number;
    onSelectChange: (value: string) => void;
    label?: string;
    className?: string;
    required?: boolean;
    idOrNameSelect?: string
}

const Select: React.FC<SelectProps> = ({ options, selectedValue, onSelectChange, label, className, required, idOrNameSelect }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label htmlFor="select-component" className="mb-1 text-gray-700 text-sm">{label}</label>}
            <select
                id={idOrNameSelect ?? "select-component"}
                name={idOrNameSelect ?? "select-component"}
                value={selectedValue}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelectChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required={required ?? false}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;