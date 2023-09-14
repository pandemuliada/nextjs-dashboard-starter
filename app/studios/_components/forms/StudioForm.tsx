import Button from "@/components/ds/Button";
import { IStudio } from "@/interfaces/studio";
import { useForm } from "react-hook-form";

interface IStudioFormProps {
  initialValues?: IStudio | null;
  onSubmit?: (props: IStudio) => void;
}

const StudioForm = (props: IStudioFormProps) => {
  const { onSubmit } = props;
  const hookForm = useForm<IStudio>({
    defaultValues: {
      name: "",
    },
  });
  const watch = hookForm.watch();

  const handleSubmit = (values: IStudio) => {
    onSubmit && onSubmit(values);
  };

  const register = hookForm.register("name");
  return (
    <form onSubmit={hookForm.handleSubmit(handleSubmit)}>
      <div>
        <input
          // ref={register.ref}
          // onChange={register.onChange}
          // onBlur={register.onBlur}
          {...register}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default StudioForm;
