This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

## Development Notes

I was not familiar with Next JS or Firebase at the start of this project, so I had to learn them while developing.

Everything from the exercise description is implemented except for the event status. I found this description confusing as there was no explanation as to what made an event published or not. It also mentioned event sessions, which there was no reference of anywhere else in the description. As I was out of time, I decided to focus on the other features.

The .env.local file was uploaded to the repository for simplification, although usually it would be local.

## Future Work

Here's a list of things I would improve if I were to continue developing:

- Consider the use of an ORM/ODM
- Start creating and maintaining reusable components, for example the buttons
- Improve error handling, catch and throw specific exceptions, show feedback to the user
- Create more secure rules for accessing firestore
- Create tests
- Improve styling
- Improve documentation
