import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';

export default async function Login () {

  const session = await auth();
  console.log(session)

  if(session) {
    redirect("/")
  } 

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}