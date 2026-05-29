import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../images/구글 로고.svg';
import signupBackground from '../images/로그인 배경.png';

function SignUp(props) {
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        gender: '선택 안함',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직
        console.log('회원가입:', formData);
    };

    const handleGoogleSignUp = () => {
        // 구글 회원가입 로직
        console.log('구글로 회원가입');
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
            {/* 왼쪽 - 회원가입 폼 */}
            <div className="flex-1 flex items-start justify-center p-10 overflow-y-auto pt-20">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-[#4A3E3D] mb-10">회원가입</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 이름 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                이름
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="이름을 입력해주세요"
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                                required
                            />
                        </div>

                        {/* 닉네임 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                닉네임
                            </label>
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                placeholder="닉네임을 입력해주세요"
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                                required
                            />
                        </div>

                        {/* 성별 선택 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                성별
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm cursor-pointer bg-white text-[#4A3E3D] focus:outline-none focus:border-[#D18063]"
                            >
                                <option value="여자">여자</option>
                                <option value="남자">남자</option>
                                <option value="선택 안함">선택 안함</option>
                            </select>
                        </div>

                        {/* 이메일 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                이메일 주소
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="비밀번호를 입력해주세요"
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                                required
                            />
                        </div>

                        {/* 비밀번호 확인 입력 */}
                        <div>
                            <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                비밀번호 확인
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                placeholder="비밀번호를 다시 입력해주세요"
                                className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                                required
                            />
                        </div>

                        {/* 회원가입 버튼 */}
                        <button
                            type="submit"
                            className="w-full bg-[#D18063] text-white border-none px-6 py-3 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#C07053] transition-colors mt-6"
                        >
                            회원가입
                        </button>
                    </form>

                    {/* 구분선 */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-[#E0D9CF]"></div>
                        <span className="text-xs text-[#8A806D]">or</span>
                        <div className="flex-1 h-px bg-[#E0D9CF]"></div>
                    </div>

                    {/* 구글 회원가입 */}
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-[#E0D9CF] px-6 py-3 rounded-lg text-sm font-medium text-[#4A3E3D] cursor-pointer hover:bg-[#F9F6F0] transition-colors"
                    >
                        <img src={googleLogo} alt="구글" className="w-5 h-5" />
                        구글로 회원가입
                    </button>

                    {/* 계정 있음 링크 */}
                    <p className="text-center text-sm text-[#8A806D] mt-6">
                        계정이 있으신가요?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#D18063] font-semibold cursor-pointer hover:underline border-none bg-none"
                        >
                            로그인
                        </button>
                    </p>
                </div>
            </div>

            {/* 오른쪽 - 배경 이미지 */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
                <img
                    src={signupBackground}
                    alt="회원가입 배경"
                    className="w-full h-full object-cover rounded-l-[45px]"
                />
            </div>
        </div>
    );
}

export default SignUp;