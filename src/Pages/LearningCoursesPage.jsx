import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WideCourseCard from '../components/WideCourseCard';
import { apiWithAuth } from '../utils/api';

function LearningCoursesPage() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEnrollments = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await apiWithAuth('/api/enrollments');
                console.log('[DEBUG][GET /api/enrollments][LearningCoursesPage] raw response:', response);
                const items = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.content)
                        ? response.content
                        : Array.isArray(response?.data)
                            ? response.data
                            : [];

                const mappedCourses = items.map((item) => {
                    const curriculum = (item.items || []).map((curriculumItem) => ({
                        id: curriculumItem.user_progress_id,
                        seq: curriculumItem.seq,
                        videoKey: curriculumItem.video_key ?? curriculumItem.video_id,
                        title: curriculumItem.title,
                        completed: Boolean(curriculumItem.is_completed),
                    }));

                    const totalItems = Number(item.total_items ?? curriculum.length ?? 0);
                    const completedItems = Number(item.completed_items ?? curriculum.filter((c) => c.completed).length ?? 0);
                    const progress = totalItems > 0
                        ? Math.round((completedItems / totalItems) * 100)
                        : 0;

                    return {
                        id: item.enrollment_id,
                        courseId: item.curriculum_id,
                        title: item.pattern_name,
                        author: item.author_name,
                        tool: item.tool,
                        image: item.thumbnail_url,
                        progress,
                        curriculum,
                    };
                });

                setCourses(mappedCourses);
            } catch (err) {
                if (err?.status === 401 || String(err?.message || '').includes('로그인')) {
                    setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
                    navigate('/login');
                } else {
                    setError(err?.message || '학습 중인 과정을 불러오지 못했습니다.');
                }
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [navigate]);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-[#4A3E3D] mb-8">
                학습 중인 과정
            </h1>

            {loading ? (
                <p className="text-[#8A806D]">학습 중인 과정을 불러오는 중입니다...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : courses.length === 0 ? (
                <p className="text-[#8A806D]">수강 중인 과정이 없습니다.</p>
            ) : (
                <div className="space-y-8">
                    {courses.map((course) => (
                        <WideCourseCard
                            key={course.id}
                            courseId={course.courseId}
                            title={course.title}
                            author={course.author}
                            tool={course.tool}
                            image={course.image}
                            progress={course.progress}
                            curriculum={course.curriculum}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default LearningCoursesPage;