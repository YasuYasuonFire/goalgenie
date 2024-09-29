import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { reviseGoal } from '../utils/api';

const GoalRevision = ({ onReviseGoals }) => {
  const [orgGoals, setOrgGoals] = useState('');
  const [personalGoals, setPersonalGoals] = useState('');

  useEffect(() => {
    // LocalStorageから前回の入力内容を取得
    const savedOrgGoals = localStorage.getItem('revisionOrgGoals');
    const savedPersonalGoals = localStorage.getItem('revisionPersonalGoals');

    if (savedOrgGoals) setOrgGoals(savedOrgGoals);
    if (savedPersonalGoals) setPersonalGoals(savedPersonalGoals);
  }, []);

  const { data: revisedGoal, refetch, isLoading } = useQuery({
    queryKey: ['reviseGoal'],
    queryFn: () => reviseGoal(orgGoals, personalGoals),
    enabled: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // LocalStorageに入力内容を保存
    localStorage.setItem('revisionOrgGoals', orgGoals);
    localStorage.setItem('revisionPersonalGoals', personalGoals);
    const result = await refetch();
    if (result.data) {
      onReviseGoals(result.data);
    }
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
          placeholder="現在の個人目標"
          value={personalGoals}
          onChange={(e) => setPersonalGoals(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '修正中...' : '目標を修正'}
        </Button>
      </form>
      {isLoading && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="text-center">目標を修正中です。しばらくお待ちください...</p>
        </div>
      )}
    </div>
  );
};

export default GoalRevision;