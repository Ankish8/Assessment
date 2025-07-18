// Reusable job profile data for AI Interview
// This data is shared with Video assessment and can be extended as needed

export const jobProfileData = {
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

// Format job profiles for Selector component
export const formatJobProfilesForSelector = () => {
  const allProfiles = [...jobProfileData.public, ...jobProfileData.private];
  
  return allProfiles.map(profile => ({
    value: profile.id,
    label: profile.title,
    description: `${profile.company} • ${profile.type}`,
    data: profile // Include full profile data for easy access
  }));
};

// Get job profile by ID
export const getJobProfileById = (id) => {
  const allProfiles = [...jobProfileData.public, ...jobProfileData.private];
  return allProfiles.find(profile => profile.id === id);
};

// Search job profiles
export const searchJobProfiles = (searchTerm) => {
  const term = String(searchTerm || '');
  if (!term.trim()) {
    return formatJobProfilesForSelector();
  }
  
  const allProfiles = [...jobProfileData.public, ...jobProfileData.private];
  const filtered = allProfiles.filter(profile => 
    profile.title.toLowerCase().includes(term.toLowerCase()) ||
    profile.company.toLowerCase().includes(term.toLowerCase()) ||
    profile.type.toLowerCase().includes(term.toLowerCase())
  );
  
  return filtered.map(profile => ({
    value: profile.id,
    label: profile.title,
    description: `${profile.company} • ${profile.type}`,
    badge: profile.visibility,
    data: profile
  }));
};