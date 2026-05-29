import React from 'react';
import WideCourseCard from '../components/WideCourseCard';
import pattern1 from '../images/도안1.jpg';
import pattern5 from '../images/도안5.jpg';
import pattern7 from '../images/도안7.jpg';

function LearningCoursesPage() {
    // 더미 데이터
    const courses = [
        {
            id: 1,
            title: '밴쿠버 가디건',
            author: '바늘이야기',
            tool: '대바늘',
            image: pattern1,
            progress: 65,
            curriculum: [
                { title: '기본 도구 알아보기', completed: true },
                { title: '사슬뜨기 배우기', completed: true },
                { title: '짧은뜨기 기초', completed: false },
                { title: '긴뜨기 마스터하기', completed: false },
                { title: '색상 변경 기법', completed: false },
            ],
            path: '/'
        },
        {
            id: 2,
            title: '시나몬 코위찬',
            author: '호호수',
            tool: '대바늘',
            image: pattern5,
            progress: 42,
            curriculum: [
                { title: '복합 패턴 이해하기', completed: true },
                { title: '에임 작업법 배우기', completed: false },
                { title: '텍스처 기법 마스터', completed: false },
                { title: '옷 만들기 프로젝트', completed: false },
            ],
            path: '/'
        },
        {
            id: 3,
            title: '하이소프트 체커보드 숄더백',
            author: '바늘이야기',
            tool: '코바늘',
            image: pattern7,
            progress: 85,
            curriculum: [
                { title: '게이지 측정하기', completed: true },
                { title: '기초 패턴 작성법', completed: true },
                { title: '패턴 기호 이해하기', completed: true },
                { title: '내 디자인 만들기', completed: false },
                { title: '패턴 공유하기', completed: false },
                { title: '피드백 반영하기', completed: false },
            ],
            path: '/'
        }
    ];

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-[#4A3E3D] mb-8">
                학습 중인 과정
            </h1>
            
            {/* 카드 스택 */}
            <div className="space-y-8">
                {courses.map((course) => (
                    <WideCourseCard
                        key={course.id}
                        title={course.title}
                        author={course.author}
                        tool={course.tool}
                        image={course.image}
                        progress={course.progress}
                        curriculum={course.curriculum}
                        path={course.path}
                    />
                ))}
            </div>
        </div>
    );
}

export default LearningCoursesPage;