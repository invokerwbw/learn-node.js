var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end((err, res) => {
        if (err) {
            return console.error(err);
        }

        var topicUrls = [];
        var $ = cheerio.load(res.text);
        // 获取首页所有的链接
        $('#topic_list .topic_title').each((index, element) => {
            var $element = $(element);
            // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
            // 我们用 url.resolve 来自动推断出完整 url，变成
            // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
            // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });

        console.log('topicUrls:');
        console.log(topicUrls);

        // 截取url，防止并发限制
        topicUrls = topicUrls.slice(0, 3);

        // 得到 topicUrls 之后

        // 得到一个 eventproxy 的实例
        var ep = new eventproxy();

        // 命令 ep 重复监听 topicUrls.length 次 `topic_html` 事件再行动
        ep.after('topic_html', topicUrls.length, (topics) => {
            console.log('final:');
            console.log(topics);
        });

        topicUrls.forEach((topicUrl) => {
            // 进入主题
            superagent.get(topicUrl)
                .end((err, res) => {
                    console.log(`fetch ${topicUrl} successful`);
                    var $ = cheerio.load(res.text);

                    var href = url.resolve(cnodeUrl, $('.author_content > a').eq(0).attr('href'));
                    var title = $('.topic_full_title').text().trim();
                    var comment1 = $('.reply_content').eq(0).text().trim();

                    // 进入第一条评论的作者信息
                    superagent.get(href)
                        .end((err, res2) => {
                            console.log(`fetch ${href} successful`);
                            $ = cheerio.load(res2.text);

                            ep.emit('topic_html', {
                                title: title,
                                href: topicUrl,
                                comment1: comment1,
                                author1: $('div.userinfo > a').text().trim(),
                                score1: $('div.user_profile > ul > span').text().trim()
                            });
                        });
                });
        });

    });