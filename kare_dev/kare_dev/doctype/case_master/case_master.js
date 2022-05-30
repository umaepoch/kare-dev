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
			console.log("case_d",case_d);
			console.log("readings-----------" + JSON.stringify(r.message));
				}    
			}
		});
		return  case_d;
	}

	frappe.ui.form.on('Case Master', {
		mode_of_remittance:function(frm,cdt,cdn)
		{
			var d = locals[cdt][cdn];
		 //  var check_number = d.check_number;
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
	