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
      max_tokens: 1000
    }, { headers });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const reviseGoal = async (orgGoals, personalGoals) => {
  const prompt = `
組織目標: ${orgGoals}
現在の個人目標: ${personalGoals}

組織目標により適合するように、個人目標の修正案を提案してください。修正案は以下の点を考慮してください：

1. SMARTの法則（具体性、測定可能性、達成可能性、関連性、期限）に準拠しているか
2. 組織の中期経営計画と個人の目標の関連性が明確か
3. 職場と個人のミッションが反映されているか
4. 具体的な取り組み方が明記されているか
5. 自主性と自律性を促進する要素が含まれているか

修正案を提示し、各修正点について簡潔な説明を加えてください。@Web
`;
  return generateCompletion(prompt);
};

export const generatePerformanceGoal = async (orgGoals, currentWork, desiredWorkAndSkills) => {
  const prompt = `
組織目標: ${orgGoals}
現在の業務: ${currentWork}
やりたい仕事・身につけたいスキル: ${desiredWorkAndSkills}

上記の情報を基に、適切な成果目標を3つ提案してください。各目標は以下の要素を含むようにしてください：

1. 達成したい姿：具体的な達成状態を簡潔に記述してください。
2. 行動指針（KPI）：目標達成のために必要な行動や指標を簡潔に記述してください。

SMARTの考え方（具体性、測定可能性、達成可能性、関連性、期限）を考慮に入れてください。
各目標は改行で区切り、見やすく整形してください。

出力例：
目標1: [達成したい姿]を達成する。そのために、[行動指針/KPI]を実施する。

目標2: [達成したい姿]の状態になる。そのために、[行動指針/KPI]を行う。

目標3: [達成したい姿]を実現する。そのために、[行動指針/KPI]に取り組む。
`;
  return generateCompletion(prompt);
};

export const generateCompetencyGoal = async (orgGoals, currentWork, desiredWorkAndSkills) => {
  const prompt = `
組織目標: ${orgGoals}
現在の業務: ${currentWork}
やりたい仕事・身につけたいスキル: ${desiredWorkAndSkills}

上記の情報を基に、適切なコンピテンシー目標を3つ提案してください。各目標は以下の要素を含むようにしてください：

1. 身につけたいスキルや能力：具体的なコンピテンシーを簡潔に記述してください。
2. 行動指針：そのスキルや能力を身につけるための具体的な行動を簡潔に記述してください。

SMARTの考え方（具体性、測定可能性、達成可能性、関連性、期限）を考慮に入れてください。
各目標は改行で区切り、見やすく整形してください。

出力例：
目標1: [身につけたいスキルや能力]を向上させる。そのために、[行動指針]を実践する。

目標2: [身につけたいスキルや能力]を習得する。そのために、[行動指針]に取り組む。

目標3: [身につけたいスキルや能力]を強化する。そのために、[行動指針]を行う。
`;
  return generateCompletion(prompt);
};