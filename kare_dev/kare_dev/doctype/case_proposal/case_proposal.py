# -*- coding: utf-8 -*-
# Copyright (c) 2021, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CaseProposal(Document):
	pass

@frappe.whitelist()
def get_child_details(child):
	print("child",child)	
	get_child_data=frappe.db.sql("""select `tabChild Master`.`first_name`,`tabChild Master`.`middle_name`,`tabChild Master`.`last_name`,`tabChild Master`.`gender`,`tabChild Master`.`date_of_birth`,`tabChild Master`.`address` from `tabChild Master` where `tabChild Master`.`name`='"""+child+"""' """, as_dict=1)
	print("get_child_details",get_child_data)
	return get_child_data

@frappe.whitelist()
def get_caregiver_details(caregiver):
	print("caregiver",caregiver)	
	get_caregiver_data=frappe.db.sql("""select `tabCaregiver Master`.`first_name`,`tabCaregiver Master`.`middle_name`,`tabCaregiver Master`.`last_name`,`tabCaregiver Master`.`skill`,`tabCaregiver Master`.`education`,`tabCaregiver Master`.`employed`,`tabCaregiver Master`.`type_of_employment` from `tabCaregiver Master` where `tabCaregiver Master`.`name`='"""+caregiver+"""' """, as_dict=1)
	print("get_caregiver_data",get_caregiver_data)
	return get_caregiver_data

@frappe.whitelist()
def get_saathi_name(name):
	print("saathi",name)	
	get_saathi_name=frappe.db.sql("""select `tabService Provider Master`.`first_name`,`tabService Provider Master`.`middle_name`,`tabService Provider Master`.`last_name` from `tabService Provider Master` where `tabService Provider Master`.`name`='"""+name+"""' """, as_dict=1)
	print("saathi",get_saathi_name)
	return get_saathi_name

@frappe.whitelist()
def get_coordinator_name(name):
	print("coordinator",name)	
	get_coordinator_name=frappe.db.sql("""select `tabService Provider Master`.`first_name`,`tabService Provider Master`.`middle_name`,`tabService Provider Master`.`last_name` from `tabService Provider Master` where `tabService Provider Master`.`name`='"""+name+"""' """, as_dict=1)
	print("coordinator",get_coordinator_name)
	return get_coordinator_name

@frappe.whitelist()
def get_address(name):
	print("address title",name)	
	get_address_details=frappe.db.sql("""select `tabAddress`.`address_title`,`tabAddress`.`address_line1`,`tabAddress`.`address_line2`,`tabAddress`.`city`,`tabAddress`.`state`,`tabAddress`.`country`, `tabAddress`.`pincode`, `tabAddress`.`phone` from `tabAddress` where `tabAddress`.`name`='"""+name+"""' """, as_dict=1)
	print("get_address_details",get_address_details)
	return get_address_details

@frappe.whitelist()
def get_docstatus(name):
	print("",name)	
	docstatus=frappe.db.sql("""select name,docstatus,accepted from `tabPreliminary Fitment Report` where `tabPreliminary Fitment Report`.`name`='"""+name+"""' """, as_dict=1)
	print("docstatus",docstatus)
	return docstatus
