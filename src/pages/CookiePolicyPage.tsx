import LegalPageLayout from "@/app/components/LegalPageLayout";
import { cookieContent } from "@/app/legalContent";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="Come utilizziamo cookie e tecnologie di tracciamento su licenvo.com"
      lastUpdated="Giugno 2026"
      htmlContent={cookieContent}
      breadcrumb="Cookie Policy"
    />
  );
}
