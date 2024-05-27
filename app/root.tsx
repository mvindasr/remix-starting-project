import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import styles from "~/styles/main.css?url";
import MainNavigation from "~/components/MainNavigation";
import { LinksFunction } from "@remix-run/node";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  // Specific errors defined in routes (404 error for example)
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>An error occurred</title>
        </head>
        <body>
          <main className="error">
            <h1>An error occurred!</h1>
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {error.status} {error.statusText}
            </p>
            <p>
              {error.data?.message || 'Something went wrong...'}
            </p>
            <p>
              Back to <Link to="/">safety</Link>!
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
    // Any error
  } else if (error instanceof Error) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>An error occurred</title>
        </head>
        <body>
          <main className="error">
            <h1>Error!</h1>
            <p>{error.message}</p>
            <p>
              Back to <Link to="/">safety</Link>!
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
