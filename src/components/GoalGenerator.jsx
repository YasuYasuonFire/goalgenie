import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { generatePerformanceGoal, generateCompetencyGoal } from '../utils/api';

const GoalGenerator = ({ onGenerateGoals }) => {
  const [orgGoals, setOrgGoals] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [desiredWorkAndSkills, setDesiredWorkAndSkills] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // LocalStorageから前回の入力内容を取得
    const savedOrgGoals = localStorage.getItem('orgGoals');
    const savedCurrentWork = localStorage.getItem('currentWork');
    const savedDesiredWorkAndSkills = localStorage.getItem('desiredWorkAndSkills');

    if (savedOrgGoals) setOrgGoals(savedOrgGoals);
    if (savedCurrentWork) setCurrentWork(savedCurrentWork);
    if (savedDesiredWorkAndSkills) setDesiredWorkAndSkills(savedDesiredWorkAndSkills);
  }, []);

  const { refetch: refetchPerformance } = useQuery({
    queryKey: ['generatePerformanceGoal'],
    queryFn: () => generatePerformanceGoal(orgGoals, currentWork, desiredWorkAndSkills),
    enabled: false,
  });

  const { refetch: refetchCompetency } = useQuery({
    queryKey: ['generateCompetencyGoal'],
    queryFn: () => generateCompetencyGoal(orgGoals, currentWork, desiredWorkAndSkills),
    enabled: false,
  });

  const handleSubmitPerformance = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // LocalStorageに入力内容を保存
    localStorage.setItem('orgGoals', orgGoals);
    localStorage.setItem('currentWork', currentWork);
    localStorage.setItem('desiredWorkAndSkills', desiredWorkAndSkills);
    try {
      const result = await refetchPerformance();
      if (result.data) {
        onGenerateGoals(result.data);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitCompetency = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // LocalStorageに入力内容を保存
    localStorage.setItem('orgGoals', orgGoals);
    localStorage.setItem('currentWork', currentWork);
    localStorage.setItem('desiredWorkAndSkills', desiredWorkAndSkills);
    try {
      const result = await refetchCompetency();
      if (result.data) {
        onGenerateGoals(result.data);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4">
        <Textarea
          placeholder="組織目標"
          value={orgGoals}
          onChange={(e) => setOrgGoals(e.target.value)}
        />
        <Textarea
          placeholder="現在の業務"
          value={currentWork}
          onChange={(e) => setCurrentWork(e.target.value)}
        />
        <Textarea
          placeholder="やりたい仕事・身につけたいスキル"
          value={desiredWorkAndSkills}
          onChange={(e) => setDesiredWorkAndSkills(e.target.value)}
        />
        <div className="flex space-x-4">
          <Button onClick={handleSubmitPerformance} disabled={isGenerating}>
            {isGenerating ? '生成中...' : '成果目標を生成'}
          </Button>
          <Button onClick={handleSubmitCompetency} disabled={isGenerating}>
            {isGenerating ? '生成中...' : 'コンピテンシー目標を生成'}
          </Button>
        </div>
      </form>
      {isGenerating && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="text-center">目標を生成中です。しばらくお待ちください...</p>
        </div>
      )}
    </div>
  );
};

export default GoalGenerator;