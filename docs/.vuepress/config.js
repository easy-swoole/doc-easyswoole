const sidebar = require('./sidebar');

module.exports = {
    dest: 'publish',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'swoole,easyswoole,swoole框架,一款基于swoole实现的高并发与开发效率共存的微服务分布式框架',
            description: 'swoole,easyswoole,swoole框架是一款高度封装了swoole拓展而依旧保持swoole原有特性的一个高性能分布式微服务框架，旨在提供一个高效、快速、优雅的框架给php开发者'
        },
        '/En/': {
            lang: 'en-US',
            title: 'easyswoole,swoole framework,an height-performance php framework which base on swoole extension',
            description: 'easyswoole ,swoole framework,an height-performance php framework which base on swoole extension'
        }
    },
    themeConfig: {
        logo: '/resources/logo.png',
        theme: 'vuepress-theme-easyswoole',
        sidebar: 'auto',
        locales: {
            '/En/': {
                selectText: 'Language',
                label: 'ENGLISH',
                editLinkText: 'Edit this page on GitHub',
                sidebar: sidebar.sidebarEn,
                nav: [
                    {text: 'Websocket Test Tool', link: 'http://www.easyswoole.com/wstool.html'},
                ]
            },
            '/': {
                selectText: 'Language',
                label: '简体中文',
                editLinkText: '在 GitHub 上编辑此页',
                sidebar: sidebar.sidebarCn,
                nav: [
                    {text: 'Websocket调试工具', link: 'http://www.easyswoole.com/wstool.html'},
                ],
            },
        }
    },
    head: [
        ['script', {src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'}],
        ['script', {src: '/bdtj.js'}],
        ['script', {src: 'https://cdn.bootcss.com/layer/2.3/layer.js'}],
        ['href', {src: 'https://cdn.bootcss.com/layer/2.3/skin/layer.css', rel: "stylesheet"}],
        ['link', {rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
    ],
    port:8070
};