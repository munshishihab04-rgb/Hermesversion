import LegalPageLayout from "@/app/components/LegalPageLayout";
import { faqHTML } from "@/content/legalPages";

export default function FaqPage() {
  return (
    <LegalPageLayout
      title="Fatturazione"
      subtitle="Tutto quello che devi sapere su fatture, IVA e documentazione fiscale"
      lastUpdated="Maggio 2026"
      htmlContent={faqHTML}
      breadcrumb="Fatturazione"
    />
  );
}
