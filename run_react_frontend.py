#!/usr/bin/env python3
"""
Startup script for the React frontend of the Gold AI Price Prediction application.
This script starts the React development server with enhanced error handling and checks.
"""

import subprocess
import sys
import os
import time
import signal
import json
import requests
from pathlib import Path


def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully"""
    print("\n🛑 Shutting down React frontend server...")
    sys.exit(0)


def check_node_npm():
    """Check if Node.js and npm are available"""
    try:
        # Check Node.js version
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js version: {result.stdout.strip()}")
        else:
            print("❌ Node.js not found!")
            return False
        
        # Check npm version
        result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ npm version: {result.stdout.strip()}")
        else:
            print("❌ npm not found!")
            return False
        
        return True
    except FileNotFoundError:
        print("❌ Node.js or npm not found!")
        print("Please install Node.js from https://nodejs.org/")
        return False


def check_backend_connection():
    """Check if backend is running"""
    try:
        response = requests.get("http://localhost:8001/", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running and accessible")
            return True
        else:
            print(f"⚠️  Backend responded with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException:
        print("⚠️  Backend is not running or not accessible")
        print("   Start the backend with: python3 run_backend.py")
        return False


def check_frontend_structure():
    """Check if frontend directory structure is correct"""
    required_files = [
        "react-frontend/package.json",
        "react-frontend/src/main.tsx",
        "react-frontend/vite.config.ts"
    ]
    
    for file_path in required_files:
        if not Path(file_path).exists():
            print(f"❌ Missing required file: {file_path}")
            return False
    
    print("✅ Frontend structure verified")
    return True


def install_dependencies():
    """Install npm dependencies if needed"""
    if not os.path.exists("node_modules"):
        print("📦 Installing dependencies...")
        try:
            subprocess.run(["npm", "install"], check=True, cwd="react-frontend")
            print("✅ Dependencies installed successfully!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error installing dependencies: {e}")
            return False
    else:
        print("✅ Dependencies already installed")
        return True


def check_port_availability(port=5173):
    """Check if the port is available"""
    import socket
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('localhost', port))
            print(f"✅ Port {port} is available")
            return True
    except OSError:
        print(f"⚠️  Port {port} is in use, Vite will try another port")
        return False


def main():
    """Main function to start the React frontend server"""
    # Set up signal handler for graceful shutdown
    signal.signal(signal.SIGINT, signal_handler)
    
    print("🚀 Starting Gold AI Price Prediction - React Frontend")
    print("=" * 60)
    
    # Check if we're in the right directory
    if not os.path.exists("react-frontend"):
        print("❌ Error: react-frontend directory not found!")
        print("Please run this script from the project root directory.")
        sys.exit(1)
    
    # Check Node.js and npm
    if not check_node_npm():
        sys.exit(1)
    
    # Check frontend structure
    if not check_frontend_structure():
        sys.exit(1)
    
    # Check backend connection
    check_backend_connection()
    
    # Check port availability
    check_port_availability()
    
    # Change to react-frontend directory
    os.chdir("react-frontend")
    
    # Install dependencies if needed
    if not install_dependencies():
        sys.exit(1)
    
    print("🌐 Starting React development server...")
    print("📍 Frontend will be available at: http://localhost:5173")
    print("🔗 Backend should be running on: http://localhost:8001")
    print("🔄 Auto-reload: Enabled")
    print("📝 Logs: Check terminal output")
    print("\n" + "=" * 60)
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        # Start the React development server
        subprocess.run(["npm", "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 React frontend server stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error starting React server: {e}")
        print("Try running: cd react-frontend && npm run dev")
        sys.exit(1)


if __name__ == "__main__":
    main()
