// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
frappe.ui.form.on('Case Master', {
	case_proposal: function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	var case_proposal = d.case_proposal;
	var full_name;
		console.log("case_proposal",case_proposal);
		var case_proposal_data= fetch_case_data(case_proposal);
		console.log("child_no00000000000",case_proposal_data);
		for ( var i = 0; i < case_proposal_data.length; i++) {
		
		cur_frm.set_value("child",case_proposal_data[i]['child']);
		cur_frm.set_value("name_of_child",case_proposal_data[i]['name_of_child']);
		cur_frm.set_value("date_of_birth",case_proposal_data[i]['date_of_birth']);
		cur_frm.set_value("address_of_child",case_proposal_data[i]['address']);
		cur_frm.set_value("gender",case_proposal_data[i]['gender']);
			cur_frm.set_value("image",case_proposal_data[i]['image']);
		} 
		}
	});
	function fetch_case_data(case_proposal)
	{
	
	  console.log("function",case_proposal);
	  console.log("entered into function");
	  var case_d = "";
	  frappe.call({
		method: `kare_dev.kare_dev.doctype.preliminary_fitment_report.preliminary_fitment_report.get_case_details`,
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
	caregiver: function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	var caregiver = d.caregiver;
	var full_name;
		var case_caregiver_data= fetch_caregiver_data(caregiver);
		console.log("child_no00000000000",case_caregiver_data);
		for ( var i = 0; i < case_caregiver_data.length; i++) {
		console.log("name",case_caregiver_data[i]['first_name']);
		full_name = case_caregiver_data[i]['first_name'] + " " + case_caregiver_data[i]['middle_name'] + " " +case_caregiver_data[i]['last_name'];
		cur_frm.set_value("name_of_caregiver",full_name);
	
	}    }
	});
	function fetch_caregiver_data(caregiver)
	{
	
	  console.log("function",caregiver);
	  console.log("entered into function");
	  var case_d = "";
	  frappe.call({
		method: `kare_dev.kare_dev.doctype.case_master.case_master.get_caregiver_details`,
		args: {
			 "caregiver": caregiver
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