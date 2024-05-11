import { Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { Button } from "./components/button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

interface PageProps {
  title: string;
  children: React.ReactNode;
  backHref?: string;
}

export function Page(props: PageProps) {
  const { title, children, backHref } = props;

  return (
    <div className="min-h-full">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="flex items-center text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {backHref && (
                <Button plain href={backHref} className="mr-4">
                  <ChevronLeftIcon />
                </Button>
              )}
              {title}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
