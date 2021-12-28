# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
import base64
import json

class ChildMaster(Document):
	pass

@frappe.whitelist()
def create_image_url(doc):
	try:
		img = json.loads(doc)
		# b64 = base64.b64decode(img['data'])
		# first_name = img['first_name']
		# image_name = img['image_name']
		# doctype = img['doctype']
		# doc_name = img['doc_name']

		print(img)
		# if img:
		# 	sf = save_file(first_name+"_"+image_name+".png", b64, doctype, doc_name)
		# 	return {"SC": True, "file_url":sf.file_url}

		return {"SC": False}
	except Exception as ex:
		return {"EX": ex}
