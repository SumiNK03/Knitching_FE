import React from 'react';
import { Link } from 'react-router-dom';
import PatternCard from '../components/PatternCard';
import PatternGrid from '../components/PatternGrid';
import pattern1 from '../images/도안1.jpg';
import pattern2 from '../images/도안2.jpg';
import pattern3 from '../images/도안3.jpg';
import pattern4 from '../images/도안4.jpg';
import pattern5 from '../images/도안5.jpg';
import pattern6 from '../images/도안6.jpg';
import pattern7 from '../images/도안7.jpg';
import pattern8 from '../images/도안8.jpg';

function ExplorePage(props) {
    // 임시 데이터 (추후 API에서 받아올 예정)
    const newPatterns = [
        {
            id: 1,
            image: pattern1,
            title: '밴쿠버 가디건',
            author: '바늘이야기',
            tool: '대바늘'
        },
        {
            id: 2,
            image: pattern2,
            title: '츄러스 가디건',
            author: '보송',
            tool: '대바늘'
        },
        {
            id: 3,
            image: pattern3,
            title: '오필리아 블라우스',
            author: '외국 작가',
            tool: '대바늘'
        },
        {
            id: 4,
            image: pattern4,
            title: '레인드롭 티',
            author: '솜솜뜨개',
            tool: '대바늘'
        }
    ];

    const hotPatterns = [
        {
            id: 5,
            image: pattern5,
            title: '시나몬 코위찬',
            author: '호호수',
            tool: '대바늘'
        },
        {
            id: 6,
            image: pattern6,
            title: '크리스마스 리본 드레스',
            author: '보송',
            tool: '대바늘'
        },
        {
            id: 7,
            image: pattern7,
            title: '하이소프트 체커보드 숄더백',
            author: '바늘이야기',
            tool: '코바늘'
        },
        {
            id: 8,
            image: pattern8,
            title: '모티브 셔츠 가디건',
            author: '뜨개사계절',
            tool: '코바늘'
        }
    ];

    return (
        <div style={{ padding: '40px', backgroundColor: '#F9F6F0', minHeight: '100vh' }}>
            {/* 새로 등록된 도안 섹션 */}
            <div style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#4A3E3D' }}>
                        새로 등록된 도안
                    </h2>
                    <Link to="/" style={{ fontSize: '14px', fontWeight: '500', color: '#3A3232', textDecoration: 'none', cursor: 'pointer' }}>
                        모두 보기
                    </Link>
                </div>
                <PatternGrid columns={4} gap={24}>
                    {newPatterns.map((pattern) => (
                        <PatternCard
                            key={pattern.id}
                            imaage={pattern.image}
                            title={pattern.title}
                            author={pattern.author}
                            tool={pattern.tool}
                            patternId={pattern.id}
                        />
                    ))}
                </PatternGrid>
            </div>

            {/* HOT 섹션 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#4A3E3D' }}>
                        HOT
                    </h2>
                    <Link to="/" style={{ fontSize: '14px', fontWeight: '500', color: '#3A3232', textDecoration: 'none', cursor: 'pointer' }}>
                        모두 보기
                    </Link>
                </div>
                <PatternGrid columns={4} gap={24}>
                    {hotPatterns.slice(0, 4).map((pattern) => (
                        <PatternCard
                            key={pattern.id}
                            imaage={pattern.image}
                            title={pattern.title}
                            author={pattern.author}
                            tool={pattern.tool}
                            patternId={pattern.id}
                        />
                    ))}
                </PatternGrid>
            </div>
        </div>
    );
}

export default ExplorePage;