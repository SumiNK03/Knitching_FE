import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import searchIcon from '../images/검색.svg';
import alarmIcon from '../images/알림.svg';
import profileImg from '../images/프로필사진.png';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // 경로별 제목 매핑
  const getTitleByPath = (pathname) => {
    const titleMap = {
      '/': '둘러보기',
      '/explore': '둘러보기',
      '/learning-course': '학습 중인 과정',
      '/my-account': '내 계정',
      '/knitting-patterns': '도안 - 대바늘',
      '/crochet-patterns': '도안 - 코바늘',
      '/settings': '설정',
      '/login': '로그인',
      '/signup': '회원가입',
      '/search': '검색',
    };
    return titleMap[pathname] || '페이지';
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const pageTitle = getTitleByPath(location.pathname);

  return (
    <header className="header">
      {/* 왼쪽 페이지 제목 */}
      <div style={{ fontSize: '28px', fontWeight: '800', color: '#4A3E3D' }}>
        {pageTitle}
      </div>

      {/* 오른쪽 영역 */}
      <div className="header-right">
        {/* 검색창 */}
        <div className="search-wrapper">
          <img src={searchIcon} alt="검색" style={{ width: '20px', height: '20px' }} />
          <input
            type="text"
            className="search-input"
            placeholder="도안 이름이나 작가로 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {isLoggedIn ? (
          <>
            {/* 알림 아이콘 */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <img src={alarmIcon} alt="알림" style={{ width: '24px', height: '24px' }} />
            </button>

            {/* 프로필 이미지 */}
            <div
              className="avatar"
              style={{ backgroundImage: `url(${profileImg})`, cursor: 'pointer' }}
            ></div>
          </>
        ) : (
          /* 로그인 버튼 */
          <Link to="/login" className="login-btn">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;