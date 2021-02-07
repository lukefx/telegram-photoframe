# Telegram-Photoframe

![alt text](doc/telegram-photoframe.gif 'telegram-photoframe')

Telegram photoframe is a Web application that uses telegram to display your prefered group or channel as Photoframe.
The app is in fact a telegram client and doesn't require any bot, just login with your mobile phone via QR code and select
the group or conversation that you want to display.

# Internals

The app is a React application that uses [TDLib](https://github.com/tdlib/td#readme), specifically the wasm version called [tdweb](https://www.npmjs.com/package/tdweb).

# How to deploy your own version

To deploy your own version login here and create an app: https://core.telegram.org/api/obtaining_api_id

Then copy the two keys in the .env file by following the example of .env.example
To run the app locally, install all the dependencies:

```
npm i
```

Copy the tdweb wasm files to a loadable path for your app, we use public:

```
cp node_modules/tdweb/dist/ ./public
```

The start the app:

```
npm start
```

To build a static version run:

```
npm run build
```

To deploy the app, modify the `PUBLIC_URL` in package.json and deploy it to GitHub pages for free:

```
npm run deploy
```
