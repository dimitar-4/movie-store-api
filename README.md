# Movie Store API

## Installation

1. Run `yarn` or `npm install`

1. Add a `.env` file with these properties
   - `MONGODB_URI`

   - `PORT` (default = 8000)

   - `ACCESS_KEY` (Used to authorize requests. If empty, requests are not authorized)

## Scripts

### Run the app

```sh
yarn start
```

or

```sh
npm run start
```

### Start the development server

```sh
yarn dev
```

or

```sh
npm run dev
```

### Seeding the database

```sh
yarn seed
```

or

```sh
npm run seed
```

### Clear the movies in the database

```sh
yarn seed:clear
```

or

```sh
npm run seed:clear
```

## When the app is running

- Navigate to [localhost:8000/api-docs/](http://localhost:8000/api-docs) to see the API documentation ([swagger](https://swagger.io/))

- All API requests must be authorized with the `ACCESS_KEY` using the `Authorization` header (if the `ACCESS_KEY` is set in the `.env` file)
