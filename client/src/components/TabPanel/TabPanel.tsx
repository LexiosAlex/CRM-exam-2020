import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ index, value, children }) => {
  const isShown = index === value;

  return (
    <div role="tabpanel" hidden={!isShown}>
      {isShown && children}
    </div>
  );
};
