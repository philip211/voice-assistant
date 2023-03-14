// Установите необходимые зависимости, например, через npm или yarn
const openai = require('openai');
const express = require('express');
const app = express();
const port = 3000;

// Установите параметры для подключения к API GPT-3
const openaiApiKey = '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';
const openaiEngineId = 'ваш ID модели GPT-3';

// Инициализируйте библиотеку OpenAI
openai.apiKey = openaiApiKey;

// Создайте функцию для получения ответов от GPT-3
async function generateResponse(question) {
  const prompt = `Question: ${question}\nAnswer:`;
  const parameters = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  const response = await openai.completions.create({
    engine: openaiEngineId,
    prompt: parameters.prompt,
    temperature: parameters.temperature,
    max_tokens: parameters.max_tokens,
    top_p: parameters.top_p,
    frequency_penalty: parameters.frequency_penalty,
    presence_penalty: parameters.presence_penalty
  });
  return response.choices[0].text.trim();
}

// Создайте маршрут для обработки запросов от клиента
app.post('/ask', async (req, res) => {
  const { question } = req.body;
  const answer = await generateResponse(question);
  res.send({ answer });
});

// Запустите сервер
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
