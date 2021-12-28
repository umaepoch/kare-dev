# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
import base64

class ChildMaster(Document):
	pass

@frappe.whitelist()
def create_image_url(data, image_name, doc_name, first_name, doctype):
	try:
		b64 = base64.b64decode(data)
		if b64:
			sf = save_file(first_name+"_"+image_name+".png", b64, doctype, doc_name)
			return {"SC": True, "file_url":sf.file_url}

		return {"SC": False}
	except Exception as ex:
		return {"EX": ex}
