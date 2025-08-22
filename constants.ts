
import { TaskStatus, Priority, ResourceType } from './types';

export const TASK_STATUSES: TaskStatus[] = [
  TaskStatus.ToDo,
  TaskStatus.InProgress,
  TaskStatus.Done,
];

export const PRIORITIES: Priority[] = [
  Priority.UrgentImportant,
  Priority.ImportantNotUrgent,
  Priority.UrgentNotImportant,
  Priority.NotUrgentNotImportant,
];

export const RESOURCE_TYPES: ResourceType[] = [
  ResourceType.LearningMaterial,
  ResourceType.CourseExercises,
  ResourceType.OldTest,
];

export const PRIORITY_DESCRIPTIONS: { [key in Priority]: string } = {
    [Priority.UrgentImportant]: 'Crises, deadlines, problems. Do these first.',
    [Priority.ImportantNotUrgent]: 'Goals, planning, important preparation. Schedule time for these.',
    [Priority.UrgentNotImportant]: 'Interruptions, some requests. Minimize or handle quickly.',
    [Priority.NotUrgentNotImportant]: 'Trivia, distractions. Do these last, if at all.',
};

export const STATUS_COLORS: { [key in TaskStatus]: { bg: string; text: string; border: string } } = {
  [TaskStatus.ToDo]: { bg: 'bg-yellow-900/20', text: 'text-yellow-300', border: 'border-yellow-500/30' },
  [TaskStatus.InProgress]: { bg: 'bg-blue-900/20', text: 'text-blue-300', border: 'border-blue-500/30' },
  [TaskStatus.Done]: { bg: 'bg-green-900/20', text: 'text-green-300', border: 'border-green-500/30' },
};

export const PRIORITY_COLORS: { [key in Priority]: { bg: string; text: string } } = {
  [Priority.UrgentImportant]: { bg: 'bg-red-500/30', text: 'text-red-300' },
  [Priority.ImportantNotUrgent]: { bg: 'bg-sky-500/30', text: 'text-sky-300' },
  [Priority.UrgentNotImportant]: { bg: 'bg-amber-500/30', text: 'text-amber-300' },
  [Priority.NotUrgentNotImportant]: { bg: 'bg-gray-500/30', text: 'text-gray-400' },
};