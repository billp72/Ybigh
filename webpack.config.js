//const webpack = require("webpack");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: {
    "CanvasRenderer": path.resolve(__dirname, "public/js/CanvasRenderer.js"),
    "findIndex_pollyfill": path.resolve(__dirname, "public/js/findIndex_pollyfill.js"),
    "OrbitControl": path.resolve(__dirname, "public/js/OrbitControls.js"),
    //"path2d_polly": path.resolve(__dirname, "public/js/path2d_polly.js"),
    "pointToPath_fix": path.resolve(__dirname, "public/js/pointToPath_fix.js"),
    "Projector": path.resolve(__dirname, "public/js/Projector.js"),
    "s1": path.resolve(__dirname, "public/js/s1.js"),
    "s2": path.resolve(__dirname, "public/js/s2.js"),
    "three": path.resolve(__dirname, "public/js/three.js"),
    "THREEx.WindowResize": path.resolve(__dirname, "public/js/THREEx.WindowResize.js"),
    //"absoluteBoundingRec": path.resolve(__dirname, "public/js/absoluteBoundingRec.js")
  },
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "[name]-min.js"
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    alias: {
      'request': path.resolve(__dirname, 'request.js')
    },
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "net": require.resolve("net-browserify"),
      "tls": require.resolve("tls-browserify")
    }
  }
};