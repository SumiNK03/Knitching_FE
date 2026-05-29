import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../images/구글 로고.svg';
import loginBackground from '../images/로그인 배경.png';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직
        console.log('로그인:', email, password);
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 이메일 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                이메일 주소
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력해주세요"
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
                            className="w-full bg-[#D18063] text-white border-none px-6 py-3 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#C07053] transition-colors"
                        >
                            회원가입
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