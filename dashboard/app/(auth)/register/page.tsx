"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { IRegister } from "@/types/auth.types";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

function Register() {
  const defaultForm: IRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (form: IRegister) => {
    register(form);
    redirect("/login");
  };

  const { form, onChange, onSubmit, onReset } = useForm<IRegister>({
    defaultForm,
    handleSubmit,
  });

  const onShow = () => setShow(!show);
  const onShowConfirm = () => setShowConfirm(!showConfirm);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Get started with STA Engineering
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

        <Field>
          <FieldLabel htmlFor="confirm-password-input">
            Confirm Password
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirm-password-input"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="••••••••"
              type={showConfirm ? "text" : "password"}
            />
            <InputGroupAddon
              className="cursor-pointer"
              onClick={onShowConfirm}
              align="inline-end"
            >
              {showConfirm ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Button type="submit" className="w-full mt-2">
          Create account
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}

export default Register;
