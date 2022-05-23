const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


module.exports = merge(commonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                  {
                    // 只在 production 環境啟用壓縮
                    loader: 'image-webpack-loader', 
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
                    }
                  },
                ],
            },
        ]
    },
});