
import React from 'react';
import { Task, TaskStatus, AIAssistantMode, Priority } from '../types';
import KanbanColumn from './KanbanColumn';
import { TASK_STATUSES } from '../constants';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onUpdateTaskPriority: (taskId: string, newPriority: Priority) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenAIAssistant: (mode: AIAssistantMode, task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTaskStatus, onUpdateTaskPriority, onDeleteTask, onOpenAIAssistant }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TASK_STATUSES.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
          onUpdateTaskStatus={onUpdateTaskStatus}
          onUpdateTaskPriority={onUpdateTaskPriority}
          onDeleteTask={onDeleteTask}
          onOpenAIAssistant={onOpenAIAssistant}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
