# Integration Module

This repo is expected to be forked for module development.

## Development Structure

### `/src/utils`

You will find some utils that will be specific to Shuttle's code base here. Like generation
of id's with the `makeId()` function, or logging mechanics inside the `log.js` file.

### `/src/processes`

This is where the module development should happen. There is a base class (`Process`) that should
be extended to pick up the relevant methods that will be needed to run the process. Your code should
go into `ExampleProcess.js`. Though please rename `ExampleProcess.js` to an appropriate, shorter name
based on your project title. For example: `GetWeather` class name and `GetWeather.js`. Rename in `src/index.js` as well.

## Running "the module"

The `src/index.js` file will be the entry point into the module runner.

The project can be run using the following command:

```
npm run dev -- --input=inputs.json --type=GetWeather
```

- `type`: This is just your renamed `ExampleProcess` class name
- `input`: Your project doc should specify the inputs given. For example, if the input is an
  email, ensure `inputs.json` contains:

```JSON
{ "email": "your@email.com" }
```

## Environment Variables

Please use `.env` to specify environment variables to be used by the app.
