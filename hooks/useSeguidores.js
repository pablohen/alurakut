import { useEffect, useState } from 'react';

const useSeguidores = (githubUser) => {
  const [seguidores, setSeguidores] = useState([]);
  const [carregandoSeguidores, setCarregandoSeguidores] = useState(true);

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
      setCarregandoSeguidores(false);
    };

    fetchSeguidores();
  }, [githubUser]);

  return [seguidores, carregandoSeguidores];
};

export default useSeguidores;
