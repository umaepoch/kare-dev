// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('Child Master', {
	images: function(frm) {
		var doc = frm.doc
		console.log(doc)
	}
});
