# 🤖 Chatboat-AI

A beautiful, modern AI chatbot built with React, TailwindCSS, and OpenAI's GPT API. Features a sleek gradient design, real-time chat interface, and intelligent error handling.

![Chatbot Preview](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?style=for-the-badge&logo=openai)

## ✨ Features

- 🎨 **Beautiful UI** - Modern gradient design with TailwindCSS
- 💬 **Real-time Chat** - Instant messaging with AI responses
- 🔄 **Loading States** - Elegant animations and loading indicators
- 🛡️ **Rate Limiting** - Built-in protection against API rate limits
- 🔐 **Secure** - Environment variables for API key management
- 📱 **Responsive** - Works perfectly on desktop and mobile
- ⚡ **Fast** - Built with Vite for lightning-fast development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shri-ujjwal/Chatboat-AI.git
   cd Chatboat-AI/AI_Boat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🛠️ Tech Stack

- **Frontend**: React 19, TailwindCSS
- **Build Tool**: Vite
- **AI**: OpenAI GPT-3.5 Turbo
- **HTTP Client**: Axios
- **Styling**: TailwindCSS with custom gradients

## 📁 Project Structure

```
AI_Boat/
├── src/
│   ├── App.jsx          # Main chat component
│   ├── main.jsx         # App entry point
│   └── index.css        # TailwindCSS imports
├── public/              # Static assets
├── .env.example         # Environment template
├── tailwind.config.js   # TailwindCSS configuration
└── package.json         # Dependencies
```

## 🎨 UI Features

- **Gradient Background** - Beautiful blue-to-indigo gradient
- **Chat Bubbles** - Distinct styling for user and AI messages
- **Typing Indicator** - Animated dots when AI is responding
- **Empty State** - Welcoming interface for new users
- **Error Handling** - Elegant error messages in chat
- **Responsive Design** - Adapts to all screen sizes

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | Yes |

### Rate Limiting

The app includes built-in rate limiting (3-second cooldown) to prevent API quota issues.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `VITE_OPENAI_API_KEY` in Vercel's environment variables
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to [Netlify](https://netlify.com)
3. Set environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for the GPT API
- [TailwindCSS](https://tailwindcss.com) for the styling framework
- [React](https://reactjs.org) for the UI library
- [Vite](https://vitejs.dev) for the build tool

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [Shri Ujjwal](https://github.com/shri-ujjwal)
ChatBoat-AI Integration 
