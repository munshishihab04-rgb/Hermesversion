import LegalPageLayout from "@/app/components/LegalPageLayout";
import { refundContent } from "@/app/legalContent";

export default function RefundPage() {
  return (
    <LegalPageLayout
      title="Politica di Reso e Rimborso"
      subtitle="30 giorni per cambiare idea. Garanzia su ogni licenza acquistata."
      lastUpdated="Giugno 2026"
      htmlContent={refundContent}
      breadcrumb="Politica Rimborsi"
    />
  );
}
