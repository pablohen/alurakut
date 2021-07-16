import { destroyCookie } from 'nookies';

const LogoutPage = () => {
  return <div>Redirecionando...</div>;
};

export const getServerSideProps = async (ctx) => {
  destroyCookie(ctx, 'USER_TOKEN');

  const data = new Date();
  const dataFormatada = data.toISOString();

  return {
    redirect: {
      destination: `/login?action=logout&date=${dataFormatada}`,
      permanent: false,
    },
  };
};

export default LogoutPage;
