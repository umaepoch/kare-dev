// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.ui.form.on("BankAC", "account_holder_type", function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	var holder_type = frm.doc.account_holder_type;
	console.log(holder_type);
	
	if(holder_type === "Caregiver")
	{
	   console.log(holder_type); 
	   frm.set_query("account_holder_record", function() {
	   
			return {
					filters: [
						 ["Caregiver Master","name", "=", "account_holder_record"]
						 
					   ]
					};
				});
		
	}
	if(holder_type === "Child")
	{
	   console.log(holder_type); 
	   frm.set_query("account_holder_record", function() {
	   
			return {
					filters: [
						 ["Child Master","name", "=", "account_holder_record"]
						 
					   ]
					};
				});
	}
	});
	
	