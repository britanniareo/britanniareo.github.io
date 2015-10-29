var global = {
  root: './',
  dist: './dist',
  src: './src'
};

module.exports = {
  browserSync: {
    server: {
      baseDir: global.root
    },
    open: true
  },
  sass: {
    src: global.src+'/scss/**/*.scss',
    dist: global.dist+'/css',
    settings: {
      sourceComments: 'map',
      imagePath: '/dist/img' // Used by the image-url helper
    }
  }
};