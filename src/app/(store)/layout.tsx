import { StoreNavbarDesktop } from "@/components/store/navigation/StoreNavbarDesktop";
import { MobileBottomNav } from "@/components/store/navigation/MobileBottomNav";
import { StoreFooter } from "@/components/store/StoreFooter";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Desktop Header (Sticky at top) */}
      <div className="sticky top-0 z-50 hidden md:block">
        <StoreNavbarDesktop />
      </div>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Desktop Footer (Hidden on Mobile) */}
      <div className="hidden md:block">
        <StoreFooter />
      </div>

      {/* Mobile Floating Bottom Bar (Hidden on Desktop) */}
      <div className="block md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}
