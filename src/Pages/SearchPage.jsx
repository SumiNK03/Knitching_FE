import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PatternListPage from './PatternListPage';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // query parameter 'q'가 있으면 PatternListPage 렌더링
    if (searchParams.get('q')) {
        return <PatternListPage />;
    }

    // 검색어가 없으면 검색 폼 표시
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/patterns?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="p-10 bg-[#F9F6F0] min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold text-[#4A3E3D] mb-8 text-center">
                    도안 검색
                </h1>
                
                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="제목이나 작가명으로 검색..."
                        autoFocus
                        className="w-full px-4 py-3 border border-[#E0D9CF] rounded-lg text-sm bg-white text-[#4A3E3D] placeholder-[#B1B1B1] focus:outline-none focus:border-[#D18063]"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-[#D18063] text-white rounded-lg font-semibold cursor-pointer hover:bg-[#C67053] transition-colors"
                    >
                        검색
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchPage;