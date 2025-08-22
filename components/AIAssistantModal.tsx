
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Task, AIAssistantMode } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AIAssistantMode;
  task: Task | null;
  isLoading: boolean;
  content: string | string[] | null;
  onSubmit: (topic: string) => void;
  onAddSubtasks: (subtasks: string[]) => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, mode, task, isLoading, content, onSubmit, onAddSubtasks }) => {
  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (task) {
      setTopic(task.title);
    } else {
      setTopic('');
    }
  }, [task, isOpen]);

  const title = mode === 'breakdown' ? 'AI Task Breakdown' : 'AI Learning Tips';
  const buttonText = mode === 'breakdown' ? 'Generate Sub-tasks' : 'Get Tips';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ai-topic" className="block text-sm font-medium text-navy-300">
              {mode === 'breakdown' ? 'Topic to breakdown' : 'Topic for tips'}
            </label>
            <input
              type="text"
              id="ai-topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="mt-1 block w-full bg-navy-800 border border-navy-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder={task ? '' : 'e.g., Photosynthesis'}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed">
              {isLoading ? 'Generating...' : buttonText}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          </div>
        )}
        
        {content && (
            <div className="mt-4 p-4 bg-navy-950/50 border border-navy-700 rounded-lg max-h-64 overflow-y-auto">
            {typeof content === 'string' ? (
                <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            ) : (
                <ul className="list-disc list-inside space-y-2 text-navy-200">
                {content.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            )}
            </div>
        )}

        {mode === 'breakdown' && Array.isArray(content) && content.length > 0 && (
          <div className="flex justify-end pt-4">
            <button onClick={() => onAddSubtasks(content as string[])} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Add Sub-tasks to Board
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AIAssistantModal;
