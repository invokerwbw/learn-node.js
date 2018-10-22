const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    path = path || 'views';
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv(null, {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s1 = env.render('hello.html', { name: '<script>alert("小明")</script>' });
console.log(s1);

var s2 = env.render('fruits.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});
console.log(s2);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));