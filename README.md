# Booster

## :page_with_curl: Dependencies

<!-- ENGINES-LIST:START - Do NOT remove or modify this section -->
- **node** (>= 12.x)
- **npm** (>= 6.11.0)
- **postgres** (>= 9.4)
<!-- ENGINES-LIST:END -->

Check `engines` field in [`package.json`](package.json)

## :computer: Installation

### Prerequisites

- [Node.js & npm](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)
- Clone this repo

### Setup

- Run `npm install` in the repo directory
- Create database in PostgreSQL
- App is configured via environment variables contained in a file named `.env`.
  Use the `.env.example` file as a template: `cp .env.example .env` and enter configuration details.
- Run `npm run db:seed` to load vehicle dataset from `vehicle.json` file, if any error run `npm run db:reset` and then `npm run db:seed`.
- Set `DATABASE_EXTENSION=fuzzystrmatch` in `.env` to enable fuzzy search (levenshtein approach)
- For other scripts run `npm run`

## :rocket: Launch

### Development

- Server: `npm run dev:server`
- Client: `npm run dev:client`

### Continuous Deployment
- Circle CI :rocket:
### Production :airplane:

- Bundle client by issuing `npm run build`
- Create [Heroku](https://dashboard.heroku.com/) acc & app
- Then on Heroku app GUI, select `deploy` tab and follow the instructions
- Set all `.env` variables within heroku `settings` tab
- Also you can run `seed` script via heroku console inside heroku app
- App is live on: [Booster](https://booster-service.herokuapp.com/#/)
