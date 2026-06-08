import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoIcon from '../images/logo.svg';
import exploreIcon from '../images/둘러보기.svg';
import exploreIconGray from '../images/둘러보기_그레이.svg';
import courseIcon from '../images/학습중인과정.svg';
import courseIconGray from '../images/학습중인과정_그레이.svg';
import patternIcon from '../images/도안.svg';
import patternIconGray from '../images/도안_그레이.svg';
import settingsIcon from '../images/설정.svg';
import settingsIconGray from '../images/설정_그레이.svg';
import accountIcon from '../images/내 계정.svg';
import accountIconGray from '../images/내 계정_그레이.svg';

function SideBar() {
  const location = useLocation();

  const menuItems = [
    { path: '/explore', label: '둘러보기', icon: exploreIcon, iconGray: exploreIconGray },
    { path: '/learning-course', label: '학습 중인 과정', icon: courseIcon, iconGray: courseIconGray },
    { path: '/patterns', label: '도안', icon: patternIcon, iconGray: patternIconGray },
    { path: '/my-account', label: '내 계정', icon: accountIcon, iconGray: accountIconGray },
    { path: '/settings', label: '내 숙련도 설정', icon: settingsIcon, iconGray: settingsIconGray },
  ];

  const isActive = (path) => {
    if (path === '/explore' && (location.pathname === '/' || location.pathname === '/explore')) {
      return true;
    }
    if (path === '/patterns' && (location.pathname.startsWith('/patterns') || location.pathname.startsWith('/pattern/'))) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <aside className="sidebar flex flex-col gap-10 px-5 py-8">
      {/* 로고 */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="sidebar-logo flex items-center gap-2" style={{ cursor: 'pointer' }}>
          <img src={logoIcon} alt="로고" className="w-7 h-7" />
          <span>Knitching</span>
        </div>
      </Link>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1">
        <ul className="sidebar-nav">
          {menuItems.map((item) => {
            const isItemActive = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={isItemActive ? 'active' : ''}
                >
                  <img src={isItemActive ? item.icon : item.iconGray} alt={item.label} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;