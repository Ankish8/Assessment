import { Button } from './button.js';

export const BasicButton = () => {
  return <Button>Click me</Button>;
};

export const AllVariants = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
};

export const AllSizes = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">XLarge</Button>
    </div>
  );
};

export const WithIcons = () => {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 14L10.3 10.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ArrowIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3L13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button icon={SearchIcon}>Search</Button>
      <Button icon={ArrowIcon} iconPosition="right">Continue</Button>
      <Button icon={SearchIcon} iconOnly />
      <Button variant="secondary" icon={SearchIcon}>Search</Button>
    </div>
  );
};

export const LoadingStates = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button loading>Loading...</Button>
      <Button variant="secondary" loading>Loading...</Button>
      <Button variant="outline" loading>Loading...</Button>
    </div>
  );
};

export const DisabledStates = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
    </div>
  );
};

export const FullWidthButton = () => {
  return (
    <div style={{ width: '300px' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  );
};

export const ButtonGrid = () => {
  const sizes = ['small', 'medium', 'large', 'xlarge'] as const;
  const variants = ['primary', 'secondary', 'ghost', 'destructive', 'success', 'outline'] as const;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', width: '600px' }}>
      {sizes.map(size => 
        variants.map(variant => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))
      )}
    </div>
  );
};

export const InteractiveExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Button onClick={() => alert('Primary clicked!')}>
        Click me!
      </Button>
      <Button 
        variant="secondary" 
        onClick={() => alert('Secondary clicked!')}
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 8L8 6L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      >
        With Icon
      </Button>
      <Button variant="outline" fullWidth>
        Full Width Outline
      </Button>
    </div>
  );
};