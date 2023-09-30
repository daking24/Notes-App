import { useState } from 'react';
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError } from "../errors/http_errors";
import { User } from "../models/user";
import * as Api from "../network/api";
import { SignUpInput } from "../network/api";
import styleUtils from '../styles/utils.module.css';
import TextInputField from "./form/TextInputField";

interface SignUpModalProps {
  onDismiss: () => void,
  onSignUp: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUp }: SignUpModalProps) => {

  const [errorText, setErrorText] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpInput>();

  async function onSubmit(credentials: SignUpInput) {
    try {
      const newUser = await Api.signUp(credentials);
      onSignUp(newUser);
    } catch (error) {
      if (error instanceof ConflictError){
        setErrorText(error.message)
      } else{
        console.error(error)
      }
      console.error(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText &&
        <Alert variant="danger">
          {errorText}
        </Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            label="Username"
            name="username"
            type="text"
            placeholder="Enter username"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.username}
          />
          <TextInputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.email}
          />
          <TextInputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}>
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;