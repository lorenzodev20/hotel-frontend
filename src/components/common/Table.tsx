// src/components/Table.tsx
import React from 'react';

// Define a type for a single row of data (can be any object)
interface TableRowData {
    [key: string]: any;
}

// Define the structure for a column
interface TableColumn<T> {
    key: keyof T | string; // Key to access the data in the row object
    header: string; // The header text for the column
    render?: (row: T) => React.ReactNode; // Optional custom render function for cell content
    className?: string; // Optional class for the column header and cells
}

interface TableProps<T extends TableRowData> {
    data: T[]; // Array of data objects
    columns: TableColumn<T>[]; // Array of column definitions
    className?: string; // Optional class for the table container
    rowKey?: (row: T) => string | number; // Optional function to generate a unique key for each row
    emptyMessage?: string; // Message to display when there's no data
}

// Using React.memo for performance optimization if the table data doesn't change often
const Table = <T extends TableRowData>({
    data,
    columns,
    className,
    rowKey,
    emptyMessage = "No data available."
}: TableProps<T>): React.ReactElement => {

    if (!data || data.length === 0) {
        return (
            <div className={`p-4 text-center text-gray-500 bg-white rounded-lg shadow ${className}`}>
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className={`overflow-x-auto bg-white rounded-lg shadow ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={typeof column.key === 'string' ? column.key : column.key.toString()}
                                scope="col"
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowKey ? rowKey(row) : `row-${rowIndex}`}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={typeof column.key === 'string' ? column.key : column.key.toString()} // Fallback key for cell
                                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''}`}
                                >
                                    {column.render ? column.render(row) : row[column.key as string]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(Table) as typeof Table; // Export with memo for type safety