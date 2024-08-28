const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Use only relevant presets for your project
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@unitools/image": "@unitools/image-expo",
            "@unitools/router": "@unitools/router-expo",
            "@unitools/link": "@unitools/link-expo",
          },
        },
      ],
      "@babel/plugin-transform-flow-strip-types",
      "react-native-reanimated/plugin",
      // Add other necessary plugins here, avoiding those that might conflict with SWC
    ],
  };
};
