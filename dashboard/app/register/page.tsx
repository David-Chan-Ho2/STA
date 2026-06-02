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
import { IRegister } from "@/types/auth.types";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

function Register() {
  const defaultForm: IRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (form: IRegister) => {
    const data = await api.register(form);
    console.log(data);
  };

  const { form, onChange, onSubmit, onReset } = useForm<IRegister>({
    defaultForm,
    handleSubmit,
  });

  const onShow = () => setShow(!show);

  const onShowConfirm = () => setShowConfirm(!showConfirm);

  return (
    <>
      <h3>Register</h3>
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
        <Field className="max-w-sm">
          <FieldLabel htmlFor="confirm-password-input">
            Confirm Password
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirm-password-input"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="*******"
              type={showConfirm ? "text" : "password"}
            />
            <InputGroupAddon
              className="cursor-pointer"
              onClick={onShowConfirm}
              align="inline-end"
            >
              {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Button type="submit">Submit</Button>
        <Button type="reset" onClick={onReset}>
          Reset
        </Button>
      </form>
    </>
  );
}

export default Register;
