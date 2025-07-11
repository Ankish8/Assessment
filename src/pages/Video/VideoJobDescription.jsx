import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './VideoJobDescription.module.css';

// Enhanced sample job description data with complete details
const sampleJobDescriptions = {
  public: [
    {
      id: 'angular-js-dev',
      title: 'Angular JS Developer',
      company: 'Tech Solutions Inc.',
      type: 'Angular JS Developer',
      visibility: 'PUBLIC',
      skills: ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git'],
      description: `We are seeking a talented Angular JS Developer with 2+ years of hands-on experience to join our dynamic team. You will be responsible for developing user interfaces for web applications using Angular framework, collaborating with cross-functional teams, and ensuring high-quality code delivery.`,
      requirements: [
        "Bachelor's degree in Computer Science, Information Technology, or related field",
        "2+ years of experience with Angular framework (versions 8+)",
        "Strong knowledge of JavaScript, TypeScript, HTML5, and CSS3",
        "Experience with RESTful APIs and HTTP client libraries",
        "Familiarity with version control systems (Git)",
        "Understanding of responsive web design principles"
      ],
      keySkills: {
        "Technical Expertise": "Proficient in Angular framework, TypeScript, and modern JavaScript ES6+",
        "Frontend Development": "Strong skills in HTML5, CSS3, SASS/SCSS, and responsive design",
        "API Integration": "Experience with RESTful services, HTTP clients, and data handling",
        "Development Tools": "Familiarity with Node.js, npm, webpack, and development workflows"
      }
    },
    {
      id: 'app-dev-exp',
      title: 'Application Developer (Experience)',
      company: 'Enterprise Solutions Ltd.',
      type: 'Application Developer',
      visibility: 'PUBLIC',
      skills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'SQL', 'Docker'],
      description: `Join our team as an experienced Application Developer! We're looking for a skilled professional to design and develop enterprise-level applications. You will work on large-scale systems, implement microservices architecture, and collaborate with senior developers to deliver robust solutions.`,
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in Java application development",
        "Strong experience with Spring Boot and Spring Framework",
        "Knowledge of microservices architecture and design patterns",
        "Experience with relational databases and SQL",
        "Understanding of containerization technologies (Docker)"
      ],
      keySkills: {
        "Backend Development": "Expertise in Java, Spring Boot, and enterprise application development",
        "Architecture Design": "Strong understanding of microservices, REST APIs, and system design",
        "Database Management": "Experience with SQL databases, data modeling, and optimization",
        "DevOps": "Knowledge of Docker, containerization, and deployment strategies"
      }
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security Engineer',
      company: 'SecureNet Corp.',
      type: 'Cyber Security Engineer',
      visibility: 'PUBLIC',
      skills: ['Cybersecurity', 'Penetration Testing', 'Risk Assessment', 'SIEM', 'Incident Response', 'Python'],
      description: `Protect our digital assets as a Cyber Security Engineer. We're seeking a security professional to strengthen our cybersecurity posture, conduct security assessments, and respond to incidents. You will design, implement, and manage security measures that protect our organization's systems, networks, and data.`,
      requirements: [
        "Bachelor's degree in Computer Science, Information Technology, Cybersecurity, or related field",
        "Strong knowledge of network protocols, security principles, and common attack vectors",
        "Experience with security tools such as firewalls, IDS/IPS, SIEM platforms, and endpoint protection systems",
        "Familiarity with scripting and automation using tools like Python, PowerShell, or Bash",
        "Understanding of compliance frameworks (ISO 27001, NIST, etc.)"
      ],
      keySkills: {
        "Technical Expertise": "Threat modeling, cryptographic methods, incident response",
        "Analytical Thinking": "Ability to analyze complex issues and develop actionable solutions",
        "Communication": "Clear reporting and explanation of security issues to both technical and non-technical stakeholders",
        "Problem-Solving": "Proactive and reactive strategies to address emerging threats"
      }
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      company: 'Analytics Pro',
      type: 'Data Analyst',
      visibility: 'PUBLIC',
      skills: ['Python', 'SQL', 'Data Visualization', 'Statistics', 'Tableau', 'Excel'],
      description: `Transform data into insights as our Data Analyst. Join a team that values data-driven decision making and help us uncover actionable insights from complex datasets. You will work with stakeholders across the organization to understand their data needs and provide analytical support.`,
      requirements: [
        "Bachelor's degree in Statistics, Mathematics, Computer Science, or related analytical field",
        "2+ years of experience in data analysis and statistical analysis",
        "Proficiency in SQL for data extraction and manipulation",
        "Experience with data visualization tools (Tableau, Power BI, or similar)",
        "Strong analytical and problem-solving skills"
      ],
      keySkills: {
        "Data Analysis": "Statistical analysis, data mining, and pattern recognition",
        "Programming": "Python/R for data analysis, SQL for database queries",
        "Visualization": "Creating compelling dashboards and reports using Tableau/Power BI",
        "Business Intelligence": "Translating business requirements into analytical solutions"
      }
    },
    {
      id: 'frontend-react',
      title: 'Frontend React Developer',
      company: 'Digital Innovations Ltd.',
      type: 'Frontend Developer',
      visibility: 'PUBLIC',
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux', 'TypeScript'],
      description: `We are looking for a skilled Frontend React Developer to join our growing team. You will be responsible for building responsive web applications, implementing UI/UX designs, and ensuring optimal user experience across all devices.`,
      requirements: [
        "Bachelor's degree in Computer Science, Web Development, or related field",
        "3+ years of experience with React.js and related technologies",
        "Strong proficiency in JavaScript, HTML5, and CSS3",
        "Experience with state management libraries (Redux, Context API)",
        "Knowledge of responsive design and cross-browser compatibility",
        "Familiarity with modern build tools (Webpack, Vite)"
      ],
      keySkills: {
        "Frontend Frameworks": "React.js, component-based architecture, hooks",
        "Styling": "CSS3, SASS/SCSS, styled-components, responsive design",
        "State Management": "Redux, Context API, local state management",
        "Development Tools": "Webpack, Vite, npm/yarn, version control (Git)"
      }
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      type: 'DevOps Engineer',
      visibility: 'PUBLIC',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Terraform'],
      description: `Join our DevOps team to help streamline our development and deployment processes. You will work with cloud infrastructure, automate deployments, and ensure high availability of our applications.`,
      requirements: [
        "Bachelor's degree in Computer Science, Engineering, or related field",
        "3+ years of experience in DevOps or cloud infrastructure",
        "Strong knowledge of AWS cloud services",
        "Experience with containerization technologies (Docker, Kubernetes)",
        "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
        "Experience with CI/CD pipelines and automation tools"
      ],
      keySkills: {
        "Cloud Platforms": "AWS services, EC2, S3, RDS, Lambda, CloudWatch",
        "Containerization": "Docker, Kubernetes, container orchestration",
        "Infrastructure as Code": "Terraform, CloudFormation, infrastructure automation",
        "CI/CD": "Jenkins, GitLab CI, automated testing and deployment"
      }
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      company: 'InnovateTech Corp.',
      type: 'Product Manager',
      visibility: 'PUBLIC',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
      description: `We are seeking a Product Manager to lead product development initiatives and drive our product strategy. You will work closely with engineering, design, and marketing teams to deliver exceptional products that meet customer needs.`,
      requirements: [
        "Bachelor's degree in Business, Engineering, or related field",
        "3+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience with Agile development methodologies",
        "Knowledge of user research and data analysis",
        "Excellent communication and leadership skills"
      ],
      keySkills: {
        "Product Strategy": "Market research, competitive analysis, product roadmapping",
        "Agile Methodologies": "Scrum, Kanban, sprint planning, backlog management",
        "Analytics": "Data-driven decision making, KPI tracking, user metrics",
        "Leadership": "Cross-functional team collaboration, stakeholder management"
      }
    }
  ],
  private: [
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      company: 'Your Organization',
      type: 'Reading Questions / AI enabled',
      visibility: 'PRIVATE',
      skills: ['Reading Questions', 'AI enabled', 'Machine Learning', 'NLP'],
      description: `Custom data analytics role tailored for your organization's specific needs. This position focuses on advanced analytics, machine learning implementations, and AI-driven solutions to solve complex business problems.`,
      requirements: [
        "Advanced degree in Data Science, Computer Science, or related field",
        "Experience with machine learning algorithms and frameworks",
        "Strong programming skills in Python or R",
        "Knowledge of natural language processing techniques"
      ],
      keySkills: {
        "AI/ML": "Machine learning model development and deployment",
        "Analytics": "Advanced statistical analysis and predictive modeling",
        "Programming": "Python, R, and data science libraries",
        "Communication": "Translating complex technical concepts for business stakeholders"
      }
    },
    {
      id: 'full-stack-dev',
      title: 'Full Stack Developer',
      company: 'Your Company',
      type: 'Full Stack Developer',
      visibility: 'PRIVATE',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'JavaScript', 'Express'],
      description: `Full Stack Developer position customized for your company's technology stack and requirements. Build end-to-end web applications using modern technologies and cloud infrastructure.`,
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "3+ years of full-stack development experience",
        "Proficiency in React.js and modern JavaScript",
        "Experience with Node.js and Express.js",
        "Knowledge of NoSQL databases, particularly MongoDB",
        "Familiarity with cloud platforms (AWS preferred)"
      ],
      keySkills: {
        "Frontend": "React.js, JavaScript ES6+, responsive web design",
        "Backend": "Node.js, Express.js, API development",
        "Database": "MongoDB, database design and optimization",
        "Cloud": "AWS services, deployment, and infrastructure management"
      }
    },
    {
      id: 'regional-sales',
      title: 'Regional Sales Manager',
      company: 'Your Organization',
      type: 'Customer Service',
      visibility: 'PRIVATE',
      skills: ['Sales', 'Customer Service', 'Team Management', 'CRM', 'Negotiation'],
      description: `Regional Sales Manager role with focus on customer service and team leadership. Drive sales growth in your assigned region while building strong customer relationships and managing a high-performing sales team.`,
      requirements: [
        "Bachelor's degree in Business, Marketing, or related field",
        "5+ years of sales experience with 2+ years in management",
        "Proven track record of meeting and exceeding sales targets",
        "Strong customer relationship management skills",
        "Experience with CRM systems and sales analytics"
      ],
      keySkills: {
        "Sales Leadership": "Team management, coaching, and performance optimization",
        "Customer Relations": "Building long-term partnerships and customer satisfaction",
        "Strategy": "Regional market analysis and sales strategy development",
        "Communication": "Excellent presentation and negotiation skills"
      }
    },
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Designer',
      company: 'Your Creative Agency',
      type: 'Design',
      visibility: 'PRIVATE',
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
      description: `Custom UI/UX Designer role for your creative agency. Focus on creating exceptional user experiences through research, design thinking, and iterative design processes.`,
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "3+ years of UI/UX design experience",
        "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
        "Strong portfolio showcasing design thinking and problem-solving",
        "Experience with user research and usability testing"
      ],
      keySkills: {
        "Design Tools": "Figma, Sketch, Adobe Creative Suite, prototyping tools",
        "User Research": "User interviews, surveys, usability testing, persona development",
        "Design Systems": "Component libraries, style guides, design tokens",
        "Collaboration": "Working with developers, stakeholders, and cross-functional teams"
      }
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer',
      company: 'Your Tech Company',
      type: 'Backend Development',
      visibility: 'PRIVATE',
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'REST APIs', 'AWS'],
      description: `Backend Engineer position tailored for your tech company's infrastructure needs. Build scalable backend services, design APIs, and ensure high performance and reliability.`,
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "4+ years of backend development experience",
        "Strong proficiency in Python and Django framework",
        "Experience with relational databases (PostgreSQL, MySQL)",
        "Knowledge of caching strategies and message queues",
        "Understanding of cloud services and deployment"
      ],
      keySkills: {
        "Backend Frameworks": "Django, Flask, FastAPI, REST API design",
        "Database": "PostgreSQL, MySQL, database optimization, ORM",
        "Caching & Queues": "Redis, Celery, RabbitMQ, performance optimization",
        "Cloud & DevOps": "AWS, Docker, deployment strategies, monitoring"
      }
    },
    {
      id: 'marketing-specialist',
      title: 'Digital Marketing Specialist',
      company: 'Your Marketing Agency',
      type: 'Marketing',
      visibility: 'PRIVATE',
      skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics', 'PPC'],
      description: `Digital Marketing Specialist role customized for your marketing agency. Drive online presence, execute digital campaigns, and analyze performance metrics to optimize marketing strategies.`,
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "2+ years of digital marketing experience",
        "Strong knowledge of SEO and SEM strategies",
        "Experience with social media platforms and advertising",
        "Proficiency in analytics tools (Google Analytics, SEMrush)",
        "Content creation and campaign management skills"
      ],
      keySkills: {
        "SEO/SEM": "Keyword research, on-page optimization, Google Ads, search strategies",
        "Social Media": "Platform management, content creation, community engagement",
        "Analytics": "Google Analytics, conversion tracking, performance reporting",
        "Content Marketing": "Content strategy, copywriting, email marketing"
      }
    }
  ]
};

const VideoJobDescription = () => {
  const navigate = useNavigate();
  const [selectedJobDescription, setSelectedJobDescription] = useState(null);
  const [activeTab, setActiveTab] = useState('private');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContext, setShowContext] = useState(false);

  const handleJobSelection = (job) => {
    setSelectedJobDescription(job);
  };

  const handleSaveAndContinue = () => {
    if (!selectedJobDescription) return;
    // Navigate to next step - Questions (unified Management + Professional)
    navigate('/video/questions');
  };

  // Get current tab data and filter
  const currentData = useMemo(() => {
    let data = [];
    if (activeTab === 'both') {
      data = [...sampleJobDescriptions.public, ...sampleJobDescriptions.private];
    } else {
      data = sampleJobDescriptions[activeTab] || [];
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.type.toLowerCase().includes(term) ||
        job.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    return data;
  }, [activeTab, searchTerm]);
  
  // Pagination
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = currentData.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      {/* Compact Header */}
      <div className={styles.compactHeader}>
        <div>
          <div className={styles.headerLeft}>
            <button 
              className={styles.backButton}
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className={styles.headerTitle}>
              <i className="fas fa-video"></i>
              <span>Video Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          <div className={`${styles.progressStep} ${styles.current}`}>
            <div className={`${styles.stepIndicator} ${styles.active}`}>
              <span>1</span>
            </div>
            <span className={styles.stepLabel}>Add Job Description</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>2</div>
            <span className={styles.stepLabel}>Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>3</div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>4</div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={styles.stepIndicator}>5</div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="none" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Choose Your Job Role for Video Assessment</h2>
              <div className={styles.helpIcon}>
                <button 
                  className={styles.helpButton}
                  onClick={() => setShowContext(!showContext)}
                  aria-label="Toggle help information"
                >
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Master-Detail Layout */}
          <div className={styles.masterDetailLayout}>
            {/* Left Panel - Job List */}
            <div className={styles.leftPanel}>
              {/* Search Section */}
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
                <div className={styles.tabNav}>
                  <button
                    className={`${styles.tabButton} ${activeTab === 'private' ? styles.active : ''}`}
                    onClick={() => setActiveTab('private')}
                  >
                    <i className="fas fa-lock"></i> Private
                  </button>
                  <button
                    className={`${styles.tabButton} ${activeTab === 'public' ? styles.active : ''}`}
                    onClick={() => setActiveTab('public')}
                  >
                    <i className="fas fa-users"></i> Public
                  </button>
                  <button
                    className={`${styles.tabButton} ${activeTab === 'both' ? styles.active : ''}`}
                    onClick={() => setActiveTab('both')}
                  >
                    <i className="fas fa-sync-alt"></i> Both
                  </button>
                </div>
                
                {/* Tab Information */}
                <div className={styles.tabInfo}>
                  {activeTab === 'private' && (
                    <p className={styles.tabInfoText}>
                      <i className="fas fa-info-circle"></i>
                      Explore private job descriptions created by you or available exclusively for your account.
                    </p>
                  )}
                  {activeTab === 'public' && (
                    <p className={styles.tabInfoText}>
                      <i className="fas fa-info-circle"></i>
                      Explore public job descriptions shared publicly and accessible to all users.
                    </p>
                  )}
                  {activeTab === 'both' && (
                    <p className={styles.tabInfoText}>
                      <i className="fas fa-info-circle"></i>
                      View all available job descriptions from both public and private sources.
                    </p>
                  )}
                </div>
              </div>

              {/* Results Info */}
              <div className={styles.resultsInfo}>
                <span className={styles.itemCount}>Items per page: {itemsPerPage}</span>
                <span className={styles.resultCount}>
                  {startIndex + 1} – {endIndex} of {totalItems}
                </span>
              </div>

              {/* Compact Job List */}
              <div className={styles.jobList}>
                {currentItems.map(job => (
                  <div 
                    key={job.id} 
                    className={`${styles.jobItem} ${selectedJobDescription?.id === job.id ? styles.selected : ''}`}
                    onClick={() => handleJobSelection(job)}
                  >
                    <div className={styles.jobContent}>
                      <div className={styles.jobHeader}>
                        <h3 className={styles.jobTitle}>{job.title}</h3>
                        <span className={`${styles.visibilityBadge} ${styles[job.visibility.toLowerCase()]}`}>
                          {job.visibility}
                        </span>
                      </div>
                      <p className={styles.jobCompany}>{job.company}</p>
                      <div className={styles.jobSkills}>
                        {job.skills.slice(0, 3).map(skill => (
                          <span key={skill} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className={styles.moreSkills}>+{job.skills.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.jobActions}>
                      <div className={`${styles.selectIndicator} ${selectedJobDescription?.id === job.id ? styles.selected : ''}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Right Panel - Job Details */}
            <div className={styles.rightPanel}>
              {selectedJobDescription ? (
                <div className={styles.jobDetails}>
                  {/* Job Header */}
                  <div className={styles.jobDetailsHeader}>
                    <div className={styles.jobDetailsTitle}>
                      <h2 className={styles.jobDetailsJobTitle}>{selectedJobDescription.title}</h2>
                      <span className={`${styles.visibilityBadge} ${styles[selectedJobDescription.visibility.toLowerCase()]}`}>
                        {selectedJobDescription.visibility}
                      </span>
                    </div>
                    <p className={styles.jobDetailsCompany}>{selectedJobDescription.company}</p>
                  </div>

                  {/* Skills Section */}
                  <div className={styles.jobDetailsSection}>
                    <h3 className={styles.jobDetailsSectionTitle}>Skills</h3>
                    <div className={styles.jobDetailsSkills}>
                      {selectedJobDescription.skills.map(skill => (
                        <span key={skill} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className={styles.jobDetailsSection}>
                    <h3 className={styles.jobDetailsSectionTitle}>Job Description</h3>
                    <div className={styles.jobSummary}>
                      <h4 className={styles.jobSummaryTitle}>Job Summary</h4>
                      <p className={styles.jobDescriptionText}>{selectedJobDescription.description}</p>
                    </div>
                  </div>

                  {/* Required Qualifications */}
                  <div className={styles.jobDetailsSection}>
                    <h3 className={styles.jobDetailsSectionTitle}>Required Qualifications</h3>
                    <ul className={styles.requirementsList}>
                      {selectedJobDescription.requirements.map((requirement, index) => (
                        <li key={index} className={styles.requirementItem}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Skills */}
                  <div className={styles.jobDetailsSection}>
                    <h3 className={styles.jobDetailsSectionTitle}>Key Skills</h3>
                    <div className={styles.keySkillsGrid}>
                      {Object.entries(selectedJobDescription.keySkills).map(([category, description]) => (
                        <div key={category} className={styles.keySkillItem}>
                          <h4 className={styles.keySkillCategory}>{category}:</h4>
                          <p className={styles.keySkillDescription}>{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.jobDetailsEmpty}>
                  <div className={styles.emptyStateContent}>
                    <i className="fas fa-search"></i>
                    <h3>Ready to Find Your Perfect Match?</h3>
                    <p>Select a job description from the list to see detailed information for your video assessment.</p>
                    
                    <div className={styles.emptyStateFeatures}>
                      <div className={styles.emptyStateFeature}>
                        <i className="fas fa-check-circle"></i>
                        <span>Complete job descriptions with requirements</span>
                      </div>
                      <div className={styles.emptyStateFeature}>
                        <i className="fas fa-check-circle"></i>
                        <span>Skills breakdown and key competencies</span>
                      </div>
                      <div className={styles.emptyStateFeature}>
                        <i className="fas fa-check-circle"></i>
                        <span>Tailored interview questions preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            {!selectedJobDescription && (
              <div className={styles.validationAlert}>
                <i className="fas fa-exclamation-triangle"></i>
                Please select a job description.
              </div>
            )}
          </div>
          
          <div className={styles.rightActions}>
            <Button 
              variant="primary" 
              onClick={handleSaveAndContinue}
              disabled={!selectedJobDescription}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoJobDescription;