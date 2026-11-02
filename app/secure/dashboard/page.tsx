import { redirect } from "next/navigation";
import {
  getAdminSession,
} from "@/lib/auth/admin-auth";
import AdminDashboard from "../../../components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/secure");
  }

  return <AdminDashboard admin={admin} />;
}