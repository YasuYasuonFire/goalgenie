import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { generateGoal } from '../utils/api';

const GoalGenerator = () => {
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

  const { data: generatedGoal, refetch, isLoading } = useQuery({
    queryKey: ['generateGoal'],
    queryFn: () => generateGoal(orgGoals, currentWork, desiredWorkAndSkills),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // LocalStorageに入力内容を保存
    localStorage.setItem('orgGoals', orgGoals);
    localStorage.setItem('currentWork', currentWork);
    localStorage.setItem('desiredWorkAndSkills', desiredWorkAndSkills);
    refetch();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit" disabled={isLoading}>
          目標を生成
        </Button>
      </form>
      {generatedGoal && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">生成された目標:</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{generatedGoal}</p>
        </div>
      )}
    </div>
  );
};

export default GoalGenerator;