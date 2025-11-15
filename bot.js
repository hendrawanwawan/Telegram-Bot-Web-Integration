require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Initialize bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Telegram bot started!');

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
👋 Welcome to the Message Receiver Bot!

This bot receives messages from the website.

🔑 Your Chat ID: \`${chatId}\`

💡 *Setup Instructions:*
1. Copy your Chat ID above
2. Add it to your .env file as TELEGRAM_CHAT_ID
3. Restart the server
4. Messages from the website will appear here!

Use /help for more commands.
  `;
  
  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
📖 *Available Commands:*

/start - Start the bot and get your Chat ID
/help - Show this help message
/chatid - Get your Chat ID
/status - Check bot status

ℹ️ This bot receives messages from the website automatically once configured.
  `;
  
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// Chat ID command
bot.onText(/\/chatid/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🔑 Your Chat ID is: \`${chatId}\``, { parse_mode: 'Markdown' });
});

// Status command
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  const statusMessage = `
✅ *Bot Status*

🤖 Bot: Online
⏰ Time: ${new Date().toLocaleString()}
💬 Chat ID: \`${chatId}\`
  `;
  
  bot.sendMessage(chatId, statusMessage, { parse_mode: 'Markdown' });
});

// Handle any other messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Don't respond to commands
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }
  
  // Echo message
  bot.sendMessage(chatId, `Received: ${msg.text}`);
});

// Handle polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('✅ Bot is ready to receive messages!');
