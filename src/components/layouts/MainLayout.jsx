import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollToTop } from "@/hooks/useScrollToTop";


const MainLayout = ({ children }) => {
    useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-background w-full">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;