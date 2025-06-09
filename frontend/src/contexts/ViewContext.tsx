import React, { createContext, useContext, useState } from 'react';

type ViewType = 'grid' | 'list';

type ViewContextType = {
  viewType: ViewType;
  toggleView: () => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewType, setViewType] = useState<ViewType>(() => {
    const saved = localStorage.getItem('viewType');
    return (saved as ViewType) || 'grid';
  });

  const toggleView = () => {
    const newView = viewType === 'grid' ? 'list' : 'grid';
    setViewType(newView);
    localStorage.setItem('viewType', newView);
  };

  return (
    <ViewContext.Provider value={{ viewType, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}; 