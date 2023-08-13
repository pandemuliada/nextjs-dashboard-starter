import PageContainer from "@/components/PageContainer";
import { supabaseServer } from "@/services/supabase";

const getBookings = async () => {
  const { data, error } = await supabaseServer.from("bookings").select("*");

  return data;
};

const HomePage = () => {
  const bookings = getBookings();

  return (
    <main>
      <PageContainer>
        <h1 className="text-3xl">Bookings</h1>
      </PageContainer>
    </main>
  );
};

export default HomePage;
