
import React, { useState } from 'react';
import Modal from './Modal';
import { Task, Priority } from '../types';
import { PRIORITIES, PRIORITY_DESCRIPTIONS } from '../constants';

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.ImportantNotUrgent);
  const [estimatedTime, setEstimatedTime] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, description, priority, estimatedTime });
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add New Study Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-navy-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 block w-full bg-navy-800 border border-navy-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-navy-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full bg-navy-800 border border-navy-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-navy-300">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={e => setPriority(e.target.value as Priority)}
            className="mt-1 block w-full bg-navy-800 border border-navy-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          >
            {PRIORITIES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-navy-400">{PRIORITY_DESCRIPTIONS[priority]}</p>
        </div>
        <div>
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-navy-300">Estimated Time (minutes)</label>
          <input
            type="number"
            id="estimatedTime"
            value={estimatedTime}
            onChange={e => setEstimatedTime(parseInt(e.target.value, 10) || 0)}
            className="mt-1 block w-full bg-navy-800 border border-navy-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-navy-200 bg-navy-700/50 rounded-md hover:bg-navy-700">
                Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                Add Task
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;