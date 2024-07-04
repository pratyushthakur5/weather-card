This is a weather app project. It has the ability to fetch current weather using OpenWeather Api

## Getting Started

First, install packages

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

Features implemented:
Current weather card: Search for any city and get its weather
Temperature Toggle: Ability to toggle between Celsius/Fahrenheit

Optimisation: API caching(prevents unecessary hits),
Debounced Search: Searches automatically after a delay, pauses till input is continously active.
