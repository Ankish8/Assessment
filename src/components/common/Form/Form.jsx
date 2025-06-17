import React from 'react';
import styles from './Form.module.css';

const Form = ({ 
  children, 
  onSubmit,
  className = '',
  layout = 'vertical',
  gap = 'base',
  ...props 
}) => {
  const formClasses = [
    styles.form,
    styles[layout],
    styles[`gap-${gap}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <form 
      className={formClasses}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
};

const FormGroup = ({ 
  children,
  className = '',
  columns = 1,
  ...props 
}) => {
  const groupClasses = [
    styles.formGroup,
    columns > 1 && styles[`columns-${columns}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {children}
    </div>
  );
};

const FormSection = ({
  title,
  subtitle,
  children,
  className = '',
  ...props
}) => {
  const sectionClasses = [
    styles.formSection,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sectionClasses} {...props}>
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && <h3 className={styles.sectionTitle}>{title}</h3>}
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.sectionContent}>
        {children}
      </div>
    </div>
  );
};

const FormActions = ({
  children,
  align = 'right',
  className = '',
  ...props
}) => {
  const actionsClasses = [
    styles.formActions,
    styles[`align-${align}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={actionsClasses} {...props}>
      {children}
    </div>
  );
};

Form.Group = FormGroup;
Form.Section = FormSection;
Form.Actions = FormActions;

export default Form;