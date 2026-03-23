import { ArrowRight, Shield } from 'lucide-react';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import FormField from '@/components/common/FormField';
import Input from '@/components/common/Input';
import { ICON_SIZE } from '@/constants/ui.constants';
import { Link } from 'react-router';
import { PATHS } from '@/paths';
import { useForm } from 'react-hook-form';
import { type LoginFormData } from '@/api/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import SpinnerLoader from '@/components/common/SpinnerLoader';
import { authService } from '@/api/services/auth.service';
import { toast } from 'sonner';
import { getErrorMessage } from '@/api/axios';
import { useAuth } from '@/hooks/useAuth';
import { userCreateSchema, type UserCreate } from '@/api/schemas/user.schemas';

export const RegisterPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<UserCreate>({ 
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: '',
      password: '',
      password_confirm: ''
    }
  });

  const { logIn } = useAuth();

  const onSubmit = async (data: UserCreate) => {
    try {
      await authService.register(data);
      
      const loginData: LoginFormData = {
        username: data.name,
        password: data.password
      };
      
      await logIn(loginData);

      reset();
    } catch(e) {
      const msg = getErrorMessage(e);
      toast.error(msg);
    }
  }

  return (
    <div className='grid place-content-center h-full flex-1 gap-6 text-xs'>
      <div className='flex flex-col items-center'>
        <span className='bg-brand p-3 rounded-2xl text-white shadow-lg shadow-brand/60 mb-3'>
          <Shield size={ICON_SIZE.XL * 1.2} />
        </span>
        <h1 className='uppercase font-black text-lg tracking-wide'>Create an account</h1>
        <span className='uppercase font-bold text-inactive tracking-widest text-center'>Join the event venue booking platform</span>
      </div>
      <Container>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-5' 
          aria-label='Create an account' 
          noValidate 
        >
          <FormField label='username' required error={errors.name}>
            {(id) => (
              <Input 
                id={id} 
                required
                iconName='user' 
                placeholder='John Doe' 
                intention={errors.name ? 'danger' : 'brand'} 
                {...register('name')} 
                {...(errors.name ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
              />)
            }
          </FormField>
          
          <FormField label='password' required error={errors.password}>
            {(id) => (
              <Input 
                id={id} 
                required
                type='password' 
                iconName='lock' 
                placeholder='••••••••' 
                intention={errors.password ? 'danger' : 'brand'}
                {...register('password')} 
                {...(errors.password ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
              />
            )}
          </FormField>
          
          <FormField label='confirm your password' required error={errors.password_confirm}>
              {(id) => (
                <Input 
                  id={id} 
                  required
                  type='password' 
                  iconName='lock' 
                  placeholder='••••••••' 
                  intention={errors.password_confirm ? 'danger' : 'brand'}
                  {...register('password_confirm')} 
                  {...(errors.password_confirm ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
                />
              )}
          </FormField>

          <Button className='mt-3' type='submit' disabled={isSubmitting}>
            {isSubmitting ? <SpinnerLoader size='sm' /> : (
              <>
                <span className='uppercase tracking-widest'>Register Now</span>
                <span>
                  <ArrowRight size={ICON_SIZE.MD} />
                </span>
              </>
            )}
          </Button>
        </form>
      </Container>

      <div className='text-center'>
        <span className='uppercase text-2xs text-inactive font-bold tracking-wider'>Already have an account? <Link to={`/${PATHS.auth.root}/${PATHS.auth.login}`} className='normal-case text-brand text-xs' aria-label='go to login page if already have an account'>Log in</Link></span>
      </div>
    </div>
  );
};