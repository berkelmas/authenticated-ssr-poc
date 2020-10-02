const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = {
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    ...withLess(
      withSass({
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
        webpack(config) {
          const { module = {} } = config;
          return {
            ...config,
            module: {
              ...module,
              rules: [
                ...(module.rules || []),
                {
                  test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
                  loader: "file-loader",
                  options: {
                    name: "[name]_[hash].[ext]",
                    publicPath: `/_next/static/files`,
                    outputPath: "static/files",
                  },
                },
              ],
            },
          };
        },
      })
    ),
  }),
};
