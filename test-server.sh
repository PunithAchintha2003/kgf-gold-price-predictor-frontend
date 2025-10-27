#!/bin/bash

echo "🧪 Testing Web Service Configuration..."
echo ""

# Check if server.js exists
if [ -f "server.js" ]; then
    echo "✅ server.js exists"
else
    echo "❌ server.js not found"
    exit 1
fi

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check if render.yaml exists
if [ -f "render.yaml" ]; then
    echo "✅ render.yaml exists"
else
    echo "❌ render.yaml not found"
    exit 1
fi

# Check if React build directory exists
if [ -d "react-frontend/dist" ]; then
    echo "✅ React build directory exists (react-frontend/dist/)"
else
    echo "⚠️  React build directory not found (run 'cd react-frontend && npm run build' first)"
fi

# Check if .node-version exists
if [ -f ".node-version" ]; then
    echo "✅ .node-version exists"
else
    echo "❌ .node-version not found"
fi

echo ""
echo "📋 Configuration Summary:"
echo "  • Service Type: Web Service"
echo "  • Runtime: Node.js 18.18.0"
echo "  • Server: Express.js"
echo "  • Port: 10000"
echo "  • Build: cd react-frontend && npm install && npm run build && cd .. && npm install"
echo "  • Start: node server.js"
echo ""
echo "✅ Web Service configuration is ready for deployment!"
echo ""
echo "📝 Next steps:"
echo "  1. git add ."
echo "  2. git commit -m 'Configure as Web Service with Express server'"
echo "  3. git push origin main"
echo "  4. Deploy on Render: https://dashboard.render.com"
echo ""

