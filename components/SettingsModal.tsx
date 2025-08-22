
import React from 'react';
import Modal from './Modal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAllData: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onClearAllData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings & Data">
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-semibold text-navy-200">Local Memory</h3>
          <p className="text-sm text-navy-400 mt-1">
            Your study plan, tasks, and timer progress are saved automatically to your browser's local storage. This data is private to you and is not sent to any server.
          </p>
          <p className="text-sm text-navy-400 mt-2">
            Sharing the app link will not transfer your data to another device. The data stays on the browser where you created it.
          </p>
        </div>

        <div className="border-t border-navy-700 pt-4">
           <h3 className="text-md font-semibold text-navy-200">Manage Data</h3>
           <p className="text-sm text-navy-400 mt-1 mb-3">
            If you want to start fresh, you can clear all locally stored data. This action cannot be undone.
           </p>
           <button
            onClick={onClearAllData}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
           >
            Clear All Study Data
           </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
