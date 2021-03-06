module.exports = {
    // 客户端文件目录
    srcDir: 'client/',
    // 存放环境变量
    env: {

    },
    // 配置web头部信息
    head: {
        title: 'AI Design - 敲客智能设计图像渲染',
        meta: [
            { lang: 'zh-cn' },
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Meta description' }
        ]
    },
    css: [
        'element-ui/lib/theme-chalk/index.css'
    ],
    axios: {
        // 网关需要在后面添加/sclpay
        baseURL: '',
        proxy: false, // Can be also an object with default options
        credentials: true
    },
    dev: (process.env.NODE_ENV !== 'production'),
    plugins: [
        '@/plugins/font-awesome',
        '@/plugins/element-ui',
    ],
    modules: [
        '@nuxtjs/axios',
        'nuxt-fontawesome',
    ],
    fontawesome: {
        component: 'fa',
        imports:
            [
                {
                    set: '@fortawesome/pro-light-svg-icons',
                    icons: ['fal']
                },
                {
                    set: '@fortawesome/pro-solid-svg-icons',
                    icons: ['fas']
                }
            ]
    },
    server: {
        host: '127.0.0.1',
        port: '3001',
        timing: {
            total: true
        }
    }
}