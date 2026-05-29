import React from 'react';

function ProgressCircle({ progress = 0 }) {
    // SVG 원형 진도바
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex items-center gap-6">
            {/* SVG 원형 차트 */}
            <div className="flex-shrink-0 w-24 h-24">
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{ transform: 'rotate(-90deg)' }}
                >
                    {/* 배경 원 */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#E0D9CF"
                        strokeWidth="8"
                    />
                    
                    {/* 진도 원 */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#D18063"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                    />
                </svg>
            </div>

            {/* 진도 텍스트 */}
            <div>
                <p className="text-3xl font-bold text-[#D18063]">
                    {progress}%
                </p>
                <p className="text-xs text-[#8A806D]">
                    수강 중
                </p>
            </div>
        </div>
    );
}

export default ProgressCircle;
