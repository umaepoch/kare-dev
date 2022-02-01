# -*- coding: utf-8 -*-
# Copyright (c) 2021, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CaseMaster(Document):
	pass

@frappe.whitelist()
def get_case_details(case_proposal):
	print("child",case_proposal)	
	get_case_data=frappe.db.sql("""select `tabChild Master`.`name`,`tabChild Master`.`name_of_child`,`tabChild Master`.`date_of_birth`,`tabChild Master`.`gender`,`tabChild Master`.`address`,`tabChild Master`.`image` from `tabChild Master` join `tabCase Proposal` on `tabCase Proposal`.`child` = `tabChild Master`.`name` and `tabCase Proposal`.`name`='"""+case_proposal+"""' """, as_dict=1)
	print("pppppp",get_case_data)
	return get_case_data

@frappe.whitelist()
def get_caregiver_details(caregiver):
	print("child",caregiver)	
	get_caregiver_data=frappe.db.sql("""select `tabChild Master`.`name`,`tabChild Master`.`name_of_child`,`tabChild Master`.`date_of_birth`,`tabChild Master`.`gender`,`tabChild Master`.`address`,`tabChild Master`.`image` from `tabChild Master` join `tabCase Proposal` on `tabCase Proposal`.`child` = `tabChild Master`.`name` and `tabCase Proposal`.`name`='"""+caregiver+"""' """, as_dict=1)
	print("pppppp",get_caregiver_data)
	return get_caregiver_data
