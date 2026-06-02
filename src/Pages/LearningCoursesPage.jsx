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
                { id: 1, title: '기본 도구 알아보기', completed: true, youtubeId: 'dQw4w9WgXcQ' },
                { id: 2, title: '사슬뜨기 배우기', completed: true, youtubeId: 'jNQXAC9IVRw' },
                { id: 3, title: '짧은뜨기 기초', completed: false, youtubeId: '9bZkp7q19f0' },
                { id: 4, title: '긴뜨기 마스터하기', completed: false, youtubeId: 'eqKMx3_nWcE' },
                { id: 5, title: '색상 변경 기법', completed: false, youtubeId: 'jIlQ_XpvQds' },
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
                { id: 1, title: '복합 패턴 이해하기', completed: true, youtubeId: 'MgPT0Kz8A88' },
                { id: 2, title: '에임 작업법 배우기', completed: false, youtubeId: '2Xc3p0CNTXc' },
                { id: 3, title: '텍스처 기법 마스터', completed: false, youtubeId: 'aJOTlE1K90k' },
                { id: 4, title: '옷 만들기 프로젝트', completed: false, youtubeId: 'k7kJBDe4B1o' },
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
                { id: 1, title: '게이지 측정하기', completed: true, youtubeId: 'aqz-KE-bpKQ' },
                { id: 2, title: '기초 패턴 작성법', completed: true, youtubeId: '4R7D3NKZ2F0' },
                { id: 3, title: '패턴 기호 이해하기', completed: true, youtubeId: 'gNiVIIBXcdk' },
                { id: 4, title: '내 디자인 만들기', completed: false, youtubeId: 'WCJuwjvI3D0' },
                { id: 5, title: '패턴 공유하기', completed: false, youtubeId: 'gSvqqaC5Jqg' },
                { id: 6, title: '피드백 반영하기', completed: false, youtubeId: 'nOvAbBB3mAE' },
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
                        courseId={course.id}
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