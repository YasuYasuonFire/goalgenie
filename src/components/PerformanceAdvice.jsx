import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { getPerformanceAdvice } from '../utils/api';

const PerformanceAdvice = () => {
  const [goals, setGoals] = useState('');
  const [achievements, setAchievements] = useState('');

  const { data: advice, refetch, isLoading } = useQuery({
    queryKey: ['performanceAdvice'],
    queryFn: () => getPerformanceAdvice(goals, achievements),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="設定した目標"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
        <Textarea
          placeholder="達成した成果"
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          アドバイスを取得
        </Button>
      </form>
      {advice && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">成果アピールのアドバイス:</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceAdvice;