import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiWithAuth, apiWithoutAuth } from '../utils/api';

function PatternDetailPage() {
    const { patternId } = useParams();
    const navigate = useNavigate();
    const [pattern, setPattern] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [enrollMessage, setEnrollMessage] = useState('');

    useEffect(() => {
        const fetchPattern = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await apiWithoutAuth(`/api/patterns/${patternId}`);

                const detail = response?.data || response?.content || response;
                setPattern(detail);
                setLikes(Number(detail?.like ?? 0));
            } catch (err) {
                setError(err.message || '도안 상세 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (patternId) {
            fetchPattern();
        }
    }, [patternId]);

    if (loading) {
        return (
            <div className="p-10">
                <p className="text-center text-gray-500">패턴 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    if (error || !pattern) {
        return (
            <div className="p-10">
                <button
                    onClick={() => navigate(-1)}
                    className="text-lg text-[#D18063] font-semibold hover:text-[#C67053] mb-8"
                >
                    ← 돌아가기
                </button>
                <p className="text-center text-gray-500">{error || '패턴 정보를 불러올 수 없습니다.'}</p>
            </div>
        );
    }

    const handleEnroll = async () => {
        if (!patternId || isEnrolling) return;

        setEnrollMessage('');
        setIsEnrolling(true);

        try {
            await apiWithAuth(`/api/enrollments/${patternId}`, {
                method: 'POST',
            });
            navigate('/payment');
        } catch (err) {
            if (err?.status === 409) {
                setEnrollMessage('이미 신청한 도안입니다.');
            } else if (err?.status === 401 || String(err?.message || '').includes('로그인')) {
                setEnrollMessage('로그인 후 수강신청이 가능합니다.');
                navigate('/login');
            } else if (err?.status === 404) {
                setEnrollMessage('도안 또는 사용자 정보를 찾을 수 없습니다.');
            } else {
                setEnrollMessage(err?.message || '수강신청 중 오류가 발생했습니다.');
            }
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleLike = () => {
        if (!hasLiked) {
            setLikes(likes + 1);
            setHasLiked(true);
        } else {
            setLikes(likes - 1);
            setHasLiked(false);
        }
    };

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
            </div>

            {/* 메인 컨텐츠 */}
            <div className="p-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* 좌측: 패턴 이미지 */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-100 rounded-[20px] shadow-lg overflow-hidden sticky top-20">
                            {pattern.thumbnailUrl ? (
                                <img
                                    src={pattern.thumbnailUrl}
                                    alt={pattern.patternName}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="w-full h-[420px] flex items-center justify-center text-sm text-gray-500 bg-[#F0ECE3]">
                                    썸네일 이미지가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 우측: 패턴 정보 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 제목 및 기본 정보 */}
                        <div className="bg-white rounded-[20px] shadow-md p-8">
                            <h1 className="text-4xl font-black text-[#4A3E3D] mb-4">
                                {pattern.patternName}
                            </h1>

                            <div className="space-y-4 border-t border-[#E0D9CF] pt-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#7A7265]">가격</span>
                                    <span className="text-2xl font-black text-[#D18063]">₩{(pattern.price ?? 0).toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#7A7265]">작가</span>
                                    <span className="text-lg font-semibold text-[#4A3E3D]">{pattern.patternAuthorName}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#7A7265]">난이도</span>
                                    <div className="flex gap-1">
                                        {[...Array(pattern.difficulty || 3)].map((_, i) => (
                                            <span key={i} className="text-xl">⭐</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#7A7265]">도구</span>
                                    <span className="inline-block bg-[#D18063] text-white px-4 py-2 rounded-[10px] text-sm font-semibold">
                                        {pattern.tool}
                                    </span>
                                </div>

                                {pattern.skillLevel && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-[#7A7265]">권장 숙련도</span>
                                        <span className="text-base font-medium text-[#4A3E3D]">{pattern.skillLevel}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 패턴 설명 */}
                        <div className="bg-white rounded-[20px] shadow-md p-8">
                            <h3 className="text-xl font-bold text-[#3A3232] mb-4 pb-4 border-b border-[#E0D9CF]">
                                패턴 정보
                            </h3>
                            <p className="text-base text-[#4A3E3D] leading-relaxed whitespace-pre-wrap">
                                {pattern.patternContent || '이 패턴은 초보자부터 숙련된 뜨개꾼까지 즐길 수 있는 매력적인 디자인입니다. 세밀한 기법과 정교한 마무리로 완성도 높은 작품을 만들 수 있습니다.'}
                            </p>
                        </div>

                        {/* 상호작용 버튼 */}
                        <div className="bg-white rounded-[20px] shadow-md p-8">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* 좋아요 버튼 */}
                                <button
                                    onClick={handleLike}
                                    className={`py-3 rounded-[15px] font-bold text-lg transition-all ${
                                        hasLiked
                                            ? 'bg-[#FFE5D9] text-[#D18063]'
                                            : 'bg-[#F0ECE3] text-[#4A3E3D] hover:bg-[#E8E0D9]'
                                    }`}
                                >
                                    👍 좋아요 ({likes})
                                </button>

                                {/* 공유 버튼 */}
                                <button
                                    className="py-3 rounded-[15px] font-bold text-lg bg-[#F0ECE3] text-[#4A3E3D] hover:bg-[#E8E0D9] transition-colors"
                                >
                                    🔗 공유하기
                                </button>
                            </div>

                            {/* 수강신청 버튼 */}
                            <button
                                onClick={handleEnroll}
                                disabled={isEnrolling}
                                className="w-full py-4 rounded-[15px] font-bold text-lg text-white bg-[#D18063] hover:bg-[#C67053] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isEnrolling ? '신청 중...' : '수강신청'}
                            </button>
                            {enrollMessage && (
                                <p className="mt-3 text-sm text-center text-[#4A3E3D]">{enrollMessage}</p>
                            )}
                        </div>

                        {/* 작가 정보 */}
                        <div className="bg-white rounded-[20px] shadow-md p-8">
                            <h3 className="text-lg font-bold text-[#3A3232] mb-4 pb-4 border-b border-[#E0D9CF]">
                                작가 정보
                            </h3>
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#F0ECE3] rounded-full flex-shrink-0"></div>
                                <div className="flex-1">
                                    <p className="font-bold text-[#4A3E3D] mb-2">{pattern.patternAuthorName}</p>
                                    <p className="text-sm text-[#7A7265]">
                                        다양한 뜨개 패턴을 만드는 작가입니다. 초보자부터 숙련된 분까지 즐길 수 있는 작품들을 선보이고 있습니다.
                                    </p>
                                    <button className="mt-3 px-4 py-2 bg-[#F0ECE3] text-[#4A3E3D] rounded-[10px] font-semibold hover:bg-[#E8E0D9] transition-colors">
                                        작가 프로필 보기
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 통계 정보 */}
                        <div className="bg-white rounded-[20px] shadow-md p-8">
                            <h3 className="text-lg font-bold text-[#3A3232] mb-4 pb-4 border-b border-[#E0D9CF]">
                                통계
                            </h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-3xl font-black text-[#D18063] mb-2">{Number(pattern.viewCount ?? pattern.views ?? 0).toLocaleString()}</p>
                                    <p className="text-xs font-bold text-[#7A7265]">조회수</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-[#D18063] mb-2">{Number(pattern.enrollCount ?? pattern.enrolls ?? 0).toLocaleString()}</p>
                                    <p className="text-xs font-bold text-[#7A7265]">수강신청</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-[#D18063] mb-2">{Number(pattern.rating ?? 0).toFixed(1)}</p>
                                    <p className="text-xs font-bold text-[#7A7265]">평점</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatternDetailPage;
