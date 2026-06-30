"use client";
import api from "@/api";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import useRemember from "@/hooks/useRemember";
import { ILogin } from "@/types/auth.types";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

function Login() {
  const defaultForm: ILogin = {
    email: "",
    password: "",
  };
  const { login } = useAuth();
  const { remember, onRemember } = useRemember();
  const [show, setShow] = useState(false);

  const handleSubmit = async (form: ILogin) => {
    login(form);
    redirect("/dashboard");
  };

  const { form, onChange, onSubmit, onReset } = useForm<ILogin>({
    defaultForm,
    handleSubmit,
  });

  const onShow = () => setShow(!show);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to your STA account
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Field>
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

        <Field>
          <FieldLabel htmlFor="password-input">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password-input"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              type={show ? "text" : "password"}
            />
            <InputGroupAddon
              className="cursor-pointer"
              onClick={onShow}
              align="inline-end"
            >
              {show ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={onRemember}
            className="rounded"
          />
          Remember me
        </label>

        <Button type="submit" className="w-full mt-2">
          Sign in
        </Button>
        <Button
          type="reset"
          variant="ghost"
          className="w-full"
          onClick={onReset}
        >
          Clear
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}

export default Login;
