import React, { useState } from 'react';
import Modal from '../../components/common/Modal/Modal';
import styles from './PremiumModalDemo.module.css';

const PremiumModalDemo = () => {
  const [currentModal, setCurrentModal] = useState(null);

  const handleOpenModal = (modalType) => {
    setCurrentModal(modalType);
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  const handleExploreFeatures = () => {
    console.log('Exploring premium features...');
    setCurrentModal(null);
  };

  const handleContinueToDashboard = () => {
    console.log('Continuing to dashboard...');
    setCurrentModal(null);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoContent}>
        <h1 className="sectionTitle">Premium Modal Testing Suite</h1>
        <p className="sectionDescription">
          Test different variations of the premium congratulations modal. Each button opens a different version for A/B testing.
        </p>
        
        <div className={styles.buttonGrid}>
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('current')}
          >
            🎯 Current Design
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('minimal')}
          >
            ✨ Minimal Version
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('celebration')}
          >
            🎉 Celebration Version
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('corporate')}
          >
            💼 Corporate Version
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('detailed')}
          >
            📋 Detailed Benefits
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('simple')}
          >
            🎨 Simple & Clean
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('premium-gold')}
          >
            👑 Premium Gold
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('success-focused')}
          >
            ✅ Success Focused
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('modern-card')}
          >
            💳 Modern Card Style
          </button>
          
          <button 
            className={styles.triggerButton} 
            onClick={() => handleOpenModal('storybook-success')}
          >
            🎯 Storybook Based
          </button>
        </div>

        <div className={styles.instructions}>
          <h3 className="optionTitle">Testing Instructions:</h3>
          <ul className={styles.featureList}>
            <li><strong>Current Design:</strong> Our latest polished version</li>
            <li><strong>Minimal:</strong> Bare essentials only</li>
            <li><strong>Celebration:</strong> More festive and exciting</li>
            <li><strong>Corporate:</strong> Professional business style</li>
            <li><strong>Detailed Benefits:</strong> Complete feature breakdown</li>
            <li><strong>Simple & Clean:</strong> Ultra-clean modern design</li>
          </ul>
        </div>
      </div>

      {/* Premium Success Modal - Based on Storybook Pattern */}
      <Modal
        isOpen={currentModal === 'storybook-success'}
        onClose={handleCloseModal}
        size="base"
        variant="default"
        showCloseButton={true}
          header={
            <div className={styles.premiumHeader}>
              <div className={styles.successIconWrapper}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#10B981"/>
                  <circle cx="32" cy="32" r="24" fill="rgba(255,255,255,0.2)"/>
                  <path d="M22 32L28 38L42 26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.premiumBadge}>PREMIUM</div>
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.premiumTitle}>Congratulations!</h2>
                <p className={styles.premiumSubtitle}>Welcome to Premium Membership</p>
              </div>
            </div>
          }
          footer={
            <div className={styles.premiumFooter}>
              <button className={styles.primaryBtn} onClick={handleExploreFeatures}>
                Explore Premium Features
              </button>
              <button className={styles.secondaryBtn} onClick={handleContinueToDashboard}>
                Go to Dashboard
              </button>
            </div>
          }
        >
          <div className={styles.premiumContent}>
            <p className={styles.premiumDescription}>
              Your premium membership is now active. Enjoy unlimited access to all features and priority support.
            </p>
            <div className={styles.benefitsList}>
              <div className={styles.benefit}>
                <span className={styles.checkIcon}>✓</span>
                <div className={styles.benefitText}>
                  <strong>Unlimited Applications</strong>
                  <span>Apply to any job without restrictions</span>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.checkIcon}>✓</span>
                <div className={styles.benefitText}>
                  <strong>Priority Support</strong>
                  <span>Get help faster with dedicated assistance</span>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.checkIcon}>✓</span>
                <div className={styles.benefitText}>
                  <strong>Premium Content</strong>
                  <span>Access exclusive courses and features</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>

      {/* Test Modal */}
      <Modal
        isOpen={!!currentModal && currentModal !== 'storybook-success'}
        onClose={handleCloseModal}
        size="base"
        variant="default"
        showCloseButton={true}
        title="Premium Activated"
        subtitle="Welcome to your new premium experience"
      >
        <div className={styles.testModalContent}>
          <p>Testing different modal content styles...</p>
          <p>Current modal type: <strong>{currentModal}</strong></p>
        </div>
      </Modal>
    </div>
  );
};

// Modal Design Variations
const CurrentDesign = () => (
  <div>
    <div className={styles.header}>
      <div className={styles.iconContainer}>
        <div className={styles.successIconLarge}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#6366F1"/>
            <path d="M22 32L28 38L42 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.premiumBadge}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 8L6.5 12L10 4L13.5 12L17 8L15 16H5L3 8Z" fill="#F59E0B"/>
          </svg>
          <span>PREMIUM</span>
        </div>
      </div>
      <h1 className={styles.mainTitle}>Congratulations!</h1>
      <h2 className={styles.subtitle}>You're now a Premium Member</h2>
      <p className={styles.description}>
        Your premium membership is active. Enjoy unlimited access to all features and priority support.
      </p>
    </div>
    <div className={styles.benefits}>
      <div className={styles.benefitCard}>
        <div className={styles.benefitIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#6366F1"/>
          </svg>
        </div>
        <div className={styles.benefitContent}>
          <h3>Unlimited Applications</h3>
          <p>Apply to any job without restrictions</p>
        </div>
      </div>
      <div className={styles.benefitCard}>
        <div className={styles.benefitIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#6366F1"/>
          </svg>
        </div>
        <div className={styles.benefitContent}>
          <h3>Priority Support</h3>
          <p>Get help faster with dedicated assistance</p>
        </div>
      </div>
      <div className={styles.benefitCard}>
        <div className={styles.benefitIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#6366F1"/>
          </svg>
        </div>
        <div className={styles.benefitContent}>
          <h3>Exclusive Content</h3>
          <p>Access premium courses and materials</p>
        </div>
      </div>
    </div>
    <div className={styles.actions}>
      <button className={styles.primaryButton}>Start Exploring Premium Features</button>
      <button className={styles.secondaryButton}>Go to Dashboard</button>
    </div>
  </div>
);

const MinimalDesign = () => (
  <div className={styles.minimalModal}>
    <div className={styles.minimalIcon}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#10B981"/>
        <path d="M18 24L22 28L30 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h2 className={styles.minimalTitle}>Premium Activated</h2>
    <p className={styles.minimalDescription}>Welcome to Premium! All features are now unlocked.</p>
    <button className={styles.minimalButton}>Continue</button>
  </div>
);

const CelebrationDesign = () => (
  <div className={styles.celebrationModal}>
    <div className={styles.celebrationHeader}>
      <div className={styles.fireworks}>🎆</div>
      <div className={styles.celebrationIcon}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="url(#celebration-gradient)"/>
          <path d="M28 40L36 48L52 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="celebration-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B"/>
              <stop offset="50%" stopColor="#4ECDC4"/>
              <stop offset="100%" stopColor="#45B7D1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className={styles.confettiLeft}>🎊</div>
      <div className={styles.confettiRight}>🎉</div>
    </div>
    <h1 className={styles.celebrationTitle}>🎉 CONGRATULATIONS! 🎉</h1>
    <h2 className={styles.celebrationSubtitle}>You've Unlocked Premium Power!</h2>
    <p className={styles.celebrationDescription}>
      Get ready for an amazing journey with unlimited features, priority support, and exclusive content!
    </p>
    <div className={styles.celebrationStats}>
      <div className={styles.stat}>
        <span className={styles.statNumber}>∞</span>
        <span className={styles.statLabel}>Applications</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>24/7</span>
        <span className={styles.statLabel}>Support</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>100+</span>
        <span className={styles.statLabel}>Features</span>
      </div>
    </div>
    <button className={styles.celebrationButton}>🚀 Let's Explore!</button>
  </div>
);

const CorporateDesign = () => (
  <div className={styles.corporateModal}>
    <div className={styles.corporateHeader}>
      <div className={styles.corporateIcon}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#1F2937"/>
          <path d="M20 28L26 34L36 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={styles.corporateBadge}>PREMIUM MEMBER</div>
    </div>
    <h2 className={styles.corporateTitle}>Premium Membership Activated</h2>
    <p className={styles.corporateDescription}>
      Thank you for upgrading to Premium. Your account has been successfully enhanced with enterprise-grade features.
    </p>
    <div className={styles.corporateFeatures}>
      <div className={styles.corporateFeature}>
        <span className={styles.checkmark}>✓</span>
        <span>Unlimited job applications and proposals</span>
      </div>
      <div className={styles.corporateFeature}>
        <span className={styles.checkmark}>✓</span>
        <span>Priority customer support and consultation</span>
      </div>
      <div className={styles.corporateFeature}>
        <span className={styles.checkmark}>✓</span>
        <span>Access to premium courses and certifications</span>
      </div>
    </div>
    <div className={styles.corporateActions}>
      <button className={styles.corporatePrimary}>Access Premium Features</button>
      <button className={styles.corporateSecondary}>View Account Details</button>
    </div>
  </div>
);

const DetailedDesign = () => (
  <div className={styles.detailedModal}>
    <div className={styles.detailedHeader}>
      <div className={styles.detailedIcon}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="30" fill="#8B5CF6"/>
          <path d="M22 30L28 36L38 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className={styles.detailedTitle}>Welcome to Premium!</h2>
      <p className={styles.detailedSubtext}>Your membership includes everything below:</p>
    </div>
    
    <div className={styles.detailedFeatures}>
      <div className={styles.featureCategory}>
        <h3>🚀 Career Opportunities</h3>
        <ul>
          <li>Unlimited job applications</li>
          <li>Priority visibility to recruiters</li>
          <li>Access to exclusive job postings</li>
          <li>Advanced profile analytics</li>
        </ul>
      </div>
      
      <div className={styles.featureCategory}>
        <h3>📚 Learning & Development</h3>
        <ul>
          <li>Full access to NCET Plus programs</li>
          <li>Premium courses and certifications</li>
          <li>Weekly live mentor sessions</li>
          <li>Personalized learning paths</li>
        </ul>
      </div>
      
      <div className={styles.featureCategory}>
        <h3>💻 Development Tools</h3>
        <ul>
          <li>Unlimited sandbox instances</li>
          <li>Advanced code playground features</li>
          <li>Priority technical support</li>
          <li>Early access to new features</li>
        </ul>
      </div>
    </div>
    
    <button className={styles.detailedButton}>Start Using Premium Features</button>
  </div>
);

const SimpleDesign = () => (
  <div className={styles.simpleModal}>
    <div className={styles.simpleContent}>
      <div className={styles.simpleIcon}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#059669"/>
          <path d="M14 20L18 24L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className={styles.simpleTitle}>Premium Active</h3>
      <p className={styles.simpleText}>All premium features are now available.</p>
      <button className={styles.simpleButton}>Got it</button>
    </div>
  </div>
);

const PremiumGoldDesign = () => (
  <div className={styles.premiumGoldModal}>
    <div className={styles.goldHeader}>
      <div className={styles.goldCrown}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700"/>
              <stop offset="50%" stopColor="#FFA500"/>
              <stop offset="100%" stopColor="#FF8C00"/>
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r="36" fill="url(#gold-gradient)"/>
          <path d="M6 36L12 12L24 24L36 6L48 24L60 12L66 36H54L48 48L36 42L24 48L18 36H6Z" fill="#FFFFFF" opacity="0.9"/>
        </svg>
      </div>
      <div className={styles.goldSparkles}>
        <span>✨</span><span>⭐</span><span>✨</span>
      </div>
    </div>
    <h1 className={styles.goldTitle}>Welcome to Premium Elite!</h1>
    <p className={styles.goldSubtitle}>You've joined the exclusive premium tier</p>
    <p className={styles.goldDescription}>
      Experience the pinnacle of premium features with gold-standard service and unlimited access.
    </p>
    <div className={styles.goldFeatures}>
      <div className={styles.goldFeature}>
        <span className={styles.goldIcon}>👑</span>
        <span>Elite Member Status</span>
      </div>
      <div className={styles.goldFeature}>
        <span className={styles.goldIcon}>⚡</span>
        <span>Lightning Fast Support</span>
      </div>
      <div className={styles.goldFeature}>
        <span className={styles.goldIcon}>🎯</span>
        <span>Priority Everything</span>
      </div>
    </div>
    <button className={styles.goldButton}>Explore Elite Features</button>
  </div>
);

const SuccessFocusedDesign = () => (
  <div className={styles.successModal}>
    <div className={styles.successHeader}>
      <div className={styles.successCheckBig}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="#22C55E"/>
          <circle cx="40" cy="40" r="30" fill="#FFFFFF" opacity="0.2"/>
          <path d="M26 40L36 50L54 32" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={styles.successBadge}>
        <span>UPGRADE SUCCESSFUL</span>
      </div>
    </div>
    <h2 className={styles.successTitle}>Premium Membership Confirmed</h2>
    <p className={styles.successDescription}>
      Your upgrade was processed successfully. All premium features are now active on your account.
    </p>
    <div className={styles.successInfo}>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Membership Type:</span>
        <span className={styles.infoValue}>Premium Annual</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Activation Date:</span>
        <span className={styles.infoValue}>June 19, 2025</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Next Billing:</span>
        <span className={styles.infoValue}>June 19, 2026</span>
      </div>
    </div>
    <div className={styles.successActions}>
      <button className={styles.successPrimary}>Start Using Premium</button>
      <button className={styles.successSecondary}>View Receipt</button>
    </div>
  </div>
);

const ModernCardDesign = () => (
  <div className={styles.modernCardModal}>
    <div className={styles.cardHeader}>
      <div className={styles.premiumCard}>
        <div className={styles.cardIcon}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 12L14 18L24 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.cardText}>
          <span className={styles.cardTitle}>PREMIUM</span>
          <span className={styles.cardSubtitle}>MEMBER</span>
        </div>
        <div className={styles.cardChip}></div>
      </div>
    </div>
    
    <div className={styles.cardContent}>
      <h2 className={styles.cardMainTitle}>You're All Set!</h2>
      <p className={styles.cardDescription}>
        Your premium membership card is ready. Enjoy exclusive access to all premium features and benefits.
      </p>
      
      <div className={styles.quickBenefits}>
        <div className={styles.quickBenefit}>
          <div className={styles.benefitNumber}>∞</div>
          <div className={styles.benefitLabel}>Unlimited Access</div>
        </div>
        <div className={styles.quickBenefit}>
          <div className={styles.benefitNumber}>24/7</div>
          <div className={styles.benefitLabel}>Premium Support</div>
        </div>
        <div className={styles.quickBenefit}>
          <div className={styles.benefitNumber}>100%</div>
          <div className={styles.benefitLabel}>All Features</div>
        </div>
      </div>
      
      <button className={styles.cardButton}>Activate Premium Features</button>
    </div>
  </div>
);

export default PremiumModalDemo;