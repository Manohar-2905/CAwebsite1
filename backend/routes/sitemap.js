const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Publication = require('../models/Publication');

router.get('/', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
    const services = await Service.find().select('slug');
    const publications = await Publication.find().select('slug');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/publications</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
${services.map(service => `  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${publications.map(publication => `  <url>
    <loc>${baseUrl}/publications/${publication.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
