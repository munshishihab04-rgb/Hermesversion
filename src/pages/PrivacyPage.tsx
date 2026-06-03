import LegalPageLayout from "@/app/components/LegalPageLayout";
import { privacyContent } from "@/app/legalContent";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali"
      lastUpdated="Giugno 2026"
      htmlContent={privacyContent}
      breadcrumb="Privacy Policy"
    />
  );
}
