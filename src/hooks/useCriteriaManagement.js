import { useState, useCallback } from 'react';

export const useCriteriaManagement = (defaultCriteria = []) => {
  const [criteria, setCriteria] = useState(defaultCriteria);

  // Calculate total weightage
  const totalWeightage = criteria.reduce((sum, criterion) => sum + (parseInt(criterion.weightage) || 0), 0);
  const isValidWeightage = totalWeightage === 100;

  const addCriterion = useCallback(() => {
    const newCriterion = {
      id: Date.now().toString(),
      title: '',
      weightage: '',
      description: ''
    };
    setCriteria(prev => [...prev, newCriterion]);
  }, []);

  const removeCriterion = useCallback((id) => {
    setCriteria(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateCriterion = useCallback((id, field, value) => {
    setCriteria(prev => prev.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  }, []);

  const loadDefaultCriteria = useCallback((defaultCriteria) => {
    setCriteria(defaultCriteria);
  }, []);

  const resetCriteria = useCallback(() => {
    setCriteria([]);
  }, []);

  return {
    criteria,
    setCriteria,
    totalWeightage,
    isValidWeightage,
    addCriterion,
    removeCriterion,
    updateCriterion,
    loadDefaultCriteria,
    resetCriteria
  };
};