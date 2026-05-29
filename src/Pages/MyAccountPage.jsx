import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import profileImg from '../images/프로필사진.png';
import mailIcon from '../images/메일.svg';

function MyAccountPage(props) {
    const [formData, setFormData] = useState({
        name: '김00',
        nickname: '뜨개질',
        gender: '여자',
        region: '강원특별자치도 춘천시 만천로 107',
        email: 'alexarawles@gmail.com'
    });

    const [emails, setEmails] = useState([
        { email: 'alexarawles@gmail.com', addedDate: '1 month ago' }
    ]);

    const [showPostcode, setShowPostcode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // 이메일 변경 시 emails 배열도 동기화
        if (name === 'email') {
            setEmails([{ ...emails[0], email: value }]);
        }
    };

    const handlePostcodeComplete = (data) => {
        const address = data.address;
        setFormData({
            ...formData,
            region: address
        });
        setShowPostcode(false);
    };

    return (
        <div className="bg-[#F9F6F0] min-h-screen">
            {/* 배너 영역 - 전체 너비 */}
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
                                    {formData.name}
                                </h3>
                                <p className="text-sm font-normal text-[#8A806D] m-0">
                                    0417sumin@gmail.com
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
                                    {formData.region || '주소 검색'}
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
                                        {formData.region || '미설정'}
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