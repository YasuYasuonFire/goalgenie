import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { generateGoal } from '../utils/api';

const GoalGenerator = () => {
  const [orgGoals, setOrgGoals] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [desiredWork, setDesiredWork] = useState('');
  const [desiredSkills, setDesiredSkills] = useState('');

  const { data: generatedGoal, refetch, isLoading } = useQuery({
    queryKey: ['generateGoal'],
    queryFn: () => generateGoal(orgGoals, currentWork, desiredWork, desiredSkills),
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
          placeholder="やりたい仕事"
          value={desiredWork}
          onChange={(e) => setDesiredWork(e.target.value)}
        />
        <Textarea
          placeholder="身につけたいスキル"
          value={desiredSkills}
          onChange={(e) => setDesiredSkills(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          目標を生成
        </Button>
      </form>
      {generatedGoal && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">生成された目標:</h3>
          <p>{generatedGoal}</p>
        </div>
      )}
    </div>
  );
};

export default GoalGenerator;