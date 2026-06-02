import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 3초 후 결제 완료 상태로 변경
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleLearning = () => {
        navigate('/learning-course');
    };

    const handleHome = () => {
        navigate('/explore');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FEFAF5] to-[#F0ECE3] flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {isLoading ? (
                    // 결제 중 화면
                    <div className="bg-white rounded-[30px] shadow-2xl p-12 text-center animate-fade-in">
                        {/* 로딩 스피너 */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 rounded-full border-4 border-[#F0ECE3]"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#D18063] border-r-[#D18063] animate-spin"></div>
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-[#4A3E3D] mb-4">
                            결제 중입니다
                        </h1>

                        <p className="text-base text-[#8A806D] mb-2">
                            잠시만 기다려주세요
                        </p>

                        <p className="text-sm text-[#B5A89A]">
                            안전한 결제 처리 중...
                        </p>

                        {/* 진행 바 */}
                        <div className="mt-8 w-full bg-[#F0ECE3] rounded-full h-2 overflow-hidden">
                            <div className="bg-[#D18063] h-full animate-progress"></div>
                        </div>
                    </div>
                ) : (
                    // 결제 완료 화면
                    <div className="bg-white rounded-[30px] shadow-2xl p-12 text-center animate-fade-in">
                        {/* 체크마크 */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative w-20 h-20 bg-[#E8F5F5] rounded-full flex items-center justify-center animate-scale-in">
                                <svg className="w-12 h-12 text-[#2B7A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-[#4A3E3D] mb-4">
                            결제 완료되었습니다
                        </h1>

                        <p className="text-base text-[#8A806D] mb-8">
                            수강신청이 완료되었습니다.<br />이제 패턴을 학습할 수 있습니다.
                        </p>

                        <div className="space-y-3">
                            {/* 학습하러 가기 버튼 */}
                            <button
                                onClick={handleLearning}
                                className="w-full py-4 bg-[#D18063] text-white rounded-[15px] font-bold text-lg hover:bg-[#C67053] transition-colors shadow-md"
                            >
                                📚 학습하러 가기
                            </button>

                            {/* 메인화면으로 버튼 */}
                            <button
                                onClick={handleHome}
                                className="w-full py-4 bg-[#F0ECE3] text-[#4A3E3D] rounded-[15px] font-bold text-lg hover:bg-[#E8E0D9] transition-colors"
                            >
                                🏠 메인화면으로
                            </button>
                        </div>

                        {/* 추가 정보 */}
                        <div className="mt-8 p-4 bg-[#FEFAF5] rounded-[15px] text-sm text-[#7A7265]">
                            <p>수강 기간: 무제한</p>
                            <p className="mt-2">언제든지 학습을 시작할 수 있습니다.</p>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes scale-in {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes progress {
                    0% {
                        width: 0%;
                    }
                    100% {
                        width: 100%;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-progress {
                    animation: progress 3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default PaymentPage;
