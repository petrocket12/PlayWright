# Вказуємо базовий образ із Playwright
FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли package.json та package-lock.json (якщо є)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проект у робочу директорію контейнера
COPY . .

# Встановлюємо браузери Playwright
RUN npx playwright install --with-deps chromium

# Вказуємо команду для запуску тестів Playwright
CMD ["npx", "playwright", "test"]
