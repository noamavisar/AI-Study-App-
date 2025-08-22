
import React, { useState, useEffect, useCallback } from 'react';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
interface TimerSettings {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
}

const Timer: React.FC = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [tempSettings, setTempSettings] = useState<TimerSettings>(settings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [time, setTime] = useState(settings.pomodoro * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(() => {
    try {
      const saved = localStorage.getItem('studySprintPomodoros');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
        const savedSettings = localStorage.getItem('studySprintTimerSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            setTempSettings(parsed);
            if (!isActive) {
               setTime(parsed.pomodoro * 60);
            }
        }
    } catch (error) {
        console.error("Failed to load timer settings from local storage", error);
    }
  }, [isActive]);

  useEffect(() => {
    try {
        localStorage.setItem('studySprintPomodoros', JSON.stringify(pomodoros));
    } catch (error) {
        console.error("Failed to save pomodoros", error);
    }
  }, [pomodoros]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'pomodoro') setTime(settings.pomodoro * 60);
    else if (newMode === 'shortBreak') setTime(settings.shortBreak * 60);
    else if (newMode === 'longBreak') setTime(settings.longBreak * 60);
  }, [settings]);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive && time > 0) {
      interval = window.setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      if (mode === 'pomodoro') {
        const newPomodoroCount = pomodoros + 1;
        setPomodoros(newPomodoroCount);
        if (newPomodoroCount % 4 === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        switchMode('pomodoro');
      }
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, time, mode, pomodoros, switchMode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(
      mode === 'pomodoro' ? settings.pomodoro * 60 :
      mode === 'shortBreak' ? settings.shortBreak * 60 : settings.longBreak * 60
    );
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempSettings(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
  };

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    localStorage.setItem('studySprintTimerSettings', JSON.stringify(tempSettings));
    setIsSettingsOpen(false);
    // If we are in the mode that was changed, and timer is not active, update it
    if (!isActive) {
        if (mode === 'pomodoro') setTime(tempSettings.pomodoro * 60);
        else if (mode === 'shortBreak') setTime(tempSettings.shortBreak * 60);
        else if (mode === 'longBreak') setTime(tempSettings.longBreak * 60);
    }
  };
  
  const modeStyles = {
    pomodoro: 'bg-red-500/10 text-red-300 border-red-500/30',
    shortBreak: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    longBreak: 'bg-green-500/10 text-green-300 border-green-500/30',
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg border relative ${modeStyles[mode]}`}>
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="absolute top-4 right-4 text-navy-400 hover:text-white transition-colors" aria-label="Timer settings">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M11.078 2.25c-.217 0-.424.04-.622.116l-6.25 2.5A.75.75 0 0 0 3.75 5.5v6.528a.75.75 0 0 0 .406.684l6.25 2.5a.75.75 0 0 0 .688 0l6.25-2.5a.75.75 0 0 0 .406-.684V5.5a.75.75 0 0 0-.406-.684l-6.25-2.5a.75.75 0 0 0-.622-.116ZM12.25 5.168l-4.5 1.8a.75.75 0 0 0 0 1.364l4.5 1.8a.75.75 0 0 0 1-1.364l-4.5-1.8a.75.75 0 0 0-1 1.364l4.5 1.8a.75.75 0 0 0 1-1.364l-4.5-1.8a.75.75 0 0 0-1 1.364l4.5 1.8a.75.75 0 0 0 1-1.364V5.168a.75.75 0 0 0-1.5 0v.001Z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="flex justify-center space-x-2 mb-4">
        <button onClick={() => switchMode('pomodoro')} className={`px-3 py-1 text-sm rounded-full ${mode === 'pomodoro' ? 'bg-navy-700 text-white' : 'text-navy-300 hover:bg-navy-800'}`}>Pomodoro</button>
        <button onClick={() => switchMode('shortBreak')} className={`px-3 py-1 text-sm rounded-full ${mode === 'shortBreak' ? 'bg-navy-700 text-white' : 'text-navy-300 hover:bg-navy-800'}`}>Short Break</button>
        <button onClick={() => switchMode('longBreak')} className={`px-3 py-1 text-sm rounded-full ${mode === 'longBreak' ? 'bg-navy-700 text-white' : 'text-navy-300 hover:bg-navy-800'}`}>Long Break</button>
      </div>
      <div className="text-center">
        <p className="text-6xl font-mono font-bold text-white">{formatTime(time)}</p>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button onClick={toggleTimer} className="px-8 py-3 bg-white text-navy-900 font-semibold rounded-md hover:bg-gray-200 transition-colors">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="p-3 bg-navy-800/50 text-navy-300 rounded-md hover:bg-navy-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.667a8.25 8.25 0 0 1 11.667 0l3.181 3.183m-14.85-3.183L6.163 6" />
            </svg>
        </button>
      </div>
       
      {isSettingsOpen && (
        <div className="mt-6 border-t border-navy-700/50 pt-4 space-y-3 animate-fade-in">
            <h4 className="text-sm font-semibold text-center text-navy-200 mb-3">Timer Settings (minutes)</h4>
            <div className="grid grid-cols-3 gap-x-4 text-sm">
                <div>
                    <label htmlFor="pomodoro" className="block text-xs text-navy-300 text-center mb-1">Pomodoro</label>
                    <input type="number" name="pomodoro" id="pomodoro" value={tempSettings.pomodoro} onChange={handleSettingsChange} className="w-full bg-navy-800 border-navy-700 rounded-md text-center py-1 text-white"/>
                </div>
                <div>
                    <label htmlFor="shortBreak" className="block text-xs text-navy-300 text-center mb-1">Short Break</label>
                    <input type="number" name="shortBreak" id="shortBreak" value={tempSettings.shortBreak} onChange={handleSettingsChange} className="w-full bg-navy-800 border-navy-700 rounded-md text-center py-1 text-white"/>
                </div>
                <div>
                    <label htmlFor="longBreak" className="block text-xs text-navy-300 text-center mb-1">Long Break</label>
                    <input type="number" name="longBreak" id="longBreak" value={tempSettings.longBreak} onChange={handleSettingsChange} className="w-full bg-navy-800 border-navy-700 rounded-md text-center py-1 text-white"/>
                </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsSettingsOpen(false)} className="px-3 py-1 text-xs font-medium text-navy-200 bg-navy-700/50 rounded-md hover:bg-navy-700">Cancel</button>
                <button onClick={handleSaveSettings} className="px-3 py-1 text-xs font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700">Save</button>
            </div>
        </div>
      )}
       
       <p className="text-center text-navy-400 text-sm mt-4 flex items-center justify-center space-x-2">
            <span>Completed Pomodoros: {pomodoros}</span>
            {pomodoros > 0 && (
                <button 
                    onClick={() => { if(window.confirm('Are you sure you want to reset your pomodoro count?')) setPomodoros(0) }} 
                    className="text-navy-500 hover:text-white transition-colors" 
                    title="Reset count"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
        </p>
    </div>
  );
};

export default Timer;
