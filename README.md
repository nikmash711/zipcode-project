# Location App

This web app allows users to find out their city and state after selecting a country and inputting a postal code using [this API](http://www.zippopotam.us/).

It also maintains a search history stack of the last 5 searches, which the user can clear if they wish to.

To run the client, navigate to the client folder and run:

```
npm run start
```

To run the server, navigate to the server folder and run:

```
npm run dev
```

To generate the Typescript types based on the schema, run the following in the client:

```
npm run codegen
```

To run the tests, run the following in the client:

```
npm run test
```

To check for Typescript errors, run the following in the client:

```
npm run check-types
```

Note to reviewer:
This was my first time using MaterialUI and ApolloServer (I’ve used Apollo on the FE, but not BE). And it’s been almost 4 years since I’ve written in Node.JS. So if any of those parts don’t align with best practices, that’ll be why :)

## What I would improve with more time:

1. Cleaner and nicer UI (fonts, colors, etc)
2. Autocomplete suggestions for the postal code for better UX
3. Modularize the code in `server.ts` into schema, query, and resolver files
4. Add a linter
5. More robust error handling
6. Focus on the postal code element when the page loads, and after form submits as well so user can type again
7. Replace inline styles with css modules (MaterialUI was overriding them when I tried to use css modules and I didn’t want to go too many another rabbit holes for time’s sake since I went down a couple other ones already :P)

## Screenshots

![Screenshot of location app](screenshots/location-app-ui.png 'Optional Title')

![Screenshot of location app with error](screenshots/location-app-ui-with-error.png 'Optional Title')
