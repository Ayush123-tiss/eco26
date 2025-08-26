@echo off
echo Installing Storybook for EcoBingle...
echo.

echo Step 1: Install core Storybook package
npm install --save-dev storybook@latest

echo.
echo Step 2: Install React and Vite support
npm install --save-dev @storybook/react @storybook/react-vite

echo.
echo Step 3: Install essential addons
npm install --save-dev @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-docs

echo.
echo Step 4: Install additional addons
npm install --save-dev @storybook/addon-controls @storybook/addon-viewport @storybook/addon-backgrounds @storybook/addon-links

echo.
echo Installation complete!
echo.
echo To start Storybook, run:
echo npm run storybook
echo.
echo If you encounter dependency conflicts, try:
echo npm install --save-dev storybook@^8.6.14 @storybook/react@^8.6.14 @storybook/react-vite@^8.6.14 @storybook/addon-essentials@^8.6.14
echo.

pause
