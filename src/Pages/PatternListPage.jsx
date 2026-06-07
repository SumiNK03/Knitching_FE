import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PatternCard from '../components/PatternCard';
import PatternGrid from '../components/PatternGrid';
import patternsData from '../data/patterns.json';
import { patternImages } from '../data/patternImages';

function PatternListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Query parameters 읽기
    const tool = searchParams.get('tool') || 'all';
    const sort = searchParams.get('sort') || 'latest';
    const searchQuery = searchParams.get('q') || '';
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    
    const ITEMS_PER_PAGE = 12;

    // 이미지 추가하여 allPatterns 생성
    const allPatterns = useMemo(() => {
        return patternsData.map(pattern => ({
            ...pattern,
            image: patternImages[pattern.imageId],
            createdAt: new Date(pattern.createdAt)
        }));
    }, []);

    // 필터링 및 정렬
    const filteredPatterns = useMemo(() => {
        let filtered = allPatterns;

        // 검색어 필터링
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // tool 필터링
        if (tool !== 'all') {
            const toolName = tool === 'knitting' ? '대바늘' : '코바늘';
            filtered = filtered.filter(p => p.tool === toolName);
        }

        // 정렬
        if (sort === 'hot') {
            filtered.sort((a, b) => b.enrolls - a.enrolls);
        } else {
            // latest
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return filtered;
    }, [searchQuery, tool, sort, allPatterns]);

    // 페이지네이션
    const totalPages = Math.ceil(filteredPatterns.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPatterns = filteredPatterns.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // 페이지 제목 생성
    const getPageTitle = () => {
        if (searchQuery) {
            return `검색: ${searchQuery}`;
        }
        
        let title = '도안';
        
        if (tool === 'knitting') {
            title += ' - 대바늘';
        } else if (tool === 'crochet') {
            title += ' - 코바늘';
        }

        if (sort === 'hot') {
            title += ' (인기순)';
        }

        return title;
    };

    // 정렬 옵션 변경
    const handleSortChange = (newSort) => {
        setSearchParams({ 
            ...(searchQuery && { q: searchQuery }),
            ...(tool !== 'all' && { tool }), 
            sort: newSort,
            page: '1'
        });
    };

    // 도구 필터 변경
    const handleToolChange = (newTool) => {
        setSearchParams({ 
            ...(searchQuery && { q: searchQuery }),
            tool: newTool, 
            sort,
            page: '1'
        });
    };

    // 페이지 변경
    const handlePageChange = (page) => {
        setSearchParams({ 
            ...(searchQuery && { q: searchQuery }),
            ...(tool !== 'all' && { tool }), 
            sort,
            page: page.toString()
        });
        window.scrollTo(0, 0);
    };

    return (
        <div className="p-10 bg-[#F9F6F0] min-h-screen">
            {/* 제목 */}
            <h2 className="text-2xl font-bold text-[#4A3E3D] mb-8">
                {getPageTitle()}
            </h2>

            {/* 필터 섹션 */}
            <div className="flex gap-3 flex-wrap mb-10 items-center">
                {/* 도구 필터 */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handleToolChange('all')}
                        className={`px-4 py-2 rounded-full border-none text-sm font-semibold cursor-pointer transition-all ${
                            tool === 'all' ? 'bg-[#D18063] text-white' : 'bg-[#F0ECE3] text-[#4A3E3D]'
                        }`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => handleToolChange('knitting')}
                        className={`px-4 py-2 rounded-full border-none text-sm font-semibold cursor-pointer transition-all ${
                            tool === 'knitting' ? 'bg-[#D18063] text-white' : 'bg-[#F0ECE3] text-[#4A3E3D]'
                        }`}
                    >
                        대바늘
                    </button>
                    <button
                        onClick={() => handleToolChange('crochet')}
                        className={`px-4 py-2 rounded-full border-none text-sm font-semibold cursor-pointer transition-all ${
                            tool === 'crochet' ? 'bg-[#D18063] text-white' : 'bg-[#F0ECE3] text-[#4A3E3D]'
                        }`}
                    >
                        코바늘
                    </button>
                </div>

                {/* 정렬 필터 */}
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={() => handleSortChange('latest')}
                        className={`px-4 py-2 rounded-full border-none text-sm font-semibold cursor-pointer transition-all ${
                            sort === 'latest' ? 'bg-[#D18063] text-white' : 'bg-[#F0ECE3] text-[#4A3E3D]'
                        }`}
                    >
                        최신순
                    </button>
                    <button
                        onClick={() => handleSortChange('hot')}
                        className={`px-4 py-2 rounded-full border-none text-sm font-semibold cursor-pointer transition-all ${
                            sort === 'hot' ? 'bg-[#D18063] text-white' : 'bg-[#F0ECE3] text-[#4A3E3D]'
                        }`}
                    >
                        인기순
                    </button>
                </div>
            </div>

            {/* 결과 카운트 */}
            <p className="text-sm text-[#8A806D] mb-8">
                총 {filteredPatterns.length}개의 도안
            </p>

            {/* 패턴 그리드 */}
            {paginatedPatterns.length > 0 ? (
                <>
                    <PatternGrid columns={4} gap={24}>
                        {paginatedPatterns.map((pattern) => (
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

                    {/* 페이지네이션 */}
                    <div className="flex justify-center gap-2 mt-16 flex-wrap">
                        {/* 이전 버튼 */}
                        {currentPage > 1 && (
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-3 py-2 rounded-lg border-none text-sm font-semibold transition-all bg-[#F0ECE3] text-[#4A3E3D] cursor-pointer hover:bg-[#D18063] hover:text-white"
                            >
                                ← 이전
                            </button>
                        )}

                            {/* 페이지 버튼 */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3.5 py-2 rounded-lg border-none text-sm font-semibold cursor-pointer transition-all ${
                                        currentPage === page
                                            ? 'bg-[#D18063] text-white'
                                            : 'bg-[#F0ECE3] text-[#4A3E3D] hover:bg-[#D18063] hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* 다음 버튼 */}
                            {currentPage < totalPages && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-3 py-2 rounded-lg border-none text-sm font-semibold transition-all bg-[#F0ECE3] text-[#4A3E3D] cursor-pointer hover:bg-[#D18063] hover:text-white"
                                >
                                    다음 →
                                </button>
                            )}
                        </div>
                </>
            ) : (
                <div className="text-center py-16 px-5">
                    <p className="text-lg text-[#8A806D]">
                        조건에 맞는 도안이 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
}

export default PatternListPage;
