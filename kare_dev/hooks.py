# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "kare_dev"
app_title = "kare_dev"
app_publisher = "Yashwanth A N"
app_description = "App for managing Articles, Members, Memberships and Transactions for Libraries"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "yashwanth@meritsystems.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/kare_dev/css/kare_dev.css"
# app_include_js = "/assets/kare_dev/js/kare_dev.js"

# include js, css files in header of web template
# web_include_css = "/assets/kare_dev/css/kare_dev.css"
# web_include_js = "/assets/kare_dev/js/kare_dev.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "kare_dev.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "kare_dev.install.before_install"
# after_install = "kare_dev.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "kare_dev.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"kare_dev.tasks.all"
# 	],
# 	"daily": [
# 		"kare_dev.tasks.daily"
# 	],
# 	"hourly": [
# 		"kare_dev.tasks.hourly"
# 	],
# 	"weekly": [
# 		"kare_dev.tasks.weekly"
# 	]
# 	"monthly": [
# 		"kare_dev.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "kare_dev.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "kare_dev.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "kare_dev.task.get_dashboard_data"
# }

