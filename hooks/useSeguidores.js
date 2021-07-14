import { useEffect, useState } from 'react';

const useSeguidores = (githubUser) => {
  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    const fetchSeguidores = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${githubUser}/followers`
        );
        const listaSeguidores = await res.json();
        setSeguidores(listaSeguidores);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSeguidores();
  }, [githubUser]);

  return seguidores;
};

export default useSeguidores;
