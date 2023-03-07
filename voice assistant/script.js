// Получаем доступ к микрофону устройства
const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;

// Обработчик события голосового ввода
recognition.onresult = (event) => {
    const voiceInput = event.results[event.results.length - 1][0].transcript;
    const customEvent = new CustomEvent('voiceInput', { detail: { voiceInput } });
    document.dispatchEvent(customEvent);
  };
  function sendMessageToChat(message) {
      console.log('Голосовой помощник:', message);
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      synth.speak(utterance);
    
      const chatElement = document.querySelector('#chat');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.textContent = message;
      chatElement.appendChild(messageElement);
    }
    const synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
}
// Проверяем поддержку голосового ввода
if (!('webkitSpeechRecognition' in window)) {
    alert('Извините, голосовой ввод не поддерживается в вашем браузере. Пожалуйста, воспользуйтесь текстовым вводом.');
  } else {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
  }
// Ждем, пока голоса загрузятся
setTimeout(() => {
  // Выбираем нужный голос
  const desiredVoice = voices.find((voice) => voice.lang === 'ru-RU' && voice.name === 'Google русский');
  if (desiredVoice) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = desiredVoice;
    synth.speak(utterance);
  }
}, 1000);

// Функция для отправки текстового сообщения в чат
function sendMessageToChat(message) {
console.log('Голосовой помощник:', message);
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance(message);
synth.speak(utterance);
}
  // Обработчик ошибок для распознавания голоса
  recognition.onerror = (event) => {
    console.error(event.error);
  };
// Обработчик события голосового ввода
recognition.onresult = async (event) => {
    const voiceInput = event.results[event.results.length - 1][0].transcript;
    const customEvent = new CustomEvent('voiceInput', { detail: { voiceInput } });
    document.dispatchEvent(customEvent);
  };
  // Обработчик ошибок для запроса к API OpenAI
  const handleOpenAIError = (error) => {
    console.error(error);
    sendMessageToChat('Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз.');
  };


// Проверяем, является ли сообщение голосовой командой
document.addEventListener('voiceInput', (event) => {
const message = event.detail.voiceInput.toLowerCase();
switch (message) {
case 'привет':
sendMessageToChat('Привет! Я - voice assistant меня зовут ЭЯ');
break;
case 'как дела':
sendMessageToChat('У меня всё отлично, спасибо! А у вас?');
break;
case 'кто така siri':
sendMessageToChat('siri и alisa- мои лутщие подруги ');
break;
case 'спасибо':
sendMessageToChat('Не за что. Я всегда рад помочь!');
break;
case 'как настроение ?':
sendMessageToChat('Отличное ! А у тебя как?');
break;
case 'ты кто ?':
sendMessageToChat('Я ChatGPT из семейства ИИ.');
break;
case 'что ты умеешь':
sendMessageToChat('Я умею обрабатывать данные и выдавать точные ответы на интересующие вас вопросы.');
break;
case 'был ли этот ответ полезным?':
sendMessageToChat('Пожалуйста, ответьте "да" или "нет".');
const feedbackEvent = new CustomEvent('feedbackRequest', { detail: { message } });
document.dispatchEvent(feedbackEvent);
break;
default:
handleVoiceRequest(message);
}
});
const { SpeechSynthesisUtterance, speechSynthesis } = window;


      // Отправляем запрос на API OpenAI
      async function handleVoiceRequest(message) {
        recognition.onresult = async (event) => {
          recognition.stop(); // Остановка распознавания голоса
      
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          console.log(transcript);
      
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${'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'}` },
            body: JSON.stringify({
              prompt: transcript,
              max_tokens: 300,
              temperature: 0.7,
              n: 1,
              stop: '.'
            })
          };
      
          try {
            const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', requestOptions);
            const { choices } = await response.json();
            const answer = choices[0].text.trim();
            sendMessageToChat(answer);
      
            // Запуск распознавания голоса после задержки в 5 секунд
            setTimeout(() => {
              recognition.start();
            }, 300);
      
          } catch (error) {
            console.error(error);
          }
        };
      
       
      }
      
  document.addEventListener('DOMContentLoaded', () => {

   // Запускаем распознавание голосовых команд при нажатии на кнопку "Голосовой помощник"
document.querySelector('#voice-btn').addEventListener('click', () => {
  recognition.start();
});

  
  });
  import * as tf from '@tensorflow/tfjs';

// Загрузка данных для обучения и тестирования
const mnist = tf.data.mnist();
const {xTrain, yTrain} = await mnist.getTrainData();
const {xTest, yTest} = await mnist.getTestData();

// Нормализация данных
const norm = (data) => data.div(255.0);
const xTrainNorm = norm(xTrain);
const xTestNorm = norm(xTest);

// Определение архитектуры нейронной сети
const model = tf.sequential();
model.add(tf.layers.flatten({inputShape: [28, 28]}));
model.add(tf.layers.dense({units: 128, activation: 'relu'}));
model.add(tf.layers.dropout({rate: 0.2}));
model.add(tf.layers.dense({units: 10}));

// Компиляция модели
model.compile({optimizer: 'adam', loss: 'sparseCategoricalCrossentropy', metrics: ['accuracy']});

// Обучение модели
await model.fit(xTrainNorm, yTrain, {epochs: 5});

// Оценка точности на тестовых данных
const evalResult = model.evaluate(xTestNorm, yTest);
console.log(`Test accuracy: ${evalResult[1].dataSync()[0]}`);

// Использование модели для распознавания цифр
const predictions = model.predict(xTestNorm.slice([0, 0, 0], [5, 28, 28])).argMax(-1);
predictions.print();



  