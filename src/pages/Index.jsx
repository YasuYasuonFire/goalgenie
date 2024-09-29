import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoalGenerator from '../components/GoalGenerator';
import GoalRevision from '../components/GoalRevision';
import ReactMarkdown from 'react-markdown'; // マークダウンレンダリング用

const Index = () => {
  const [generatedGoals, setGeneratedGoals] = React.useState('');
  const [revisedGoals, setRevisedGoals] = React.useState('');

  const handleGenerateGoals = (goals) => {
    setGeneratedGoals(goals);
  };

  const handleReviseGoals = (goals) => {
    setRevisedGoals(goals);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">目標設定お助けさん</h1>
      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">目標生成</TabsTrigger>
          <TabsTrigger value="revise">目標修正</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GoalGenerator onGenerateGoals={handleGenerateGoals} />
          {generatedGoals && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">生成された目標:</h3>
              <div className="prose max-w-none">
                <ReactMarkdown>{generatedGoals}</ReactMarkdown>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="revise">
          <GoalRevision onReviseGoals={handleReviseGoals} />
          {revisedGoals && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">修正された目標:</h3>
              <div className="prose max-w-none">
                <ReactMarkdown>{revisedGoals}</ReactMarkdown>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;