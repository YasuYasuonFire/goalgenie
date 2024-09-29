import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

const generateCompletion = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI assistant powered by GPT-4 mini. You are happy to help answer any questions that the user has." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150
    }, { headers });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const generateGoal = async (orgGoals, currentWork, desiredWorkAndSkills) => {
  const prompt = `組織目標: ${orgGoals}\n現在の業務: ${currentWork}\nやりたい仕事・身につけたいスキル: ${desiredWorkAndSkills}\n\n上記の情報を基に、適切な個人目標を3つ提案してください。各目標は改行で区切ってください。@Web`;
  return generateCompletion(prompt);
};

export const reviseGoal = async (orgGoals, personalGoals) => {
  const prompt = `組織目標: ${orgGoals}\n現在の個人目標: ${personalGoals}\n\n組織目標により適合するように、個人目標の修正案を提案してください。@Web`;
  return generateCompletion(prompt);
};

export const getPerformanceAdvice = async (goals, achievements) => {
  const prompt = `設定した目標: ${goals}\n達成した成果: ${achievements}\n\n上記の情報を基に、成果アピールのアドバイスを提供してください。@Web`;
  return generateCompletion(prompt);
};