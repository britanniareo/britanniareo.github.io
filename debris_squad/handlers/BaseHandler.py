import webapp2
from webapp2_extras import jinja2

def jinja(app):
	jinja = jinja2.get_jinja2(app=app)
	return jinja

class BaseHandler(webapp2.RequestHandler):
	
	@webapp2.cached_property
	def jinja2(self):
		return jinja(self.app)