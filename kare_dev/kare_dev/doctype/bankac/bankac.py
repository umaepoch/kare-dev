# -*- coding: utf-8 -*-
# Copyright (c) 2022, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class BankAC(Document):
	pass

@frappe.whitelist()
def get_child():
	get_data=frappe.db.sql("""select name from `tabChild Master`""", as_dict=1)
	print("get_child",get_data)
	return get_data

@frappe.whitelist()
def get_listing():
	get_data=frappe.get_list("Doctype")
	print("get_child",get_data)
	return get_data