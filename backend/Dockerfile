FROM node:20-alpine

WORKDIR /app

# Copy only lockfile and package.json first for cached install
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

EXPOSE 3000
CMD ["pnpm", "start"]
