import { ArrowRight, Shield } from 'lucide-react';
import Button from '../../components/common/Button';
import Container from '../../components/common/Container';
import FormField from '../../components/common/FormField';
import Input from '../../components/common/Input';
import { ICON_SIZE } from '../../constants/ui.constants';
import { Link } from 'react-router';
import { PATHS } from '../../paths';

const LoginPage = () => {
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
          className='flex flex-col gap-5' 
          aria-label='Login form' 
        >
          <FormField label='username' required>
            {(id) => (
              <Input 
                id={id} 
                required
                iconName='user' 
                placeholder='John Doe' 
              />)
            }
          </FormField>
          
          <FormField label='password' required>
            {(id) => (
              <Input 
                id={id} 
                required
                type='password' 
                iconName='lock' 
                placeholder='••••••••' 
              />
            )}
          </FormField>
          
          <Button className='mt-3'>
            <span className='uppercase tracking-widest'>Log in to the platform</span>
            <span>
              <ArrowRight size={ICON_SIZE.MD} />
            </span>
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