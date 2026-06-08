import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useAuth } from '../contexts/AuthContext';
import { apiWithAuth } from '../utils/api';
import profileImg from '../images/프로필사진.png';
import mailIcon from '../images/메일.svg';

function MyAccountPage(props) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        gender: '선택 안함',
        address: '',
        email: ''
    });

    const [emails, setEmails] = useState([]);
    const [showPostcode, setShowPostcode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    // Gender 값 매핑 함수
    const genderToKorean = (gender) => {
        const genderMap = {
            'male': '남자',
            'female': '여자',
            'other': '선택 안함'
        };
        return genderMap[gender] || '선택 안함';
    };

    const genderToEnum = (gender) => {
        const genderMap = {
            '남자': 'male',
            '여자': 'female',
            '선택 안함': 'other'
        };
        return genderMap[gender] || 'other';
    };

    // 컴포넌트 마운트 시 사용자 정보 조회
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const response = await apiWithAuth('/api/users', {
                method: 'GET'
            });

            setFormData({
                name: response.name || '',
                nickname: response.nickname || '',
                gender: genderToKorean(response.gender) || '선택 안함',
                address: response.address || '',
                email: response.email || ''
            });

            // 이메일 배열 설정
            if (response.email) {
                setEmails([{ email: response.email, addedDate: 'Account email' }]);
            }

            setError('');
        } catch (err) {
            console.error('사용자 정보 조회 실패:', err);
            setError('사용자 정보를 불러오지 못했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveUserData = async () => {
        try {
            setIsSaving(true);
            setError('');

            const genderEnum = genderToEnum(formData.gender);
            console.log('전송할 성별:', formData.gender, '→', genderEnum);

            const response = await apiWithAuth('/api/users', {
                method: 'PUT',
                body: JSON.stringify({
                    name: formData.name,
                    nickname: formData.nickname,
                    gender: genderEnum,
                    address: formData.address,
                    email: formData.email
                })
            });

            setFormData({
                name: response.name || '',
                nickname: response.nickname || '',
                gender: genderToKorean(response.gender) || '선택 안함',
                address: response.address || '',
                email: response.email || ''
            });

            if (response.email) {
                setEmails([{ email: response.email, addedDate: 'Account email' }]);
            }

            setIsEditing(false);
            alert('사용자 정보가 수정되었습니다!');
        } catch (err) {
            console.error('사용자 정보 수정 실패:', err);
            setError(err.message || '정보 수정에 실패했습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePostcodeComplete = (data) => {
        const address = data.address;
        setFormData({
            ...formData,
            address: address
        });
        setShowPostcode(false);
    };

    return (
        <div className="bg-[#F9F6F0] min-h-screen">
            {/* 배너 영역 - 전체 너비 */}
            <div className="bg-gradient-to-r from-[#F2EDE7] via-[#F1DBAB] to-[#D4B792] h-[150px]"></div>

            {/* 컨텐츠 영역 */}
            <div className="p-10">
                {isLoading ? (
                    <div className="text-center text-[#4A3E3D] text-lg">
                        로딩 중...
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

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
                                            {formData.name}
                                        </h3>
                                        <p className="text-sm font-normal text-[#8A806D] m-0">
                                            {formData.email}
                                        </p>
                                    </div>
                                </div>
                                {isEditing ? (
                                    <button
                                        onClick={handleSaveUserData}
                                        disabled={isSaving}
                                        className="bg-[#D18063] text-white border-none px-6 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#C07053] disabled:bg-[#B1B1B1] disabled:cursor-not-allowed"
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

                    {/* 입력 필드 */}
                    {isEditing ? (
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            {/* 이름 */}
                            <div>
                                <label className="text-sm font-semibold text-[#4A3E3D] block mb-2 ">
                                    이름
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white"
                                />
                            </div>

                            {/* 닉네임 */}
                            <div>
                                <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                    닉네임
                                </label>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white"
                                />
                            </div>

                            {/* 성별 */}
                            <div>
                                <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                    성별
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-12 border border-[#E0D9CF] rounded-lg text-sm cursor-pointer bg-white"
                                >
                                    <option value="여자">여자</option>
                                    <option value="남자">남자</option>
                                    <option value="선택 안함">선택 안함</option>
                                </select>
                            </div>

                            {/* 지역 */}
                            <div>
                                <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                    지역
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPostcode(!showPostcode)}
                                    className="w-full px-4 py-3 pr-12 border border-[#E0D9CF] rounded-lg text-sm cursor-pointer bg-white text-left text-[#4A3E3D]"
                                >
                                    {formData.address || '주소 검색'}
                                </button>
                            </div>

                            {/* 이메일 */}
                            <div>
                                <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                    이메일
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                {/* 읽기 모드 - 입력 필드처럼 표시 */}
                                <div>
                                    <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                        이름
                                    </label>
                                    <div className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] cursor-default">
                                        {formData.name}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                        닉네임
                                    </label>
                                    <div className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] cursor-default">
                                        {formData.nickname}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                        성별
                                    </label>
                                    <div className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] cursor-default">
                                        {formData.gender}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-[#4A3E3D] block mb-2">
                                        지역
                                    </label>
                                    <div className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] cursor-default">
                                        {formData.address || '미설정'}
                                    </div>
                                </div>
                            </div>

                            {/* 이메일 주소 섹션 - 읽기 전용 */}
                            <div>
                                <h4 className="text-base font-bold text-[#4A3E3D] mb-5">
                                    이메일 주소
                                </h4>
                                {emails.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center p-4 border border-[#E0D9CF] rounded-lg mb-2 bg-white"
                                    >
                                        <img src={mailIcon} alt="메일" className="w-5 h-5 mr-4" />
                                        <div>
                                            <p className="text-sm font-medium text-[#4A3E3D] mb-1">
                                                {item.email}
                                            </p>
                                            <p className="text-xs font-normal text-[#B1B1B1] m-0">
                                                {item.addedDate}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                    </>
                )}
            </div>

            {/* Daum 우편번호 검색 모달 */}
            {showPostcode && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-[#4A3E3D]">주소 검색</h3>
                            <button
                                onClick={() => setShowPostcode(false)}
                                className="text-2xl text-[#B1B1B1] hover:text-[#4A3E3D]"
                            >
                                ×
                            </button>
                        </div>
                        <DaumPostcode
                            onComplete={handlePostcodeComplete}
                            onClose={() => setShowPostcode(false)}
                        />
                    </div>
                </div>
            )}
            </div>
    );
}

export default MyAccountPage;