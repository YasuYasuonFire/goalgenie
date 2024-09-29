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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">目標設定お助けさん</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Tabs defaultValue="generate" className="p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="generate" className="px-4 py-2 text-green-700">目標生成</TabsTrigger>
              <TabsTrigger value="revise" className="px-4 py-2 text-green-700">目標修正</TabsTrigger>
            </TabsList>
            <TabsContent value="generate">
              <GoalGenerator onGenerateGoals={handleGenerateGoals} />
              {generatedGoals && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold mb-2 text-green-800">生成された目標:</h3>
                  <div className="prose max-w-none text-green-900">
                    <ReactMarkdown>{generatedGoals}</ReactMarkdown>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="revise">
              <GoalRevision onReviseGoals={handleReviseGoals} />
              {revisedGoals && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold mb-2 text-green-800">修正された目標:</h3>
                  <div className="prose max-w-none text-green-900">
                    <ReactMarkdown>{revisedGoals}</ReactMarkdown>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;