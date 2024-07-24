FROM node:18.0.0

WORKDIR /app

# Copying package and package-lock .json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Build the Nuxt application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]