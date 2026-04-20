import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AIChatWidget } from "@/components/AIChatWidget";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { useCartSync } from "@/hooks/useCartSync";
import { useAnalytics } from "@/hooks/useAnalytics";

export const Layout = () => {
  useCartSync();
  useAnalytics();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-[60px] lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <MobileBottomNav />
      <AIChatWidget />
      <ExitIntentPopup />
    </div>
  );
};
