# -*- coding: utf-8 -*-
# Copyright (c) 2022, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from datetime import datetime
from datetime import date

class PreliminaryFitmentReport(Document):
	pass

@frappe.whitelist()
def get_case_proposal_details(name):
	print("name",name)	
	get_case_data=frappe.db.sql("""select `tabCase Proposal`.`child`,`tabCase Proposal`.`display_address`,`tabCase Proposal`.`how_is_caregiver_related_to_child`,`tabCase Proposal`.`name_of_coordinator`,`tabCase Proposal`.`name_of_saathi`,`tabCase Proposal`.`case_type`,`tabCase Proposal`.`caregiver`,`tabCase Proposal`.`name_of_caregiver`,`tabCase Proposal`.`skill`,`tabCase Proposal`.`education`,`tabCase Proposal`.`employed`,`tabCase Proposal`.`type_of_employment`,`tabCase Proposal`.`name_of_saathi`,`tabCase Proposal`.`name_of_coordinator`,`tabCase Proposal`.`case_type`,`tabChild Master`.`motherguardiancaregivers_name`,`tabChild Master`.`date_of_birth`,`tabChild Master`.`first_name`,`tabChild Master`.`middle_name`,`tabChild Master`.`last_name`,`tabChild Master`.`gender` from `tabCase Proposal` join `tabChild Master` on `tabCase Proposal`.`child` = `tabChild Master`.`name` and `tabCase Proposal`.`name`='"""+name+"""' """, as_dict=1)
	print("get_case_data",get_case_data)
	return get_case_data

@frappe.whitelist()
def calculateAge(date_of_birth):
	y = date.today().year
	m = date.today().month
	d = date.today().day
	dob_convrt = datetime.strptime(date_of_birth, '%Y-%m-%d')
	dob = dob_convrt.date()
	print("dt",dob)
	print (dob.year, dob.month, dob.day)

	if dob.day > d and dob.month >= m:
		print("inside if")
		dd = (d + 30) - dob.day
		mm = ((m - 1) + 12) - dob.month
		yy = (y - 1) - dob.year
		return str(yy),str(mm),str(dd)
	elif dob.day > d and dob.month < m:
		print("inside else if 1")	
		dd = (d + 30) - dob.day
		mm = m - dob.month
		yy = y - dob.year
		return str(yy),str(mm),str(dd)
	elif dob.day < d and dob.month > m:
		print("inside else if 2")	
		dd = d - dob.day
		mm = (m + 12) - dob.month
		yy = (y - 1) - dob.year
		return str(yy),str(mm),str(dd)
	else:	
		print("inside else")	
		dd = d - dob.day
		mm = m - dob.month
		yy = y - dob.year
		return str(yy),str(mm),str(dd)

@frappe.whitelist()
def check_case_proposal(case_proposal):
	print("case_proposal",case_proposal)
	check_case_proposal =frappe.db.sql("""select case_proposal from `tabPreliminary Fitment Report` where case_proposal ='"""+case_proposal+"""' """, as_dict=1)
	print("check_case_proposal",check_case_proposal)
	return check_case_proposal