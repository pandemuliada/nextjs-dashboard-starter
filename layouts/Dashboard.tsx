import Menu from "@/components/Menu";

type IDashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: IDashboardProps) => {
  return (
    <div className="flex max-w-[1600px] mx-auto">
      <Menu />

      <div className="w-full pb-24 md:pb-0">{children}</div>
    </div>
  );
};

export default Dashboard;
