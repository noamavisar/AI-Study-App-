import React, { useState, useRef, useEffect } from 'react';
import { Task, TaskStatus, AIAssistantMode, Priority } from '../types';
import { TASK_STATUSES, STATUS_COLORS, PRIORITY_COLORS, PRIORITIES } from '../constants';

interface TaskCardProps {
  task: Task;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onUpdateTaskPriority: (taskId: string, newPriority: Priority) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenAIAssistant: (mode: AIAssistantMode, task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTaskStatus, onUpdateTaskPriority, onDeleteTask, onOpenAIAssistant }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPriorityMenuOpen, setPriorityMenuOpen] = useState(false);
  const colors = STATUS_COLORS[task.status];
  
  const menuRef = useRef<HTMLDivElement>(null);
  const priorityMenuRef = useRef<HTMLDivElement>(null);

  const handleOptionsMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
    setPriorityMenuOpen(false);
  };

  const handlePriorityMenuToggle = () => {
    setPriorityMenuOpen(!isPriorityMenuOpen);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (priorityMenuRef.current && !priorityMenuRef.current.contains(event.target as Node)) {
        setPriorityMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`bg-navy-900 border-l-4 ${colors.border} rounded-r-lg p-4 shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300`}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-navy-100 pr-2">{task.title}</h3>
        <div className="relative" ref={menuRef}>
          <button onClick={handleOptionsMenuToggle} className="text-navy-400 hover:text-navy-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-navy-800 rounded-md shadow-xl z-10 border border-navy-700">
              <div className="py-1">
                <p className="px-4 py-2 text-xs text-navy-400">Change Status</p>
                {TASK_STATUSES.filter(s => s !== task.status).map(status => (
                  <button key={status} onClick={() => { onUpdateTaskStatus(task.id, status); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-navy-200 hover:bg-navy-700">
                    {status}
                  </button>
                ))}
                <div className="border-t border-navy-700 my-1"></div>
                <button onClick={() => { onOpenAIAssistant('breakdown', task); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-navy-200 hover:bg-navy-700">Breakdown Task</button>
                <button onClick={() => { onOpenAIAssistant('tips', task); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-navy-200 hover:bg-navy-700">Get Learning Tips</button>
                <div className="border-t border-navy-700 my-1"></div>
                <button onClick={() => { onDeleteTask(task.id); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20">Delete Task</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-navy-300 mt-2">{task.description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-navy-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-navy-400">{task.estimatedTime} minutes</span>
        </div>
        <div className="relative" ref={priorityMenuRef}>
            <button
                onClick={handlePriorityMenuToggle}
                className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-900 focus:ring-cyan-500 ${PRIORITY_COLORS[task.priority].bg} ${PRIORITY_COLORS[task.priority].text}`}
            >
                {task.priority}
            </button>
            {isPriorityMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-navy-800 rounded-md shadow-xl z-10 border border-navy-700">
                <div className="py-1">
                <p className="px-4 py-2 text-xs text-navy-400">Change Priority</p>
                {PRIORITIES.filter(p => p !== task.priority).map(priority => (
                    <button
                        key={priority}
                        onClick={() => {
                            onUpdateTaskPriority(task.id, priority);
                            setPriorityMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-navy-200 hover:bg-navy-700"
                    >
                        {priority}
                    </button>
                ))}
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;