/** @type {import('next').NextConfig} */
const { DefinePlugin } = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@gluestack-ui/nativewind-utils",
    "nativewind",
    "react-native-css-interop",
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
      "@unitools/router": "@unitools/router-next",
      "@unitools/image": "@unitools/image-next",
      "@unitools/link": "@unitools/link-next",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    // Add this rule to transpile @expo/html-elements
    config.module.rules.push({
      test: /node_modules\/@expo\/html-elements\/.*\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    });

    // Ignore the problematic package
    config.module.rules.push({
      test: /node_modules\/@react-native\/assets-registry\/registry\.js$/,
      use: 'ignore-loader'
    });

    config.plugins.push(
      new DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      })
    );

    return config;
  },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
