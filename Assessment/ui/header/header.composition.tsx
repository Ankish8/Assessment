import React from 'react';
import { Header } from './header';

export const DefaultHeader = () => {
  return (
    <Header title="Page Title" />
  );
};

export const WithoutBackButton = () => {
  return (
    <Header 
      title="Settings" 
      showBackButton={false} 
    />
  );
};

export const LongTitle = () => {
  return (
    <Header title="This is a Very Long Page Title That Might Wrap on Mobile Devices" />
  );
};

export const CustomBackHandler = () => {
  const handleCustomBack = () => {
    console.log('Custom back handler called');
    // Custom logic here
  };

  return (
    <Header 
      title="Custom Back Action" 
      onBack={handleCustomBack}
    />
  );
};

export const DashboardHeader = () => {
  return (
    <Header title="Dashboard" />
  );
};

export const ProfileHeader = () => {
  return (
    <Header 
      title="Profile Settings"
      onBack={() => console.log('Going back to main settings')}
    />
  );
};

export const ReportsHeader = () => {
  return (
    <Header title="Analytics Reports" />
  );
};

export const MinimalHeader = () => {
  return (
    <Header 
      title="Help"
      showBackButton={false}
    />
  );
};

export const ProjectHeader = () => {
  return (
    <Header title="Project Overview" />
  );
};

export const TeamHeader = () => {
  return (
    <Header 
      title="Team Management"
      onBack={() => console.log('Back to admin panel')}
    />
  );
};