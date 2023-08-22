import { StudiosContainer } from "@/app/studios/_containers";
import PageContainer from "@/components/PageContainer";
import { IStudio } from "@/interfaces/studio";
import { supabaseServer } from "@/services/supabase";

const getStudios = async (): Promise<IStudio[]> => {
  const { data, error } = await supabaseServer
    .from("studios")
    .select("*, category:category_id(*)")
    .order("order_number", { ascending: true });

  if (error) {
    return [];
  }

  return data;
};

const StudiosPage = async () => {
  const studios = await getStudios();

  return (
    <PageContainer>
      <h1 className="text-3xl mb-6">Studios</h1>

      <div>
        <StudiosContainer studios={studios} />
      </div>
    </PageContainer>
  );
};

export default StudiosPage;
