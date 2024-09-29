import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { reviseGoal } from '../utils/api';

const GoalRevision = ({ onReviseGoals }) => {
  const [orgGoals, setOrgGoals] = useState('');
  const [personalGoals, setPersonalGoals] = useState('');

  const { data: revisedGoal, refetch, isLoading } = useQuery({
    queryKey: ['reviseGoal'],
    queryFn: () => reviseGoal(orgGoals, personalGoals),
    enabled: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goals = await reviseGoal(orgGoals, personalGoals);
    onReviseGoals(goals);
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
          目標を修正
        </Button>
      </form>
    </div>
  );
};

export default GoalRevision;