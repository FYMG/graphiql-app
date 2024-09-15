const config = {
  'src/**/*.{ts,tsx}': (filenames) =>
    `eslint ${filenames.join(' ')} --fix --ignore-path .gitignore`,
  '**/*.{json,html,yml,md}': (filenames) =>
    `prettier ${filenames.join(' ')} --write --ignore-path .gitignore`,
};

export default config;
