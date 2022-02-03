# -*- coding: utf-8 -*-
# Copyright (c) 2022, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class BaselineForm(Document):
	pass

#fiter all child records related to PFR 
@frappe.whitelist()
def get_filter_child_pfr():
	get_child_record=frappe.db.sql("""select child from `tabPreliminary Fitment Report`""", as_dict=1)
	print("get_child",get_child_record)
	return get_child_record

@frappe.whitelist()
def get_child(child):
	get_data=frappe.db.sql("""select * from `tabPreliminary Fitment Report` where child ='"""+child+"""' """, as_dict=1)
	print("get_child",get_data)
	return get_data

@frappe.whitelist()
def get_physical_development_questions(age):
	get_physical_questions=frappe.db.sql("""select questions from `tabBaseline Questions Child` where area="Physical Development" and age='"""+age+"""' """, as_dict=1)
	print("get_phy_questions_details",get_physical_questions)
	return get_physical_questions

@frappe.whitelist()
def get_emotional_development_questions(age):
	get_emotional_questions=frappe.db.sql("""select questions from `tabBaseline Questions Child` where area="Emotional Development" and age='"""+age+"""' """, as_dict=1)
	print("get_emotional_questions",get_emotional_questions)
	return get_emotional_questions

@frappe.whitelist()
def get_social_development_questions(age):
	get_social_questions=frappe.db.sql("""select questions from `tabBaseline Questions Child` where area="Social Development" and age='"""+age+"""' """, as_dict=1)
	print("get_social_questions",get_social_questions)
	return get_social_questions

@frappe.whitelist()
def get_intellectual_development_questions(age):
	get_intellectual_questions=frappe.db.sql("""select questions from `tabBaseline Questions Child` where area="Intellectual Development" and age='"""+age+"""' """, as_dict=1)
	print("get_intellectual_questions",get_intellectual_questions)
	return get_intellectual_questions