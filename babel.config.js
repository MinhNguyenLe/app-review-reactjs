module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
  ],
  only: ["./**/*.jsx", "./**/*.js", "node_modules/jest-runtime"],
};

