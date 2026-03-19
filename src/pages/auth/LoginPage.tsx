import { ArrowRight, Shield } from 'lucide-react';
import Button from '../../components/common/Button';
import Container from '../../components/common/Container';
import FormField from '../../components/common/FormField';
import Input from '../../components/common/Input';
import { ICON_SIZE } from '../../constants/ui.constants';
import { Link } from 'react-router';
import { PATHS } from '../../paths';
import { useForm } from 'react-hook-form';
import { loginScheme, type LoginFormData } from '../../schemes/auth.scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import SpinnerLoader from '../../components/common/SpinnerLoader';
import { getErrorMessage } from '../../lib/axios';
import { authService } from '../../services/auth.service';
import { toast } from 'sonner';

const LoginPage = () => {
  const  {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const responseData = await authService.login(data);
      localStorage.setItem('token', responseData.access_token);
      reset();
    } catch(e) {
      const msg = getErrorMessage(e);
      toast.error(msg);
    }
  };

  return (
    <div className='grid place-content-center h-full flex-1 gap-6 text-xs'>
      <div className='flex flex-col items-center'>
        <span className='bg-brand p-3 rounded-2xl text-white shadow-lg shadow-brand/60 mb-3'>
          <Shield size={ICON_SIZE.XL * 1.2} />
        </span>
        <h1 className='uppercase font-black text-lg tracking-wider'>Welcome</h1>
        <span className='uppercase font-bold text-inactive tracking-widest text-center'>Event venue booking platform</span>
      </div>
      <Container>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col gap-5' 
          aria-label='Login form' 
          noValidate
        >
          <FormField label='username' required error={errors.username}>
            {(id) => (
              <Input 
                id={id} 
                required
                iconName='user' 
                placeholder='John Doe' 
                intention={errors.username ? 'danger' : 'brand'}
                {...register('username')} 
                {...(errors.username ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
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
          
          <Button className='mt-3' type='submit'>
            {isSubmitting ? <SpinnerLoader /> : (
              <>
                <span className='uppercase tracking-widest'>Log in to the platform</span>
                <span>
                  <ArrowRight size={ICON_SIZE.MD} />
                </span>
              </>
            )}
          </Button>
        </form>
      </Container>

      <div className='text-center'>
        <span className='uppercase text-2xs text-inactive font-bold tracking-wider'>Don't have an account yet? <Link to={`/${PATHS.auth.root}/${PATHS.auth.register}`} className='normal-case text-brand text-xs' aria-label='go to register page if dont have an account'>Register</Link></span>
      </div>
    </div>
  );
}

export default LoginPage;