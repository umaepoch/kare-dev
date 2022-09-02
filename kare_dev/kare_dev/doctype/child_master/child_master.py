# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
from frappe.contacts.address_and_contact import load_address_and_contact, delete_contact_and_address
import base64
import json
from datetime import datetime
from datetime import date

class ChildMaster(Document):
	def onload(self):
		"""Load address and contacts in `__onload`"""
		load_address_and_contact(self)

	def on_trash(self):
		delete_contact_and_address('Child Master', self.name)

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
def get_caregiver_Add(name_of_child):
	get_caregiver_address=frappe.db.sql("""select `tabAddress`.`address_title`,`tabAddress`.`address_line1`,`tabAddress`.`address_line2`,`tabAddress`.`city`,`tabAddress`.`state`,`tabAddress`.`country`, `tabAddress`.`pincode`, `tabAddress`.`phone` from `tabAddress` where `tabAddress`.`address_title`='"""+name_of_child+"""' """, as_dict=1)
	print("get_caregiver_address",get_caregiver_address)
	return get_caregiver_address

#@frappe.whitelist()
#def set_caregiver_name(name,child_name,child_record):
#	print("name",name)
#	print("name",child_name)
#	print("child_record",child_record)
#	frappe.clear_cache()
#	frappe.client.set_value("Child Master",child_record,"motherguardiancaregivers_name",name)
#	frappe.db.commit()
	
@frappe.whitelist()
def get_care_number(name):
	#get_care_num=frappe.db.sql("""select ca.name,ca.child_name from `tabCaregiver Master` as ca inner join `tabChild Master` as ch where ch.name=ca.child_name and ch.name='"""+name+"""' """, as_dict=1)
	get_care_num=frappe.db.sql("""select ca.name,ca.child_name,ca.first_name,ca.middle_name,ca.last_name from `tabCaregiver Master` as ca inner join `tabChild Master` as ch where ch.name=ca.child_name and ch.name='"""+name+"""' """, as_dict=1)
	print("get_care_num",get_care_num)
	return get_care_num

#@frappe.whitelist()
#def get_filter_bankac(child):
#	#get_child_holder_record=frappe.db.sql("""select account_holder_record from `tabBankAC`""", as_dict=1)
#	get_child_holder_record=frappe.db.sql("""select ch.name,ba.name,ba.account_holder_record from `tabChild Master` as ch inner join `tabBankAC` as ba where ch.name=ba.account_holder_record and ch.name ='"""+child+"""' """, as_dict=1)
#	print("get_child_holder_record",get_child_holder_record)
#	return get_child_holder_record

@frappe.whitelist()
def check_child(adhar):
	print("adhar",adhar)
	check_child_record =frappe.db.sql("""select name,aadhar_card_number from `tabChild Master` where aadhar_card_number ='"""+adhar+"""' """, as_dict=1)
	print("check_child_record",check_child_record)
	return check_child_record
	
@frappe.whitelist()
def update_details_case_prop(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address):
	print("datas",name,gender)
	case_name =frappe.db.sql("""select name from `tabCase Proposal` where child ='"""+name+"""' """, as_dict=1)
	if case_name != [ ]:
		for i in case_name:
			print("inside loop",case_name)
			test_doc = frappe.get_doc("Case Proposal",i['name'])
			if gender != [ ]: 
				#test_doc.gender = gender
				frappe.db.set_value('Case Proposal',i['name'],"gender",gender)
			if first_name != [ ] and middle_name != [ ] and last_name != [ ]:  
				frappe.db.set_value('Case Proposal',i['name'],"name_of_child",first_name+" "+middle_name+" "+last_name)
				#test_doc.name_of_child = first_name+" "+middle_name+" "+last_name
			if date_of_birth != [ ]: 
				#test_doc.date_of_birth = date_of_birth
				frappe.db.set_value('Case Proposal',i['name'],"date_of_birth",date_of_birth)
			if caregiver_address != [ ]: 
				#test_doc.display_address = caregiver_address
				frappe.db.set_value('Case Proposal',i['name'],"display_address",caregiver_address)
			test_doc.save()
			return case_name
	
@frappe.whitelist()
def update_child_details(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address):
	print("datas",name,gender)
	pfr =frappe.db.sql("""select name from `tabPreliminary Fitment Report` where child ='"""+name+"""' """, as_dict=1)
	if pfr != [ ]:
		for j in pfr:
			print("inside loop",pfr)
			test_d = frappe.get_doc("Preliminary Fitment Report",j['name'])
			if gender != [ ]: 
				test_d.gender = gender
			if first_name != [ ] and middle_name != [ ] and last_name != [ ]:  
				test_d.child_name = first_name+" "+middle_name+" "+last_name
			if date_of_birth != [ ]: 
				test_d.date_of_birth = date_of_birth
			if caregiver_address != [ ]: 
				test_d.display_address = caregiver_address
			test_d.save()
			return pfr
				
@frappe.whitelist()
def update_child_details_ass(name,gender,first_name,middle_name,last_name,date_of_birth):
	print("datas",name,gender)
	ass =frappe.db.sql("""select name from `tabAssessment Intake Form` where child ='"""+name+"""' """, as_dict=1)
	if ass != [ ]:
		for k in ass:
			print("inside loop",ass)
			test_d = frappe.get_doc("Assessment Intake Form",k['name'])
			if gender != [ ]: 
				test_d.gender = gender
			if first_name != [ ] and middle_name != [ ] and last_name != [ ]:  
				test_d.child_name = first_name+" "+middle_name+" "+last_name
			if date_of_birth != [ ]: 
				test_d.date_of_birth = date_of_birth
			
			test_d.save()
			return ass

@frappe.whitelist()
def update_child_details_case_m(name,gender,first_name,middle_name,last_name,date_of_birth,caregiver_address):
	print("datas",name,gender)
	ca =frappe.db.sql("""select name from `tabCase Master` where child ='"""+name+"""' """, as_dict=1)
	if ca != [ ]:
		for k in ca:
			print("inside loop",ca)
			test_d = frappe.get_doc("Case Master",k['name'])
			if gender != [ ]: 
				test_d.gender = gender
			if first_name != [ ] and middle_name != [ ] and last_name != [ ]:  
				test_d.name_of_child = first_name+" "+middle_name+" "+last_name
			if date_of_birth != [ ]: 
				test_d.date_of_birth = date_of_birth
			if caregiver_address != [ ]: 
				test_d.address_of_child = caregiver_address
			test_d.save()
			return ca

@frappe.whitelist()
def update_dob_preli(name,date_of_birth):
	print("dob",name,date_of_birth)
	prelim =frappe.db.sql("""select name from `tabPreliminary Fitment Report` where child ='"""+name+"""' """, as_dict=1)
	if prelim != [ ]:
		for s in prelim:
			print("inside loop preli",s)
			test_dob1 = frappe.get_doc("Preliminary Fitment Report",s['name'])
			if date_of_birth != [ ]: 
				y = date.today().year
				m = date.today().month
				d = date.today().day
				dob_convrt = datetime.strptime(date_of_birth, '%Y-%m-%d')
				dob = dob_convrt.date()
				print("dt preli",dob)
				print (dob.year, dob.month, dob.day)

				if dob.day > d and dob.month >= m:
					print("inside if preli")
					dd = (d + 30) - dob.day
					mm = ((m - 1) + 12) - dob.month
					yy = (y - 1) - dob.year
					frappe.db.set_value('Preliminary Fitment Report',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 1",test_dob1.age)
					return str(yy),str(mm),str(dd)
				elif dob.day > d and dob.month < m:
					dd = (d + 30) - dob.day
					mm = m - dob.month
					yy = y - dob.year
					frappe.db.set_value('Preliminary Fitment Report',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 2",test_dob1.age)
					return str(yy),str(mm),str(dd)
				elif dob.day < d and dob.month > m:
					print("inside else if 2")	
					dd = d - dob.day
					mm = (m + 12) - dob.month
					yy = (y - 1) - dob.year
					frappe.db.set_value('Preliminary Fitment Report',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 3",test_dob1.age)
					return str(yy),str(mm),str(dd)
				else:	
					print("inside else")	
					dd = d - dob.day
					mm = m - dob.month
					yy = y - dob.year
					frappe.db.set_value('Preliminary Fitment Report',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 4",test_dob1.age)
					return str(yy),str(mm),str(dd)
			test_dob1.save()
			
@frappe.whitelist()
def update_dob_assess(name,date_of_birth):
	print("dob",name,date_of_birth)
	preli =frappe.db.sql("""select name from `tabAssessment Intake Form` where child ='"""+name+"""' """, as_dict=1)
	if preli != [ ]:
		for s in preli:
			print("inside loop assess",s)
			test_dob = frappe.get_doc("Assessment Intake Form",s['name'])
			if date_of_birth != [ ]: 
				y = date.today().year
				m = date.today().month
				d = date.today().day
				dob_convrt = datetime.strptime(date_of_birth, '%Y-%m-%d')
				dob = dob_convrt.date()
				print("dt",dob)
				print (dob.year, dob.month, dob.day)

				if dob.day > d and dob.month >= m:
					print("inside if assess")
					dd = (d + 30) - dob.day
					mm = ((m - 1) + 12) - dob.month
					yy = (y - 1) - dob.year
					frappe.db.set_value('Assessment Intake Form',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 1",test_dob.age)
					return str(yy),str(mm),str(dd)
				elif dob.day > d and dob.month < m:
					dd = (d + 30) - dob.day
					mm = m - dob.month
					yy = y - dob.year
					frappe.db.set_value('Assessment Intake Form',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 2",test_dob.age)
					return str(yy),str(mm),str(dd)
				elif dob.day < d and dob.month > m:
					print("inside else if 2")	
					dd = d - dob.day
					mm = (m + 12) - dob.month
					yy = (y - 1) - dob.year
					frappe.db.set_value('Assessment Intake Form',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 3",test_dob.age)
					return str(yy),str(mm),str(dd)
				else:	
					print("inside else")	
					dd = d - dob.day
					mm = m - dob.month
					yy = y - dob.year
					frappe.db.set_value('Assessment Intake Form',s['name'],"age",str(yy)+" Years "+str(mm)+" Months")
					print("test_dob.age 4",test_dob.age)
					return str(yy),str(mm),str(dd)
			test_dob.save()