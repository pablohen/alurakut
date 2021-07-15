import { SiteClient } from 'datocms-client';

const communities = async (req, res) => {
  const { title, imageUrl, creatorSlug } = req.body;

  const TOKEN = process.env.DATO_FULL_ACCESS_API_KEY;
  const client = new SiteClient(TOKEN);

  const registroCriado = await client.items.create({
    itemType: '967557',
    title,
    imageUrl,
    creatorSlug,
  });

  console.log(TOKEN);

  res.json(registroCriado);
};

export default communities;
