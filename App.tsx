
import React, { useState, useCallback, useEffect } from 'react';
import { Task, TaskStatus, AIAssistantMode, Priority, LearningResource, Flashcard } from './types';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import AddTaskModal from './components/AddTaskModal';
import AIAssistantModal from './components/AIAssistantModal';
import Timer from './components/Timer';
import LearningResourcesModal from './components/LearningResourcesModal';
import FlashcardsModal from './components/FlashcardsModal';
import LearningTipBar from './components/LearningTipBar';
import SettingsModal from './components/SettingsModal';
import { breakdownTaskIntoSubtasks, getLearningTipsForTopic, generateStudySprint } from './services/geminiService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAIAssistantModalOpen, setAIAssistantModalOpen] = useState(false);
  const [isResourcesModalOpen, setResourcesModalOpen] = useState(false);
  const [isFlashcardsModalOpen, setFlashcardsModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [aiAssistantMode, setAiAssistantMode] = useState<AIAssistantMode>('breakdown');
  const [selectedTaskForAI, setSelectedTaskForAI] = useState<Task | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiContent, setAiContent] = useState<string | string[] | null>(null);

  useEffect(() => {
    // Load tasks from local storage on initial render
    try {
      const storedTasks = localStorage.getItem('studySprintTasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
         // Add some default tasks for first-time users
        setTasks([
            { id: '1', title: 'Review Chapter 1: Kinematics', description: 'Focus on equations of motion.', status: TaskStatus.ToDo, priority: Priority.UrgentImportant, estimatedTime: 60 },
            { id: '2', title: 'Practice Stoichiometry Problems', description: 'Complete 10 problems from the textbook.', status: TaskStatus.ToDo, priority: Priority.ImportantNotUrgent, estimatedTime: 90 },
            { id: '3', title: 'Draft Essay Outline', description: 'Create a structure for the history essay on the French Revolution.', status: TaskStatus.InProgress, priority: Priority.UrgentImportant, estimatedTime: 45 },
            { id: '4', title: 'Memorize Vocabulary List', description: 'Use flashcards for Spanish vocabulary.', status: TaskStatus.Done, priority: Priority.ImportantNotUrgent, estimatedTime: 30 },
        ]);
      }
    } catch (e) {
      console.error("Failed to load tasks from local storage", e);
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever they change
    try {
      localStorage.setItem('studySprintTasks', JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks to local storage", e);
    }
  }, [tasks]);


  const handleAddTask = useCallback((task: Omit<Task, 'id' | 'status'>) => {
    setTasks(prev => [...prev, { ...task, id: Date.now().toString(), status: TaskStatus.ToDo }]);
    setAddTaskModalOpen(false);
  }, []);

  const handleUpdateTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  }, []);

  const handleUpdateTaskPriority = useCallback((taskId: string, newPriority: Priority) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, priority: newPriority } : task));
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);
  
  const openAIAssistant = (mode: AIAssistantMode, task: Task | null) => {
    setAiAssistantMode(mode);
    setSelectedTaskForAI(task);
    setAiContent(null);
    setAIAssistantModalOpen(true);
  };

  const handleAIAssistantSubmit = async (topic: string) => {
    setIsLoadingAI(true);
    setAiContent(null);
    try {
      if (aiAssistantMode === 'breakdown') {
        const subtasks = await breakdownTaskIntoSubtasks(topic);
        setAiContent(subtasks);
      } else {
        const tips = await getLearningTipsForTopic(topic);
        setAiContent(tips);
      }
    } catch (e) {
      console.error("AI Assistant Error:", e);
      setAiContent("Sorry, I couldn't generate a response. Please check your API key and try again.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const addSubtasksToBoard = (subtasks: string[]) => {
    const newTasks: Task[] = subtasks.map((title, index) => ({
      id: `ai-${Date.now()}-${index}`,
      title,
      description: `Sub-task for: ${selectedTaskForAI?.title || 'a larger topic'}`,
      status: TaskStatus.ToDo,
      priority: Priority.ImportantNotUrgent, // Default priority for AI subtasks
      estimatedTime: 30, // Default time
    }));
    setTasks(prev => [...prev, ...newTasks]);
    setAIAssistantModalOpen(false);
  };

  const handleGenerateSprint = async (resources: Omit<LearningResource, 'id'>[], days: number) => {
    setIsLoadingAI(true);
    try {
        const generatedTasks = await generateStudySprint(resources, days);
        const newTasks: Task[] = generatedTasks.map((task, index) => ({
            ...task,
            id: `sprint-${Date.now()}-${index}`,
            status: TaskStatus.ToDo,
            description: task.day ? `Day ${task.day}: ${task.description}` : task.description,
        }));
        setTasks(prev => [...prev, ...newTasks]);
        setResourcesModalOpen(false);
    } catch (e) {
        console.error("Sprint Generation Error:", e);
        alert("Sorry, I couldn't generate a study plan. Please check your files and try again.");
    } finally {
        setIsLoadingAI(false);
    }
  };
  
  const handleClearAllData = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all your study data? This action cannot be undone.')) {
        try {
            localStorage.removeItem('studySprintTasks');
            localStorage.removeItem('studySprintTimerSettings');
            localStorage.removeItem('studySprintPomodoros');
            // A full page reload is the simplest way to ensure all component state is reset.
            window.location.reload();
        } catch (e) {
            console.error("Failed to clear local storage", e);
            alert("There was an error clearing your data.");
        }
    }
  }, []);


  return (
    <div className="min-h-screen bg-navy-950 font-sans">
      <Header 
        onAddTask={() => setAddTaskModalOpen(true)} 
        onBreakdownTopic={() => openAIAssistant('breakdown', null)}
        onPlanSprint={() => setResourcesModalOpen(true)}
        onGenerateFlashcards={() => setFlashcardsModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />
      <LearningTipBar />
      
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <KanbanBoard 
              tasks={tasks} 
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onUpdateTaskPriority={handleUpdateTaskPriority}
              onDeleteTask={handleDeleteTask}
              onOpenAIAssistant={openAIAssistant}
            />
          </div>
          <div className="lg:col-span-1">
             <Timer />
          </div>
        </div>
      </main>

      {isAddTaskModalOpen && (
        <AddTaskModal 
          onClose={() => setAddTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {isResourcesModalOpen && (
        <LearningResourcesModal
            isOpen={isResourcesModalOpen}
            onClose={() => setResourcesModalOpen(false)}
            onGenerateSprint={handleGenerateSprint}
            isLoading={isLoadingAI}
        />
      )}

      {isFlashcardsModalOpen && (
        <FlashcardsModal
            isOpen={isFlashcardsModalOpen}
            onClose={() => setFlashcardsModalOpen(false)}
        />
      )}

      {isAIAssistantModalOpen && (
        <AIAssistantModal
          isOpen={isAIAssistantModalOpen}
          onClose={() => setAIAssistantModalOpen(false)}
          mode={aiAssistantMode}
          task={selectedTaskForAI}
          isLoading={isLoadingAI}
          content={aiContent}
          onSubmit={handleAIAssistantSubmit}
          onAddSubtasks={addSubtasksToBoard}
        />
      )}
      
      {isSettingsModalOpen && (
        <SettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            onClearAllData={handleClearAllData}
        />
      )}
    </div>
  );
};

export default App;
