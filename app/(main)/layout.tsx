import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAuthStatus } from "@/app/actions/auth";
async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoggedIn } = await getAuthStatus();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
