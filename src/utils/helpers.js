export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateExperienceNeeded = (level) => {
  return level * 100;
};

export const calculateProgressPercentage = (experience, level) => {
  const experienceNeeded = calculateExperienceNeeded(level);
  const currentXP = experience % experienceNeeded;
  return (currentXP / experienceNeeded) * 100;
};

