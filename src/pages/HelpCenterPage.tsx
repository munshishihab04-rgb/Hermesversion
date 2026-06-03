import LegalPageLayout from "@/app/components/LegalPageLayout";
import { shippingHTML } from "@/content/legalPages";

export default function HelpCenterPage() {
  return (
    <LegalPageLayout
      title="Spedizione e Consegna"
      subtitle="Consegna digitale gratuita — da immediata a 24 ore"
      lastUpdated="Maggio 2026"
      htmlContent={shippingHTML}
      breadcrumb="Spedizione e Consegna"
    />
  );
}
