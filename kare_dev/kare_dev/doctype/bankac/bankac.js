// Copyright (c) 2022, Pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('BankAC', {
 refresh: function(frm) {
	
	 }
});

frappe.ui.form.on('BankAC', {
	account_holder_type : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	
	frm.set_query("account_holder_type", function() {
		return {
				filters: [["DocType","name","IN",["Child Master","Caregiver Master"]]]
				};
				});
	}
	});
