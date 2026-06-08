import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { apiWithAuth } from '../utils/api';

function CurriculumDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { curriculumId } = useParams();
    
    // 전달받은 상태 데이터
    const [curriculum, setCurriculum] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);
    const [completeMessage, setCompleteMessage] = useState('');

    const buildUpdatedCourse = (baseCourse, completedCurriculum) => {
        if (!baseCourse) return baseCourse;
        const updatedCurriculum = (baseCourse.curriculum || []).map((item) =>
            item.id === completedCurriculum.id ? { ...item, completed: completedCurriculum.completed } : item
        );
        const total = updatedCurriculum.length;
        const completed = updatedCurriculum.filter((item) => item.completed).length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            ...baseCourse,
            curriculum: updatedCurriculum,
            progress,
        };
    };

    const handleBackToCourse = () => {
        const targetCourseId = location.state?.courseId || course?.courseId;
        if (targetCourseId) {
            navigate(`/course/${targetCourseId}`, {
                state: {
                    course,
                },
            });
            return;
        }
        navigate(-1);
    };

    useEffect(() => {
        if (location.state?.curriculum && location.state?.course) {
            setCurriculum(location.state.curriculum);
            setCourse(location.state.course);
            setLoading(false);
            return;
        }

        const fetchCurriculum = async () => {
            setLoading(true);
            try {
                const response = await apiWithAuth('/api/enrollments');
                console.log('[DEBUG][GET /api/enrollments][CurriculumDetailPage] raw response:', response);
                const enrollments = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.content)
                        ? response.content
                        : Array.isArray(response?.data)
                            ? response.data
                            : [];

                let matchedCourse = null;
                let matchedItem = null;

                for (const enrollment of enrollments) {
                    const found = (enrollment.items || []).find(
                        (item) => String(item.user_progress_id) === String(curriculumId)
                    );
                    if (found) {
                        matchedCourse = enrollment;
                        matchedItem = found;
                        break;
                    }
                }

                if (!matchedCourse || !matchedItem) {
                    setCurriculum(null);
                    setCourse(null);
                    return;
                }

                setCurriculum({
                    id: matchedItem.user_progress_id,
                    seq: matchedItem.seq,
                    title: matchedItem.title,
                    completed: Boolean(matchedItem.is_completed),
                    videoKey: matchedItem.video_key ?? matchedItem.video_id,
                });

                setCourse({
                    courseId: matchedCourse.curriculum_id,
                    title: matchedCourse.pattern_name,
                    author: matchedCourse.author_name,
                    tool: matchedCourse.tool,
                    image: matchedCourse.thumbnail_url,
                    progress: Number(matchedCourse.total_items) > 0
                        ? Math.round((Number(matchedCourse.completed_items || 0) / Number(matchedCourse.total_items)) * 100)
                        : 0,
                    curriculum: (matchedCourse.items || []).map((item) => ({
                        id: item.user_progress_id,
                        seq: item.seq,
                        title: item.title,
                        completed: Boolean(item.is_completed),
                        videoKey: item.video_key ?? item.video_id,
                    })),
                });
            } catch (e) {
                setCurriculum(null);
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCurriculum();
    }, [curriculumId, location.state]);

    const videoEmbedUrl = curriculum?.videoKey
        ? `https://www.youtube.com/embed/${curriculum.videoKey}?autoplay=1`
        : null;

    if (loading) {
        return (
            <div className="p-10">
                <p className="text-center text-gray-500">강의 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    if (!curriculum || !course) {
        return (
            <div className="p-10">
                <button
                    onClick={handleBackToCourse}
                    className="text-lg text-[#D18063] font-semibold hover:text-[#C67053] mb-8"
                >
                    ← 돌아가기
                </button>
                <p className="text-center text-gray-500">강의 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    const handleCompleteLecture = async () => {
        if (!curriculum?.id || curriculum.completed || isCompleting) {
            return;
        }

        setIsCompleting(true);
        setCompleteMessage('');

        try {
            const response = await apiWithAuth(`/api/user-progress/${curriculum.id}/complete`, {
                method: 'PATCH',
            });

            const isCompleted = response?.isCompleted ?? true;
            const updatedCurriculum = {
                ...curriculum,
                completed: Boolean(isCompleted),
            };

            setCurriculum(updatedCurriculum);
            setCourse((prev) => buildUpdatedCourse(prev, updatedCurriculum));
            setCompleteMessage('강의가 완료 처리되었습니다.');
        } catch (e) {
            if (e?.status === 404) {
                setCompleteMessage('해당 학습 진도를 찾을 수 없습니다.');
            } else {
                setCompleteMessage(e?.message || '완료 처리 중 오류가 발생했습니다.');
            }
        } finally {
            setIsCompleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FEFAF5]">
            {/* 헤더 */}
            <div className="bg-[#F0ECE3] border-b border-[#E0D9CF] px-10 py-6">
                <button
                    onClick={handleBackToCourse}
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

                        {videoEmbedUrl ? (
                            <div className="relative w-full bg-black rounded-[20px] overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={videoEmbedUrl}
                                    title={curriculum.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="w-full bg-[#1D1D1D] text-white rounded-[20px] shadow-lg p-10 flex items-center justify-center" style={{ minHeight: '360px' }}>
                                <div className="text-center">
                                    <p className="text-lg font-semibold">동영상 재생 정보 연동 대기</p>
                                    <p className="text-sm text-gray-300 mt-2">video_key: {curriculum.videoKey ?? '-'}</p>
                                </div>
                            </div>
                        )}
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
                                        {curriculum.title} {curriculum.seq ? `( ${curriculum.seq}차시 )` : ''}
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

                                <button
                                    onClick={handleCompleteLecture}
                                    disabled={curriculum.completed || isCompleting}
                                    className="w-full bg-[#D18063] text-white py-3 rounded-[15px] font-bold hover:bg-[#C67053] transition-colors mb-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#D18063]"
                                >
                                    {curriculum.completed ? '완료된 강의' : isCompleting ? '완료 처리 중...' : '강의 완료하기'}
                                </button>
                                
                                {curriculum.completed && (
                                    <div className="mb-4 p-3 bg-[#E8F5F5] rounded-[15px]">
                                        <p className="text-sm font-semibold text-[#2B7A8A] text-center">
                                            ✓ 이 강의를 완료했습니다
                                        </p>
                                    </div>
                                )}

                                {completeMessage && (
                                    <p className="text-sm text-center text-[#4A3E3D] mb-4">{completeMessage}</p>
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
