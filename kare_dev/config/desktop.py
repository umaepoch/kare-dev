# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "kare_dev",
			"category": "Modules",
			"label": _("KARE"),
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"type": "module"
		}
	]
