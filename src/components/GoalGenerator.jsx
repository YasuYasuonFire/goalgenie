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
    <div className="space-y-6">
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="orgGoals" className="block text-sm font-medium text-green-700">組織目標</label>
          <Textarea
            id="orgGoals"
            placeholder="組織目標を入力してください"
            value={orgGoals}
            onChange={(e) => setOrgGoals(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="currentWork" className="block text-sm font-medium text-green-700">現在の業務</label>
          <Textarea
            id="currentWork"
            placeholder="現在の業務内容を入力してください"
            value={currentWork}
            onChange={(e) => setCurrentWork(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="desiredWorkAndSkills" className="block text-sm font-medium text-green-700">やりたい仕事・身につけたいスキル</label>
          <Textarea
            id="desiredWorkAndSkills"
            placeholder="やりたい仕事や身につけたいスキルを入力してください"
            value={desiredWorkAndSkills}
            onChange={(e) => setDesiredWorkAndSkills(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex space-x-4 justify-center">
          <Button onClick={handleSubmitPerformance} disabled={isGenerating} className="bg-green-600 hover:bg-green-700 text-white">
            {isGenerating ? '生成中...' : '成果目標を生成'}
          </Button>
          <Button onClick={handleSubmitCompetency} disabled={isGenerating} className="bg-green-600 hover:bg-green-700 text-white">
            {isGenerating ? '生成中...' : 'コンピテンシー目標を生成'}
          </Button>
        </div>
      </form>
      {isGenerating && (
        <div className="mt-4 p-4 bg-green-100 rounded-md text-green-800">
          <p className="text-center">目標を生成中です。しばらくお待ちください...</p>
        </div>
      )}
    </div>
  );
};

export default GoalGenerator;