import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function CurriculumDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId, curriculumId } = useParams();
    
    // 전달받은 상태 데이터
    const [curriculum, setCurriculum] = useState(null);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (location.state) {
            setCurriculum(location.state.curriculum);
            setCourse(location.state.course);
        }
    }, [location.state]);

    if (!curriculum || !course) {
        return (
            <div className="p-10">
                <button
                    onClick={() => navigate(-1)}
                    className="text-lg text-[#D18063] font-semibold hover:text-[#C67053] mb-8"
                >
                    ← 돌아가기
                </button>
                <p className="text-center text-gray-500">강의 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FEFAF5]">
            {/* 헤더 */}
            <div className="bg-[#F0ECE3] border-b border-[#E0D9CF] px-10 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-lg text-[#D18063] font-semibold hover:text-[#C67053] mb-4"
                >
                    ← 돌아가기
                </button>
                <div>
                    <h1 className="text-3xl font-black text-[#4A3E3D] mb-2">
                        {course.title}
                    </h1>
                    <p className="text-sm font-medium text-[#8A806D]">
                        강사: {course.author}
                    </p>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="p-10">
                <div className="max-w-6xl mx-auto">
                    {/* 영상 섹션 */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-[#4A3E3D] mb-6">
                            {curriculum.title}
                        </h2>
                        
                        {/* 유튜브 플레이어 */}
                        <div className="relative w-full bg-black rounded-[20px] overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${curriculum.youtubeId}?autoplay=1`}
                                title={curriculum.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* 강의 정보 섹션 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 강의 상세 정보 */}
                        <div className="md:col-span-2 bg-white rounded-[20px] shadow-md p-8">
                            <h3 className="text-xl font-bold text-[#4A3E3D] mb-6 pb-4 border-b border-[#E0D9CF]">
                                강의 정보
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-[#7A7265] mb-1">강의명</p>
                                    <p className="text-base font-medium text-[#4A3E3D]">
                                        {curriculum.title}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-[#7A7265] mb-1">진행 상태</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                                            curriculum.completed 
                                                ? 'bg-[#2B7A8A]' 
                                                : 'bg-[#D65A47]'
                                        }`}>
                                            {curriculum.completed ? '완료' : '미완료'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-[#7A7265] mb-2">코스</p>
                                    <p className="text-base font-medium text-[#4A3E3D]">
                                        {course.title}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-[#7A7265] mb-2">사용 도구</p>
                                    <span className="inline-block bg-[#D18063] text-white px-4 py-2 rounded-[10px] text-xs font-semibold">
                                        {course.tool}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 완료 버튼 및 네비게이션 */}
                        <div className="bg-white rounded-[20px] shadow-md p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-[#4A3E3D] mb-6 pb-4 border-b border-[#E0D9CF]">
                                    강의 진행
                                </h3>

                                {!curriculum.completed && (
                                    <button className="w-full bg-[#D18063] text-white py-3 rounded-[15px] font-bold hover:bg-[#C67053] transition-colors mb-4">
                                        강의 완료하기
                                    </button>
                                )}
                                
                                {curriculum.completed && (
                                    <div className="mb-4 p-3 bg-[#E8F5F5] rounded-[15px]">
                                        <p className="text-sm font-semibold text-[#2B7A8A] text-center">
                                            ✓ 이 강의를 완료했습니다
                                        </p>
                                    </div>
                                )}

                                <button className="w-full border-2 border-[#D18063] text-[#D18063] py-3 rounded-[15px] font-bold hover:bg-[#FEF5F0] transition-colors">
                                    다시 보기
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#E0D9CF]">
                                <p className="text-xs text-[#7A7265] font-medium mb-3">학습 진행률</p>
                                <div className="w-full bg-[#F0ECE3] rounded-full h-3">
                                    <div 
                                        className="bg-[#D18063] h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${curriculum.completed ? 100 : 50}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-[#4A3E3D] font-bold mt-2">
                                    {curriculum.completed ? '100%' : '50%'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurriculumDetailPage;
