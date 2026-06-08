import React from 'react';
import { useNavigate } from 'react-router-dom';

function WideCourseCard({ 
    courseId,
    title, 
    author,
    tool,
    image, 
    progress, 
    curriculum = [],
    path = '/'
}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // 도안 학습 상세 페이지로 이동
        navigate(`/course/${courseId}`, {
            state: {
                course: { title, author, tool, image, progress, curriculum }
            }
        });
    };

    const handleCurriculumClick = (e, curriculumItem) => {
        e.stopPropagation();
        // 커리큘럼 항목은 더 이상 클릭하지 않음 (상세 페이지에서만 가능)
    };

    // 커리큘럼 수강 상태별 분류 (완료/미수강)
    const completedCount = curriculum.filter(item => item.completed).length;
    const notStartedCount = curriculum.length - completedCount;

    return (
        <div 
            className="relative w-full bg-[#F0ECE3] rounded-[20px] shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={handleCardClick}
        >
            {/* 헤더 정보 */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-[#E0D9CF]">
                <div>
                    <h3 className="text-2xl font-black text-[#4A3E3D] mb-2">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-[#8A806D] mb-3">
                        {author}
                    </p>
                    <span className="inline-block bg-[#D18063] text-white px-4 py-1.5 rounded-[10px] text-xs font-semibold">
                        {tool}
                    </span>
                </div>
                <span className="text-lg font-medium text-black hover:text-[#D18063] transition-colors whitespace-nowrap ml-8">
                    학습하기 &gt;
                </span>
            </div>

            {/* 메인 컨텐츠 - 동일 높이 유지 */}
            <div className="flex gap-8 h-72">
                {/* 도안 이미지 - 세로 높이에 맞춘 가로 비율 (약 3:4) */}
                <div className="flex-shrink-0 w-56 bg-gray-100 rounded-[20px] shadow-md overflow-hidden">
                    {image && (
                        <img 
                            src={image} 
                            alt={title} 
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* 커리큘럼 섹션 - 1/2 */}
                <div className="flex-1 min-w-0 bg-white rounded-[20px] shadow-md p-5 overflow-y-auto">
                    <h4 className="text-lg font-bold text-[#3A3232] mb-4">
                        커리큘럼
                    </h4>

                    {/* 표 헤더 */}
                    <div className="flex gap-8 pb-2 mb-3 border-b border-[#F4F5F7] text-xs font-bold text-[#7A7265]">
                        <span className="w-6">순서</span>
                        <span className="flex-1">강좌</span>
                        <span className="w-12">수강</span>
                    </div>

                    {/* 커리큘럼 항목들 */}
                    <div className="space-y-2.5">
                        {curriculum.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className="flex gap-8 text-xs p-1 rounded"
                            >
                                <span className="w-6 font-normal text-[#232323]">
                                    {String(item.seq ?? index + 1).padStart(2, '0')}
                                </span>
                                <span className="flex-1 font-normal text-[#232323] leading-tight">
                                    {item.title}
                                </span>
                                <span className={`w-12 font-bold text-right whitespace-nowrap ${
                                    item.completed 
                                        ? 'text-[#2B7A8A]' 
                                        : 'text-[#D65A47]'
                                }`}>
                                    {item.completed ? '완료' : '미완료'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 진도율 섹션 - 1/3 */}
                <div className="flex-1 min-w-0 bg-white rounded-[20px] shadow-md p-5 flex flex-col items-center justify-center">
                    <h4 className="text-lg font-bold text-[#3A3232] mb-6 w-full">
                        진도율
                    </h4>

                    {/* 원형 진도 차트 */}
                    <div className="relative w-40 h-40 mb-4">
                        <svg
                            viewBox="0 0 200 200"
                            className="w-full h-full"
                        >
                            {/* 배경 */}
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="#F0ECE3"
                                strokeWidth="12"
                            />

                            {/* 완료 (청록색) */}
                            {completedCount > 0 && (
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    fill="none"
                                    stroke="#2B7A8A"
                                    strokeWidth="12"
                                    strokeDasharray={`${(completedCount / curriculum.length) * 565.5} 565.5`}
                                    strokeLinecap="round"
                                    style={{ 
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: '100px 100px',
                                        transition: 'stroke-dasharray 0.3s ease'
                                    }}
                                />
                            )}

                            {/* 미수강 (빨강) */}
                            {notStartedCount > 0 && (
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    fill="none"
                                    stroke="#D65A47"
                                    strokeWidth="12"
                                    strokeDasharray={`${(notStartedCount / curriculum.length) * 565.5} 565.5`}
                                    strokeDashoffset={-((completedCount / curriculum.length) * 565.5)}
                                    strokeLinecap="round"
                                    style={{ 
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: '100px 100px',
                                        transition: 'stroke-dasharray 0.3s ease'
                                    }}
                                />
                            )}
                        </svg>

                        {/* 중앙 텍스트 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black text-[#4A3E3D]">
                                {progress}%
                            </span>
                        </div>
                    </div>

                    {/* 범례 */}
                    <div className="flex gap-3 text-xs font-bold mt-4 flex-wrap justify-center">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#2B7A8A]"></div>
                            <span className="text-[#7A7265]">완료</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#D65A47]"></div>
                            <span className="text-[#7A7265]">미수강</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WideCourseCard;
