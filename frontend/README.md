# Frontend Assessment - Artisan

A technical assessment implemented using Next.js, focusing on building a leads management system with authentication and CRUD operations.

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

## Application Architecture

### Provider Layer

The application uses a provider-based architecture to manage library state and functionality:

- **QueryClientProvider**: Manages all data fetching and caching using Tanstack Query

  - Configured with automatic background refetching
  - Includes mutation cache for automatic query invalidation

- **ToastProvider**: Handles application-wide notifications

  - Positioned at top-right
  - Prevents duplicate notifications
  - 3-second duration for notifications

- **Interceptor**: Manages API request/response lifecycle
  - Injects authentication tokens into requests
  - Displays loading indicators using NProgress
  - Handles network errors and displays notifications
  - Manages session expiration with automatic modal display
  - Provides consistent error handling across the application

### Data Flow

1. **API Services** (`/services/`)

   - Contains API endpoint definitions in `/services/endpoints/`
     - Centralized endpoint URLs as constants
     - Organized by feature (auth, leads)
     - Enables easy endpoint management and updates
   - Implements type-safe API calls using axios instance in `/services/api/`
     - Custom axios instance with base URL and timeout configuration
     - Type-safe request/response interfaces
     - Organized service modules (auth.ts, lead.ts)

2. **Custom Hooks**

   - **Queries** (`/hooks/queries/`)

     - `useGetLeads`: Fetches and manages leads data
     - `useExportLeads`: Handles lead data export
     - Implements caching and automatic background updates

   - **Mutations** (`/hooks/mutations/`)
     - `useLogin`: Manages user authentication
     - `useSignup`: Handles user registration
     - `useCreateLead`: Creates new leads
     - `useUpdateLead`: Updates existing leads
     - Automatically invalidates related queries on success

3. **Components**
   - Organized by feature (auth, leads)
   - Uses Radix UI for accessible components
   - Styled with Tailwind CSS

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
│   ├── mutations/     # Tanstack Query mutations
│   └── queries/       # Tanstack Query queries
├── lib/               # Utility functions
├── services/          # API services
├── __tests__/        # Unit tests
└── types.d.ts        # TypeScript declarations
```

## Authentication Flow

1. User submits login/signup form
2. Form data is validated using Zod schemas
3. API request is made through auth service
4. On success:
   - Token is stored in cookies
   - Success notification is shown
   - User is redirected to dashboard
5. On error:
   - Error notification is displayed
   - User remains on auth page

## Leads Management Flow

1. Protected routes check for authentication
2. Leads table fetches data using `useGetLeads`
3. CRUD operations:
   - Create: `useCreateLead` mutation
   - Read: `useGetLeads` query with filters
   - Update: `useUpdateLead` mutation
   - Delete: `useDeleteLead` mutation
4. Automatic query invalidation on mutations
5. Real-time UI updates through Tanstack Query


## Deployment

Frontend: [https://leads-app-artisan-assessment.vercel.app/](https://leads-app-artisan-assessment.vercel.app/)