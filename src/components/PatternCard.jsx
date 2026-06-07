import React from 'react';
import { useNavigate } from 'react-router-dom';

function PatternCard({ image, title, author, tool, patternId, difficulty = 3, price }) {
    const navigate = useNavigate();

    // 가격이 없으면 8000-12000 범위에서 1000의 배수로 생성
    const getRandomPrice = () => {
        if (price) return price;
        const prices = [8000, 9000, 10000, 11000, 12000];
        return prices[Math.floor(Math.random() * prices.length)];
    };

    const patternPrice = getRandomPrice();

    const handleClick = () => {
        navigate(`/pattern/${patternId}`, {
            state: {
                pattern: {
                    id: patternId,
                    image: image,
                    title,
                    author,
                    tool,
                    difficulty,
                    price: patternPrice,
                    description: `${title}은(는) 매력적인 뜨개 패턴입니다. 세밀한 기법으로 완성도 높은 작품을 만들 수 있습니다.`,
                    requiredLevel: '초급~중급',
                    views: Math.floor(Math.random() * 3000),
                    enrolls: Math.floor(Math.random() * 500),
                    rating: (Math.random() * 2 + 3).toFixed(1)
                }
            }
        });
    };

    // 이미지는 현재는 로컬 경로를 넘겨주지만, 추후에는 AWS url로 대체 예정.
    return (
        <div 
            onClick={handleClick}
            className="bg-[#F0ECE3] rounded-[25px] p-[15px] flex flex-col shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
            style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        >
            {/* 이미지 */}
            <div>
                <img src={image} alt={title} className="w-full object-cover rounded-[15px]" style={{ aspectRatio: '300 / 424.29' }} />
            </div>
            
            {/* 텍스트 정보 */}
            <div className="space-y-2.5 pt-[20px]">
                <h3 className="text-lg font-extrabold text-[#4A3E3D]">{title}</h3>
                <p className="text-sm font-medium text-[#8A806D]">{author}</p>
                <div className="flex justify-between items-center">
                    <span className="bg-[#D18063] text-sm font-semibold text-white rounded-[10px] px-3 py-1">{tool}</span>
                    <span className="text-sm font-bold text-[#D18063]">₩{patternPrice.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default PatternCard;