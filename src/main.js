import Vue from 'vue'
import {Menu, Button, Icon, Layout, Tree} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import App from './App.vue'

Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Menu.Divider.name, Menu.Divider);
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup);
Vue.component(Tree.name, Tree);
Vue.component(Tree.TreeNode.name, Tree.TreeNode);
Vue.component(Tree.DirectoryTree.name, Tree.DirectoryTree);

Vue.config.productionTip = false;


Vue.prototype.$axios = axios;
new Vue({
    render: h => h(App),
}).$mount('#app')
