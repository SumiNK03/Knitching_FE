import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiWithAuth } from '../utils/api';
import profileImg from '../images/프로필사진.png';
import arrowDownImage from '../images/arrow-down.svg';
import checkboxChecked from '../images/checkbox-checked.svg';
import checkboxUnchecked from '../images/checkbox-unchecked.svg';

function SettingsPage(props) {
    const { user, isLoggedIn } = useAuth();
    const [expandedSection, setExpandedSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [apiSkillsData, setApiSkillsData] = useState([]);
    const [skillsState, setSkillsState] = useState({
        crochet: [],
        knitting: []
    });

    // API에서 데이터 가져오기
    const fetchUserSkills = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await apiWithAuth('/api/user-skills', {
                method: 'GET'
            });
            console.log('[SettingsPage] API 응답:', response);
            setApiSkillsData(response);
            transformApiDataToState(response);
        } catch (err) {
            setError('기술 정보를 불러오는 중 오류가 발생했습니다.');
            console.error('Fetch skills error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // API 데이터를 컴포넌트 state 형식으로 변환
    const transformApiDataToState = (apiData) => {
        console.log('[SettingsPage] transformApiDataToState 시작:', apiData);
        const newState = { crochet: [], knitting: [] };

        apiData.forEach(toolGroup => {
            console.log('[SettingsPage] toolGroup:', toolGroup);
            const toolKey = toolGroup.tool === 'KNT' ? 'knitting' : 'crochet';

            toolGroup.levelGroups.forEach(levelGroup => {
                console.log('[SettingsPage] levelGroup:', levelGroup);
                const skillsArray = levelGroup.skills.map((skill, idx) => {
                    console.log('[SettingsPage] skill:', skill);
                    return {
                        id: `${skill.techCode}`,
                        name: skill.title || skill.techCode,  // title이 없으면 techCode 사용
                        mastered: skill.level === 1,
                        techCode: skill.techCode
                    };
                });

                newState[toolKey].push({
                    level: levelGroup.levelName,
                    skills: skillsArray
                });
            });
        });

        console.log('[SettingsPage] 변환된 state:', newState);
        setSkillsState(newState);
    };

    // 컴포넌트 마운트 시 데이터 조회
    useEffect(() => {
        if (isLoggedIn) {
            fetchUserSkills();
        }
    }, [isLoggedIn]);

    // 저장 함수
    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError('');
            setSuccessMessage('');

            // skillsState를 API 형식으로 변환
            const skillsToUpdate = [];
            
            // crochet 기술들
            skillsState.crochet.forEach(level => {
                level.skills.forEach(skill => {
                    skillsToUpdate.push({
                        techCode: skill.techCode,
                        level: skill.mastered ? 1 : 0
                    });
                });
            });

            // knitting 기술들
            skillsState.knitting.forEach(level => {
                level.skills.forEach(skill => {
                    skillsToUpdate.push({
                        techCode: skill.techCode,
                        level: skill.mastered ? 1 : 0
                    });
                });
            });

            const response = await apiWithAuth('/api/user-skills', {
                method: 'PUT',
                body: JSON.stringify({
                    skills: skillsToUpdate
                })
            });

            setApiSkillsData(response);
            transformApiDataToState(response);
            setIsEditing(false);
            setSuccessMessage('기술 정보가 성공적으로 저장되었습니다.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('기술 정보 저장 중 오류가 발생했습니다.');
            console.error('Save skills error:', err);
        } finally {
            setIsSaving(false);
        }
    };
    
    const formData = {
        name: user?.name || '',
        nickname: user?.nickname || '',
        email: user?.email || ''
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
                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">
                        로딩 중...
                    </div>
                ) : (
                    <>
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
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-[#D18063] text-white border-none px-6 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#C07053] disabled:bg-gray-400"
                            >
                                {isSaving ? '저장 중...' : '저장'}
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
                    </>
                )}
            </div>
        </div>
    );
}

export default SettingsPage;