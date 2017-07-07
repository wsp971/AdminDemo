const path = require("path");
const webpack = require("webpack");
module.exports = {
    context: __dirname,
    entry: inputSetting("./public/js/src/",[
        "test.js"
    ]),
    output: {
        path: path.resolve(__dirname,"public/webpack/dist"),
        filename: "[name].bundle.js",
    },
    watchOptions:{
        watch: true,
        ignored:['./node_modules',"./log"]  /*忽略监控的目录*/
    },
    resolve:{
        /*alias 用来设置别名，可以设置 import amd commonjs 模块*/
        alias:{
            "lib": path.resolve(__dirname,"public/js/lib/"),
            "jquery-mousewheel": path.resolve(__dirname,"public/js/lib/jquery-mousewheel.js")
        }
    },
    /*放在外部加载的库*/
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'jQuery',
        "lodash": "_",
        "moment": "moment"
        // "layer": "layer"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    {loader: 'style-loader'},
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                use:[
                    {loader: "babel-loader"}
                ],
                exclude: ["node_modules"]
            },
            {
                test: /\.vue$/,
                use:[
                    {loader: "vue-loader"}
                ]
            }
        ]
    },
    plugins:[
        /*把所有需要打包的文件用来生成公共模块文件*/
        new webpack.optimize.CommonsChunkPlugin( "common")
    ]
}

function inputSetting(distPath,entrys){
    let result = {};
    if(Array.isArray(entrys)){
        entrys.map((entry)=>{
            result[prefix(entry)] = distPath +entry ;
        });
    }
    return result;
}


function prefix(file){
    let index = file.lastIndexOf(".");
    return file.substring(0,index);
}