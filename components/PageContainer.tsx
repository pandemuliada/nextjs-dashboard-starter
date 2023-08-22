const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="container mx-auto p-5 pt-5">{children}</div>
    </main>
  );
};

export default PageContainer;
