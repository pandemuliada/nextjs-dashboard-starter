const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="w-full p-5 pt-5">{children}</div>
    </main>
  );
};

export default PageContainer;
