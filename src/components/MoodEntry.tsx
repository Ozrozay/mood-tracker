import React, { useState } from 'react';

interface MoodEntryProps {
  onSave: (mood: string, note: string) => void;
}

const EMOJI_OPTIONS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤔', label: 'Thoughtful' },
];

const MoodEntry: React.FC<MoodEntryProps> = ({ onSave }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      onSave(selectedMood, note);
      setSelectedMood('');
      setNote('');
    }
  };

  return (
    <div className="mood-entry">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <div className="emoji-grid">
          {EMOJI_OPTIONS.map(({ emoji, label }) => (
            <button
              key={emoji}
              type="button"
              className={`emoji-button ${selectedMood === emoji ? 'selected' : ''}`}
              onClick={() => setSelectedMood(emoji)}
              title={label}
            >
              {emoji}
            </button>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your mood..."
          className="mood-note"
        />
        <button type="submit" className="save-button" disabled={!selectedMood}>
          Save Mood
        </button>
      </form>
    </div>
  );
};

export default MoodEntry; 