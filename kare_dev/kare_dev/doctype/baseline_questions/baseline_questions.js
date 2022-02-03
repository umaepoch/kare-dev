// Copyright (c) 2022, Pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('Baseline Questions', {
	fetch_questions: function(frm, cdt, cdn) 
		{
			
			cur_frm.clear_table("baseline_questions_ods_child"); 
			var d = locals[cdt][cdn];
			var questions_list = fetch_questions_list();   
			console.log("questions_list",questions_list);
			for(var j=0;j<questions_list.length;j++){
				
			var questions = questions_list[j].questions;
			var area = questions_list[j].area;
			var age_5_9 = questions_list[j]["5_to_9"];
			var age_10_12 = questions_list[j]["10_to_12"];
			var age_13_15 = questions_list[j]["13_to_15"];
			var age_16_18 = questions_list[j]["16_to_18"];
			
		
			if(age_5_9 === 1)
			 {
			 var child = cur_frm.add_child("baseline_questions_ods_child");
			 console.log("age_5_9");
			 console.log("questions",questions); 
			 frappe.model.set_value(child.doctype, child.name, "questions", questions);
			 frappe.model.set_value(child.doctype, child.name, "area", area);
			 frappe.model.set_value(child.doctype, child.name,"age","5 to 9");
			 }
			 if(age_10_12 === 1)
			 {
			  child = cur_frm.add_child("baseline_questions_ods_child");
			 console.log("age_10_12");    
			 console.log("questions",questions);    
			 frappe.model.set_value(child.doctype, child.name, "questions", questions);
			 frappe.model.set_value(child.doctype, child.name, "area", area);
			 frappe.model.set_value(child.doctype, child.name,"age","10 to 12");
			 }
			 if(age_13_15 === 1)
			 {
			  child = cur_frm.add_child("baseline_questions_ods_child");
			 console.log("age_13_15");   
			 console.log("questions",questions); 
			 frappe.model.set_value(child.doctype, child.name, "questions", questions);
			 frappe.model.set_value(child.doctype, child.name, "area", area);
			 frappe.model.set_value(child.doctype, child.name,"age","13 to 15");
			 }
			 if(age_16_18 === 1)
			 {
			 child = cur_frm.add_child("baseline_questions_ods_child");
			 console.log("age_16_18");    
			 console.log("questions",questions); 
			 frappe.model.set_value(child.doctype, child.name, "questions", questions);
			 frappe.model.set_value(child.doctype, child.name, "area", area);
			 frappe.model.set_value(child.doctype, child.name,"age","16 to 18");
			 }
			}
			 cur_frm.refresh_field("baseline_questions_ods_child");
		}
		});
	function fetch_questions_list() {
		var question = "";
		frappe.call({
		method: `kare_dev.kare_dev.doctype.baseline_questions.baseline_questions.get_questions`,
				args: {
					 
					  },
					async: false,
					callback: function(r) {
					if (r.message) {
					question = r.message;
					}    
					}
					});
					return  question;
					}	
	
	
	