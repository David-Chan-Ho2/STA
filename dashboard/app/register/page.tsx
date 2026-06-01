"use client";
import { useForm } from "@/hooks/useForm";
import { IRegister } from "@/types/auth.types";

function Register() {
  const defaultForm: IRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (form: IRegister) => {
    console.log(form);
  };

  const { form, onChange, onSubmit } = useForm<IRegister>({
    defaultForm,
    handleSubmit,
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input name="email" value={form.email} onChange={onChange} />
        </div>
        <div>
          <input name="password" value={form.password} onChange={onChange} />
        </div>
        <div>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
