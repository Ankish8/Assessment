import { Input } from './input.js';

export const BasicInput = () => {
  return <Input placeholder="Enter your text..." />;
};

export const WithLabel = () => {
  return <Input label="Email" placeholder="Enter your email" type="email" />;
};

export const RequiredInput = () => {
  return <Input label="Password" placeholder="Enter password" type="password" required />;
};

export const WithHelperText = () => {
  return (
    <Input 
      label="Username" 
      placeholder="Enter username" 
      helperText="Username must be at least 3 characters long"
    />
  );
};

export const ErrorState = () => {
  return (
    <Input 
      label="Email" 
      placeholder="Enter email" 
      type="email"
      state="error"
      errorMessage="Please enter a valid email address"
    />
  );
};

export const SuccessState = () => {
  return (
    <Input 
      label="Email" 
      placeholder="Enter email" 
      type="email"
      state="success"
      helperText="Email is available"
    />
  );
};

export const WithStartIcon = () => {
  return (
    <Input 
      label="Search" 
      placeholder="Search..." 
      startIcon={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 14L10.3 10.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  );
};

export const WithEndIcon = () => {
  return (
    <Input 
      label="Password" 
      placeholder="Enter password" 
      type="password"
      endIcon={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8C2 8 4.66667 3 8 3C11.3333 3 14 8 14 8C14 8 11.3333 13 8 13C4.66667 13 2 8 2 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  );
};

export const InputSizes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="base" placeholder="Base input" label="Base" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  );
};

export const InputVariants = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input variant="default" placeholder="Default variant" label="Default" />
      <Input variant="filled" placeholder="Filled variant" label="Filled" />
      <Input variant="ghost" placeholder="Ghost variant" label="Ghost" />
    </div>
  );
};

export const DisabledInput = () => {
  return (
    <Input 
      label="Disabled Input" 
      placeholder="Cannot type here" 
      disabled 
      helperText="This input is disabled"
    />
  );
};

export const FormExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input 
        label="First Name" 
        placeholder="Enter your first name" 
        required 
      />
      <Input 
        label="Email" 
        placeholder="Enter your email" 
        type="email"
        required
        startIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 3H2L8 8L14 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 3V13H14V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <Input 
        label="Phone" 
        placeholder="(555) 123-4567" 
        type="tel"
        helperText="We'll only use this for account verification"
      />
    </div>
  );
};