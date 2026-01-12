import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background-light/80 dark:bg-background-dark/80 border-b border-black/5 dark:border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <h1 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Grand RoundTable
          </h1>
          <span className="text-xs font-medium text-primary uppercase tracking-widest mt-0.5">
            Validation Engine
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
             href="/pricing"
             className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
          >
             Pricing
          </Link>
        </div>
      </div>
    </header>
  );
}
