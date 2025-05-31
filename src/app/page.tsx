import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Thurston County Permit Tracker
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl">
            Never miss a deadline again. Track permits across Thurston County
            and all 6 cities with automated alerts and compliance checking.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-black/[.05] dark:bg-white/[.06] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              🏗️ For Contractors
            </h2>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li>• Track permits across 7 jurisdictions</li>
              <li>• Automated 180/365-day deadline alerts</li>
              <li>• SB5290 compliance checklists</li>
              <li>• Critical areas pre-screening</li>
              <li>• Appointment scheduling integration</li>
            </ul>
          </div>

          <div className="bg-black/[.05] dark:bg-white/[.06] p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              🏠 For Homeowners
            </h2>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li>• Understand permit requirements</li>
              <li>• Track your project deadlines</li>
              <li>• Know which jurisdiction applies</li>
              <li>• Document checklist generator</li>
              <li>• Processing time estimates</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 w-full max-w-4xl">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
            🚨 Critical Changes Effective March 1, 2025
          </h3>
          <div className="text-red-700 dark:text-red-300 space-y-1 text-sm sm:text-base">
            <p>
              • <strong>SB5290:</strong> Reduced permitting timelines countywide
            </p>
            <p>
              • <strong>Complete packets only:</strong> Applications checked at
              counter before intake
            </p>
            <p>
              • <strong>Mandatory appointments:</strong> Required for
              post-presubmission applications
            </p>
            <p>
              • <strong>Concurrent reviews:</strong> Critical Areas Review
              required with application
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/property-lookup"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Property icon"
              width={20}
              height={20}
            />
            Check Your Property
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
          >
            View Dashboard
          </Link>
        </div>

        <div className="bg-black/[.05] dark:bg-white/[.06] p-6 rounded-lg w-full max-w-4xl">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Quick Facts
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground">Processing Times</p>
              <p className="text-foreground/60">Basic residential: 12 weeks</p>
              <p className="text-foreground/60">
                Complex projects: Up to 1 year
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Critical Deadlines</p>
              <p className="text-foreground/60">
                180 days: Application abandonment
              </p>
              <p className="text-foreground/60">365 days: Permit expiration</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Office Hours</p>
              <p className="text-foreground/60">Monday - Friday</p>
              <p className="text-foreground/60">8:00 AM - 3:45 PM</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.thurstoncountywa.gov/departments/community-planning-and-economic-development/permitting"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Thurston County
        </a>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/jurisdictions"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          All Jurisdictions
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/resources"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Resources
        </Link>
      </footer>
    </div>
  );
}
