import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = 'YOUR_OPENAI_API_KEY'; // 実際のAPIキーに置き換えてください

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

const generateCompletion = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }, { headers });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const generateGoal = async (orgGoals, currentWork, desiredWork, desiredSkills) => {
  const prompt = `組織目標: ${orgGoals}\n現在の業務: ${currentWork}\nやりたい仕事: ${desiredWork}\n身につけたいスキル: ${desiredSkills}\n\n上記の情報を基に、適切な個人目標を3つ提案してください。`;
  return generateCompletion(prompt);
};

export const reviseGoal = async (orgGoals, personalGoals) => {
  const prompt = `組織目標: ${orgGoals}\n現在の個人目標: ${personalGoals}\n\n組織目標により適合するように、個人目標の修正案を提案してください。`;
  return generateCompletion(prompt);
};

export const getPerformanceAdvice = async (goals, achievements) => {
  const prompt = `設定した目標: ${goals}\n達成した成果: ${achievements}\n\n上記の目標と成果を踏まえて、期末評価でどのように成果をアピールすべきか、具体的なアドバイスを提供してください。`;
  return generateCompletion(prompt);
};