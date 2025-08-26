@echo off
echo Starting EcoBingle Connect Development Server...
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo Frontend will be available at: http://localhost:3000
echo Backend API available at: http://localhost:5000
echo Full app available at: http://localhost:5000
echo.
call npm run dev
