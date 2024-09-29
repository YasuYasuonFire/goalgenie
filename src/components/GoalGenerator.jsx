import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { generatePerformanceGoal, generateCompetencyGoal } from '../utils/api';

const GoalGenerator = ({ onGenerateGoals }) => {
  const [orgGoals, setOrgGoals] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [desiredWorkAndSkills, setDesiredWorkAndSkills] = useState('');

  useEffect(() => {
    // LocalStorageから前回の入力内容を取得
    const savedOrgGoals = localStorage.getItem('orgGoals');
    const savedCurrentWork = localStorage.getItem('currentWork');
    const savedDesiredWorkAndSkills = localStorage.getItem('desiredWorkAndSkills');

    if (savedOrgGoals) setOrgGoals(savedOrgGoals);
    if (savedCurrentWork) setCurrentWork(savedCurrentWork);
    if (savedDesiredWorkAndSkills) setDesiredWorkAndSkills(savedDesiredWorkAndSkills);
  }, []);

  const { data: generatedPerformanceGoal, refetch: refetchPerformance, isLoading: isLoadingPerformance } = useQuery({
    queryKey: ['generatePerformanceGoal'],
    queryFn: () => generatePerformanceGoal(orgGoals, currentWork, desiredWorkAndSkills),
    enabled: false,
  });

  const { data: generatedCompetencyGoal, refetch: refetchCompetency, isLoading: isLoadingCompetency } = useQuery({
    queryKey: ['generateCompetencyGoal'],
    queryFn: () => generateCompetencyGoal(orgGoals, currentWork, desiredWorkAndSkills),
    enabled: false,
  });

  const handleSubmitPerformance = async (e) => {
    e.preventDefault();
    const goals = await generatePerformanceGoal(orgGoals, currentWork, desiredWorkAndSkills);
    onGenerateGoals(goals);
  };

  const handleSubmitCompetency = async (e) => {
    e.preventDefault();
    const goals = await generateCompetencyGoal(orgGoals, currentWork, desiredWorkAndSkills);
    onGenerateGoals(goals);
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
          <Button onClick={handleSubmitPerformance} disabled={isLoadingPerformance}>
            成果目標を生成
          </Button>
          <Button onClick={handleSubmitCompetency} disabled={isLoadingCompetency}>
            コンピテンシー目標を生成
          </Button>
        </div>
      </form>
      {(generatedPerformanceGoal || generatedCompetencyGoal) && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">生成された目標:</h3>
          <Textarea
            value={generatedPerformanceGoal || generatedCompetencyGoal}
            readOnly
            className="w-full h-64 overflow-y-auto"
          />
        </div>
      )}
    </div>
  );
};

export default GoalGenerator;