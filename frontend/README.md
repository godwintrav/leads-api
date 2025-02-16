# Frontend Assessment - Artisan

The technical assessment implemented using Next.js, focusing on building a leads management with authentication and CRUD operations.

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [Tanstack Query](https://tanstack.com/query/latest) - Data fetching and state management
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Reusable Toast](https://reusables.vercel.app/docs/components/notify) - Notification component
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vitest](https://vitest.dev/) - Testing framework
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## Features

- Authentication (Login/Signup)
- Protected routes with middleware
- Leads management table
- CRUD operations for leads
- Data table with sorting and filtering
- Form validation
- Responsive design
- Unit testing
- Type-safe API calls

## Project Structure

```
├── app/                # Next.js app directory
├── assets/            # Static assets (images, icons)
├── components/        # React components
│   ├── auth/          # Authentication components
│   ├── leads/         # Leads management components
│   ├── ui/            # Reusable UI components
│   └── provider/      # App providers
├── constants/         # Configuration and constants
├── hooks/             # Custom React hooks
│   ├── mutations/     # React Query mutations
│   └── queries/       # React Query queries
├── lib/               # Utility functions
├── services/          # API services
├── __tests__/        # Unit tests
└── types.d.ts        # TypeScript declarations
```

## Setup

### Prerequisites

- Node.js 18+
- Package manager (npm/yarn/pnpm/bun)

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Testing

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun run test
```

### Deployment

The application is deployed on Vercel: [https://leads-app-artisan-assessment.vercel.app/](https://leads-app-artisan-assessment.vercel.app/)
