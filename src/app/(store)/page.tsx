import { HomeDesktop } from "@/components/store/home/HomeDesktop";
import { HomeMobile } from "@/components/store/home/HomeMobile";

export default function HomePage() {
  return (
    <>
      {/* Desktop View (Khusus layar md ke atas) */}
      <div className="hidden md:block">
        <HomeDesktop />
      </div>

      {/* Mobile View (Khusus layar di bawah md) */}
      <div className="block md:hidden">
        <HomeMobile />
      </div>
    </>
  );
}
