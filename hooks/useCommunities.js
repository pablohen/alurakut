import { useEffect, useState } from 'react';

const useCommunities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch('https://graphql.datocms.com', {
          method: 'POST',
          headers: {
            Authorization: '4acdad970f014424e0c117cd261ea9',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: `
            {
              allCommunities {
                id
                title
                imageUrl
                _status
                _firstPublishedAt
                creatorSlug
              }
            }
          `,
          }),
        });
        const datoRes = await res.json();
        const listaComunidades = datoRes.data.allCommunities;
        setCommunities(listaComunidades);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCommunities();
  }, []);

  return [communities, setCommunities];
};

export default useCommunities;
