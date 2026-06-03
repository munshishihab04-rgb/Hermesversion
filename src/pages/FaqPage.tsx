import LegalPageLayout from "@/app/components/LegalPageLayout";
import { faturazioneHTML } from "@/content/legalPages";

export default function FaqPage() {
  return (
    <LegalPageLayout
      title="Fatturazione"
      subtitle="Tutto sulla fatturazione, IVA e documentazione fiscale"
      lastUpdated="Maggio 2026"
      htmlContent={faturazioneHTML}
      breadcrumb="Fatturazione"
      icon="DocumentTextIcon"
    />
  );
}
