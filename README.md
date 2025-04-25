# Pet Project - Next.js, GraphQL, Ant Design

A simple multi-page app built with Next.js, TypeScript, Redux Toolkit, Apollo GraphQL, and Ant Design to fetch and display GitHub profile data.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (v14+ with App Router)
- **UI Library:** [React](https://react.dev/) (v18)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Component Library:** [Ant Design (AntD)](https://ant.design/) & `@ant-design/icons`
- **State Management:**
  - [Redux Toolkit](https://redux-toolkit.js.org/) (for global client-side state)
  - [Apollo Client](https://www.apollographql.com/docs/react/) (for GraphQL communication and server-side state caching)
- **API:** [GitHub GraphQL API v4](https://docs.github.com/en/graphql)
- **GraphQL Tooling:** [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) (for generating TypeScript types from schema and operations)
- **Styling:** CSS Modules, Ant Design components
- **Linting/Formatting:** ESLint, Prettier (implied by Next.js setup)

## Getting Started

Follow these steps to get the project running locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 LTS or later recommended)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)
- A **GitHub Personal Access Token (PAT)**:
  - Create a **Classic** token [here](https://github.com/settings/tokens?type=beta).
  - Give it the following **scopes (permissions)**:
    - `repo` (Full control of private repositories)
    - `read:user` (Read user profile data)
    - `(Optional)` `user:email` (Access user email addresses (read-only))
  - **Copy the generated token immediately** – you won't see it again.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd pet-next-gql
    ```

2.  **Create Environment File:**

    - Create a file named `.env.local` in the root of the project.
    - Add your GitHub PAT to this file:
      ```ini
      # .env.local
      # Replace ghp_... with YOUR actual GitHub PAT
      NEXT_PUBLIC_GITHUB_PAT=ghp_YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
      ```
    - **Important:** The `.env.local` file is listed in `.gitignore` and should **never** be committed to the repository.

3.  **Install Dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

4.  **(Optional but Recommended) Check GraphQL Types:**
    - This project uses GraphQL Code Generator to create TypeScript types based on the GitHub schema (`github.schema.json`) and the GraphQL queries/mutations defined within the code (`src/**/*.tsx`).
    - The generated types are located in `src/graphql/generated/` and **are committed to this repository**.
    - If you modify GraphQL queries/mutations or update the schema, you should run the generator to update the types:
      ```bash
      npm run codegen
      ```
    - For initial setup, running `codegen` is not strictly necessary as the types are already included.

### Running the Development Server

1.  Start the development server:

    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```

2.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application should now be running, fetching data from your GitHub profile.

## Project Structure (Overview)

- `src/app/`: Contains the application routes (pages) and the root layout (using Next.js App Router).
- `src/components/`: Shared React components (UI elements, layout components).
- `src/lib/`: Utility functions, client configurations (e.g., Apollo Client setup).
- `src/store/`: Redux Toolkit setup (store, slices, hooks).
- `src/graphql/`: Contains generated GraphQL types and potentially `.graphql` files (if used).
- `public/`: Static assets.
- `github.schema.json`: Local copy of the GitHub GraphQL schema used by Codegen.
- `codegen.yml`: Configuration file for GraphQL Code Generator.
- `.env.local`: Local environment variables (contains GitHub PAT - **DO NOT COMMIT**).

## Learn More (Next.js Resources)

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Remember to configure the `NEXT_PUBLIC_GITHUB_PAT` environment variable in your Vercel project settings.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
