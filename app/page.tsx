import PageContainer from "@/components/PageContainer";
import { supabaseServer } from "@/services/supabase";

const HomePage = async () => {
  return (
    <main>
      <PageContainer>
        <h1 className="text-3xl">Bookings</h1>

        <div>
          {/* {bookings?.map((booking) => (
            <div key={booking.id}>
              <p>
                {booking.title} - {booking.studio.name}
              </p>
            </div>
          ))} */}
        </div>
      </PageContainer>
    </main>
  );
};

export default HomePage;
