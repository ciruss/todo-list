import { useState } from 'react';

export const useTodoHandling = () => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const reset = () => {
    setTitle('');
    setCompleted(false);
  }
  
  return {
    title,
    setTitle,
    completed,
    setCompleted,
    reset,
  }
}

export default useTodoHandling;
