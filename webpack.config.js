const path = require("path");
const webpack = require("webpack");
const SvelteNodeGUIPreprocessor = require("@nodegui/svelte-nodegui-preprocessor");
const SveltePreprocess = require("svelte-preprocess");
const { existsSync, rmSync } = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.argv.findIndex((v) => v === '--mode=development') !== -1
const dist = path.resolve(__dirname, "dist")

if (existsSync(dist) && !isDev) rmSync(dist, { recursive: true })

const defaultConfig = commonConfig()
const buildExport = [mainjs()]

if (!existsSync(path.join(dist, 'nodegui-lib.js'))) buildExport.push(libjs())
module.exports = buildExport;


function libjs() {
    return {
        ...defaultConfig,
        entry: "./src/lib.js",
        target: "node",
        output: {
            ...defaultConfig.output,
            filename: 'nodegui-lib.js'
        },
        module: {
            rules: [...defaultConfig.module.rules]
        },
        externals: {}
    }
}

function mainjs() {
    return {
        ...defaultConfig,
        entry: "./src/svelte/main.ts",
        externals: {
            '@nodegui/nodegui': '_node_gui',
            ...defaultConfig.externals,
        },
        resolve: {
            extensions: [".ts", ".mjs", ".js", ".svelte", ".scss", ".css", ".json"],
            conditionNames: ['require', 'svelte'],
        },
        module: {
            rules: [...defaultConfig.module.rules,
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: [
                    {
                        /**
                         * Note: Svelte Native uses a minor patch of svelte-loader. I'm not sure of the significance.
                         * @see https://github.com/halfnelson/svelte-native/blob/0af94fac6ea18f54f93ab299d0b512f91d722569/demo/package.json#L26
                         */
                        loader: 'svelte-loader',
                        options: {
                            preprocess: {
                                ...SveltePreprocess(),
                                ...SvelteNodeGUIPreprocessor(),
                            },
                            emitCss: true
                        }
                    }
                ]
            }]
        }
    };
}

function commonConfig(_isDev = isDev) {
    const coreModule = require("module").builtinModules.reduce((acc, cur) => (acc[cur] = `require("${cur}")`, acc), {})

    const config = {
        mode: _isDev ? "development" : "production",
        target: "web",
        output: {
            path: dist,
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|bmp|otf)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: { publicPath: "dist" }
                        }
                    ]
                },
                {
                    test: /\.(ts|mjs|js)$/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                            transpileOnly: true,
                            allowTsInNodeModules: true,
                            compilerOptions: {
                                sourceMap: _isDev,
                                declaration: false,
                            },
                        },
                    }
                },
                {
                    test: /\.node/i,
                    use: [
                        {
                            loader: "native-addon-loader",
                            options: { name: "[name].[ext]" }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
                            }
                        }
                    ]
                },
            ]
        },
        externals: coreModule,
        plugins: [
            new MiniCssExtractPlugin({ filename: 'styles.css' })
        ],
    };

    if (_isDev) {
        config.mode = "development";
        config.devtool = "source-map";
        config.watch = true;
    }

    return config;
}