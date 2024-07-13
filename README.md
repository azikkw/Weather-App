# Weather Forecast App

![Banner](/public/images/banner.jpg)

> The Weather Forecast app is a user-friendly application designed to provide accurate and timely weather information depending on the city you choose. Whether you are planning your day or preparing for a trip, the Weather Forecast app ensures that you have the most reliable weather information at your fingertips.

---

## 🌐 BASE URL
You can access `Weather Forecast` by this link:
> https://weather-app-yccd.onrender.com

---

## 📝 PREPARING FOR IMPORTING
#### To start importing a project `If you want to run it without docker`, you need to:
[Node.js](https://nodejs.org/en) version 18.0.0 [min] and more.

## 📤 IMPORTING
Step-by-step instructions for importing the `Weather Forecast` project.

#### 1. Downloading

Clone project using the `git clone` command. To do this, you need to go to the command prompt and specify the path to the folder where you will import the project.

Next you will need to enter the following:
```bash
git clone https://github.com/azikkw/Weather-App.git
```

You can also [download ZIP archive](https://github.com/azikkw/Weather-App/archive/refs/heads/main.zip) and unpack it to the folder you want.

#### 2. Building the project with Docker 🐋
```bash
make build
```

#### 3. Building the project with Package Manager
Since the project does not contain all the necessary dependencies, you will need to install them.

To do this, you need to enter the following command:
```bash
# For npm package manager
npm install
# For pnpm package manager
pnpm install
# For yarn package manager
yarn install
# For bun package manager
bun install
```

---

## ▶️ PROJECT START

After completing all the steps described in the instructions, you can run the project in two ways:

#### 1. If you built it using Docker 🐋
```bash
# To run:
make run
```
```bash
# To stop
make stop
```

#### 2. If you built it using Package Manager
```bash
# For npm package manager
npm run dev
# For pnpm package manager
pnpm run dev
# For yarn package manager
yarn dev
# For bun package manager
bun run dev
```

#### 3. Once project is running you can access it at:
> http://localhost:3000
