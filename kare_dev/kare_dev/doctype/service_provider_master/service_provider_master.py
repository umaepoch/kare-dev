# -*- coding: utf-8 -*-
# Copyright (c) 2021, Pavithra M R and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
from frappe.contacts.address_and_contact import load_address_and_contact, delete_contact_and_address
import base64
import json

class ServiceProviderMaster(Document):
	def onload(self):
		"""Load address and contacts in `__onload`"""
		load_address_and_contact(self)

	def on_trash(self):
		delete_contact_and_address('Service Provider Master', self.name)

@frappe.whitelist()
def create_image_url(doc):
	try:
		img = json.loads(doc)
		b64 = base64.b64decode(img['data'])
		first_name = img['first_name']
		image_name = img['image_name']
		doctype = img['doctype']
		doc_name = img['doc_name']

		if img:
			sf = save_file(first_name+"_"+image_name+".png", b64, doctype, doc_name)
			return {"SC": True, "file_url":sf.file_url}

		return {"SC": False}
	except Exception as ex:
		return {"EX": ex}

@frappe.whitelist()
def get_saathi_details(name):
	print("saathi",name)	
	get_child_data=frappe.db.sql("""select `tabService Provider Master`.`first_name`,`tabService Provider Master`.`middle_name`,`tabService Provider Master`.`last_name` from `tabService Provider Master` where `tabService Provider Master`.`name`='"""+name+"""' """, as_dict=1)
	print("saathi",get_child_data)
	return get_saathi_details

