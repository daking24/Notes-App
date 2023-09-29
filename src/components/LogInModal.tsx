import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginInput } from "../network/api";
import * as Api from "../network/api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from 'react';
import { UnauthorizedError } from "../errors/http_errors";

interface LogInModalProps {
  onDismiss: () => void;
  onLogIn: (user: User) => void;
}

const LogInModal = ({ onDismiss, onLogIn }: LogInModalProps) => {

  const [errorText, setErrorText] = useState<string| null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>();

  async function onSubmit(credentials: LoginInput) {
    try {
      const user = await Api.login(credentials);
      onLogIn(user);
    } catch (error) {
      if (error instanceof UnauthorizedError){
        setErrorText(error.message)
      } else {
      console.error(error);
      // alert(error);
    }
    console.error(error);
    
  }}

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
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
            Log In
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    )
}
 
export default LogInModal;