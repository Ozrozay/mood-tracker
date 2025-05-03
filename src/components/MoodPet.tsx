import React, { useEffect, useState } from 'react';

interface MoodPetProps {
  entries: Array<{ mood: string; date: string }>;
}

const PET_STATES = {
  happy: '🐱',
  neutral: '😺',
  sad: '😿',
  excited: '😸',
  sleepy: '😴',
};

const MoodPet: React.FC<MoodPetProps> = ({ entries }) => {
  const [petState, setPetState] = useState(PET_STATES.neutral);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (entries.length === 0) return;

    const recentEntries = entries.slice(0, 3);
    const happyCount = recentEntries.filter(entry => 
      entry.mood === '😊' || entry.mood === '😌'
    ).length;

    if (happyCount === 3) {
      setPetState(PET_STATES.excited);
    } else if (happyCount >= 2) {
      setPetState(PET_STATES.happy);
    } else if (happyCount === 0) {
      setPetState(PET_STATES.sad);
    } else {
      setPetState(PET_STATES.neutral);
    }

    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [entries]);

  return (
    <div className="mood-pet">
      <div className={`pet-container ${isAnimating ? 'animate' : ''}`}>
        <span className="pet-emoji">{petState}</span>
      </div>
      <p className="pet-message">
        {petState === PET_STATES.excited && "I'm so happy you're feeling great!"}
        {petState === PET_STATES.happy && "You're doing well!"}
        {petState === PET_STATES.neutral && "I'm here for you!"}
        {petState === PET_STATES.sad && "Let's turn that frown upside down!"}
      </p>
    </div>
  );
};

export default MoodPet; 