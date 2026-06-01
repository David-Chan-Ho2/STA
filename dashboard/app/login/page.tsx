"use client";
import { useForm } from "@/hooks/useForm";
import { ILogin } from "@/types/auth.types";

function Login() {
  const defaultForm: ILogin = {
    email: "",
    password: "",
  };

  const handleSubmit = (form: ILogin) => {
    console.log(form);
  };

  const { form, onChange, onSubmit } = useForm<ILogin>({
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
