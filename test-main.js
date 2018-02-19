var allTestFiles = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/[Ss]pec\.js$/.test(file)) {
            allTestFiles.push(file);
        }
    }
}

require.config({
  baseUrl: '/base',

  paths: {
      '_': 'node_modules/lodash/lodash',
      'cheerio': 'node_modules/cheerio/lib/cheerio',
      'bytepushers': 'src/main/javascript/software.bytepushers.pick3.lottery.web.scraper'
  },

  shim: {
      bytepushers: {
          exports: 'BytePushers'
      },
      cheerio: {
          exports: 'Cheerio'
      },
      _: {
          exports: '_'
      }
  },

  deps: allTestFiles,

  callback: window.__karma__.start
});
