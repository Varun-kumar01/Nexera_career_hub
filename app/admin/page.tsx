import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin-auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdminSession();

  if (admin) {
    redirect("/secure/dashboard");
  }

  return <AdminLoginForm />;
}
