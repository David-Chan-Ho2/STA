"use client";
import api from "@/api";
import { useForm } from "@/hooks/useForm";
import { IRegister } from "@/types/auth.types";

function Register() {
  const defaultForm: IRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (form: IRegister) => {
    const data = await api.register(form);
    console.log(data);
  };

  const { form, onChange, onSubmit, onReset } = useForm<IRegister>({
    defaultForm,
    handleSubmit,
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@email.com"
            type="email"
          />
        </div>
        <div>
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="*******"
            type="password"
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            placeholder="*******"
            type="password"
          />
        </div>

        <button type="submit">Submit</button>
        <button type="reset" onClick={onReset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default Register;
