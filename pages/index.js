import { useState } from 'react';
import Link from 'next/link';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/libs/AlurakutCommons';

const ProfileSidebar = ({ githubUser }) => {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        alt={githubUser}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <a href={`https://github.com/${githubUser}`} className="boxLink">
        @{githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default function Home() {
  const githubUser = 'pablohen';
  const [comunidades, setComunidades] = useState([
    {
      id: 1,
      title: 'Alurakut',
      image:
        'https://blog.b2bstack.com.br/wp-content/uploads/2021/03/alura.jpg',
    },
    {
      id: 2,
      title: 'Não era pote de sorvete...',
      image: 'https://pbs.twimg.com/media/DLVOpctXcAEmDFn.jpg',
    },
    {
      id: 3,
      title: 'Sandy Júnior e Durval',
      image:
        'https://i.pinimg.com/originals/91/bb/f6/91bbf6aeabcce0aa854f6637f94154a7.jpg',
    },
    {
      id: 4,
      title: 'Fritas acompanha?',
      image:
        'https://pbs.twimg.com/profile_images/1592100104/Fritas-Acompanha-_400x400.png',
    },
  ]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const id = new Date().toISOString();
    const title = dadosDoForm.get('title');
    const image = dadosDoForm.get('image');

    const comunidade = {
      id,
      title,
      image,
    };

    setComunidades([...comunidades, comunidade]);
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
            <h1 className="title">Bem-vindo(a)</h1>

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

          <Box>
            <h2 className="subTitle">O que você desaja fazer?</h2>

            <form onSubmit={handleCriaComunidade}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser a sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser a sua comunidade?"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button type="submit" style={{ cursor: 'pointer' }}>
                Enviar
              </button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map(({ id, title, image }) => (
                <li key={id}>
                  <Link href={`/comunidades/${title}`} passHref>
                    <a>
                      <img
                        src={image}
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
                  <a href={`https://github.com/${pessoa}`}>
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
}
