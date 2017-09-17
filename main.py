#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import os
import sys

# For importing 3rd party modules
cd = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(cd, 'lib'))

import logging, webapp2
from webapp2_extras.routes import DomainRoute, PathPrefixRoute, RedirectRoute
import debris_squad.handlers as debris_squad
from config import config

class MainHandler(webapp2.RequestHandler):
    def get(self):
        INDEX_HTML = open('index.html').read()
        self.response.headers['Content-Type'] = 'text/html'
        self.response.write(INDEX_HTML)

class ServicesHandler(webapp2.RequestHandler):
	def get(self):
		services = open('data/services.json').read()
		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(services)

class ServiceAreasHandler(webapp2.RequestHandler):
	def get(self):
		service_areas = open('data/service-areas.json').read()
		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(service_areas)

routes = []

for domain in config["domains"]["britannia"]:

	routes.append(
		DomainRoute(domain, [
			RedirectRoute(r'/', handler=MainHandler, strict_slash=True, name="britannia"),
			webapp2.Route(r'/api/services/v1', handler=ServicesHandler, name="britannia_api_services"),
			webapp2.Route(r'/api/service-areas/v1', handler=ServiceAreasHandler, name="britannia_api_service_areas")
		])
	)

for domain in config["domains"]["debris_squad"]:

	routes.append(
		DomainRoute(domain, [
			RedirectRoute(r'/', handler=debris_squad.HomePageHandler, strict_slash=True, name="debris_squad")
		])
	)

app = webapp2.WSGIApplication(routes, debug=True)
