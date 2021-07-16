import Box from './Box';
import { AlurakutProfileSidebarMenuDefault } from '../libs/AlurakutCommons';

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

export default ProfileSidebar;
