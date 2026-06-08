import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import searchIcon from '../images/검색.svg';
import alarmIcon from '../images/알림.svg';
import profileImg from '../images/프로필사진.png';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/login');
  };

  // 경로별 제목 매핑
  const getTitleByPath = (pathname) => {
    // 동적 경로 처리
    if (pathname.startsWith('/course/')) {
      return '도안 학습 상세';
    }
    if (pathname.startsWith('/curriculum/')) {
      return '동영상 학습하기';
    }
    if (pathname.startsWith('/pattern/')) {
      return '패턴 상세';
    }
    if (pathname === '/patterns') {
      return '도안 목록';
    }

    const titleMap = {
      '/': '둘러보기',
      '/explore': '둘러보기',
      '/learning-course': '학습 중인 과정',
      '/payment': '결제',
      '/my-account': '내 계정',
      '/settings': '내 숙련도 설정',
      '/login': '로그인',
      '/signup': '회원가입',
      '/search': '검색',
    };
    return titleMap[pathname] || '페이지';
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/patterns?q=${encodeURIComponent(searchQuery)}`);
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

            {/* 프로필 이미지 및 드롭다운 */}
            <div style={{ position: 'relative' }}>
              <div
                className="avatar"
                style={{ backgroundImage: `url(${profileImg})`, cursor: 'pointer' }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              ></div>
              
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #E0D9CF',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  minWidth: '150px',
                  zIndex: 100
                }}>
                  <Link
                    to="/my-account"
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      textDecoration: 'none',
                      color: '#4A3E3D',
                      fontSize: '14px',
                      borderBottom: '1px solid #E0D9CF'
                    }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    내 계정
                  </Link>
                  <Link
                    to="/settings"
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      textDecoration: 'none',
                      color: '#4A3E3D',
                      fontSize: '14px',
                      borderBottom: '1px solid #E0D9CF'
                    }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    설정
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      color: '#D18063',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
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