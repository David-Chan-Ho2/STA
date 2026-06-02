"use client";
import api from "@/api";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useForm } from "@/hooks/useForm";
import useRemember from "@/hooks/useRemember";
import { ILogin } from "@/types/auth.types";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

function Login() {
  const defaultForm: ILogin = {
    email: "",
    password: "",
  };
  const { remember, onRemember } = useRemember();
  const [show, setShow] = useState(false);

  const handleSubmit = async (form: ILogin) => {
    const data = await api.login(form);
    console.log(data);
  };

  const { form, onChange, onSubmit, onReset } = useForm<ILogin>({
    defaultForm,
    handleSubmit,
  });

  const onShow = () => setShow(!show);

  return (
    <>
      <h3>Login</h3>
      <form
        className="grid grid-rows-3 gap-2 h-80 w-80 m-auto"
        onSubmit={onSubmit}
      >
        <Field className="max-w-sm">
          <FieldLabel htmlFor="email-input">Email</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="email-input"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@email.com"
              type="email"
            />
          </InputGroup>
        </Field>
        <Field className="max-w-sm">
          <FieldLabel htmlFor="password-input">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password-input"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="*******"
              type={show ? "text" : "password"}
            />
            <InputGroupAddon
              className="cursor-pointer"
              onClick={onShow}
              align="inline-end"
            >
              {show ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <div className="flex gap-1 items-center">
          <p>Remember me?</p>
          <input type="checkbox" checked={remember} onChange={onRemember} />
        </div>

        <Button type="submit">Submit</Button>
        <Button type="reset" onClick={onReset}>
          Reset
        </Button>
      </form>
    </>
  );
}

export default Login;
