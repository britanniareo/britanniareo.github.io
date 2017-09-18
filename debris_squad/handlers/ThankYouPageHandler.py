from . import BaseHandler

class ThankYouPageHandler(BaseHandler):

	def get(self):
		PAGE_HTML = self.jinja2.render_template("debris_squad/thank-you.html")
		self.response.headers['Content-Type'] = 'text/html'
		self.response.write(PAGE_HTML)