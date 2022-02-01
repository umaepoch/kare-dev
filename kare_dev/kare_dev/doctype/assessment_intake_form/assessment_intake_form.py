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
	get_preliminary_fitment_data=frappe.db.sql("""select `tabPreliminary Fitment Report`.`child`,`tabPreliminary Fitment Report`.`child_name`,`tabPreliminary Fitment Report`.`mothers_name`,`tabPreliminary Fitment Report`.`date_of_birth`,`tabPreliminary Fitment Report`.`gender`,`tabPreliminary Fitment Report`.`display_address`,`tabPreliminary Fitment Report`.`caregiver`,`tabPreliminary Fitment Report`.`caregiver_name`,`tabPreliminary Fitment Report`.`education`,`tabPreliminary Fitment Report`.`skill`,`tabPreliminary Fitment Report`.`employed`,`tabPreliminary Fitment Report`.`type_of_employment`,`tabPreliminary Fitment Report`.`relationship_between_child_and_caregiver`,`tabPreliminary Fitment Report`.`saathi`,`tabPreliminary Fitment Report`.`name_of_coordinator`,`tabPreliminary Fitment Report`.`case_type`,`tabPreliminary Fitment Report`.`delhi_resident`,`tabPreliminary Fitment Report`.`parent_status`,`tabPreliminary Fitment Report`.`age`,`tabPreliminary Fitment Report`.`school_going`,`tabPreliminary Fitment Report`.`name_of_school`,`tabPreliminary Fitment Report`.`class`,`tabPreliminary Fitment Report`.`motivation_to_get_educated`,`tabPreliminary Fitment Report`.`parent_motivation`,`tabPreliminary Fitment Report`.`number_of_members_in_family`,`tabPreliminary Fitment Report`.`total_income_of_family_per_month`,`tabPreliminary Fitment Report`.`income_per_month_per_head`,`tabPreliminary Fitment Report`.`income_eligibility`,`tabPreliminary Fitment Report`.`date_of_reference`,`tabPreliminary Fitment Report`.`accepted` from `tabPreliminary Fitment Report` join `tabAssessment Intake Form` on `tabAssessment Intake Form`.`preliminary_fitment_report`='"""+preliminary_fitment_report+"""' """, as_dict=1)
	print("get_preliminary_fitment_data",get_preliminary_fitment_data)
	return get_preliminary_fitment_data