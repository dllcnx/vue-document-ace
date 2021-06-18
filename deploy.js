const ghpages = require('gh-pages');

ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/KeiferJu/DocumentAce.git'
}, function (err) {
    console.log(err);
});
