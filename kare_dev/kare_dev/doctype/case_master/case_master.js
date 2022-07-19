// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.ui.form.on('Case Master', {
	case_proposal: function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	var case_proposal = d.case_proposal;
	var full_name;
		console.log("case_proposal",case_proposal);
		if(case_proposal)
		{
		var case_proposal_data= fetch_case_data(case_proposal);
		console.log("child_no00000000000",case_proposal_data);
		
		for ( var i = 0; i < case_proposal_data.length; i++) {
	
		cur_frm.set_value("child",case_proposal_data[i]['name']);
		full_name = (case_proposal_data[0]['first_name'] || '')+ " " + (case_proposal_data[0]['middle_name'] || '')+" "+ (case_proposal_data[0]['last_name'] || '');
        cur_frm.set_value("name_of_child",full_name);
	
		cur_frm.set_value("date_of_birth",case_proposal_data[i]['date_of_birth']);
		cur_frm.set_value("address_of_child",case_proposal_data[i]['display_address']);
		cur_frm.set_value("gender",case_proposal_data[i]['gender']);
		//	cur_frm.set_value("image",case_proposal_data[i]['image']);
		
		cur_frm.set_value("caregiver",case_proposal_data[i]['caregiver']);
		cur_frm.set_value("name_of_caregiver",case_proposal_data[i]['name_of_caregiver']);
		cur_frm.set_value("saathi",case_proposal_data[i]['saathiproposed_saathi']);
		cur_frm.set_value("name_of_saathi",case_proposal_data[i]['name_of_saathi']);
		cur_frm.set_value("proposed_coordinator",case_proposal_data[i]['proposed_coordinator']);
		cur_frm.set_value("name_of_coordinator",case_proposal_data[i]['name_of_coordinator']);
		cur_frm.set_value("case_type",case_proposal_data[i]['case_type']);
		} 
		}
		}
	});
	function fetch_case_data(case_proposal)
	{
	
	  console.log("function",case_proposal);
	  console.log("entered into function");
	  var case_d = "";
	  frappe.call({
		method: `kare_dev.kare_dev.doctype.case_master.case_master.get_case_details`,
		args: {
			 "case_proposal": case_proposal
			  },
			async: false,
			callback: function(r) {
			if (r.message) {
			case_d = r.message;
			console.log("case_data",case_d);
			console.log("readings-----------" + JSON.stringify(r.message));
				}    
			}
		});
		return  case_d;
	}

	/*
	frappe.ui.form.on('Case Master', {
		mode_of_remittance:function(frm,cdt,cdn)
		{
			var d = locals[cdt][cdn];
			if(d.mode_of_remittance == "Cheque")
			{
			frm.toggle_display("check_number", true);
			}
			else if(d.mode_of_remittance == "Online Transfer")
			{
			frm.toggle_display("check_number", false);
			cur_frm.refresh();
			}
		}
	});
	*/

	frappe.ui.form.on('Case Master', {
		add_remittance_details: function(frm, cdt, cdn) {
			debugger;
			var d = locals[cdt][cdn];
			var full_name;
			var date_of_remittance = d.date_of_remittance;
			var bank_account = d.bank_account;
			var remitted_to_childcaregiver = d.remitted_to_childcaregiver;
			var amount = d.amount;
			var mode_of_remittance = d.mode_of_remittance;
			var checkneft = d.checkneft;
		   
		   // cur_frm.clear_table("remittance_details_child"); 
			
			var remittance_details_child = cur_frm.add_child("remittance_details_child");
		 
			frappe.model.set_value(remittance_details_child.doctype, remittance_details_child.name, "date_of_remittance", date_of_remittance);
			frappe.model.set_value(remittance_details_child.doctype, remittance_details_child.name, "bank_acc_no", bank_account);
			frappe.model.set_value(remittance_details_child.doctype, remittance_details_child.name, "remitted_to", remitted_to_childcaregiver);
			frappe.model.set_value(remittance_details_child.doctype, remittance_details_child.name, "amount_remitted", amount);
			frappe.model.set_value(remittance_details_child.doctype, remittance_details_child.name, "mode_of_remittance", mode_of_remittance);
			frappe.model.set_value(remittance_details_child.doctype, remittance_details_child.name, "check_or_neft_details", checkneft);
			  cur_frm.refresh_field("remittance_details_child");
		  
			   
			}
			});
			
		frappe.ui.form.on('Case Master', {
			fetch_add_remittance_details_from_child_master: function(frm, cdt, cdn) {
			var d = locals[cdt][cdn];
			var child = d.child;
			var case_proposal = d.case_proposal;
			var child_remmitance = remmitance_details(child);
			console.log("child_remmitance",child_remmitance);
			if(child_remmitance)
			{
			for ( var i = 0; i < child_remmitance.length; i++) 
			{
			cur_frm.set_value("date_of_remittance",child_remmitance[i]['date_of_remittance']);
			cur_frm.set_value("remitted_to_childcaregiver",child_remmitance[i]['remitted_to']);
			cur_frm.set_value("mode_of_remittance",child_remmitance[i]['mode_of_remittance'] );
			cur_frm.set_value("bank_account",child_remmitance[i]['bank_account']);
			cur_frm.set_value("amount",child_remmitance[i]['amount']);
			cur_frm.set_value("checkneft",child_remmitance[i]['checkneft']);
			}}
			else
			{
			cur_frm.set_value("date_of_remittance"," ");
			cur_frm.set_value("remitted_to_childcaregiver"," ");
			cur_frm.set_value("mode_of_remittance"," ");
			cur_frm.set_value("bank_account"," ");
			cur_frm.set_value("amount"," ");
			cur_frm.set_value("checkneft"," ");  
		}}
			});
			function remmitance_details(child)
			{
			var remmitance = "";
			frappe.call({
			method: `kare_dev.kare_dev.doctype.case_master.case_master.get_remmitance_details`,
			args: {
				"child": child
				},
				async: false,
				callback: function(r) {
				if (r.message) {
				remmitance = r.message;
				console.log("remmitance",remmitance);
				console.log("readings-----------" + JSON.stringify(r.message));
				}    
					}
				});
				return  remmitance;
			}
		