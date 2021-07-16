import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

const LoginScreen = () => {
  const router = useRouter();
  const { action, date } = router.query;
  const [githubUser, setGithubUser] = useState('pablohen');

  useEffect(() => {
    showAction();
  }, [action, date]);

  const login = (e) => {
    e.preventDefault();

    const validateLogin = async () => {
      try {
        const authPath = 'https://alurakut.vercel.app/api/login';
        const res = await fetch(authPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ githubUser: githubUser }),
        });

        const dadosDaResposta = await res.json();
        const token = dadosDaResposta.token;
        setCookie(null, 'USER_TOKEN', token, {
          path: '/',
          maxAge: 86400 * 7,
        });

        router.push('/');
      } catch (error) {
        console.log(error.message);
      }
    };

    validateLogin();
  };

  const showAction = () => {
    switch (action) {
      case 'logout':
        alert('Volte sempre!');
        break;

      case 'authFailure':
        alert('Usuário inválido, tente novamente.');
        break;

      default:
        break;
    }
  };

  const updateGithubUser = (e) => {
    setGithubUser(e.target.value);
  };

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={login}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={updateGithubUser}
            />
            <button type="submit" disabled={!githubUser}>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{' '}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{' '}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default LoginScreen;
