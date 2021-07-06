const withFonts = require('nextjs-fonts');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = withFonts({
  webpack: (config, {
    // buildId,
    dev,
    // isServer,
    // defaultLoaders,
    webpack
  }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    if (dev) {
      config.plugins.push(new Dotenv({
        path: path.join(__dirname, '.env.dev'),
        systemvars: true
      }));
    } else {
      config.plugins.push(new Dotenv({
        path: path.join(__dirname, '.env.prod'),
        systemvars: true
      }));
    }
    return config;
  },
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    localeDetection: true
  },
  images: {
    domains: [
      'hubbers-files-storage.s3.amazonaws.com',
      'hubbers-us.oss-us-west-1.aliyuncs.com',
      'hubbers-hk.oss-cn-hongkong.aliyuncs.com',
      'encrypted-tbn0.gstatic.com',
      'www.countryflags.io',
      'i.ytimg.com',
      'cdn.pixabay.com',
      'fiverr-res.cloudinary.com',
      'images.pexels.com',
      'ui-avatars.com',
      'blog.hubbers.io',
      'media.licdn.com',
      'flagcdn.com'
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
});