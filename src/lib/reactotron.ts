import Reactotron from 'reactotron-react-native';

Reactotron.configure()
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /(symbolicate)|(generate_204)|(maintenance-modes)/,
    },
  }) // add all built-in react native plugins
  .connect(); // let's connect!

const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args.length === 1 ? args[0] : args,
    preview: JSON.stringify(args),
  });
};
