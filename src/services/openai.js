// const API_KEY = process.env.OPENAI_API_KEY; // Set this in your environment variables

// export const summarizeText = async (text) => {
//   if (!API_KEY) {
//     console.error('OpenAI API key not configured');
//     return 'Summarization not available (API key missing)';
//   }

//   try {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a helpful assistant that summarizes text. Provide a concise summary of the following text:'
//           },
//           {
//             role: 'user',
//             content: text
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 100
//       })
//     });

//     const data = await response.json();
//     return data.choices?.[0]?.message?.content || 'No summary generated';
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//     return 'Failed to generate summary';
//   }
// };


import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // You'll set this in your environment
//   apiKey: process.env.OPENAI_API_KEY, // You'll set this in your environment
  dangerouslyAllowBrowser: true // Only for Chrome extensions!
});

export const summarizeText = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text. Provide a concise summary of the following text:"
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0]?.message?.content || 'No summary generated';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Failed to generate summary';
  }
};  