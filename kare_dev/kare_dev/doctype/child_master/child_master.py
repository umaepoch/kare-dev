# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import set_name_by_naming_series
from frappe import _, msgprint, throw
import frappe.defaults
from frappe.utils import flt, cint, cstr, today
from frappe.desk.reportview import build_match_conditions, get_filters_cond
from erpnext.utilities.transaction_base import TransactionBase
from erpnext.accounts.party import validate_party_accounts, get_dashboard_info, get_timeline_data # keep this
from frappe.contacts.address_and_contact import load_address_and_contact, delete_contact_and_address
from frappe.model.rename_doc import update_linked_doctypes
from frappe.model.mapper import get_mapped_doc
from frappe.utils.file_manager import save_file
import base64

class ChildMaster(TransactionBase):
	def onload(self):
		"""Load address and contacts in `__onload`"""
		load_address_and_contact(self)

	def on_update(self):
		self.create_primary_address()

	def create_primary_address(self):
		if self.flags.is_new_doc and self.get('address_line1'):
			make_address(self)

	# def on_trash(self):
	# 	if self.customer_primary_contact:
	# 		frappe.db.sql("""update `tabChild Master`
	# 			set customer_primary_contact=null
	# 			where name=%s""", self.name)

def make_address(args, is_primary_address=1):
	reqd_fields = []
	for field in ['city', 'country']:
		if not args.get(field):
			reqd_fields.append( '<li>' + field.title() + '</li>')

	if reqd_fields:
		msg = _("Following fields are mandatory to create address:")
		frappe.throw("{0} <br><br> <ul>{1}</ul>".format(msg, '\n'.join(reqd_fields)),
			title = _("Missing Values Required"))

	address = frappe.get_doc({
		'doctype': 'Address',
		'address_title': args.get('name'),
		'address_line1': args.get('address_line1'),
		'address_line2': args.get('address_line2'),
		'city': args.get('city'),
		'state': args.get('state'),
		'pincode': args.get('pincode'),
		'country': args.get('country'),
		'links': [{
			'link_doctype': args.get('doctype'),
			'link_name': args.get('name')
		}]
	}).insert()

	return address

@frappe.whitelist()
def create_image_url(data, image_name, doc_name, first_name, doctype):
	try:
		b64 = base64.b64decode(data)
		if b64:
			sf = save_file(first_name+"_"+image_name+".png", b64, doctype, doc_name)
			return {"SC": True, "file_url":sf.file_url}

		return {"SC": False}
	except Exception as ex:
		return {"EX": ex}
