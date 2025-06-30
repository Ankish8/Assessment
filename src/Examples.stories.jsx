import React, { useState } from 'react';
import { Button, Card, Input, Form, Modal, Selector } from './components';

export default {
  title: 'Examples/Component Composition',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Real-world examples showing how to compose multiple components together to create complete interfaces.',
      },
    },
  },
};

export const QuestionCreationForm = {
  render: () => {
    const [formData, setFormData] = useState({
      title: '',
      difficulty: 'medium',
      languages: ['javascript'],
      skills: ['Problem Solving'],
      description: ''
    });

    const difficultyOptions = [
      { value: 'easy', label: 'Easy' },
      { value: 'medium', label: 'Medium' },
      { value: 'hard', label: 'Hard' }
    ];

    const languageOptions = [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'cpp', label: 'C++' }
    ];

    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <Card variant="elevated" padding="lg">
          <Form gap="lg">
            <Form.Section 
              title="Question Details"
              subtitle="Configure the basic information for your coding question"
            >
              <Input
                label="Question Title"
                placeholder="e.g., Two Sum Problem"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              
              <Form.Group columns={2}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Difficulty Level
                  </label>
                  <Selector
                    variant="single"
                    options={difficultyOptions}
                    selectedValue={formData.difficulty}
                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
                    layout="inline"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Programming Languages
                  </label>
                  <Selector
                    variant="multiple"
                    options={languageOptions}
                    selectedValues={formData.languages}
                    onSelectionChange={(values) => setFormData(prev => ({ ...prev, languages: values }))}
                    layout="inline"
                    showSelectAll
                  />
                </div>
              </Form.Group>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe the problem statement..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid var(--color-border-primary, #eaecf0)',
                    borderRadius: 'var(--radius-md, 8px)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-family-base, Inter, sans-serif)',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
              </div>
            </Form.Section>

            <Form.Actions align="between">
              <Button variant="ghost">Save Draft</Button>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="outline">Preview</Button>
                <Button variant="primary">Create Question</Button>
              </div>
            </Form.Actions>
          </Form>
        </Card>

        {/* Preview Card */}
        <Card variant="outlined" padding="lg" style={{ marginTop: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
            Preview
          </h3>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary, #667085)' }}>
            <div><strong>Title:</strong> {formData.title || 'Untitled Question'}</div>
            <div><strong>Difficulty:</strong> {formData.difficulty}</div>
            <div><strong>Languages:</strong> {formData.languages.join(', ')}</div>
            <div><strong>Skills:</strong> {formData.skills.join(', ')}</div>
            <div><strong>Description:</strong> {formData.description || 'No description provided'}</div>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete question creation form demonstrating Form, Input, Selector, Card, and Button components working together.',
      },
    },
  },
};

export const UserDashboard = {
  render: () => {
    const [selectedCard, setSelectedCard] = useState(null);
    
    const stats = [
      { label: 'Total Questions', value: '24', trend: '+12%' },
      { label: 'Active Candidates', value: '142', trend: '+8%' },
      { label: 'Completion Rate', value: '87%', trend: '+5%' },
      { label: 'Average Score', value: '78%', trend: '+3%' }
    ];

    const recentQuestions = [
      { id: 1, title: 'Two Sum Problem', difficulty: 'Easy', submissions: 45 },
      { id: 2, title: 'Binary Tree Traversal', difficulty: 'Medium', submissions: 32 },
      { id: 3, title: 'Dynamic Programming Challenge', difficulty: 'Hard', submissions: 18 }
    ];

    return (
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '700' }}>
            Dashboard
          </h1>
          <p style={{ margin: 0, color: 'var(--color-text-secondary, #667085)' }}>
            Welcome back! Here's what's happening with your questions today.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, index) => (
            <Card 
              key={index}
              variant="elevated" 
              padding="base"
              hoverable
              onClick={() => setSelectedCard(stat)}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: 'var(--color-primary-600, #7f56d9)',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: 'var(--color-text-secondary, #667085)',
                  marginBottom: '4px'
                }}>
                  {stat.label}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--color-success-600, #12b76a)',
                  fontWeight: '500'
                }}>
                  {stat.trend}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Recent Questions */}
          <Card variant="elevated" padding="lg">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
                Recent Questions
              </h2>
              <Button variant="outline" size="small">View All</Button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentQuestions.map((question) => (
                <div 
                  key={question.id}
                  style={{ 
                    padding: '16px',
                    border: '1px solid var(--color-border-primary, #eaecf0)',
                    borderRadius: 'var(--radius-md, 8px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                      {question.title}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'var(--color-text-secondary, #667085)' 
                    }}>
                      {question.difficulty} • {question.submissions} submissions
                    </div>
                  </div>
                  <Button variant="ghost" size="small">Edit</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card variant="elevated" padding="lg">
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
              Quick Actions
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary" fullWidth>
                Create New Question
              </Button>
              <Button variant="outline" fullWidth>
                Import Questions
              </Button>
              <Button variant="ghost" fullWidth>
                View Analytics
              </Button>
              <Button variant="ghost" fullWidth>
                Manage Templates
              </Button>
            </div>

            <div style={{ 
              marginTop: '24px', 
              padding: '16px',
              backgroundColor: 'var(--color-primary-50, #f9f5ff)',
              borderRadius: 'var(--radius-md, 8px)'
            }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                💡 Pro Tip
              </h4>
              <p style={{ 
                margin: 0, 
                fontSize: '12px', 
                color: 'var(--color-text-secondary, #667085)' 
              }}>
                Use question templates to speed up your question creation process by 3x!
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete dashboard interface showcasing Card, Button, and layout composition for a professional application.',
      },
    },
  },
};

export const ModalExample = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '24px' }}>Modal Examples</h2>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Button onClick={() => setIsOpen(true)}>
            Open Form Modal
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete Item
          </Button>
        </div>

        {/* Form Modal */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add New Skill"
          subtitle="Enter the skill details below"
          size="base"
          footer={
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Add Skill
              </Button>
            </div>
          }
        >
          <Form gap="base">
            <Input label="Skill Name" placeholder="e.g., JavaScript" required />
            <Input label="Category" placeholder="e.g., Programming Language" />
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Description
              </label>
              <textarea
                placeholder="Describe the skill..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid var(--color-border-primary, #eaecf0)',
                  borderRadius: 'var(--radius-md, 8px)',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>
          </Form>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Delete Question"
          subtitle="This action cannot be undone"
          size="sm"
          variant="alert"
          footer={
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(false)}>
                Delete
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to delete this question? This will permanently remove the question and all associated data.</p>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of Modal components with different configurations and use cases.',
      },
    },
  },
};