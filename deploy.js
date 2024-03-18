/*
 * @Author: DLLCNX dllcnx@foxmail.com
 * @Date: 2021-06-18 13:04:57
 * @LastEditors: DLLCNX dllcnx@foxmail.com
 * @LastEditTime: 2024-03-18 17:23:46
 * @FilePath: /vue-document-ace/deploy.js
 * @Description: 
 */
const ghpages = require('gh-pages');

ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/KeiferJu/vue-document-ace.git'
}, function (err) {
    console.log(err);
});
