import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function CourseLearningDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId } = useParams();

    // 전달받은 코스 데이터
    const courseData = location.state?.course;

    if (!courseData) {
        return (
            <div className="p-10">
                <button
                    onClick={() => navigate(-1)}
                    className="text-lg text-[#D18063] font-semibold hover:text-[#C67053] mb-8"
                >
                    ← 돌아가기
                </button>
                <p className="text-center text-gray-500">과정 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    const { title, author, tool, image, progress, curriculum } = courseData;

    // 커리큘럼 수강 상태별 분류
    const completedCount = curriculum.filter(item => item.completed).length;
    const inProgressCount = curriculum.filter(item => !item.completed && curriculum.indexOf(item) < completedCount + 1).length;
    const notStartedCount = curriculum.length - completedCount - inProgressCount;

    const handleCurriculumClick = (curriculumItem) => {
        navigate(`/curriculum/${curriculumItem.id}`, {
            state: {
                curriculum: curriculumItem,
                course: courseData
            }
        });
    };

    return (
        <div className="p-10 bg-[#FEFAF5] min-h-screen">
            <button
                onClick={() => navigate(-1)}
                className="text-lg text-[#D18063] font-semibold hover:text-[#C67053] mb-8"
            >
                ← 돌아가기
            </button>

            <h1 className="text-3xl font-bold text-[#4A3E3D] mb-8">
                {title}
            </h1>

            {/* 메인 컨텐츠 */}
            <div className="flex gap-8">
                {/* 좌측: 도안 이미지 및 정보 */}
                <div className="w-1/3 flex flex-col gap-6">
                    {/* 도안 이미지 */}
                    <div className="bg-gray-100 rounded-[20px] shadow-lg overflow-hidden h-96">
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* 도안 정보 카드 */}
                    <div className="bg-white rounded-[20px] shadow-md p-6">
                        <h3 className="text-lg font-bold text-[#3A3232] mb-4 pb-3 border-b border-[#E0D9CF]">
                            도안 정보
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs font-bold text-[#7A7265] mb-1">제작자</p>
                                <p className="text-[#4A3E3D] font-medium">{author}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#7A7265] mb-1">사용 도구</p>
                                <span className="inline-block bg-[#D18063] text-white px-3 py-1 rounded-[10px] text-xs font-semibold">
                                    {tool}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 중앙 및 우측: 커리큘럼 및 진도율 */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* 진도율 카드 */}
                    <div className="bg-white rounded-[20px] shadow-md p-6">
                        <h3 className="text-lg font-bold text-[#3A3232] mb-6 pb-3 border-b border-[#E0D9CF]">
                            진도율
                        </h3>

                        {/* 원형 진도 차트 */}
                        <div className="flex items-center gap-8">
                            <div className="relative w-32 h-32">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
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

                                    {/* 수강중 (황색) */}
                                    {inProgressCount > 0 && (
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="90"
                                            fill="none"
                                            stroke="#E5A93C"
                                            strokeWidth="12"
                                            strokeDasharray={`${(inProgressCount / curriculum.length) * 565.5} 565.5`}
                                            strokeDashoffset={-((completedCount / curriculum.length) * 565.5)}
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
                                            strokeDashoffset={-((completedCount + inProgressCount) / curriculum.length) * 565.5}
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
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#2B7A8A]"></div>
                                    <span className="text-sm font-bold text-[#7A7265]">완료</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#E5A93C]"></div>
                                    <span className="text-sm font-bold text-[#7A7265]">수강중</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#D65A47]"></div>
                                    <span className="text-sm font-bold text-[#7A7265]">미수강</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 커리큘럼 카드 */}
                    <div className="bg-white rounded-[20px] shadow-md p-6">
                        <h3 className="text-lg font-bold text-[#3A3232] mb-4 pb-3 border-b border-[#E0D9CF]">
                            커리큘럼
                        </h3>

                        {/* 표 헤더 */}
                        <div className="flex gap-8 pb-2 mb-3 border-b border-[#F4F5F7] text-xs font-bold text-[#7A7265]">
                            <span className="w-6">순서</span>
                            <span className="flex-1">강좌</span>
                            <span className="w-12">수강</span>
                        </div>

                        {/* 커리큘럼 항목들 */}
                        <div className="space-y-2.5 max-h-96 overflow-y-auto">
                            {curriculum.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    onClick={() => handleCurriculumClick(item)}
                                    className="flex gap-8 text-xs cursor-pointer hover:bg-[#F8F8F8] p-2 rounded transition-colors"
                                >
                                    <span className="w-6 font-normal text-[#232323]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="flex-1 font-normal text-[#232323] leading-tight hover:text-[#D18063]">
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
                </div>
            </div>
        </div>
    );
}

export default CourseLearningDetailPage;
