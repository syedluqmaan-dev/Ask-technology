import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const revalidate = 3600;
export const generateMetadata = () => legalMetadata("disclaimer");

export default function Page() {
  return <LegalPage slug="disclaimer" />;
}
