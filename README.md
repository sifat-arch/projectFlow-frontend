# ProjectFlow Frontend

**Backend API:** `https://projectflow-backend-brown.vercel.app`

> Replace the URL above with the deployed backend URL. Set the same URL in `NEXT_PUBLIC_API_BASE_URL` (including `/api/v1`) before deploying the frontend.

ProjectFlow is a project submission and review platform that connects learners with mentors. Learners can submit projects and track their work, while mentors can review submissions and monitor progress.

## Technology Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4 and shadcn/ui components
- TanStack Query for server state and TanStack Form for forms
- Zod for validation
- Biome for linting and formatting

## Architecture

The frontend is a Next.js App Router application. Route segments under `src/app` provide public pages, authentication pages, and role-oriented dashboard pages. Reusable UI and layout components live in `src/components`. API functions are grouped under `src/api`, with a shared HTTP client in `src/lib/apiClient.ts`. TanStack Query hooks in `src/hooks` connect pages and components to the API. Shared form validation and data types live in `src/validation` and `src/types`.

The frontend communicates with the ProjectFlow backend over HTTP. Authentication state and API requests are handled by the shared auth provider and API client.

## Environment Variables

Create a `.env.local` file in the frontend project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

For production, use the deployed backend URL, for example:

```env
NEXT_PUBLIC_API_BASE_URL=https://projectflow-backend-brown.vercel.app/api/v1
```

## Installation and Development

Requirements: Node.js 20 or newer and npm. Bun is also supported by the project.

```bash
git clone https://github.com/sifat-arch/projectFlow-frontend.git
cd projectFlow-frontend
npm install
```

Create `.env.local` with `NEXT_PUBLIC_API_BASE_URL`, then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Related Repository

- Backend: `https://github.com/sifat-arch/projectFlow-backend`


