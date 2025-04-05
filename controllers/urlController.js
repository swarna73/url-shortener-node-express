const shortid = require('shortid');
const Url = require('../models/Url');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL required' });
  }

  const shortId = shortid.generate();
  const url = new Url({ originalUrl, shortId });

  await url.save();

  return res.json({ shortUrl: `${req.headers.host}/${shortId}` });
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) return res.status(404).json({ error: 'URL not found' });

  res.redirect(url.originalUrl);
};
