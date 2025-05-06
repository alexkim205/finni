import { Button, Input } from '@heroui/react';
import { useLoginMutation } from '../../api/hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../api/types';

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<LoginRequest>();
  const login = useLoginMutation({
    onSuccess: () => {
      navigate('/dashboard');
    },
  });

  async function onSubmit() {
    await login.mutateAsync(getValues());
  }

  console.log("errors", errors)

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <form
        className="max-w-[500px] w-full flex flex-col gap-4 py-8 px-4 bg-white rounded-md shadow-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-4xl text-center">Welcome!</h2>
        <Input
          label="Email"
          size="lg"
          labelPlacement="outside"
          radius="sm"
          placeholder="Enter your email"
          type="email"
          required
          {...register('email', {
            required: true,
            minLength: 1,
          })}
          isInvalid={!!errors.email}
          errorMessage={errors.email ? "Email address is invalid" : ""}
        />
        <Input
          label="Password"
          size="lg"
          labelPlacement="outside"
          radius="sm"
          placeholder="Enter your password"
          type="password"
          required
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          isInvalid={!!errors.password}
          errorMessage={errors.password ? "Password must be >= 6 characters": ""}
        />
        <Button
          radius="sm"
          size="lg"
          className="font-bold"
          color="primary"
          type="submit"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}
