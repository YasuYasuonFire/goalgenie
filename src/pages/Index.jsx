import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoalGenerator from '../components/GoalGenerator';
import GoalRevision from '../components/GoalRevision';
import PerformanceAdvice from '../components/PerformanceAdvice';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">人事評価支援ツール</h1>
      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">目標生成</TabsTrigger>
          <TabsTrigger value="revise">目標修正</TabsTrigger>
          <TabsTrigger value="advice">成果アピール</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GoalGenerator />
        </TabsContent>
        <TabsContent value="revise">
          <GoalRevision />
        </TabsContent>
        <TabsContent value="advice">
          <PerformanceAdvice />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;