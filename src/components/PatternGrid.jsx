import React from 'react';

function PatternGrid({ columns = 3, gap = 24, children }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gap}px` }}>
            {children}
        </div>
    );
}

export default PatternGrid;
