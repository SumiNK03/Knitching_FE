import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PatternCard from '../components/PatternCard';
import PatternGrid from '../components/PatternGrid';
import { apiWithoutAuth } from '../utils/api';

function ExplorePage() {
    const [newPatterns, setNewPatterns] = useState([]);
    const [hotPatterns, setHotPatterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const toPatternCardModel = useMemo(() => {
        return (items) => items.map((pattern) => ({
            id: pattern.patternId,
            image: pattern.thumbnailUrl,
            title: pattern.patternName,
            author: pattern.patternAuthorName,
            tool: pattern.tool,
            price: pattern.price
        }));
    }, []);

    const normalizeListResponse = (response) => {
        if (Array.isArray(response)) {
            return response;
        }
        if (Array.isArray(response?.content)) {
            return response.content;
        }
        if (Array.isArray(response?.data)) {
            return response.data;
        }
        return [];
    };

    useEffect(() => {
        const fetchExplorePatterns = async () => {
            setLoading(true);
            setError('');

            try {
                const [latestResponse, popularResponse] = await Promise.all([
                    apiWithoutAuth('/api/patterns?sort=latest&tool=all&page=0&size=4'),
                    apiWithoutAuth('/api/patterns?sort=popular&tool=all&page=0&size=4')
                ]);

                const latestItems = normalizeListResponse(latestResponse);
                const popularItems = normalizeListResponse(popularResponse);

                setNewPatterns(toPatternCardModel(latestItems));
                setHotPatterns(toPatternCardModel(popularItems));
            } catch (err) {
                setError(err.message || '둘러보기 도안을 불러오지 못했습니다.');
                setNewPatterns([]);
                setHotPatterns([]);
            } finally {
                setLoading(false);
            }
        };

        fetchExplorePatterns();
    }, [toPatternCardModel]);

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
                {loading ? (
                    <p className="text-[#8A806D]">불러오는 중...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <PatternGrid columns={4} gap={24}>
                        {newPatterns.map((pattern) => (
                            <PatternCard
                                key={pattern.id}
                                image={pattern.image}
                                title={pattern.title}
                                author={pattern.author}
                                tool={pattern.tool}
                                patternId={pattern.id}
                                price={pattern.price}
                            />
                        ))}
                    </PatternGrid>
                )}
            </div>

            {/* HOT 섹션 */}
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#4A3E3D]">
                        HOT
                    </h2>
                    <Link to="/patterns?sort=popular" className="text-sm font-medium text-[#3A3232] no-underline cursor-pointer hover:text-[#D18063] transition-colors">
                        모두 보기
                    </Link>
                </div>
                {loading ? (
                    <p className="text-[#8A806D]">불러오는 중...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <PatternGrid columns={4} gap={24}>
                        {hotPatterns.map((pattern) => (
                            <PatternCard
                                key={pattern.id}
                                image={pattern.image}
                                title={pattern.title}
                                author={pattern.author}
                                tool={pattern.tool}
                                patternId={pattern.id}
                                price={pattern.price}
                            />
                        ))}
                    </PatternGrid>
                )}
            </div>
        </div>
    );
}

export default ExplorePage;