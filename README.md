# Description

A [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) based frontend that handles a simple booking and checkout process to book a travel/trip. It is used alongside the [travel-backend](https://github.com/Theofilos-Chamalis/travel-backend) backend to handle the booking and checkout process.

## Screenshots

<img src="https://i.imgur.com/Ev5K8mF.png" alt="Desktop Screenshot 1" width="900"/>
</br>
<img src="https://i.imgur.com/S4kY2ln.png" alt="Desktop Screenshot 2" width="900"/>
</br>
<img src="https://imgur.com/K6wVI22.png" alt="Desktop Screenshot 3" width="900"/>
</br>
<p>
<img src="https://imgur.com/AO157Vx.png" alt="Mobile Screenshot 1" width="250"/>
<img src="https://imgur.com/bOkKJsG.png" alt="Mobile Screenshot 2" width="250"/>
<img src="https://imgur.com/nMZ5XN0.png" alt="Mobile Screenshot 3" width="250"/>
</p>

## Installation Steps

Make sure to install the dependencies:

```bash
# install necessary node modules (use Node v20 or higher)
npm install

# create the necessary .env file for running the app locally or in production
$ touch .env

# follow the example below to fill out the necessary environment variables or the .env.example file
------
PORT_NUMBER=3030
DOMAIN=wetravel.com
IP_ADDRESS=127.0.0.1
HTTPS=false
------
```

## Development Server

1. Ensure the backend server is running before starting the frontend server.

2. Start the development server on `http://localhost:3100`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Test

First make sure to have the backend server running before initiating the tests.

```bash
# e2e headless tests
$ npm run test:e2e:headless

# e2e tests with browser (interactive)
$ npm run test:e2e
```
