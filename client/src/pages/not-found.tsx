import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout
      title="Page Not Found | TRINETHRA DEFENTECH"
      description="The page you are looking for does not exist."
    >
      <section
        className="section-spacing bg-gray-50"
        aria-labelledby="not-found-heading"
      >
        <div className="section-container px-4 sm:px-6 md:px-8 flex items-center justify-center">
          <Card className="w-full max-w-lg mx-auto shadow-sm">
            <CardContent className="pt-8 pb-10 px-6 sm:px-10">
              <div className="flex items-start mb-6 gap-3">
                <AlertCircle className="h-10 w-10 text-alert flex-shrink-0" />
                <h1
                  id="not-found-heading"
                  className="heading-clamp-3 font-condensed font-bold text-navy"
                >
                  404 Page Not Found
                </h1>
              </div>
              <p className="text-sm sm:text-base text-charcoal/80 text-balance mb-6">
                The page you requested could not be found. It may have been moved,
                removed, or the URL might be incorrect.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-forest text-white font-medium py-2.5 px-5 hover:bg-forest/90 transition-colors focus-ring"
                >
                  Return Home
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-forest text-forest font-medium py-2.5 px-5 hover:bg-forest/10 transition-colors focus-ring"
                >
                  Contact Support
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
