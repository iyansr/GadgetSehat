module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@gs': './src',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.native',
          '.native.js',
          '.native.json',
          '.native.ts',
          '.native.tsx',
        ],
      },
    ],
  ],
};
