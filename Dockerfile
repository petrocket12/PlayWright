# Вказуємо базовий образ
FROM mcr.microsoft.com/playwright

# Встановлюємо робочу директорію для контейнера
WORKDIR /playwright/tests

# Копіюємо файли package.json і package-lock.json (якщо є)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проект у робочу директорію контейнера
COPY . .

# Вказуємо команду для запуску тестів Playwright
CMD ["npx", "playwright", "test"]
