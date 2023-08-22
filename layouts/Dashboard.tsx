import SidebarMenu from "@/components/SidebarMenu";

type IDashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: IDashboardProps) => {
  return (
    <div className="max-w-[1600px] mx-auto flex">
      <SidebarMenu />

      <div className="relative w-full">{children}</div>
    </div>
  );
};

export default Dashboard;
