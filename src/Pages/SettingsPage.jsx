import React, { useState } from 'react';
import profileImg from '../images/프로필사진.png';
import arrowDownImage from '../images/arrow-down.svg';
import checkboxChecked from '../images/checkbox-checked.svg';
import checkboxUnchecked from '../images/checkbox-unchecked.svg';

function SettingsPage(props) {
    const [expandedSection, setExpandedSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [skillsState, setSkillsState] = useState({
        crochet: [
            {
                level: '기초',
                skills: [
                    { id: 1, name: '기술 1', mastered: true },
                    { id: 2, name: '기술 1', mastered: true },
                    { id: 3, name: '기술 1', mastered: false },
                    { id: 4, name: '기술 1', mastered: true }
                ]
            },
            {
                level: '중급',
                skills: [
                    { id: 5, name: '기술 1', mastered: true },
                    { id: 6, name: '기술 1', mastered: true },
                    { id: 7, name: '기술 1', mastered: false },
                    { id: 8, name: '기술 1', mastered: true }
                ]
            },
            {
                level: '고급',
                skills: [
                    { id: 9, name: '기술 1', mastered: true },
                    { id: 10, name: '기술 1', mastered: true },
                    { id: 11, name: '기술 1', mastered: true },
                    { id: 12, name: '기술 1', mastered: false }
                ]
            }
        ],
        knitting: [
            {
                level: '기초',
                skills: [
                    { id: 13, name: '기술 1', mastered: true },
                    { id: 14, name: '기술 1', mastered: true },
                    { id: 15, name: '기술 1', mastered: true },
                    { id: 16, name: '기술 1', mastered: false }
                ]
            },
            {
                level: '중급',
                skills: [
                    { id: 17, name: '기술 1', mastered: true },
                    { id: 18, name: '기술 1', mastered: false },
                    { id: 19, name: '기술 1', mastered: false },
                    { id: 20, name: '기술 1', mastered: true }
                ]
            },
            {
                level: '고급',
                skills: [
                    { id: 21, name: '기술 1', mastered: true },
                    { id: 22, name: '기술 1', mastered: true },
                    { id: 23, name: '기술 1', mastered: false },
                    { id: 24, name: '기술 1', mastered: true }
                ]
            }
        ]
    });
    
    const formData = {
        name: '김00',
        nickname: '뜨개질',
        email: 'alexarawles@gmail.com'
    };

    const toggleSection = (level, tool) => {
        setExpandedSection(expandedSection === `${tool}-${level}` ? null : `${tool}-${level}`);
    };

    const toggleSkillMastery = (tool, levelIndex, skillIndex) => {
        console.log('toggleSkillMastery called:', { tool, levelIndex, skillIndex });
        setSkillsState(prev => ({
            ...prev,
            [tool]: prev[tool].map((level, lIdx) =>
                lIdx === levelIndex
                    ? {
                        ...level,
                        skills: level.skills.map((skill, sIdx) =>
                            sIdx === skillIndex
                                ? {
                                    ...skill,
                                    mastered: !skill.mastered
                                  }
                                : skill
                        )
                      }
                    : level
            )
        }));
    };

    const SkillSection = ({ tool, skills, isEditing, onSkillChange }) => (
        <div className="space-y-4">
            {skills.map((section, levelIndex) => (
                <div key={section.level} className="bg-white rounded-lg overflow-hidden border border-[#E0D9CF]">
                    {/* 아코디언 헤더 */}
                    <button
                        onClick={() => toggleSection(section.level, tool)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#F9F6F0] transition-colors"
                    >
                        <span className="font-semibold text-[#4A3E3D]">
                            {section.level}
                        </span>
                        <img 
                            src={arrowDownImage}
                            alt="화살표"
                            className={`w-5 h-5 transition-transform ${
                                expandedSection === `${tool}-${section.level}` ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* 아코디언 컨텐츠 */}
                    {expandedSection === `${tool}-${section.level}` && (
                        <div className="p-4 border-t border-[#E0D9CF]">
                            <div className="grid grid-cols-2 gap-4">
                                {section.skills.map((skill, skillIndex) => (
                                    <button
                                        key={skill.id}
                                        onClick={() => {
                                            console.log('button clicked, isEditing:', isEditing);
                                            isEditing && onSkillChange(tool, levelIndex, skillIndex);
                                        }}
                                        className={`flex items-center gap-3 text-left ${isEditing ? 'cursor-pointer' : ''} hover:opacity-75 transition-opacity border-none bg-transparent p-0`}
                                        disabled={!isEditing}
                                    >
                                        {/* 체크박스 이미지 */}
                                        <img 
                                            src={skill.mastered ? checkboxChecked : checkboxUnchecked}
                                            alt={skill.mastered ? '완료' : '미완료'}
                                            className="w-5 h-5 flex-shrink-0"
                                        />
                                        <span className="text-sm text-[#4A3E3D]">
                                            {skill.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-[#F9F6F0] min-h-screen">
            {/* 배너 영역 */}
            <div className="bg-gradient-to-r from-[#F2EDE7] via-[#F1DBAB] to-[#D4B792] h-[150px]"></div>

            {/* 컨텐츠 영역 */}
            <div className="p-10">
                {/* 프로필 섹션 */}
                <div className="p-10 mb-10">
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex items-center gap-5">
                            <img
                                src={profileImg}
                                alt="프로필"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-[#4A3E3D] mb-1">
                                    {formData.nickname}
                                </h3>
                                <p className="text-sm font-normal text-[#8A806D] m-0">
                                    {formData.email}
                                </p>
                            </div>
                        </div>
                        {isEditing ? (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-[#D18063] text-white border-none px-6 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#C07053]"
                            >
                                저장
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#3A3232] text-white border-none px-6 py-2 rounded-lg text-sm font-medium cursor-pointer"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {/* 내 숙련도 설정 */}
                    <div>
                        <h4 className="text-base font-bold text-[#4A3E3D] mb-5">
                            내 숙련도 설정
                        </h4>

                        {/* 좌우 2열 레이아웃 */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* 왼쪽: 코바늘 */}
                            <div>
                                <h5 className="text-sm font-semibold text-[#4A3E3D] mb-4">
                                    코바늘
                                </h5>
                                <SkillSection tool="crochet" skills={skillsState.crochet} isEditing={isEditing} onSkillChange={toggleSkillMastery} />
                            </div>

                            {/* 오른쪽: 대바늘 */}
                            <div>
                                <h5 className="text-sm font-semibold text-[#4A3E3D] mb-4">
                                    대바늘
                                </h5>
                                <SkillSection tool="knitting" skills={skillsState.knitting} isEditing={isEditing} onSkillChange={toggleSkillMastery} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;