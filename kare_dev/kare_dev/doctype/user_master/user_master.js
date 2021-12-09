// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('User Master', "capture_image", function(frm, cdt, cdn) {
	var doc = locals[cdt][cdn]
	console.log(doc)
});
