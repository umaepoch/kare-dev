# -*- coding: utf-8 -*-
# Copyright (c) 2022, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class BaselineQuestions(Document):
	pass

@frappe.whitelist()
def get_questions():
	get_questions_details=frappe.db.sql("""select name,questions,area,5_to_9,10_to_12,13_to_15,16_to_18 from `tabQuestions`""", as_dict=1)
	print("get_questions_details",get_questions_details)
	return get_questions_details

@frappe.whitelist()
def select_action(parent,options):
	get_action_details=frappe.db.sql("""select `tabActions`.`options`,`tabActions`.`actions_need_to_be_taken`,`tabActions`.`parent` from `tabActions` where parent='"""+parent+"""' and options='"""+options+"""' """, as_dict=1)
	print("actions",get_action_details)
	return get_action_details