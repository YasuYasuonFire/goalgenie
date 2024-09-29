import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { reviseGoal } from '../utils/api';

const GoalRevision = ({ onReviseGoals }) => {
  const [orgGoals, setOrgGoals] = useState('');
  const [personalGoals, setPersonalGoals] = useState('');

  const [isRevising, setIsRevising] = useState(false);

  useEffect(() => {
    // LocalStorageから前回の入力内容を取得
    const savedOrgGoals = localStorage.getItem('revisionOrgGoals');
    const savedPersonalGoals = localStorage.getItem('revisionPersonalGoals');

    if (savedOrgGoals) setOrgGoals(savedOrgGoals);
    if (savedPersonalGoals) setPersonalGoals(savedPersonalGoals);
  }, []);

  const { refetch } = useQuery({
    queryKey: ['reviseGoal'],
    queryFn: () => reviseGoal(orgGoals, personalGoals),
    enabled: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRevising(true);
    // LocalStorageに入力内容を保存
    localStorage.setItem('revisionOrgGoals', orgGoals);
    localStorage.setItem('revisionPersonalGoals', personalGoals);
    try {
      const result = await refetch();
      if (result.data) {
        onReviseGoals(result.data);
      }
    } finally {
      setIsRevising(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label htmlFor="personalGoals" className="block text-sm font-medium text-green-700">現在の個人目標</label>
          <Textarea
            id="personalGoals"
            placeholder="現在の個人目標を入力してください"
            value={personalGoals}
            onChange={(e) => setPersonalGoals(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={isRevising} className="bg-green-600 hover:bg-green-700 text-white">
            {isRevising ? '修正中...' : '目標を修正'}
          </Button>
        </div>
      </form>
      {isRevising && (
        <div className="mt-4 p-4 bg-green-100 rounded-md text-green-800">
          <p className="text-center">目標を修正中です。しばらくお待ちください...</p>
        </div>
      )}
    </div>
  );
};

export default GoalRevision;