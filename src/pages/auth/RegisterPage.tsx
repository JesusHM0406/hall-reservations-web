import { ArrowRight, Shield } from 'lucide-react';
import Button from '../../components/common/Button';
import Container from '../../components/common/Container';
import FormField from '../../components/common/FormField';
import Input from '../../components/common/Input';
import { ICON_SIZE } from '../../constants/ui.constants';
import { Link } from 'react-router';
import { PATHS } from '../../paths';
import { useForm } from 'react-hook-form';
import { registerScheme, type RegisterFormData } from '../../schemes/auth.scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import SpinerLoader from '../../components/common/SpinerLoader';
import { authService } from '../../services/auth.service';

const RegisterPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterFormData>({ 
    resolver: zodResolver(registerScheme),
    defaultValues: {
      name: '',
      password: '',
      passwordConfirm: ''
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authService.register(data);
    } catch(e) {
      // NOTE: This is only for testing
      console.error(e);
    }

    reset();
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
                {...register('name', { required: true })} 
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
                {...register('password', { required: true })} 
                {...(errors.password ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
              />
            )}
          </FormField>
          
          <FormField label='confirm your password' required error={errors.passwordConfirm}>
              {(id) => (
                <Input 
                  id={id} 
                  required
                  type='password' 
                  iconName='lock' 
                  placeholder='••••••••' 
                  intention={errors.passwordConfirm ? 'danger' : 'brand'}
                  {...register('passwordConfirm', { required: true })} 
                  {...(errors.passwordConfirm ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
                />
              )}
          </FormField>

          <Button className='mt-3' type='submit' disabled={isSubmitting}>
            {isSubmitting ? <SpinerLoader size='sm' /> : (
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
}

export default RegisterPage;