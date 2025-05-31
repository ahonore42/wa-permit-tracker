export interface DeadlineCalculation {
  type: "abandonment" | "permit_expiry" | "inspection" | "response_due";
  date: Date;
  daysRemaining: number;
  isUrgent: boolean;
  isOverdue: boolean;
  description: string;
  actionRequired: string;
}

export function calculateDeadlines(
  submittedAt?: Date,
  permitIssuedAt?: Date,
  lastActionAt?: Date
): DeadlineCalculation[] {
  const deadlines: DeadlineCalculation[] = [];
  const now = new Date();

  // 180-day abandonment deadline (Thurston County specific)
  if (submittedAt && !permitIssuedAt) {
    const abandonmentDate = new Date(submittedAt);
    abandonmentDate.setDate(abandonmentDate.getDate() + 180);

    const daysRemaining = Math.ceil(
      (abandonmentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    deadlines.push({
      type: "abandonment",
      date: abandonmentDate,
      daysRemaining,
      isUrgent: daysRemaining <= 30,
      isOverdue: daysRemaining < 0,
      description: `Application abandonment deadline: ${abandonmentDate.toLocaleDateString()}`,
      actionRequired:
        daysRemaining < 0
          ? "Contact permit office immediately - application may be abandoned"
          : "Respond to any county requests for information",
    });
  }

  // 365-day permit expiration (standard for building permits)
  if (permitIssuedAt) {
    const expiryDate = new Date(permitIssuedAt);
    expiryDate.setDate(expiryDate.getDate() + 365);

    const daysRemaining = Math.ceil(
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    deadlines.push({
      type: "permit_expiry",
      date: expiryDate,
      daysRemaining,
      isUrgent: daysRemaining <= 60,
      isOverdue: daysRemaining < 0,
      description: `Building permit expires: ${expiryDate.toLocaleDateString()}`,
      actionRequired:
        daysRemaining < 0
          ? "Permit expired - contact office about starting over"
          : daysRemaining <= 60
          ? "Request permit extension before expiration"
          : "Complete work and schedule final inspection",
    });
  }

  return deadlines.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getUrgentDeadlines(
  deadlines: DeadlineCalculation[]
): DeadlineCalculation[] {
  return deadlines.filter((d) => d.isUrgent || d.isOverdue);
}

export function getDeadlineStatus(
  deadline: DeadlineCalculation
): "urgent" | "warning" | "normal" {
  if (deadline.isOverdue) return "urgent";
  if (deadline.isUrgent) return "warning";
  return "normal";
}
