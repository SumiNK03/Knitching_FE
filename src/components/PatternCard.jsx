import React from 'react';

function PatternCard({ imaage, title, author, tool, patternId }) {
    // 이미지는 현재는 로컬 경로를 넘겨주지만, 추후에는 AWS url로 대체 예정.
    return (
        <div className="bg-[#F0ECE3] rounded-[25px] p-[15px] flex flex-col shadow-md" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            {/* 이미지 */}
            <div>
                <img src={imaage} alt={title} className="w-full object-cover rounded-[15px]" style={{ aspectRatio: '300 / 424.29' }} />
            </div>
            
            {/* 텍스트 정보 */}
            <div className="space-y-2.5 pt-[20px]">
                <h3 className="text-lg font-extrabold text-[#4A3E3D]">{title}</h3>
                <p className="text-sm font-medium text-[#8A806D]">{author}</p>
                <div className="bg-[#D18063] text-sm font-semibold text-white rounded-[10px] w-[55px] h-[25px] flex items-center justify-center">{tool}</div>
            </div>
        </div>
    );
}

export default PatternCard;