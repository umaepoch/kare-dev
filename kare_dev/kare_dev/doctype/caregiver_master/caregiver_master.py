# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
from frappe.contacts.address_and_contact import load_address_and_contact, delete_contact_and_address
import base64
import json

class CaregiverMaster(Document):
	def onload(self):
		"""Load address and contacts in `__onload`"""
		load_address_and_contact(self)

	def on_trash(self):
		delete_contact_and_address('Caregiver Master', self.name)

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
def get_child_address(name_of_child):
	print("child_name",name_of_child)	
	get_address=frappe.db.sql("""select caregiver_address from `tabChild Master` where name='"""+name_of_child+"""' """, as_dict=1)
	print("get_address",get_address)
	return get_address

@frappe.whitelist()
def update_details(name,first_name,middle_name,last_name,skill,education,employed,type_of_employment):
	print("datas",name,first_name)
	case_name =frappe.db.sql("""select name from `tabCase Proposal` where caregiver ='"""+name+"""' """, as_dict=1)
	print("case_name",len(case_name))
	if case_name != [ ]:
		for i in case_name:
			print("inside loop",case_name)
			test_doc = frappe.get_doc("Case Proposal",i['name'])
			test_doc.name_of_caregiver= first_name+" "+middle_name+" "+last_name
			if skill != [ ]: 
				test_doc.skill = skill 
			if education != [ ]: 
				test_doc.education = education
			if employed != [ ]: 
				test_doc.employed = employed
			if type_of_employment != [ ]:  
				test_doc.type_of_employment = type_of_employment
			test_doc.save()

@frappe.whitelist()
def update_care_details(name,first_name,middle_name,last_name,skill,education,employed,type_of_employment):
	print("datas",name,first_name)
	pfr =frappe.db.sql("""select name from `tabPreliminary Fitment Report` where caregiver ='"""+name+"""' """, as_dict=1)
	print("case_name",len(pfr))
	if pfr != [ ]:
		for i in pfr:
			print("inside loop",pfr)
			test_doc = frappe.get_doc("Preliminary Fitment Report",i['name'])
			test_doc.caregiver_name= first_name+" "+middle_name+" "+last_name
			if skill != [ ]: 
				test_doc.skill = skill 
			if education != [ ]: 
				test_doc.education = education
			if employed != [ ]: 
				test_doc.employed = employed
			if type_of_employment != [ ]:  
				test_doc.type_of_employment = type_of_employment
			test_doc.save()

@frappe.whitelist()
def update_care_details_ass(name,first_name,middle_name,last_name,skill,education,employed,type_of_employment):
	print("datas",name,first_name)
	ass =frappe.db.sql("""select name from `tabAssessment Intake Form` where caregiver ='"""+name+"""' """, as_dict=1)
	print("case_name",len(ass))
	if ass != [ ]:
		for i in ass:
			print("inside loop",ass)
			test_doc = frappe.get_doc("Assessment Intake Form",i['name'])
			test_doc.caregiver_name= first_name+" "+middle_name+" "+last_name
			if skill != [ ]: 
				test_doc.skill = skill 
			if education != [ ]: 
				test_doc.education = education
			if employed != [ ]: 
				test_doc.employed = employed
			if type_of_employment != [ ]:  
				test_doc.type_of_employment = type_of_employment
			test_doc.save()

@frappe.whitelist()
def update_care_details_case(name,first_name,middle_name,last_name):
	print("datas",name,first_name)
	case =frappe.db.sql("""select name from `tabCase Master` where caregiver ='"""+name+"""' """, as_dict=1)
	print("case_name",len(case))
	if case != [ ]:
		for k in case:
			print("inside loop",case)
			test_doc = frappe.get_doc("Case Master",k['name'])
			test_doc.name_of_caregiver= first_name+" "+middle_name+" "+last_name
			test_doc.save()