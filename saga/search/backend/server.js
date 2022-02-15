const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const fs = require('fs');

const app = new Koa();
app.use(cors());
app.use(koaBody({ json: true }));


const news = JSON.parse(fs.readFileSync('./news.json'));

const router = new Router();
let isEven = true;


router.get('/api/search', async (ctx, next) => {

  if (Math.random() > 0.75) {
    ctx.response.status = 500;
    return;
  }

  const { q } = ctx.request.query;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = news.filter(i =>
        new RegExp(q.replace(/[^\p{L}\s\d]/ui, ""), "ui").test(i.text)
      ).map(i => {
        const { id, text } = i;
        return {
          id, text: text.replace(
            new RegExp(
              ["(", q.replace(/[^\p{L}\s\d]/gui, ""), ")"].join(""), "gui"
            ),
            "<mark>$1</mark>"
          )
        };
      });
      ctx.response.body = response;
      resolve();
    }, isEven ? 1 * 1000 : 3 * 1000);
    isEven = !isEven;
  });
});


app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
