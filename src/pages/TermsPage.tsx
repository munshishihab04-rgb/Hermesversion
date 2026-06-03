import LegalPageLayout from "@/app/components/LegalPageLayout";
import { termsContent } from "@/app/legalContent";

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Condizioni Generali di Vendita"
      subtitle="Termini e condizioni per l'acquisto di licenze software su licenvo.com"
      lastUpdated="Giugno 2026"
      htmlContent={termsContent}
      breadcrumb="Termini e Condizioni"
    />
  );
}
