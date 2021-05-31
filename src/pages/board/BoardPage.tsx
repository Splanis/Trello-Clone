import React from 'react';
import { useParams } from 'react-router-dom';
import { Board } from './components/Board';
import { BoardUIStateProvider } from './context/BoardModalProvider';

export function BoardPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <BoardUIStateProvider>
      <Board id={id} />
    </BoardUIStateProvider>
  );
}
