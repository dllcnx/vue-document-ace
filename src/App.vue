<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-header class="smx-docs-header">
            <div style="display: inline-block;position: absolute;">
                <img alt="logo" :src="logo" style="height: 50px;margin: auto 15px">
            </div>
            <h2>{{name}}</h2>
        </a-layout-header>
        <a-layout class="smx-docs-home">
            <a-layout-sider width="250" class="smx-docs-map">
                <a-menu v-if="config" :theme="theme" mode="inline" :defaultSelectedKeys="[defaultSelectedKey]"
                        :defaultOpenKeys="[config.defaultOpenItem]" :style="{ height: '100%', borderRight: 0 }">
                    <template v-for="(items, key) in config.sider">
                        <a-sub-menu :key="key">
                            <span slot="title"><a-icon :type="appstore"/>{{key}}</span>
                            <template v-for="item in items">
                                <a-menu-item :key="item.key" @click="openItem(item.page)">
                                    <a-icon v-if="item.icon" :type="item.icon"/>
                                    <a-icon v-else type="read"/>
                                    {{item.title}}
                                </a-menu-item>
                            </template>
                        </a-sub-menu>
                    </template>
                </a-menu>

            </a-layout-sider>
            <a-layout>
                <a-layout-sider :width="editorWidth+ '%'" class="smx-docs-editor">
                    <div class="saveBar">
                        <span class="label">代码编辑器</span>
                        <!--                        <a-icon type="bg-colors" class="icon" @click="beautifulHtml"/>-->
                        <a-icon type="play-circle" class="icon" @click="runHtml" title="Ctrl-S[Command-S]"/>
                        运行
                        <a-icon type="undo" class="icon" @click="undoHtml"/>
                        刷新
                    </div>
                    <editor v-model="content" @init="editorInit" lang="html" theme="monokai" width="100%"
                            :options="options" height="calc(100% - 30px)">
                    </editor>
                    <div class="smx-docs-draw" @click="switchEditor">
                        <div class="smx-docs-up">
                        </div>
                        <div class="smx-docs-down">
                        </div>
                        <a-icon v-if="editorDraw" class="smx-docs-close" type="left"/>
                        <a-icon v-if="!editorDraw" class="smx-docs-close" type="right"/>
                    </div>

                </a-layout-sider>
                <a-layout-sider :width="(100-editorWidth)+ '%'" class="smx-docs-map">
                    <iframe ref="iframe" frameborder="0" id="container" allowfullscreen="true"
                            style="overflow: hidden; width: 100%; height: 100%;"></iframe>
                </a-layout-sider>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
    import ALayoutSider from "ant-design-vue/es/layout/Sider";

    const editor = require('./ace');
    export default {
        components: {ALayoutSider, editor: editor},
        data() {
            return {
                content: '',
                contentBak: '',
                options: { /*vue2-ace-editor编辑器配置自动补全等*/
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true, /*自动补全*/
                    fontSize: 12
                },
                config: null,
                defaultSelectedKey: null,
                editorDraw: true,
                editorWidth: 45,
                theme: 'light',
                name: '',
                logo: '',
                appstore: ''
            }
        },
        methods: {
            editorInit: function (editor) {
                const self = this;
                require('brace/ext/language_tools'); //language extension prerequsite...
                require('brace/mode/html');
                require('brace/mode/javascript');  //language
                require('brace/mode/less');
                require('brace/theme/monokai');
                editor.commands.addCommand({
                    name: 'myCommand',
                    bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
                    exec: function () {
                        self.$refs.iframe.srcdoc = self.content;
                    },
                    readOnly: true // false if this command should not apply in readOnly mode
                });
            },
            runHtml: function () {
                this.$refs.iframe.srcdoc = this.content;
            },
            undoHtml: function () {
                this.$refs.iframe.srcdoc = this.contentBak;
            },
            beautifulHtml: function () {
                if (this.theme === 'dark') {
                    this.theme = 'light';
                } else {
                    this.theme = 'dark';
                }
            },
            openItem: function (page) {
                this.$axios.get('/case/html/' + page).then((result) => {
                    this.content = result.data;
                    this.contentBak = result.data;
                    this.$refs.iframe.srcdoc = this.content;
                    this.editorDraw = true;
                    this.editorWidth = 45;
                })
            },
            switchEditor: function () {
                this.editorDraw = !this.editorDraw;
                if (this.editorDraw) {
                    this.editorWidth = 45;
                } else {
                    this.editorWidth = 0;
                }
            },
        },
        mounted() {
            const self = this;
            this.$axios.get('/case/sider.json').then((result) => {
                self.config = result.data;
                if (self.config.icon) {
                    self.appstore = self.config.icon;
                } else {
                    self.appstore = 'appstore';
                }
                if (self.config.name) {
                    self.name = self.config.name;
                } else {
                    self.name = '文档示例';
                }
                if (self.config.logo) {
                    if (self.config.logo) {
                        if (self.config.logo === 'local') {
                            self.logo = require('../public/case/logo.png');
                        } else {
                            self.logo = this.config.logo;
                        }
                    }
                } else {
                    self.logo = require('./assets/logo.png');
                }
                let pages;
                if (self.config.defaultOpenItem) {
                    pages = self.config.sider[self.config.defaultOpenItem];
                } else {
                    for (var key in self.config.sider) {
                        pages = self.config.sider[key];
                        return;
                    }
                }

                self.defaultSelectedKey = pages[0].key
                self.openItem(pages[0].page);
            });

        }
    };
</script>

<style>
    #components-layout-demo-top-side-2 .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
    }

    .smx-docs-home {
        height: calc(100vh - 64px)
    }

    .smx-docs-header {
        background: #1199c4;
    }

    .smx-docs-header h2 {
        color: #fff;
        font-weight: bold;
        display: inline-block;
        position: absolute;
        left: 125px;
    }

    .smx-docs-map {
        background: #fff;
    }

    .smx-docs-editor .icon {
        margin: auto 5px;
    }

    .ant-layout .ant-layout-has-sider {
        overflow: hidden;
    }

    .saveBar {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #333;
        padding: 0 10px;
        text-align: right;
        background: #e7ecee;
        overflow: hidden;
    }

    .saveBar .label {
        float: left;
        font-weight: 500;
    }


    .smx-docs-draw {
        position: absolute;
        right: -15px;
        top: calc(50% - 30px);
        color: #fff;
        z-index: 999;
        cursor: pointer;
    }

    .smx-docs-close {
        position: absolute;
        top: 0;
        line-height: 60px;
    }

    .smx-docs-up {
        top: calc(50% - 15px);
        border-top: 15px solid rgba(0, 0, 0, 0);
        /*border-right:50px solid yellow;*/
        border-bottom: 15px solid #2882ff;
        border-left: 15px solid #2882ff;
    }

    .smx-docs-down {
        top: calc(50% + 15px);
        border-top: 15px solid #2882ff;
        /*border-right:15px solid #ff98c3;*/
        border-bottom: 15px solid rgba(0, 0, 0, 0);
        border-left: 15px solid #2882ff;
    }
</style>
