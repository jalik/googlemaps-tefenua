const path = require("path");

const paths = {
    build: path.join(__dirname, "dist", "assets"),
    dist: path.join(__dirname, "dist"),
    src: path.join(__dirname, "dist")
};

module.exports = {
    entry: {
        bundle: path.join(paths.src, "js", "index.js")
    },
    output: {
        libraryTarget: "umd",
        path: paths.build,
        filename: path.join("js", "[name].js")
    },
    resolve: {
        extensions: [".js"],
        modules: [paths.src, "node_modules"]
    },
    devServer: {
        hot: true,
        port: 3000,
        contentBase: paths.dist,
        publicPath: paths.dist,
        watchContentBase: true
    },
};
