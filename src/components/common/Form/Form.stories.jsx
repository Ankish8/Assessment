import Form from './Form';
import Input from '../Input';
import Button from '../Button';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
  },
};

export const Default = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <Input label="Name" placeholder="Enter your name" required />
      <Input label="Email" type="email" placeholder="Enter your email" required />
      <Input label="Message" placeholder="Enter your message" />
      <Form.Actions>
        <Button variant="ghost">Cancel</Button>
        <Button type="submit">Submit</Button>
      </Form.Actions>
    </Form>
  ),
};

export const WithSections = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <Form.Section 
        title="Personal Information"
        subtitle="Tell us about yourself"
      >
        <Form.Group columns={2}>
          <Input label="First Name" placeholder="Enter first name" required />
          <Input label="Last Name" placeholder="Enter last name" required />
        </Form.Group>
        <Input label="Email" type="email" placeholder="Enter your email" required />
        <Input label="Phone" type="tel" placeholder="Enter your phone number" />
      </Form.Section>

      <Form.Section 
        title="Account Settings"
        subtitle="Configure your account preferences"
      >
        <Input label="Username" placeholder="Choose a username" required />
        <Input label="Password" type="password" placeholder="Enter password" required />
        <Input label="Confirm Password" type="password" placeholder="Confirm password" required />
      </Form.Section>

      <Form.Actions>
        <Button variant="ghost">Cancel</Button>
        <Button type="submit">Create Account</Button>
      </Form.Actions>
    </Form>
  ),
};

export const GridLayout = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <Form.Section title="User Details">
        <Form.Group columns={3}>
          <Input label="First Name" placeholder="First name" />
          <Input label="Middle Name" placeholder="Middle name" />
          <Input label="Last Name" placeholder="Last name" />
        </Form.Group>
        
        <Form.Group columns={2}>
          <Input label="Email" type="email" placeholder="Email address" />
          <Input label="Phone" type="tel" placeholder="Phone number" />
        </Form.Group>
        
        <Input label="Address" placeholder="Full address" />
      </Form.Section>

      <Form.Actions align="between">
        <Button variant="ghost">Save Draft</Button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline">Preview</Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form.Actions>
    </Form>
  ),
};

export const CompactForm = {
  render: () => (
    <Form gap="sm" onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <Input label="Search" placeholder="Enter search term" 
        startIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 14L10.5 10.5M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <Form.Group columns={2}>
        <Input label="Category" placeholder="Select category" />
        <Input label="Sort by" placeholder="Select sort order" />
      </Form.Group>
      <Form.Actions>
        <Button fullWidth>Search</Button>
      </Form.Actions>
    </Form>
  ),
};

export const LoginForm = {
  render: () => (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form onSubmit={(e) => { e.preventDefault(); alert('Login attempted!'); }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600' }}>Welcome Back</h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Sign in to your account</p>
        </div>
        
        <Input 
          label="Email" 
          type="email" 
          placeholder="Enter your email" 
          required 
          startIcon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.5 4L8 8.5L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          }
        />
        
        <Input 
          label="Password" 
          type="password" 
          placeholder="Enter your password" 
          required 
          endIcon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8C2 8 4.5 3 8 3C11.5 3 14 8 14 8C14 8 11.5 13 8 13C4.5 13 2 8 2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" style={{ fontSize: '14px', color: 'var(--color-primary-600)', textDecoration: 'none' }}>
            Forgot password?
          </a>
        </div>
        
        <Form.Actions align="center">
          <Button type="submit" fullWidth>Sign In</Button>
        </Form.Actions>
        
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--color-primary-600)', textDecoration: 'none' }}>Sign up</a>
        </p>
      </Form>
    </div>
  ),
};

export const ContactForm = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
      <Form.Section 
        title="Get in Touch"
        subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      >
        <Form.Group columns={2}>
          <Input label="First Name" placeholder="John" required />
          <Input label="Last Name" placeholder="Doe" required />
        </Form.Group>
        
        <Form.Group columns={2}>
          <Input label="Email" type="email" placeholder="john@example.com" required />
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        </Form.Group>
        
        <Input label="Subject" placeholder="What's this about?" required />
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
            Message *
          </label>
          <textarea
            rows={6}
            placeholder="Tell us more about your inquiry..."
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--color-border-primary)',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontFamily: 'var(--font-family-base)',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
        </div>
      </Form.Section>

      <Form.Actions>
        <Button variant="ghost">Clear Form</Button>
        <Button type="submit">Send Message</Button>
      </Form.Actions>
    </Form>
  ),
};