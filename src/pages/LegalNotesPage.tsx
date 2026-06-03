import LegalPageLayout from "@/app/components/LegalPageLayout";
import { legalNotesHTML } from "@/content/legalPages";

export default function LegalNotesPage() {
  return (
    <LegalPageLayout
      title="Note Legali"
      subtitle="Informazioni legali obbligatorie relative a locenvo.com"
      lastUpdated="Maggio 2026"
      htmlContent={legalNotesHTML}
      breadcrumb="Note Legali"
    />
  );
}
