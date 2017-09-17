import logging, os, yaml
from google.appengine.api import app_identity

if os.environ.get('SERVER_SOFTWARE', '').startswith('Dev'):
    environment = "local"
else:
    try:
        environment = app_identity.get_application_id()
    except:
        environment = "local"

logging.info("** Environment: %s" % environment)

config_file = "%s.yaml" % environment
logging.info("** Config file: %s" % config_file)

curr_path = os.path.dirname(__file__)
config_path = os.path.join(curr_path, "config", config_file)
logging.info("** Config path: %s" % config_path)

stream = file(config_path, 'r')
config = yaml.load(stream)
config["environment"] = environment


stream.close()
