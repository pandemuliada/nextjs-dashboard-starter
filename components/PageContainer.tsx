const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="w-full px-8 pt-5">{children}</div>
    </main>
  );
};

export default PageContainer;
