# -*- coding: utf-8 -*-
# Copyright (c) 2022, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from datetime import datetime
from datetime import date

class EvaluationForm(Document):
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
	get_physical_questions=frappe.db.sql("""select options,record_no,questions,actions from `tabBaseline Questions Child` where area="Physical Development" and age='"""+age+"""' """, as_dict=1)
	print("get_phy_questions_details",get_physical_questions)
	return get_physical_questions

@frappe.whitelist()
def get_emotional_development_questions(age):
	get_emotional_questions=frappe.db.sql("""select options,record_no,questions,actions from `tabBaseline Questions Child` where area="Emotional Development" and age='"""+age+"""' """, as_dict=1)
	print("get_emotional_questions",get_emotional_questions)
	return get_emotional_questions

@frappe.whitelist()
def get_social_development_questions(age):
	get_social_questions=frappe.db.sql("""select options,record_no,questions,actions from `tabBaseline Questions Child` where area="Social Development" and age='"""+age+"""' """, as_dict=1)
	print("get_social_questions",get_social_questions)
	return get_social_questions

@frappe.whitelist()
def get_intellectual_development_questions(age):
	get_intellectual_questions=frappe.db.sql("""select options,record_no,questions,actions from `tabBaseline Questions Child` where area="Intellectual Development" and age='"""+age+"""' """, as_dict=1)
	print("get_intellectual_questions",get_intellectual_questions)
	return get_intellectual_questions

@frappe.whitelist()
def get_spiritual_development_questions(age):
	get_spiritual_questions=frappe.db.sql("""select options,record_no,questions,actions from `tabBaseline Questions Child` where area="Spiritual Development" and age='"""+age+"""' """, as_dict=1)
	print("get_spiritual_questions",get_spiritual_questions)
	return get_spiritual_questions

@frappe.whitelist()
def select_action(parent,options):
	get_action_details=frappe.db.sql("""select `tabActions`.`options`,`tabActions`.`actions_need_to_be_taken`,`tabActions`.`parent` from `tabActions` where parent='"""+parent+"""' and options='"""+options+"""' """, as_dict=1)
	print("actions",get_action_details)
	return get_action_details

@frappe.whitelist()
def fetch_ssg_code(name):
	get_ssg_code=frappe.db.sql("""select name,first_name,ssg_code from `tabChild Master` where name='"""+name+"""' """, as_dict=1)
	print("get_ssg_code",get_ssg_code)
	return get_ssg_code

#dob
@frappe.whitelist()
def fetch_dob(name):
	get_dob=frappe.db.sql("""select name,first_name,date_of_birth from `tabChild Master` where name='"""+name+"""' """, as_dict=1)
	print("get_dob",get_dob)
	return get_dob

@frappe.whitelist()
def calculateAge(date_of_birth):
	print("getting date of birth",date_of_birth)
	y = date.today().year
	m = date.today().month
	d = date.today().day
	dob_convrt = datetime.strptime(date_of_birth, '%Y-%m-%d')
	dob = dob_convrt.date()
	print("dt",dob)
	print (dob.year, dob.month, dob.day)

	if dob.day > d and dob.month >= m:
		dd = (d + 30) - dob.day
		mm = ((m - 1) + 12) - dob.month
		yy = (y - 1) - dob.year
		print("age 1",str(yy))
		return str(yy)
	elif dob.day > d and dob.month < m:
		dd = (d + 30) - dob.day
		mm = m - dob.month
		yy = y - dob.year
		print("age 2",str(yy),str(mm),str(dd))
		return str(yy)
	elif dob.day < d and dob.month > m:
		dd = d - dob.day
		mm = (m + 12) - dob.month
		yy = (y - 1) - dob.year
		print("age 3",str(yy),str(mm),str(dd))
		return str(yy)
	else:
		dd = d - dob.day
		mm = m - dob.month
		yy = y - dob.year
		return str(yy)