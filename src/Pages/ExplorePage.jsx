import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PatternCard from '../components/PatternCard';
import PatternGrid from '../components/PatternGrid';
import patternsData from '../data/patterns.json';
import { patternImages } from '../data/patternImages';

function ExplorePage() {
    // 이미지 추가하여 allPatterns 생성
    const allPatterns = useMemo(() => {
        return patternsData.map(pattern => ({
            ...pattern,
            image: patternImages[pattern.imageId],
            createdAt: new Date(pattern.createdAt)
        }));
    }, []);

    // 새로 등록된 도안 (최신순, 4개)
    const newPatterns = useMemo(() => {
        return allPatterns
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4);
    }, [allPatterns]);

    // HOT 도안 (인기순, 4개)
    const hotPatterns = useMemo(() => {
        return allPatterns
            .slice()
            .sort((a, b) => b.enrolls - a.enrolls)
            .slice(0, 4);
    }, [allPatterns]);

    return (
        <div className="p-10 bg-[#F9F6F0] min-h-screen">
            {/* 새로 등록된 도안 섹션 */}
            <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#4A3E3D]">
                        새로 등록된 도안
                    </h2>
                    <Link to="/patterns?sort=latest" className="text-sm font-medium text-[#3A3232] no-underline cursor-pointer hover:text-[#D18063] transition-colors">
                        모두 보기
                    </Link>
                </div>
                <PatternGrid columns={4} gap={24}>
                    {newPatterns.map((pattern) => (
                        <PatternCard
                            key={pattern.id}
                            image={pattern.image}
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
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#4A3E3D]">
                        HOT
                    </h2>
                    <Link to="/patterns?sort=hot" className="text-sm font-medium text-[#3A3232] no-underline cursor-pointer hover:text-[#D18063] transition-colors">
                        모두 보기
                    </Link>
                </div>
                <PatternGrid columns={4} gap={24}>
                    {hotPatterns.slice(0, 4).map((pattern) => (
                        <PatternCard
                            key={pattern.id}
                            image={pattern.image}
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