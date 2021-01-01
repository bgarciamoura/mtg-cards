module.exports = {
    trailingSlash: true,
    env: {
        base_api_url: 'http://localhost:3000/api',
        base_magic_url: 'https://api.magicthegathering.io/v1',
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    images: {
        domains: ['gatherer.wizards.com', 'c1.scryfall.com'],
    },
};
