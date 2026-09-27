import CoachDashboardView from "@/components/coach/CoachDashboardView";
import { getCoachDashboard } from "@/services/dashboard";

export default async function CoachDashboard() {
  const data = await getCoachDashboard();

  return <CoachDashboardView data={data} />;
}
