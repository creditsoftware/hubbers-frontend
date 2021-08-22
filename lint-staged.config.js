module.exports = {
  '**/*.js?(x)': () => 'yarn lint',
  '**/*.(ts|js)?(x)': (filenames) => `yarn lint . ${filenames.join(' ')}`,
};