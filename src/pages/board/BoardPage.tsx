import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../ui-components/Page';
import { BoardProvider } from './BoardProvider';
import { Board } from './components/Board';
import { BoardNavigation } from './components/BoardNavigation';
import { Sidebar } from './components/Sidebar';

export function BoardPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <BoardProvider>
      <Page>
        <BoardNavigation />
        <Sidebar />
        <Board id={id} />
      </Page>
    </BoardProvider>
  );
}
