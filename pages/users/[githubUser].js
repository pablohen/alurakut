import Link from 'next/link';
import Box from '../../src/components/Box';
import MainGrid from '../../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../../src/components/ProfileRelations';
import useSeguidores from '../../hooks/useSeguidores';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../../src/libs/AlurakutCommons';
import useCommunities from '../../hooks/useCommunities';
import slugify from 'slugify';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import ProfileSidebar from '../../src/components/ProfileSidebar';
import ProfileRelationsBox from '../../src/components/ProfileRelationsBox';
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const { githubUser } = router.query;

  const [comunidades, setComunidades] = useCommunities();

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  const [seguidores] = useSeguidores(githubUser);

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const id = new Date().toISOString();
    const title = dadosDoForm.get('title');
    const imageUrl = dadosDoForm.get('imageUrl');

    const comunidade = {
      title,
      imageUrl,
      creatorSlug: slugify(title, { lower: true }),
    };

    const enviaDadosComunidade = async (comunidade) => {
      try {
        const res = await fetch('/api/communities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comunidade),
        });
        const novaComunidade = await res.json();
        setComunidades([novaComunidade, ...comunidades]);
      } catch (error) {
        console.log(error.message);
      }
    };

    enviaDadosComunidade(comunidade);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Perfil de @{githubUser}</h1>

            <OrkutNostalgicIconSet
              recados={12}
              fotos={64}
              videos={'x'}
              fas={1}
              mensagens={425}
              confiavel={3}
              legal={2}
              sexy={1}
            />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map(({ id, title, imageUrl }) => (
                <li key={id}>
                  <Link href={`/communities/${id}`} passHref>
                    <a>
                      <img
                        src={imageUrl}
                        alt={title}
                        style={{ borderRadius: '8px' }}
                      />
                      <span>{title}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => (
                <li key={pessoa}>
                  <a href={`/users/${pessoa}`}>
                    <img
                      src={`https://github.com/${pessoa}.png`}
                      alt={pessoa}
                      style={{ borderRadius: '8px' }}
                    />
                    <span>{pessoa}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
};

// export const getServerSideProps = async (ctx) => {
//   const cookies = nookies.get(ctx);
//   const tokenCriptografado = cookies.USER_TOKEN;
//   const tokenDescriptografado = jwt.decode(tokenCriptografado);

//   try {
//     const res = await fetch('https://alurakut.vercel.app/api/auth', {
//       headers: {
//         Authorization: tokenCriptografado,
//       },
//     });
//     const resJson = await res.json();
//     const { isAuthenticated } = await resJson;
//     console.log(isAuthenticated);

//     if (!isAuthenticated) {
//       const data = new Date();
//       const dataFormatada = data.toISOString();

//       return {
//         redirect: {
//           destination: `/login?action=authFailure&date=${dataFormatada}`,
//           permanent: false,
//         },
//       };
//     }
//   } catch (error) {
//     console.log(error.message);
//   }

//   const { githubUser } = tokenDescriptografado;

//   return {
//     props: {
//       githubUser,
//     },
//   };
// };

export default UserPage;
