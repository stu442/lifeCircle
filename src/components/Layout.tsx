function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {children}
    </div>
  );
}

export default Layout;