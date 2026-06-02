"use client";
import api from "@/api";
import { useForm } from "@/hooks/useForm";
import { ILogin } from "@/types/auth.types";

function Login() {
  const defaultForm: ILogin = {
    email: "",
    password: "",
  };

  const handleSubmit = async (form: ILogin) => {
    const { data } = await api.login(form);
    console.log(data);
  };

  const { form, onChange, onSubmit, onReset } = useForm<ILogin>({
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
        <button type="submit">Submit</button>
        <button type="reset" onClick={onReset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default Login;
