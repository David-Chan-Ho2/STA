import Link from "next/link";
import config from '@/config/config.json'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">
        {config.name}
      </h1>
      <p className="text-lg text-muted-foreground">404 Page not found</p>
      <Link
        href="/"
        className="text-sm underline underline-offset-4 hover:text-primary"
      >
        Go home
      </Link>
    </div>
  );
}
