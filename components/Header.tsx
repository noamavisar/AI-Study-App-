
import React from 'react';

interface HeaderProps {
    onAddTask: () => void;
    onBreakdownTopic: () => void;
    onPlanSprint: () => void;
    onGenerateFlashcards: () => void;
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask, onBreakdownTopic, onPlanSprint, onGenerateFlashcards, onOpenSettings }) => {
  return (
    <header className="bg-navy-900/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-navy-800">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <h1 className="text-xl font-bold text-navy-50">Study Sprint AI</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
             <button
              onClick={onPlanSprint}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-navy-200 bg-navy-700/50 hover:bg-navy-700 rounded-md transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-400">
                <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v9.5A2.25 2.25 0 0 1 15.75 17h-3.375a.75.75 0 0 1 0-1.5h3.375a.75.75 0 0 0 .75-.75v-9.5a.75.75 0 0 0-.75-.75H4.25a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h3.375a.75.75 0 0 1 0 1.5H4.25A2.25 2.25 0 0 1 2 14.75v-9.5A2.25 2.25 0 0 1 4.012 3.012L4.25 3h11.5l.238.012ZM10 10.189a.75.75 0 0 0 1.125-.632l2-6a.75.75 0 1 0-1.39-.464L11 8.29l-1.11-2.22a.75.75 0 0 0-1.342.67L10 10.19Z" clipRule="evenodd" />
                <path d="M10.75 12.75a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
              </svg>
              <span className="hidden sm:inline">Plan Sprint</span>
            </button>
            <button
              onClick={onGenerateFlashcards}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-navy-200 bg-navy-700/50 hover:bg-navy-700 rounded-md transition-colors duration-200"
            >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-400">
                <path d="M3.75 2A1.75 1.75 0 0 0 2 3.75v12.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 16.25V3.75A1.75 1.75 0 0 0 16.25 2H3.75ZM10 6a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 10 6Z" />
              </svg>
              <span className="hidden sm:inline">AI Flashcards</span>
            </button>
            <button
              onClick={onBreakdownTopic}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-navy-200 bg-navy-700/50 hover:bg-navy-700 rounded-md transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-400">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              <span className="hidden sm:inline">Breakdown Topic</span>
            </button>
            <button
              onClick={onAddTask}
              className="px-3 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors duration-200"
            >
              Add Task
            </button>
            <div className="border-l border-navy-700 h-6 mx-1 sm:mx-2"></div>
             <button
              onClick={onOpenSettings}
              className="p-2 text-navy-400 hover:text-white rounded-full hover:bg-navy-700/50 transition-colors"
              aria-label="Settings"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M11.49 3.17a.75.75 0 0 1 1.02.67l.02 1.636a.75.75 0 0 1-1.019.705l-1.554-.836a.75.75 0 0 0-.84 0l-1.555.836a.75.75 0 0 1-1.02-.705l.02-1.636a.75.75 0 0 1 1.02-.67l1.554.836a.75.75 0 0 0 .842 0l1.555-.836ZM8.25 10a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0ZM10 11.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM12.51 13.6a.75.75 0 0 1 1.02.67l.02 1.636a.75.75 0 0 1-1.019.705l-1.554-.836a.75.75 0 0 0-.84 0l-1.555.836a.75.75 0 0 1-1.02-.705l.02-1.636a.75.75 0 0 1 1.02-.67l1.554.836a.75.75 0 0 0 .842 0l1.555-.836Z" clipRule="evenodd" />
                  <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" />
                </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
