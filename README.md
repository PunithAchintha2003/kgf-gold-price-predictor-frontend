# KGF Gold Price Predictor

A comprehensive gold price prediction application featuring a modern React frontend with real-time data visualization and machine learning predictions. The application provides live gold price updates, AI-powered predictions, and detailed market analysis with support for multiple currencies.

## 🎯 Project Status

**✅ Production Ready** - The application is fully functional with both frontend and backend components.

- **Frontend**: Modern React frontend with TypeScript, Material UI, and Tailwind CSS
- **Backend**: FastAPI backend with ML prediction engine and real-time data API
- **Real-time Updates**: Live gold price updates every 2 seconds
- **AI Predictions**: Machine learning-powered next-day price predictions
- **Multi-currency Support**: USD and LKR (Sri Lankan Rupee) with live exchange rates
- **Gold Bar Display**: 24K gold indicator with real-time LKR price display
- **Responsive Design**: Mobile-first approach that works on all devices
- **Theme Support**: Light/Dark mode toggle with persistent preferences

## 🚀 Features

### Frontend Features

- **Modern React Frontend**: Built with React 19, TypeScript, Material UI, and Tailwind CSS
- **Interactive Charts**: Plotly.js integration with TradingView-style visualization
- **Real-time Price Display**: Live gold price updates every 2 seconds
- **AI Predictions**: Next-day price predictions with accuracy statistics
- **Multi-currency Support**: USD and LKR (Sri Lankan Rupee) with live exchange rates
- **Gold Bar Display**: 24K gold indicator with real-time LKR price in bordered containers
- **Professional UI**: Dark/Light theme support with TradingView-inspired design
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **State Management**: Redux Toolkit with RTK Query for efficient API calls and state persistence
- **Theme Toggle**: Light/Dark mode switching with persistent user preferences
- **Error Handling**: Graceful error handling with loading states and fallback mechanisms

### Backend Features

- **FastAPI Backend**: RESTful API with real-time data endpoints
- **Machine Learning Engine**: AI-powered price prediction system
- **Real-time Data**: Live gold price updates and market data
- **Exchange Rate API**: Live USD/LKR exchange rate integration
- **Prediction Analytics**: Historical accuracy tracking and performance metrics
- **WebSocket Support**: Real-time data streaming (optional)

## 📋 Requirements

### System Requirements

- **Python**: 3.8+ (required for backend)
- **Node.js**: 18+ (required for React frontend)
- **Internet Connection**: Required for live data fetching
- **Operating System**: Windows, macOS, or Linux

### Backend Dependencies

The backend requires Python packages (install with `pip install -r requirements.txt`):

- FastAPI for the API server
- Machine learning libraries for predictions
- Data processing libraries (pandas, numpy)
- Market data integration (yfinance)
- Exchange rate APIs

### React Frontend Dependencies

```json
{
  "react": "^19.1.1", // React framework
  "typescript": "~5.8.3", // Type safety
  "@mui/material": "^7.3.2", // Material UI components
  "tailwindcss": "^4.1.13", // Utility-first CSS
  "@reduxjs/toolkit": "^2.9.0", // State management
  "react-plotly.js": "^2.6.0", // Interactive charts
  "redux-persist": "^6.0.0", // State persistence
  "react-router-dom": "^7.9.2", // Client-side routing
  "react-icons": "^5.0.0", // Icon library for gold bar display
  "vite": "^7.1.7" // Build tool
}
```

## 🛠️ Installation

### Quick Setup (Recommended)

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd KGF-gold-price-predictor-frontend
   ```

2. **Install backend dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Install React frontend dependencies**:

   ```bash
   cd react-frontend
   npm install
   cd ..
   ```

4. **Start the backend server** (in one terminal):

   ```bash
   python3 run_backend.py
   ```

5. **Start the React frontend** (in another terminal):
   ```bash
   python3 run_react_frontend.py
   ```

### Development Setup

For development with hot reload:

1. **Start backend in development mode**:

   ```bash
   uvicorn backend:app --host 0.0.0.0 --port 8001 --reload
   ```

2. **Start React development server** (in another terminal):

   ```bash
   cd react-frontend
   npm run dev
   ```

3. **Build for production**:
   ```bash
   cd react-frontend
   npm run build
   npm run preview
   ```

## 🏃‍♂️ Running the Application

### 🚀 Quick Start (Recommended)

**Start both Backend and Frontend:**

1. **Start the backend** (Terminal 1):

   ```bash
   python3 run_backend.py
   ```

2. **Start the frontend** (Terminal 2):
   ```bash
   python3 run_react_frontend.py
   ```

**Access Points:**

- 🌐 **React Frontend**: http://localhost:5174 (Primary Interface)
- 🔧 **FastAPI Backend**: http://localhost:8001
- 📚 **API Documentation**: http://localhost:8001/docs
- 📱 **Mobile Responsive**: Works on all device sizes

### 🛠️ Development Mode

#### Backend Development

```bash
uvicorn backend:app --host 0.0.0.0 --port 8001 --reload
# Available at: http://localhost:8001
```

#### React Frontend Development

```bash
cd react-frontend
npm run dev
# Available at: http://localhost:5174
```

#### Production Build

```bash
cd react-frontend
npm run build
npm run preview
# Available at: http://localhost:4173
```

### 📱 Available Interfaces

| Interface      | URL                        | Description                   | Status       |
| -------------- | -------------------------- | ----------------------------- | ------------ |
| React Frontend | http://localhost:5174      | Modern TypeScript interface   | ✅ Primary   |
| API Backend    | http://localhost:8001      | FastAPI REST + ML API         | ✅ Required  |
| API Docs       | http://localhost:8001/docs | Interactive API documentation | ✅ Available |

## 📊 API Endpoints

### REST API Endpoints

| Method | Endpoint                     | Description                           | Response                     |
| ------ | ---------------------------- | ------------------------------------- | ---------------------------- |
| `GET`  | `/`                          | Health check endpoint                 | `{"status": "healthy"}`      |
| `GET`  | `/xauusd`                    | Daily XAU/USD data with AI prediction | Historical data + prediction |
| `GET`  | `/xauusd/realtime`           | Real-time current price (2s updates)  | Current price data           |
| `GET`  | `/xauusd/explanation`        | AI prediction explanation and factors | Prediction analysis          |
| `GET`  | `/exchange-rate/{from}/{to}` | Live exchange rate data               | Exchange rate information    |
| `GET`  | `/docs`                      | Interactive API documentation         | Swagger UI                   |

### API Response Examples

#### Daily Data (`/xauusd`)

```json
{
  "symbol": "XAU/USD",
  "timeframe": "daily",
  "data": [
    {
      "date": "2024-01-15",
      "open": 2025.5,
      "high": 2032.8,
      "low": 2021.3,
      "close": 2028.9,
      "volume": 150000
    }
  ],
  "prediction": {
    "next_day": "2024-01-16",
    "predicted_price": 2035.2,
    "current_price": 2028.9,
    "prediction_method": "Machine Learning"
  },
  "accuracy_stats": {
    "average_accuracy": 78.5,
    "total_predictions": 45,
    "evaluated_predictions": 42
  },
  "current_price": 2028.9,
  "status": "success"
}
```

#### Real-time Price (`/xauusd/realtime`)

```json
{
  "symbol": "XAU/USD",
  "current_price": 2028.9,
  "timestamp": "2024-01-15T14:30:00Z",
  "status": "success"
}
```

#### Exchange Rate (`/exchange-rate/USD/LKR`)

```json
{
  "from_currency": "USD",
  "to_currency": "LKR",
  "exchange_rate": 325.5,
  "timestamp": "2024-01-15T14:30:00Z",
  "status": "success"
}
```

## 🎨 Frontend Features

### Modern React Architecture

- **React 19**: Latest React with modern features and improved performance
- **TypeScript**: Full type safety throughout the application
- **Vite**: Fast build tool and development server
- **Material UI**: Professional component library with consistent design
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### State Management

- **Redux Toolkit**: Modern Redux with simplified state management
- **RTK Query**: Automatic API caching and background updates
- **Redux Persist**: State persistence across browser sessions
- **Type-safe**: Full TypeScript integration for state management

### User Experience

- **Theme Toggle**: Light/Dark mode switching with persistent preferences
- **Responsive Design**: Mobile-first approach that works on all devices
- **Loading States**: Smooth loading indicators and error handling
- **Professional UI**: TradingView-inspired design with modern aesthetics

### Chart Integration

- **Plotly.js**: Interactive charts with zoom, pan, and hover functionality
- **Responsive Charts**: Charts that adapt to different screen sizes

## 🎨 Chart Features

- **Interactive Charts**: Plotly.js integration with zoom, pan, and hover functionality
- **Theme Support**: Light/Dark mode with professional trading interface appearance
- **Interactive Hover**: Detailed information on hover
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Zoom & Pan**: Interactive chart controls for detailed analysis
- **Professional Styling**: TradingView-inspired design with Material UI components

## 🔧 Technical Details

### Frontend (React)

- **Modern Architecture**: React 19 with TypeScript for type safety and modern development
- **State Management**: Redux Toolkit with RTK Query for efficient API calls and caching
- **Interactive Visualization**: Plotly.js charts with responsive design
- **Theme Support**: Light/Dark mode toggle with persistent user preferences
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Error Handling**: Graceful error handling with loading states and fallback mechanisms
- **Professional UI**: Material UI components with Tailwind CSS styling

## ⚛️ React Frontend Features

### Modern Development Stack

- **React 19**: Latest React with modern features and improved performance
- **TypeScript**: Full type safety throughout the application
- **Vite**: Fast build tool and development server
- **Material UI**: Professional component library with consistent design
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### State Management

- **Redux Toolkit**: Modern Redux with simplified state management
- **RTK Query**: Automatic API caching and background updates
- **Redux Persist**: State persistence across browser sessions
- **Type-safe**: Full TypeScript integration for state management

### Data Integration

- **API Integration**: Efficient data fetching and caching
- **Error Recovery**: Graceful handling of connection issues

### User Experience

- **Theme Toggle**: Light/Dark mode switching with persistent preferences
- **Responsive Design**: Mobile-first approach that works on all devices
- **Loading States**: Smooth loading indicators and error handling
- **Professional UI**: TradingView-inspired design with modern aesthetics

### Chart Integration

- **Plotly.js**: Interactive charts with zoom, pan, and hover functionality
- **Responsive Charts**: Charts that adapt to different screen sizes

## 🎯 Current Features

### Data Visualization

- **Interactive Charts**: Plotly.js integration with professional styling
- **Theme Support**: Light/Dark mode with persistent preferences
- **Responsive Design**: Mobile-first approach that works on all devices
- **Professional UI**: TradingView-inspired design with modern aesthetics

## 🚨 Important Notes

- **Frontend Only**: This is a frontend-only application for data visualization
- **Data Dependency**: Relies on external APIs for data, which may have limitations or delays
- **Browser Compatibility**: Requires modern browsers with JavaScript enabled
- **Educational Use**: This frontend is for demonstration and educational purposes

## 🔍 Troubleshooting

### 🚨 Common Issues & Solutions

#### React Frontend Issues

| Problem                       | Solution                     | Check                              |
| ----------------------------- | ---------------------------- | ---------------------------------- |
| **Frontend not loading**      | Install dependencies         | `cd react-frontend && npm install` |
| **Chart not displaying**      | Check data source connection | Verify external API accessibility  |
| **Theme not persisting**      | Clear browser storage        | Clear localStorage in DevTools     |
| **Build errors**              | Check TypeScript compilation | `npm run build` for errors         |
| **Development server issues** | Check console for errors     | `npm run dev` and check output     |
| **Port already in use**       | Use different port           | Check if port 5174 is available    |

#### General Issues

| Problem                   | Solution                 | Check                             |
| ------------------------- | ------------------------ | --------------------------------- |
| **Port conflicts**        | Use different ports      | Check 5174 (React frontend)       |
| **Data not loading**      | Check network connection | Verify internet connectivity      |
| **Performance issues**    | Check browser console    | Monitor network tab for API calls |
| **Browser compatibility** | Use modern browser       | Chrome, Firefox, Safari, Edge     |

### 🔧 Debug Commands

#### Check System Status

```bash
# Check if ports are available
lsof -i :5174  # React frontend port

# Check Node.js dependencies
cd react-frontend && npm list --depth=0
```

#### React Frontend Debug

```bash
# Check React build
cd react-frontend
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint

# Start development server
npm run dev
```

### 🆘 Getting Help

If you encounter issues not covered here:

1. **Check the console**: Browser developer tools provide detailed error messages
2. **Verify dependencies**: Ensure all Node.js packages are installed
3. **Check network**: Verify internet connection for data fetching
4. **Browser compatibility**: Use modern browsers (Chrome, Firefox, Safari, Edge)
5. **Clear cache**: Clear browser cache and localStorage if experiencing UI issues

## 📈 Usage

1. **Start the application**:

   - Backend: `python3 run_backend.py` (Terminal 1)
   - Frontend: `python3 run_react_frontend.py` (Terminal 2)

2. **Open the application**: Navigate to http://localhost:5174

3. **View live data**:

   - Live gold price updates every 2 seconds
   - Interactive charts with historical data
   - AI-powered next-day price predictions

4. **Currency conversion**:

   - Switch between USD (troy ounce) and LKR (pawn) units
   - Live exchange rate integration
   - Automatic price conversion
   - Real-time LKR price display with gold bar icon

5. **Theme customization**:

   - Toggle between light and dark modes
   - Settings persist across browser sessions

6. **Monitor predictions**:

   - View prediction accuracy statistics
   - See detailed prediction explanations
   - Track historical prediction performance

7. **Responsive design**:

   - Works on desktop, tablet, and mobile devices
   - Professional TradingView-inspired interface

8. **Real-time updates**:
   - Live price updates with connection status
   - Automatic data refresh and error handling

## 🛡️ Limitations

- **Backend Dependency**: Requires both frontend and backend to be running
- **Data Dependency**: Relies on external APIs for live market data
- **Browser Compatibility**: Requires modern browsers with JavaScript enabled
- **Network Dependency**: Requires internet connection for live data fetching
- **Prediction Accuracy**: ML predictions are for educational purposes and should not be used as financial advice
- **Market Hours**: Data availability depends on market trading hours
- **Educational Use**: This application is for demonstration and educational purposes

## 🌐 Deployment

### Deploy to Render (Recommended)

This project is ready to deploy to Render with one click!

**Quick Deploy Steps:**

1. **Push to Git** (GitHub/GitLab/Bitbucket)
2. **Login to Render**: https://dashboard.render.com
3. **New Blueprint**: Click "New +" → "Blueprint"
4. **Select Repository**: Connect and select your repo
5. **Deploy**: Click "Apply" and wait ~5 minutes

**Configuration Files Included:**

- ✅ `render.yaml` - Automated deployment configuration
- ✅ `.node-version` - Node.js 18.18.0 specification
- ✅ `DEPLOYMENT.md` - Comprehensive deployment guide
- ✅ `RENDER_DEPLOY_CHECKLIST.md` - Quick-start checklist
- ✅ `DEPLOYMENT_SUMMARY.md` - Setup summary

**Deployment Features:**

- 🆓 **FREE hosting** for static sites
- 🌍 **Global CDN** with auto SSL
- 🔄 **Auto-deploy** on git push
- ⚡ **Optimized build** with code splitting
- 📱 **Mobile responsive** design
- 🔒 **Security headers** included

**Your Deployed URLs:**

- Frontend: `https://your-app-name.onrender.com`
- Backend: `https://kgf-gold-price-predictor-ml-backend.onrender.com` (already deployed)

📚 **For detailed instructions**, see:

- Quick guide: `RENDER_DEPLOY_CHECKLIST.md`
- Full guide: `DEPLOYMENT.md`
- Summary: `DEPLOYMENT_SUMMARY.md`

## 📈 Recent Updates & Project Status

### ✅ Latest Updates (Current Version)

- **React Frontend**: Modern TypeScript interface with Material UI and Tailwind CSS
- **Interactive Charts**: Plotly.js integration with professional styling
- **State Management**: Redux Toolkit with RTK Query for efficient API calls and caching
- **Theme Support**: Light/Dark mode toggle with persistent user preferences
- **Gold Bar Display**: 24K gold indicator with real-time LKR price in bordered containers
- **Real-time LKR Price**: Live LKR price updates every 2 seconds with gold bar icon
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Production Ready**: Full build system with TypeScript compilation and optimization
- **Render Deployment**: Ready-to-deploy with automated configuration

### 🔄 Project Status

| Component           | Status        | Notes                       |
| ------------------- | ------------- | --------------------------- |
| **React Frontend**  | ✅ **Active** | Modern TypeScript interface |
| **FastAPI Backend** | ✅ **Active** | ML prediction engine        |
| **ML Predictions**  | ✅ **Active** | AI-powered price forecasts  |
| **Real-time Data**  | ✅ **Active** | Live price updates          |
| **Multi-currency**  | ✅ **Active** | USD/LKR support             |

### 🚀 Future Improvements

- **Advanced ML Models**: Implement LSTM, Random Forest, or XGBoost for better prediction accuracy
- **Technical Indicators**: Add RSI, MACD, Bollinger Bands, and other technical analysis tools
- **WebSocket Integration**: Real-time data streaming for instant updates
- **Mobile App**: Native mobile application for iOS and Android
- **Additional Currencies**: Support for more currency pairs and precious metals
- **Backtesting**: Historical prediction accuracy testing and performance metrics
- **Risk Management**: Volatility predictions and confidence intervals
- **Performance**: Optimize rendering and data handling for better performance

## 🏗️ Project Architecture

### System Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  FastAPI Backend │    │  External APIs  │
│   (TypeScript)   │◄──►│   (Python)      │◄──►│  (Data Sources) │
│   Port: 5174     │    │   Port: 8001    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │  ML Prediction  │
         │              │     Engine      │
         │              └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Redux Store   │
│  (State Mgmt)   │
└─────────────────┘
```

### Technology Stack

#### Frontend (React)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.1.7
- **UI Library**: Material UI 7.3.2
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: Redux Toolkit 2.9.0
- **Charts**: Plotly.js 3.1.0
- **Routing**: React Router DOM 7.9.2

#### Backend (Python)

- **Framework**: FastAPI
- **ML Libraries**: scikit-learn, pandas, numpy
- **Data Sources**: yfinance, exchange rate APIs
- **Database**: SQLite (for prediction storage)
- **Real-time**: WebSocket support (optional)

### Key Components

#### Frontend Components

- `src/components/` - React components (Dashboard, Chart, etc.)
- `src/store/` - Redux store and API slices
- `src/hooks/` - Custom React hooks (useTheme, useWebSocket)
- `src/theme/` - Material UI theme configuration
- `src/utils/` - Utility functions (currency conversion)

#### Backend Components

- `backend/` - FastAPI backend application
- `backend/api/` - API endpoint definitions
- `backend/models/` - ML prediction models
- `backend/data/` - Data processing and storage

#### Scripts

- `run_react_frontend.py` - Start React frontend with backend checks
- `run_backend.py` - Start FastAPI backend server

### Data Flow

1. **Data Collection**: External APIs → FastAPI Backend
2. **ML Processing**: Historical data → ML models → Predictions
3. **API Response**: Backend → React Frontend via REST API
4. **State Management**: Redux → Component Updates
5. **Real-time Updates**: Polling every 2 seconds for live prices
6. **Currency Conversion**: USD ↔ LKR with live exchange rates

### Security & Performance

- **Error Handling**: Comprehensive error handling and logging
- **Caching**: RTK Query automatic caching
- **Type Safety**: Full TypeScript integration
- **Production Ready**: Optimized build system
- **Real-time Updates**: Efficient polling with fallback mechanisms

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for improvements. Some areas where contributions would be particularly valuable:

- Enhancing the UI/UX
- Adding new chart types and visualizations
- Implementing additional technical indicators
- Improving data integration and API handling
- Adding new themes and customization options
- Performance optimizations

## ⚠️ Disclaimer

This application is for educational and research purposes only. The AI predictions and market data should not be considered as financial advice or used for actual trading decisions. Gold price movements are influenced by numerous factors including economic indicators, geopolitical events, and market sentiment that may not be captured by historical data analysis. Always consult with qualified financial professionals before making investment decisions.

## 📄 License

This project is open source and available under the MIT License.
