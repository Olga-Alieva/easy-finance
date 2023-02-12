import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const DocumentsPage = () => {
  useActivePage('MyDocuments');
  return (
    <div>
      DocumentsPage
      <></>
    </div>
  );
};
