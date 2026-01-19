const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateStudyPlan = async (goals, userProfile) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful study coach that creates realistic, achievable study plans for students.'
          },
          {
            role: 'user',
            content: `Create a personalized study plan for a student with these goals: ${goals.join(', ')}. 
            Student profile: ${JSON.stringify(userProfile)}. 
            Break goals into small daily tasks and suggest a weekly schedule.`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

export const generateMotivationalPrompt = async (userProgress) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an encouraging study coach that provides personalized motivational messages.'
          },
          {
            role: 'user',
            content: `Generate a motivational message for a student with this progress: ${JSON.stringify(userProgress)}`
          }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Keep going! Every study session brings you closer to your goals.";
  }
};

