# -*- coding: utf-8 -*-
# Copyright (c) 2021, Pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class UserMaster(Document):
	pass

@frappe.whitelist()
def sample():
	return frappe.local.sites_path
