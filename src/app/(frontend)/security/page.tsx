import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const revalidate = 3600;
export const generateMetadata = () => legalMetadata("security");

export default function Page() {
  return <LegalPage slug="security" />;
}
