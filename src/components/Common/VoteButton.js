import React from 'react';

function VoteButton({ direction, count, active, onClick }) {
    const icon = direction === 'up' ? 'fa-arrow-up' : 'fa-arrow-down';
    const activeClass = active ? 'text-yellow-500' : 'text-gray-500';

    return (
        <button 
            className={`flex flex-col items-center p-2 hover:bg-gray-100 rounded ${activeClass}`}
            onClick={onClick}
            data-name="vote-button"
        >
            <i className={`fas ${icon} text-lg`}></i>
            <span className="text-sm mt-1">{count}</span>
        </button>
    );
}

export default VoteButton; 