import LegalPageLayout from "@/app/components/LegalPageLayout";
import { shippingHTML } from "@/content/legalPages";

export default function ShippingPage() {
  return (
    <LegalPageLayout
      title="Consegna e Spedizione"
      subtitle="Consegna digitale istantanea e gratuita su tutti i prodotti"
      lastUpdated="Giugno 2025"
      htmlContent={shippingHTML}
      breadcrumb="Consegna e Spedizione"
    />
  );
}
