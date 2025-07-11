import React, { useState, useMemo } from 'react';
import Modal from '../../../../components/common/Modal';
import Selector from '../../../../components/common/Selector';
import Input from '../../../../components/common/Input';
import Button from '../../../../components/common/Button';
import Tab from '../../../../components/common/Tab';
import styles from './JobDescriptionModal.module.css';

// Sample job description data
const sampleJobDescriptions = {
  public: [
    {
      id: 'angular-js-dev',
      title: 'Angular JS Developer',
      company: 'Tech Solutions Inc.',
      type: 'Angular JS Developer',
      visibility: 'PUBLIC',
      skills: ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
      description: `We are seeking a talented Angular JS Developer with 2+ years of hands-on experience to join our dynamic team. The ideal candidate will have expertise in both front-end and back-end development, with a passion for building robust, scalable, and user-friendly applications.

Responsibilities:
• Design, develop, and maintain web applications using modern frameworks and tools
• Develop efficient server-side logic using back-end programming languages (e.g., Node.js, Python, Java, etc.)
• Build responsive and visually appealing front-end interfaces using HTML, CSS, JavaScript, and frameworks like React.js, Angular, or Vue.js
• Collaborate with cross-functional teams, including UI/UX designers, product managers, and QA teams, to deliver high-quality solutions
• Write clean, scalable, and reusable code with proper documentation
• Implement RESTful APIs and integrate third-party services
• Debug and troubleshoot issues across the stack
• Optimize applications for maximum speed and scalability
• Stay updated with emerging technologies and industry trends

Requirements:
• Bachelor's degree in Computer Science, Software Engineering, or a related field
• 2+ years of experience in full-stack development
• Proficiency in front-end technologies: HTML5, CSS3, JavaScript, and modern frameworks (React, Angular, Vue)
• Strong knowledge of back-end technologies: Node.js, Python, Java, or similar
• Experience with databases (SQL and NoSQL)
• Familiarity with version control systems (Git)
• Understanding of web development best practices and security principles
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities
• Ability to work in an agile development environment`
    },
    {
      id: 'app-dev-exp',
      title: 'Application Developer (Experience)',
      company: 'Enterprise Solutions Ltd.',
      type: 'Application Developer',
      visibility: 'PUBLIC',
      skills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs'],
      description: `Join our team as an experienced Application Developer! We're looking for a skilled professional to design and develop enterprise-level applications.

Key Responsibilities:
• Lead application development projects from conception to deployment
• Design and implement scalable microservices architecture
• Collaborate with stakeholders to gather requirements and translate them into technical solutions
• Mentor junior developers and conduct code reviews
• Ensure application performance, quality, and responsiveness

Requirements:
• 5+ years of experience in application development
• Strong expertise in Java and Spring Boot framework
• Experience with microservices architecture
• Knowledge of cloud platforms (AWS, Azure, or GCP)
• Excellent problem-solving and communication skills`
    },
    {
      id: 'app-dev-fresh',
      title: 'Application Developer (Freshers)',
      company: 'StartUp Innovations',
      type: 'Application Developer',
      visibility: 'PUBLIC',
      skills: ['Python', 'Django', 'REST APIs', 'Database Management'],
      description: `Exciting opportunity for fresh graduates! Join our growing team and kickstart your career in application development.

What You'll Do:
• Develop web applications using Python and Django
• Work with senior developers on feature implementation
• Participate in code reviews and team meetings
• Learn modern development practices and tools
• Contribute to product planning and design discussions

Requirements:
• Bachelor's degree in Computer Science or related field
• Strong foundation in programming concepts
• Basic knowledge of web development technologies
• Eagerness to learn and grow in a fast-paced environment
• Good communication and teamwork skills`
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security Engineer',
      company: 'SecureNet Corp.',
      type: 'Cyber Security Engineer',
      visibility: 'PUBLIC',
      skills: ['Cybersecurity', 'Penetration Testing', 'Risk Assessment', 'SIEM'],
      description: `Protect our digital assets as a Cyber Security Engineer. We're seeking a security professional to strengthen our cybersecurity posture.

Key Responsibilities:
• Conduct security assessments and penetration testing
• Monitor security incidents and respond to threats
• Implement security controls and best practices
• Develop security policies and procedures
• Collaborate with IT teams on security architecture

Requirements:
• Bachelor's degree in Cybersecurity, IT, or related field
• 3+ years of experience in cybersecurity
• Knowledge of security frameworks (NIST, ISO 27001)
• Experience with security tools and technologies
• Strong analytical and problem-solving skills`
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      company: 'Analytics Pro',
      type: 'Data Analyst',
      visibility: 'PUBLIC',
      skills: ['Python', 'SQL', 'Data Visualization', 'Statistics'],
      description: `Transform data into insights as our Data Analyst. Join a team that values data-driven decision making.

Responsibilities:
• Analyze complex datasets to identify trends and patterns
• Create compelling data visualizations and reports
• Collaborate with stakeholders to understand business requirements
• Develop and maintain data pipelines
• Present findings to executive leadership

Requirements:
• Master's degree in Statistics, Mathematics, or related field
• 2+ years of experience in data analysis
• Proficiency in Python, R, and SQL
• Experience with visualization tools (Tableau, Power BI)
• Strong statistical knowledge and analytical thinking`
    }
  ],
  private: [
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      company: 'Your Organization',
      type: 'Reading Questions / AI enabled',
      visibility: 'PRIVATE',
      skills: ['Reading Questions', 'AI enabled'],
      description: `Custom data analytics role tailored for your organization's specific needs.

Role Overview:
• Analyze business data to drive strategic decisions
• Develop custom analytics solutions
• Work with stakeholders to identify key metrics
• Create automated reporting systems
• Present insights to leadership team

This private job description is customized for your organization's unique requirements and can be modified as needed.`
    },
    {
      id: 'full-stack-dev',
      title: 'Full Stack Developer',
      company: 'Your Company',
      type: 'Full Stack Developer',
      visibility: 'PRIVATE',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      description: `Full Stack Developer position customized for your company's technology stack and requirements.

Key Responsibilities:
• Develop and maintain full-stack web applications
• Work with modern JavaScript frameworks
• Design and implement APIs
• Collaborate with product and design teams
• Ensure code quality and best practices

This is a private job description that can be customized to match your specific needs and requirements.`
    },
    {
      id: 'regional-sales',
      title: 'Regional Sales Manager',
      company: 'Your Organization',
      type: 'Customer Service',
      visibility: 'PRIVATE',
      skills: ['Sales', 'Customer Service', 'Team Management'],
      description: `Regional Sales Manager role with focus on customer service and team leadership.

Responsibilities:
• Lead regional sales team to achieve targets
• Develop customer relationships and retention strategies
• Analyze market trends and opportunities
• Provide exceptional customer service
• Train and mentor sales team members

This private job description is tailored to your organization's sales structure and can be modified as needed.`
    }
  ]
};

const JobDescriptionModal = ({ isOpen, onClose, onSelect, selectedJobDescription }) => {
  const [activeTab, setActiveTab] = useState('public');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(selectedJobDescription?.id || null);

  const currentData = sampleJobDescriptions[activeTab] || [];

  // Filter job descriptions based on search term
  const filteredJobDescriptions = useMemo(() => {
    if (!searchTerm.trim()) return currentData;
    
    const term = searchTerm.toLowerCase();
    return currentData.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.type.toLowerCase().includes(term) ||
      job.skills.some(skill => skill.toLowerCase().includes(term))
    );
  }, [currentData, searchTerm]);

  // Convert job descriptions to selector options
  const selectorOptions = filteredJobDescriptions.map(job => ({
    value: job.id,
    label: job.title,
    description: `${job.company} • ${job.type}`,
    badge: job.visibility,
    customData: job
  }));

  const handleSelection = (selectedId) => {
    setSelectedId(selectedId);
  };

  const handleSelectAndContinue = () => {
    const selectedJob = filteredJobDescriptions.find(job => job.id === selectedId);
    if (selectedJob && onSelect) {
      onSelect(selectedJob);
    }
    onClose();
  };

  const selectedJobData = filteredJobDescriptions.find(job => job.id === selectedId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Job Description"
      subtitle="Choose a job description to map candidate skills and responses"
      size="xl"
      footer={
        <div className={styles.footer}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSelectAndContinue}
            disabled={!selectedId}
          >
            Select & Continue
          </Button>
        </div>
      }
    >
      <div className={styles.modalContent}>
        {/* Search Bar */}
        <div className={styles.searchSection}>
          <Input
            placeholder="Search for Job Description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startIcon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 7C11.5 9.48528 9.48528 11.5 7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.5 13.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabSection}>
          <Tab
            options={[
              { value: 'public', label: 'Public', icon: '👥' },
              { value: 'private', label: 'Private', icon: '🔒' }
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Content Area */}
        <div className={styles.contentGrid}>
          {/* Left Side - Job List */}
          <div className={styles.jobList}>
            <div className={styles.resultsInfo}>
              <span className={styles.itemCount}>Items per page: 10</span>
              <span className={styles.resultCount}>
                {Math.min(10, filteredJobDescriptions.length)} - {filteredJobDescriptions.length} of {currentData.length}
              </span>
            </div>
            
            {filteredJobDescriptions.length > 0 ? (
              <Selector
                variant="single"
                options={selectorOptions}
                selectedValue={selectedId}
                onSelectionChange={handleSelection}
                layout="list"
                size="base"
              />
            ) : (
              <div className={styles.noResults}>
                <p>No job descriptions found matching your search.</p>
              </div>
            )}
          </div>

          {/* Right Side - Preview */}
          <div className={styles.preview}>
            {selectedJobData ? (
              <div className={styles.previewContent}>
                <div className={styles.previewHeader}>
                  <h3>Preview</h3>
                </div>
                <div className={styles.previewBody}>
                  <div className={styles.jobTitle}>
                    <strong>Job Title:</strong> {selectedJobData.title}
                  </div>
                  <div className={styles.jobSkills}>
                    <strong>Skills:</strong>
                    <div className={styles.skillsList}>
                      {selectedJobData.skills.map(skill => (
                        <span key={skill} className={styles.skillBadge}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.jobDescription}>
                    <strong>Job Description:</strong>
                    <div className={styles.descriptionText}>
                      {selectedJobData.description}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.previewPlaceholder}>
                <p>Select a job description to see the preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobDescriptionModal;