require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Initialize Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/api/send-message', upload.single('image'), async (req, res) => {
  try {
    const { name, message } = req.body;
    const image = req.file;

    // Validate input
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name and message are required'
      });
    }

    // Format message for Telegram
    const telegramMessage = `
📨 *New Message from Website*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
💬 *Message:*
${message}
━━━━━━━━━━━━━━━━━━━━
⏰ Time: ${new Date().toLocaleString()}
    `;

    // Send to Telegram
    if (image) {
      // If image is included, send photo with caption
      await bot.sendPhoto(CHAT_ID, image.buffer, {
        caption: telegramMessage,
        parse_mode: 'Markdown'
      });
    } else {
      // If no image, send text only
      await bot.sendMessage(CHAT_ID, telegramMessage, { parse_mode: 'Markdown' });
    }

    res.json({
      success: true,
      message: 'Message sent successfully to Telegram!'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    telegram_configured: !!process.env.TELEGRAM_BOT_TOKEN
  });
});

// Serve the website
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Telegram Bot: ${process.env.TELEGRAM_BOT_TOKEN ? 'Configured ✓' : 'Not configured ✗'}`);
  console.log(`💬 Chat ID: ${CHAT_ID || 'Not set'}`);
});
