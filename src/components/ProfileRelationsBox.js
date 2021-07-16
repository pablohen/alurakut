import { ProfileRelationsBoxWrapper } from './ProfileRelations';

const ProfileRelationsBox = ({ title, items }) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>

      <ul>
        {items.reverse().map(({ id, login, avatar_url }) => (
          <li key={id}>
            <a href={`/users/${login}`}>
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

export default ProfileRelationsBox;
