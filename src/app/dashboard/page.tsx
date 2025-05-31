import { prisma } from "@/lib/db";
import { getDeadlineStatus } from "@/lib/deadlines";
import Link from "next/link";

export default async function DashboardPage() {
  const properties = await prisma.property.findMany({
    include: {
      projects: {
        include: {
          deadlines: {
            where: { isActive: true },
            orderBy: { date: "asc" },
          },
          documents: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
    take: 20,
  });

  const totalProjects = properties.reduce(
    (sum, p) => sum + p.projects.length,
    0
  );
  const activeDeadlines = properties.reduce(
    (sum, p) =>
      sum +
      p.projects.reduce((pSum, project) => pSum + project.deadlines.length, 0),
    0
  );

  // Get urgent deadlines across all projects
  const urgentDeadlines = properties
    .flatMap((p) =>
      p.projects.flatMap((project) =>
        project.deadlines
          .map((deadline) => ({
            ...deadline,
            propertyAddress: p.address,
            projectName: project.name,
            status: getDeadlineStatus({
              date: deadline.date,
              daysRemaining: Math.ceil(
                (new Date(deadline.date).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              ),
              isUrgent:
                Math.ceil(
                  (new Date(deadline.date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) <= 30,
              isOverdue: new Date(deadline.date) < new Date(),
              type: deadline.type as any,
              description: deadline.description,
              actionRequired: "",
            }),
          }))
          .filter((d) => d.status === "urgent" || d.status === "warning")
      )
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Your Permit Dashboard
          </h1>
          <Link
            href="/property-lookup"
            className="bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
          >
            Add Property
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="jurisdiction-card">
            <h3 className="text-sm font-medium text-foreground/60">
              Properties
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {properties.length}
            </p>
          </div>
          <div className="jurisdiction-card">
            <h3 className="text-sm font-medium text-foreground/60">
              Active Projects
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {totalProjects}
            </p>
          </div>
          <div className="jurisdiction-card">
            <h3 className="text-sm font-medium text-foreground/60">
              Active Deadlines
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {activeDeadlines}
            </p>
          </div>
          <div className="jurisdiction-card">
            <h3 className="text-sm font-medium text-foreground/60">
              Urgent Items
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {urgentDeadlines.length}
            </p>
          </div>
        </div>

        {/* Urgent Deadlines */}
        {urgentDeadlines.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              🚨 Urgent Deadlines
            </h2>
            <div className="space-y-3">
              {urgentDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className={`p-4 rounded-lg border ${
                    deadline.status === "urgent"
                      ? "urgent-deadline"
                      : "warning-deadline"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{deadline.projectName}</p>
                      <p className="text-sm opacity-80">
                        {deadline.propertyAddress}
                      </p>
                      <p className="text-sm mt-1">{deadline.description}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.ceil(
                        (new Date(deadline.date).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-foreground/60 mb-4">
              No properties tracked yet
            </p>
            <p className="text-foreground/40 mb-6">
              Start by adding a property to track permits and deadlines across
              Thurston County
            </p>
            <Link
              href="/property-lookup"
              className="bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
            >
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              All Properties
            </h2>
            {properties.map((property) => (
              <div key={property.id} className="jurisdiction-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {property.address}
                    </h2>
                    <p className="text-foreground/60">
                      {property.jurisdiction} •{" "}
                      {property.zoning || "Zoning TBD"}
                    </p>
                    {property.parcelId && (
                      <p className="text-sm text-foreground/40">
                        Parcel ID: {property.parcelId}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/property/${property.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                </div>

                {property.projects.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      Active Projects ({property.projects.length})
                    </h3>
                    {property.projects.map((project) => (
                      <div
                        key={project.id}
                        className="border border-black/[.08] dark:border-white/[.145] rounded p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{project.name}</span>
                          <span
                            className={`permit-status-badge status-${project.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/60 mb-3">
                          {project.permitType} • {project.projectType}
                        </p>

                        {project.deadlines.length > 0 && (
                          <div className="space-y-2">
                            {project.deadlines.map((deadline) => {
                              const daysLeft = Math.ceil(
                                (new Date(deadline.date).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              );
                              const urgencyClass =
                                daysLeft < 0
                                  ? "urgent-deadline"
                                  : daysLeft <= 30
                                  ? "warning-deadline"
                                  : "normal-deadline";

                              return (
                                <div
                                  key={deadline.id}
                                  className={`text-sm p-3 rounded border ${urgencyClass}`}
                                >
                                  <div className="flex justify-between">
                                    <span>{deadline.description}</span>
                                    <span className="font-medium">
                                      {daysLeft > 0
                                        ? `${daysLeft} days left`
                                        : `${Math.abs(daysLeft)} days overdue`}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {project.documents.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-black/[.08] dark:border-white/[.145]">
                            <p className="text-sm text-foreground/60">
                              Documents:{" "}
                              {
                                project.documents.filter(
                                  (d) => d.status === "submitted"
                                ).length
                              }{" "}
                              submitted,{" "}
                              {
                                project.documents.filter(
                                  (d) => d.status === "required"
                                ).length
                              }{" "}
                              required
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-black/[.08] dark:border-white/[.145] rounded">
                    <p className="text-foreground/60 mb-2">No projects yet</p>
                    <Link
                      href={`/property/${property.id}/add-project`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Add First Project
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
