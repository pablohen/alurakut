import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/libs/AlurakutCommons';

const ProfileSidebar = ({ githubUser }) => {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        alt={githubUser}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
};

export default function Home() {
  const githubUser = 'pablohen';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vindo</h1>

            <OrkutNostalgicIconSet
              recados={1}
              fptos={5}
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({pessoasFavoritas.length})
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
}
