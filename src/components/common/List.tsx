// src/components/List.tsx
import React from 'react';

// Define a generic type for the items in the list
interface ListItem<T> {
    id: string | number; // A unique identifier for the item
    data: T; // The actual data for the item
}

interface ListProps<T> {
    items: ListItem<T>[]; // Array of list items
    renderItem: (itemData: T) => React.ReactNode; // Function to render each item
    keyExtractor?: (item: ListItem<T>) => string | number; // Optional custom key extractor
    className?: string; // Optional class for the list container
    itemClassName?: string; // Optional class for each list item
    emptyMessage?: string; // Message to display when there are no items
}

const List = <T,>({
    items,
    renderItem,
    keyExtractor = (item) => item.id, // Default key extractor
    className,
    itemClassName = "p-4 border-b border-gray-200 last:border-b-0", // Default item styling
    emptyMessage = "No items to display."
}: ListProps<T>): React.ReactElement => {

    if (!items || items.length === 0) {
        return (
            <div className={`p-4 text-center text-gray-500 bg-white rounded-lg shadow ${className}`}>
                {emptyMessage}
            </div>
        );
    }

    return (
        <ul className={`bg-white rounded-lg shadow divide-y divide-gray-200 ${className}`}>
            {items.map((item) => (
                <li key={keyExtractor(item)} className={itemClassName}>
                    {renderItem(item.data)}
                </li>
            ))}
        </ul>
    );
};

export default React.memo(List) as typeof List;