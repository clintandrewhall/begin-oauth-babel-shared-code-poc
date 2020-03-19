<img src="https://static.begin.app/node-hello-world/readme-banner.png" width="813">

[![Begin build status](https://buildstatus.begin.app/climb-rj2/status.svg)](https://begin.com)

## What is this?

This is a PoC for sharing common code without having to use `hydrate`. It allows for shared code between routes, (and I think even with tree-shaking?). It's just how my brain organizes code like this, so I thought I'd give it a try.

I added Typescript, Prettier, and a few other things while I was at it. Feedback welcome!

This is based on @brianleroux's OAuth article and example: https://github.com/begin-examples/learn-node-oauth

## Some Issues and Caveats

- If a route imports a common file that has an external dependency, the `package.json` within that route needs to include it. I haven't figured out a way to make this smarter, (yet).
- I usually roll with Webpack, but decided to give Rollup a try. I have to formally declare modules as `externals` to avoid errors. ☹️
  - `@architect/functions` uses the `static` keyword as a variable name and can't be parsed by `babel` or `commonjs`, so I added it to `externals`.
  - When I do that, I have to remove the `commonjs` rollup plugin because it doesn't support dynamic requires. 🤷‍♂️
  - Anyone awesome with rollup who can help me out?

## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-hello-world)

Deploy your own clone of this app to Begin!

## Getting started

- Start the local dev server: `npm start`
- Lint your code: `npm run lint`
- Run your tests: `npm t`

## Reference

- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app

Head to [docs.begin.com](https://docs.begin.com/) to learn more!
