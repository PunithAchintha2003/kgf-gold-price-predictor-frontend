# KGF Gold Price Predictor

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-7.3.2-007FFF?logo=mui)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive gold price prediction application with real-time data visualization and AI-powered price forecasting. Built with React, TypeScript, and Material UI.

## ✨ Features

- **Real-time Price Updates**: Live gold price updates every 2 seconds
- **AI Predictions**: Machine learning-powered next-day assessments with accuracy tracking
- **Multi-currency Support**: USD (troy ounce) and LKR (Sri Lankan Rupee) with live exchange rates
- **Interactive Charts**: Plotly.js integration with zoom, pan, and hover features
- **Dark/Light Theme**: Persistent theme preferences with smooth transitions
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Professional UI**: TradingView-inspired interface with Material UI components
- **State Management**: Redux Toolkit with RTK Query for efficient data caching

## 🛠️ Tech Stack

### Frontend

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - Component library
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **Plotly.js** - Interactive charts
- **React Router** - Client-side routing

### Backend Integration

- **FastAPI** - REST API backend
- **Machine Learning** - Price prediction engine
- **Real-time Data** - Live market data feeds

## 📋 Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/kgf-gold-price-predictor-frontend.git
   cd kgf-gold-price-predictor-frontend
   ```

2. **Install dependencies**

   ```bash
   cd react-frontend
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
kgf-gold-price-predictor-frontend/
├── react-frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Chart.tsx
│   │   │   ├── AccuracyStats.tsx
│   │   │   ├── PredictionExplanation.tsx
│   │   │   ├── CurrencyDropdown.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── store/               # Redux store & API slices
│   │   │   ├── index.ts
│   │   │   ├── api/
│   │   │   └── slices/
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useTheme.ts
│   │   │   └── useWebSocket.ts
│   │   ├── theme/               # Theme configuration
│   │   ├── utils/               # Utility functions
│   │   ├── App.tsx              # Root component
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Static assets
│   ├── dist/                    # Production build
│   └── package.json
├── render.yaml                  # Deployment configuration
├── server.js                    # Production server
└── README.md
```

## 🌐 Deployment

### Deploy to Render

This project is configured for one-click deployment on Render:

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to [Render](https://render.com)
3. Render will automatically:
   - Detect the `render.yaml` configuration
   - Install dependencies
   - Build the React application
   - Deploy to production

**Deployment Configuration** (`render.yaml`):

```yaml
services:
  - type: web
    name: kgf-gold-price-predictor-frontend
    buildCommand: cd react-frontend && npm install && npm run build
    startCommand: NODE_ENV=production node server.js
```

## 📊 API Integration

The frontend connects to a FastAPI backend with the following endpoints:

- `GET /xauusd` - Historical data with predictions
- `GET /xauusd/realtime` - Real-time current price
- `GET /xauusd/explanation` - Prediction analysis
- `GET /exchange-rate/{from}/{to}` - Currency exchange rates

## 🎨 Key Components

### Dashboard

Main application interface displaying live prices, charts, and predictions.

### Chart

Interactive Plotly.js chart with historical data visualization.

### AccuracyStats

Model performance metrics and prediction accuracy tracking.

### PredictionExplanation

Detailed breakdown of AI prediction factors and methodology.

### CurrencyDropdown

Multi-currency support with real-time conversion.

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting errors
npm run type-check   # TypeScript type checking
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Contribution

- UI/UX improvements
- Additional chart types and visualizations
- Performance optimizations
- Accessibility enhancements
- Test coverage
- Documentation improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for educational and research purposes only. The AI predictions and market data should not be considered as financial advice or used for actual trading decisions. Always consult with qualified financial professionals before making investment decisions.

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, TypeScript, and Material UI**
