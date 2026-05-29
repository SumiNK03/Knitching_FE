import React from 'react';

function CurriculumList({ curriculum = [] }) {
    if (curriculum.length === 0) {
        return null;
    }

    return (
        <div>
            <h4 className="text-sm font-semibold text-[#4A3E3D] mb-3">
                커리큘럼
            </h4>
            <div className="max-h-40 overflow-y-auto border border-[#E0D9CF] rounded-lg p-3 bg-[#F9F6F0]">
                <ul className="space-y-2">
                    {curriculum.map((item, index) => (
                        <li 
                            key={index}
                            className={`text-xs py-1 px-2 rounded flex items-start gap-2 ${
                                item.completed 
                                    ? 'text-[#8A806D] line-through' 
                                    : 'text-[#4A3E3D]'
                            }`}
                        >
                            <span className="mt-0.5">
                                {item.completed ? '✓' : '○'}
                            </span>
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CurriculumList;
