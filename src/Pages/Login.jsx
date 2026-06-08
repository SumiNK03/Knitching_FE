import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiWithoutAuth } from '../utils/api';
import googleLogo from '../images/구글 로고.svg';
import loginBackground from '../images/로그인 배경.png';

function Login(props) {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!loginId) {
            setError('아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            setError('비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await apiWithoutAuth('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    loginId,
                    password
                })
            });

            console.log('로그인 성공:', response);
            
            // 토큰 저장 및 전역 상태 업데이트
            login(response.token, {
                userId: response.userId,
                loginId: response.loginId,
                name: response.name,
                role: response.role
            });

            alert('로그인이 완료되었습니다!');
            navigate('/');
        } catch (err) {
            console.error('로그인 실패:', err);
            setError(err.message || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // 구글 로그인 로직
        console.log('구글로 로그인');
    };

    return (
        <div className="flex h-full bg-[#F9F6F0]">
            <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px white inset !important;
                    box-shadow: 0 0 0 30px white inset !important;
                }
                
                input:-webkit-autofill {
                    -webkit-text-fill-color: #4A3E3D !important;
                }
            `}</style>
            {/* 왼쪽 - 로그인 폼 */}
            <div className="flex-1 flex items-center justify-center p-10">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-[#4A3E3D] mb-10">로그인</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 아이디 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                아이디
                            </label>
                            <input
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                placeholder="아이디를 입력해주세요"
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                                required
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력해주세요"
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                                required
                            />
                        </div>

                        {/* 회원가입 버튼 */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#D18063] text-white border-none px-6 py-3 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#C07053] transition-colors disabled:bg-[#B1B1B1] disabled:cursor-not-allowed"
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>

                    {/* 구분선 */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-[#E0D9CF]"></div>
                        <span className="text-xs text-[#8A806D]">or</span>
                        <div className="flex-1 h-px bg-[#E0D9CF]"></div>
                    </div>

                    {/* 구글 로그인 */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-[#E0D9CF] px-6 py-3 rounded-lg text-sm font-medium text-[#4A3E3D] cursor-pointer hover:bg-[#F9F6F0] transition-colors"
                    >
                        <img src={googleLogo} alt="구글" className="w-5 h-5" />
                        구글로 로그인
                    </button>

                    {/* 계정 없음 링크 */}
                    <p className="text-center text-sm text-[#8A806D] mt-8">
                        계정이 없으신가요?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-[#D18063] font-semibold cursor-pointer hover:underline border-none bg-none"
                        >
                            회원가입
                        </button>
                    </p>
                </div>
            </div>

            {/* 오른쪽 - 배경 이미지 */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
                <img
                    src={loginBackground}
                    alt="로그인 배경"
                    className="w-full h-full object-cover rounded-l-[45px]"
                />
            </div>
        </div>
    );
}

export default Login;