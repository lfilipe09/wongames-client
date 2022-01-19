module.exports = {
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  typescript: {
    reactDocgen: 'none',
  },
  webpackFinal: (config) =>{
    config.resolve.modules.push(`${process.cwd()}/src`)
    return config
  }
}