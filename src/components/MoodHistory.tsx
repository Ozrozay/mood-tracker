import React from 'react';

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note: string;
}

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries }) => {
  return (
    <div className="mood-history">
      <h2>Mood History</h2>
      <div className="entries-list">
        {entries.map((entry) => (
          <div key={entry.id} className="mood-entry-card">
            <div className="entry-header">
              <span className="entry-date">{new Date(entry.date).toLocaleDateString()}</span>
              <span className="entry-mood">{entry.mood}</span>
            </div>
            {entry.note && <p className="entry-note">{entry.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory; 