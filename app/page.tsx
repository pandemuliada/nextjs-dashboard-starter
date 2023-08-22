import { BookingsContainer } from "@/app/_containers";
import PageContainer from "@/components/PageContainer";
import { supabaseServer } from "@/services/supabase";

const getBookings = async () => {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }
  return data;
};

const HomePage = async () => {
  const bookings = await getBookings();

  return (
    <PageContainer>
      <h1 className="text-3xl mb-6">Overview</h1>

      <div>
        <BookingsContainer bookings={bookings} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
