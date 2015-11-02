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
  images: {
    src: global.src+'/img/**/*',
    dist: global.dist+'/img'
  },
  sass: {
    src: global.src+'/scss/**/*.scss',
    dist: global.dist+'/css',
    settings: {
      sourceComments: 'map',
      imagePath: '/img' // Used by the image-url helper
    }
  },
  scripts: {
    dist: global.dist+'/js',
    src: global.src+'/js'
  }
};