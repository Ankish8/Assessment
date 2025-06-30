import React from 'react';
import { Form } from './form';

export const BasicForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd6e3',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd6e3',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        />
      </div>

      <Form.Actions>
        <button
          type="button"
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#6b5671',
            border: '1px solid #ddd6e3',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#611F69',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </Form.Actions>
    </Form>
  );
};

export const WithSections = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form with sections submitted');
  };

  return (
    <Form onSubmit={handleSubmit} gap="lg">
      <Form.Section 
        title="Personal Information" 
        subtitle="Please provide your basic details"
      >
        <Form.Group columns={2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd6e3',
                borderRadius: '6px',
                fontSize: '16px',
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd6e3',
                borderRadius: '6px',
                fontSize: '16px',
              }}
            />
          </div>
        </Form.Group>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>
      </Form.Section>

      <Form.Section 
        title="Contact Information" 
        subtitle="How can we reach you?"
      >
        <Form.Group columns={2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd6e3',
                borderRadius: '6px',
                fontSize: '16px',
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
              Company
            </label>
            <input
              type="text"
              placeholder="Company Name"
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd6e3',
                borderRadius: '6px',
                fontSize: '16px',
              }}
            />
          </div>
        </Form.Group>
      </Form.Section>

      <Form.Actions align="between">
        <button
          type="button"
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#6b5671',
            border: '1px solid #ddd6e3',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Save Draft
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b5671',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#611F69',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Submit Application
          </button>
        </div>
      </Form.Actions>
    </Form>
  );
};

export const GridLayout = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Grid form submitted');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#2a1f35', margin: '0 0 16px 0' }}>
        Address Information
      </h2>
      
      <Form.Group columns={2}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            Street Address
          </label>
          <input
            type="text"
            placeholder="123 Main St"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            Apartment/Suite
          </label>
          <input
            type="text"
            placeholder="Apt 2B (optional)"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>
      </Form.Group>

      <Form.Group columns={3}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            City
          </label>
          <input
            type="text"
            placeholder="New York"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            State
          </label>
          <select
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: 'white',
            }}
          >
            <option value="">Select State</option>
            <option value="NY">New York</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            ZIP Code
          </label>
          <input
            type="text"
            placeholder="10001"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>
      </Form.Group>

      <Form.Actions>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#611F69',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Save Address
        </button>
      </Form.Actions>
    </Form>
  );
};

export const CompactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Compact form submitted');
  };

  return (
    <Form onSubmit={handleSubmit} gap="sm">
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2a1f35', margin: '0 0 8px 0' }}>
        Quick Contact
      </h3>
      
      <Form.Group columns={2}>
        <input
          type="text"
          placeholder="Name"
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd6e3',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
        <input
          type="email"
          placeholder="Email"
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd6e3',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </Form.Group>

      <Form.Actions align="center">
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#611F69',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Subscribe
        </button>
      </Form.Actions>
    </Form>
  );
};

export const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#2a1f35', margin: '0 0 8px 0' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '14px', color: '#6b5671', margin: 0 }}>
            Sign in to your account
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#2a1f35' }}>
              Password
            </label>
            <a 
              href="#" 
              style={{ 
                fontSize: '12px', 
                color: '#611F69', 
                textDecoration: 'none' 
              }}
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd6e3',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="remember"
            style={{ margin: 0 }}
          />
          <label 
            htmlFor="remember" 
            style={{ fontSize: '14px', color: '#2a1f35', cursor: 'pointer' }}
          >
            Remember me
          </label>
        </div>

        <Form.Actions>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#611F69',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Sign In
          </button>
        </Form.Actions>
        
        <p style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: '#6b5671', 
          margin: '16px 0 0 0' 
        }}>
          Don't have an account? {' '}
          <a 
            href="#" 
            style={{ color: '#611F69', textDecoration: 'none' }}
          >
            Sign up
          </a>
        </p>
      </Form>
    </div>
  );
};