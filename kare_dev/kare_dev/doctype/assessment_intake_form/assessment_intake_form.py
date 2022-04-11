# -*- coding: utf-8 -*-
# Copyright (c) 2022, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class AssessmentIntakeForm(Document):
	pass

@frappe.whitelist()
def fetch_preliminary_fitment_data(preliminary_fitment_report):
	print("preliminary_fitment_report",preliminary_fitment_report)	
	get_preliminary_fitment_data=frappe.db.sql("""select child,child_name,mothers_name,date_of_birth,gender,display_address,caregiver,caregiver_name,education,skill,employed,type_of_employment,relationship_between_child_and_caregiver,saathi,name_of_coordinator,case_type,delhi_resident,parent_status,age,school_going,name_of_school,class,motivation_to_get_educated,parent_motivation,number_of_members_in_family,total_income_of_family_per_month,income_per_month_per_head,income_eligibility,date_of_reference,accepted from `tabPreliminary Fitment Report` where name='"""+preliminary_fitment_report+"""' """, as_dict=1)
	print("get_preliminary_fitment_data",get_preliminary_fitment_data)
	return get_preliminary_fitment_data

