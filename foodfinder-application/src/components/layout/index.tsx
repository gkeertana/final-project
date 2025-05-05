import Header from "@/components/header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="layout-grid">{children}</main>
    </>
  );
}
