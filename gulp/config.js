var global = {
  root: './',
  dist: './static/dist',
  src: './static/src'
};

module.exports = {
  browserSync: {
    server: {
      baseDir: global.root
    },
    open: true
  },
  env: {
    prod: "britannia-reo",
    dev: "dev-britannia-reo"
  },
  html: {
    dist: global.dist + '/html',
    src: global.src + '/html/**/*.html'
  },
  images: {
    src: global.src+'/img/**/*',
    dist: global.dist+'/img'
  },
  styles: {
    src: global.src+'/scss/**/*.scss',
    dist: global.dist+'/css',
    settings: {
      sourceComments: 'map'
    }
  },
  scripts: {
    dist: global.dist+'/js',
    src: global.src+'/js',
    watchSrc: global.src+'/js/**/*.js'
  }
};