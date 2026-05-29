import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressCircle from './ProgressCircle';
import CurriculumList from './CurriculumList';

function CourseCard({ 
    title, 
    image, 
    progress, 
    curriculum = [],
    path = '/'
}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(path);
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleCardClick}
        >
            {/* 이미지 영역 */}
            <div className="w-full h-80 overflow-hidden bg-gray-100">
                {image && (
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* 카드 내용 */}
            <div className="p-6">
                {/* 제목 */}
                <h3 className="text-lg font-bold text-[#4A3E3D] mb-4">
                    {title}
                </h3>

                {/* 진도 표시 */}
                <div className="mb-6">
                    <ProgressCircle progress={progress} />
                </div>

                {/* 커리큘럼 리스트 */}
                <CurriculumList curriculum={curriculum} />
            </div>
        </div>
    );
}

export default CourseCard;
