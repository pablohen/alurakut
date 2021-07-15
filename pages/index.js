import { useState } from 'react';
import Link from 'next/link';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import useSeguidores from '../hooks/useSeguidores';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/libs/AlurakutCommons';
import useCommunities from '../hooks/useCommunities';
import slugify from 'slugify';

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

const ProfileRelationsBox = ({ title, items }) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>

      <ul>
        {items.reverse().map(({ id, login, avatar_url }) => (
          <li key={id}>
            <a href={`https://github.com/${login}`}>
              <img
                src={avatar_url}
                alt={login}
                style={{ borderRadius: '8px' }}
              />
              <span>{login}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

export default function Home() {
  const githubUser = 'pablohen';
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
            <h2 className="subTitle">O que você deseja fazer?</h2>

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
                  name="imageUrl"
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
