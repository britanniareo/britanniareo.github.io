from . import BaseHandler

class HomePageHandler(BaseHandler):

	def get(self):
		INDEX_HTML = self.jinja2.render_template("debris_squad/index.html")
		self.response.headers['Content-Type'] = 'text/html'
		self.response.write(INDEX_HTML)