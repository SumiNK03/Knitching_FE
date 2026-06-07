import React, { useMemo } from 'react';
import WideCourseCard from '../components/WideCourseCard';
import coursesData from '../data/courses.json';
import { patternImages } from '../data/patternImages';

function LearningCoursesPage() {
    // 이미지 추가하여 courses 생성
    const courses = useMemo(() => {
        return coursesData.map(course => ({
            ...course,
            image: patternImages[course.imageId]
        }));
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-[#4A3E3D] mb-8">
                학습 중인 과정
            </h1>
            
            {/* 카드 스택 */}
            <div className="space-y-8">
                {courses.map((course) => (
                    <WideCourseCard
                        key={course.id}
                        courseId={course.id}
                        title={course.title}
                        author={course.author}
                        tool={course.tool}
                        image={course.image}
                        progress={course.progress}
                        curriculum={course.curriculum}
                    />
                ))}
            </div>
        </div>
    );
}

export default LearningCoursesPage;