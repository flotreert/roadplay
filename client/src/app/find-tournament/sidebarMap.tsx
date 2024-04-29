import React, { useState } from 'react';

interface SidebarMapProps {
    // Add any necessary props here
    prop1: string;
    prop2: number;
    prop3: boolean;
}

const SidebarMap: React.FC<SidebarMapProps> = (props) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const handleFilterChange = (filter: string) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };
    return (
        <div className="sidebar">
            <h2>Filters</h2>
            <label>
                <input
                    type="checkbox"
                    checked={selectedFilters.includes('filter1')}
                    onChange={() => handleFilterChange('filter1')}
                />
                Filter 1
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={selectedFilters.includes('filter2')}
                    onChange={() => handleFilterChange('filter2')}
                />
                Filter 2
            </label>
            {/* Add more checkboxes for additional filters */}
        </div>
    );
};
export default SidebarMap;