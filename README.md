# 📱 Telegram Bot Web Integration

A distributed system that integrates a website with a Telegram bot, allowing users to send messages (with optional images) from the website directly to Telegram.

## 🎯 Features

- ✅ Modern, responsive web interface
- ✅ Real-time message delivery to Telegram
- ✅ **Optional image upload** (up to 10MB)
- ✅ RESTful API backend with file upload support
- ✅ Telegram bot with commands
- ✅ Form validation and error handling
- ✅ Beautiful UI with gradient design
- ✅ Image preview before sending

## 🏗️ System Architecture

```
┌─────────────┐      HTTP POST      ┌─────────────┐      Telegram API     ┌─────────────┐
│   Website   │  ───────────────>   │   Server    │  ─────────────────>   │  Telegram   │
│  (Frontend) │   (with image)      │  (Backend)  │   (text + photo)      │     Bot     │
└─────────────┘                     └─────────────┘                       └─────────────┘
```

## 📁 Project Structure

```
bot-telegram-web/
├── public/
│   ├── index.html      # Website frontend
│   ├── styles.css      # Styling with image preview
│   └── script.js       # Client-side JavaScript with file handling
├── server.js           # Express.js backend with multer
├── bot.js              # Telegram bot handler
├── package.json        # Dependencies (includes multer)
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore file
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Telegram account
- Telegram Bot Token (from @BotFather)

### Step 1: Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the **Bot Token** (it looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Install Dependencies

```powershell
# Navigate to project directory
cd d:\KULIAH\semester_5\project\bot-telegram-web

# Install dependencies
npm install
```

This will install:
- express
- dotenv
- node-telegram-bot-api
- cors
- body-parser
- **multer** (for file uploads)

### Step 3: Get Your Chat ID

**First, run the bot:**
```powershell
npm run bot
```

Then:
1. Open your bot in Telegram
2. Send `/start` command
3. The bot will reply with your **Chat ID**
4. Copy this Chat ID

### Step 4: Configure Environment Variables

1. Copy the example environment file:
```powershell
Copy-Item .env.example .env
```

2. Edit `.env` file and add your credentials:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PORT=3000
```

### Step 5: Run the Application

You need to run TWO processes:

**Terminal 1 - Start the Bot:**
```powershell
npm run bot
```

**Terminal 2 - Start the Server:**
```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

### Step 6: Access the Website

Open your browser and navigate to:
```
http://localhost:3000
```

## 🎮 Usage

### Website

1. Open `http://localhost:3000` in your browser
2. Fill in the form:
   - Your name (required)
   - Your message (required)
   - Upload an image (optional - JPG, PNG, GIF, etc.)
3. Preview the image before sending
4. Click "Send to Telegram"
5. Check your Telegram bot for the message!

### Image Upload Features

- ✅ **Optional** - You can send messages without images
- ✅ **Preview** - See the image before sending
- ✅ **Remove** - Remove the selected image
- ✅ **Validation** - Only image files allowed
- ✅ **Size limit** - Maximum 10MB per image
- ✅ **Formats** - JPG, PNG, GIF, WebP, etc.

### Telegram Bot Commands

- `/start` - Start the bot and get your Chat ID
- `/help` - Show available commands
- `/chatid` - Get your Chat ID
- `/status` - Check bot status

## 🔧 API Endpoints

### POST `/api/send-message`

Send a message to Telegram (with optional image).

**Request Type:** `multipart/form-data`

**Form Fields:**
- `name` (required) - Sender's name
- `message` (required) - The message text
- `image` (optional) - Image file

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully to Telegram!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error description"
}
```

### GET `/api/health`

Check server health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-15T10:30:00.000Z",
  "telegram_configured": true
}
```

## 🛠️ Development

### Project Dependencies

- **express** - Web framework
- **node-telegram-bot-api** - Telegram Bot API wrapper
- **dotenv** - Environment variables management
- **cors** - CORS middleware
- **body-parser** - Request body parsing
- **multer** - File upload handling (NEW)
- **nodemon** - Auto-reload for development

### Key Changes from Basic Version

1. **Removed email field** - Only name and message required
2. **Added image upload** - Optional file upload with multer
3. **Image preview** - Client-side preview before sending
4. **Enhanced Telegram integration** - Sends photos with captions

## 🌟 Features Explanation

### Distributed System Components

1. **Frontend (Website)**
   - Responsive HTML/CSS/JS interface
   - File upload with preview
   - Real-time form validation
   - Beautiful gradient UI design
   - Error handling and user feedback

2. **Backend (Express Server)**
   - RESTful API endpoints
   - Multer middleware for file uploads
   - Message validation
   - Telegram integration (text + photos)
   - Error handling and logging

3. **Telegram Bot**
   - Receives messages from website
   - Displays text messages
   - Displays photos with captions
   - Interactive commands
   - Real-time delivery

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token from @BotFather | Yes |
| `TELEGRAM_CHAT_ID` | Chat ID where messages will be sent | Yes |
| `PORT` | Server port (default: 3000) | No |

## 🐛 Troubleshooting

### Bot not responding

1. Check if bot is running: `npm run bot`
2. Verify TELEGRAM_BOT_TOKEN in .env file
3. Make sure bot is not blocked

### Messages not arriving

1. Verify TELEGRAM_CHAT_ID is correct
2. Send `/start` to your bot first
3. Check server logs for errors

### Image upload not working

1. Check file size (must be under 10MB)
2. Verify file is a valid image format
3. Check multer is installed: `npm install multer`
4. Check browser console for errors

### Server not starting

1. Check if port 3000 is available
2. Verify all dependencies are installed: `npm install`
3. Check .env file is configured correctly

## 🚀 Deployment

### Production Considerations

1. Use environment variables for sensitive data
2. Set up process manager (PM2, systemd)
3. Use HTTPS for production
4. Add rate limiting
5. Implement proper logging
6. Configure file upload limits

### Example PM2 Setup

```powershell
# Install PM2
npm install -g pm2

# Start both processes
pm2 start bot.js --name telegram-bot
pm2 start server.js --name web-server

# Save configuration
pm2 save
pm2 startup
```

## 📄 License

ISC

## 👨‍💻 Author

Created for distributed systems course project.

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📞 Support

If you encounter any issues, please check the troubleshooting section or create an issue in the repository.

---

Made with ❤️ using Node.js, Express, Multer, and Telegram Bot API
