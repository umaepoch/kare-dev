// Copyright (c) 2022, Pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('Evaluation Form', {
	// refresh: function(frm) {

	// }
});
//fiter all child records related to PFR 
frappe.ui.form.on('Evaluation Form', {
    child : function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var child = d.child;
    console.log("child data",child)
    var fitment_details= fetch_child_data_pfr();
    console.log("fitment_details",fitment_details);
    frm.set_query("child", function() {
    return {
      filters: [
            ["Child Master","name",'IN',fitment_details[0]['child']],
             ]};
            });
    }
        });
        function fetch_child_data_pfr()
        {
        console.log("entered into function");
        var child_d = "";
        frappe.call({
        method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_filter_child_pfr`,
        args: {
               
                },
                async: false,
                callback: function(r) {
                if (r.message) {
                child_d = r.message;
                }    
                }
            });
            return child_d;
        }

//after filter, selecting the same child record for setting its field
frappe.ui.form.on('Evaluation Form', {
    child : function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var child = d.child;
    if(child)
    {
    var fitment_details= fetch_child_data(child);
    console.log("fitment_details",fitment_details);
    cur_frm.set_value("name_of_child",fitment_details[0]['child_name'] || '');
    cur_frm.set_value("name_of_saathi",fitment_details[0]['saathi'] || '');
    cur_frm.set_value("name_of_coordinator",fitment_details[0]['name_of_coordinator'] || '');
    }
        }
        });
    function fetch_child_data(child)
        {
        console.log("entered into function");
        var child_d = "";
        frappe.call({
        method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_child`,
        args: {
                "child": child
                },
                async: false,
                callback: function(r) {
                if (r.message) {
                child_d = r.message;
                }    
                }
            });
            return child_d;
        }

frappe.ui.form.on('Evaluation Form', {
age: function(frm, cdt, cdn) {
    debugger;
    var d = locals[cdt][cdn];
    var full_name;
    var age = d.age;
    console.log("age_group",age);
    cur_frm.clear_table("physical_development"); 
    var physical_development_questions = fetch_physical_development(age);
    console.log("physical_development_questions",physical_development_questions);
    for(var j=0;j<physical_development_questions.length;j++)
    {
	var options = physical_development_questions[j].options;
	console.log(options);
	var record_no = physical_development_questions[j].record_no;
	console.log(record_no);
	var questions = physical_development_questions[j].questions;
	console.log(questions);
	var actions = physical_development_questions[j].actions;
	console.log(actions);
	
	if(record_no[j] != record_no[j]+1 && questions[j] != questions[j]+1)
	{
    var physical_development_child = cur_frm.add_child("physical_development");
    frappe.model.set_value(physical_development_child.doctype, physical_development_child.name, "record_no", record_no);
    frappe.model.set_value(physical_development_child.doctype, physical_development_child.name, "options", options);
	frappe.model.set_value(physical_development_child.doctype, physical_development_child.name, "questions", questions);
	frappe.model.set_value(physical_development_child.doctype, physical_development_child.name, "actions", actions);
	cur_frm.refresh_field("physical_development");
	   }
    }
     frappe.validated = true;
    }
    });
        function fetch_physical_development(age)
        {  
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_physical_development_questions`,
            args: {
                 "age": age
                  },
                async: false,
                callback: function(r) {
                if (r.message) 
                {
                data = r.message;
                }    
                    }
                });
                return  data;
                }
     
frappe.ui.form.on('Evaluation Form', {
age: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var age = d.age;
    cur_frm.clear_table("emotional_development"); 
    var emotional_development_questions = fetch_emotional_development(age);
    console.log("emotional_development_questions",emotional_development_questions);
    for(var j=0;j<emotional_development_questions.length;j++){
	var options = emotional_development_questions[j].options;
	var record_no = emotional_development_questions[j].record_no;
	var questions = emotional_development_questions[j].questions;
	var actions = emotional_development_questions[j].actions;

    var emotional_development_child = cur_frm.add_child("emotional_development");
    frappe.model.set_value(emotional_development_child.doctype, emotional_development_child.name, "options", options);
    frappe.model.set_value(emotional_development_child.doctype, emotional_development_child.name, "record_no", record_no);
	frappe.model.set_value(emotional_development_child.doctype, emotional_development_child.name, "questions", questions);
    frappe.model.set_value(emotional_development_child.doctype, emotional_development_child.name, "actions", actions);
       }
    cur_frm.refresh_field("emotional_development");
}
    });
        function fetch_emotional_development(age)
        { 
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_emotional_development_questions`,
            args: {
                 "age": age
                  },
                async: false,
                callback: function(r) {
                if (r.message) 
                {
                data = r.message;
                }    
                    }
                });
                return  data;
                }





frappe.ui.form.on('Evaluation Form', {
age: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var age = d.age;
    cur_frm.clear_table("social_development"); 
    var social_development_questions = fetch_social_development(age);
    console.log("social_development_questions",social_development_questions);
    for(var j=0;j<social_development_questions.length;j++){
	var options = social_development_questions[j].options;
	var record_no = social_development_questions[j].record_no;
	var questions = social_development_questions[j].questions;
	var actions = social_development_questions[j].actions;

    var social_development_child = cur_frm.add_child("social_development");
    frappe.model.set_value(social_development_child.doctype, social_development_child.name, "options", options);
    frappe.model.set_value(social_development_child.doctype, social_development_child.name, "record_no", record_no);
	frappe.model.set_value(social_development_child.doctype, social_development_child.name, "questions", questions);
	frappe.model.set_value(social_development_child.doctype, social_development_child.name, "actions", actions);

       }
    cur_frm.refresh_field("social_development");
}
    });
        function fetch_social_development(age)
        {  
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_social_development_questions`,
            args: {
                 "age": age
                  },
                async: false,
                callback: function(r) {
                if (r.message) 
                {
                data = r.message;
                }    
                    }
                });
                return  data;
                }



                frappe.ui.form.on('Evaluation Form', {
                    age: function(frm, cdt, cdn) {
                       
                        var d = locals[cdt][cdn];
                        var age = d.age;
                        cur_frm.clear_table("intellectual_development"); 
                        var intellectual_development_questions = fetch_intellectual_development(age);
                       
                        console.log("intellectual_development_questions",intellectual_development_questions);
                        for(var j=0;j<intellectual_development_questions.length;j++)
                        {
                        var options = intellectual_development_questions[j].options;
                        var record_no = intellectual_development_questions[j].record_no;
                        var questions = intellectual_development_questions[j].questions;
                        var actions = intellectual_development_questions[j].actions;
                    
                        var intellectual_development_child = cur_frm.add_child("intellectual_development");
                        frappe.model.set_value(intellectual_development_child.doctype, intellectual_development_child.name, "options", options);
                        frappe.model.set_value(intellectual_development_child.doctype, intellectual_development_child.name, "record_no", record_no);
                        frappe.model.set_value(intellectual_development_child.doctype, intellectual_development_child.name, "questions", questions);
                        frappe.model.set_value(intellectual_development_child.doctype, intellectual_development_child.name, "actions", actions);
                           }
                       frm.refresh_field("intellectual_development");
                      
                    }
                        });
                            function fetch_intellectual_development(age)
                            {   
                                console.log("entered into function");
                                var data = "";
                                frappe.call({
                                method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_intellectual_development_questions`,
                                args: {
                                     "age": age
                                      },
                                    async: false,
                                    callback: function(r) {
                                    if (r.message) 
                                    {
                                    data = r.message;
                                    }    
                                        }
                                    });
                                    return  data;
                                    }

frappe.ui.form.on('Evaluation Form', {
age: function(frm, cdt, cdn) {
                       
    var d = locals[cdt][cdn];
    var age = d.age;
    cur_frm.clear_table("spiritual_development"); 
    var spiritual_development_questions = fetch_spiritual_development(age);
    console.log("spiritual_development_questions",spiritual_development_questions);
    for(var j=0;j<spiritual_development_questions.length;j++)
        {
        var options = spiritual_development_questions[j].options;
        var record_no = spiritual_development_questions[j].record_no;
        var questions = spiritual_development_questions[j].questions;
        var actions = spiritual_development_questions[j].actions;
                    
        var spiritual_development_child = cur_frm.add_child("spiritual_development");
        frappe.model.set_value(spiritual_development_child.doctype, spiritual_development_child.name, "options", options);
        frappe.model.set_value(spiritual_development_child.doctype, spiritual_development_child.name, "record_no", record_no);
        frappe.model.set_value(spiritual_development_child.doctype, spiritual_development_child.name, "questions", questions);
        frappe.model.set_value(spiritual_development_child.doctype, spiritual_development_child.name, "actions", actions);
        }
        frm.refresh_field("spiritual_development");
                              
        }
        });
function fetch_spiritual_development(age)
    {   
        console.log("entered into function");
        var data = "";
        frappe.call({
            method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.get_spiritual_development_questions`,
                args: {
                     "age": age
                      },
                    async: false,
                    callback: function(r) {
                    if (r.message) 
                        {
                        data = r.message;
                        }    
                         }
                         });
                        return  data;
                    }
                                        



frappe.ui.form.on('Physical Development', {
		options : function(frm, cdt, cdn) 
			{
			var d = locals[cdt][cdn];
			var options = d.options;
			var record_no = d.record_no;
			console.log("options",d.options);
			console.log("record_no",d.record_no);
			var questionns_actions = fetch_actions(options,record_no);   
		
			var actions_need_to_be_taken = questionns_actions[0].actions_need_to_be_taken;	
			console.log("actions_need_to_be_taken111",actions_need_to_be_taken);
			
			d.actions = actions_need_to_be_taken;
			frm.refresh_field("physical_development");
			}
			});
		function fetch_actions(options,record_no)
		{
			var question = "";
			frappe.call({
			method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.select_action`,
					args: {
						  
						  "parent":record_no,
						  "options": options
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
	
	frappe.ui.form.on('Emotional Development', {
		options : function(frm, cdt, cdn) 
			{
			var d = locals[cdt][cdn];
			var options = d.options;
			var record_no = d.record_no;
			console.log("options",d.options);
			console.log("record_no",d.record_no);
			var questionns_actions = fetch_actions_emotional(options,record_no);   
		
			var actions_need_to_be_taken = questionns_actions[0].actions_need_to_be_taken;	
			console.log("actions_need_to_be_taken122",actions_need_to_be_taken);
			
			d.actions = actions_need_to_be_taken;
			frm.refresh_field("Emotional Development");
			}
			});
		function fetch_actions_emotional(options,record_no)
		{
			var question = "";
			frappe.call({
			method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.select_action`,
					args: {
						  
						  "parent":record_no,
						  "options": options
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
	
	frappe.ui.form.on('Social Development', {
		options : function(frm, cdt, cdn) 
			{
			var d = locals[cdt][cdn];
			var options = d.options;
			var record_no = d.record_no;
			console.log("options",d.options);
			console.log("record_no",d.record_no);
			var questionns_actions = fetch_actions_social(options,record_no);   
		
			var actions_need_to_be_taken = questionns_actions[0].actions_need_to_be_taken;	
			console.log("actions_need_to_be_taken122",actions_need_to_be_taken);
			
			d.actions = actions_need_to_be_taken;
			frm.refresh_field("Social Development");
			}
			});
		function fetch_actions_social(options,record_no)
		{
			var question = "";
			frappe.call({
			method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.select_action`,
					args: {
						  
						  "parent":record_no,
						  "options": options
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
	
	frappe.ui.form.on('Intellectual Development', {
		options : function(frm, cdt, cdn) 
			{
			var d = locals[cdt][cdn];
			var options = d.options;
			var record_no = d.record_no;
			console.log("options",d.options);
			console.log("record_no",d.record_no);
			var questionns_actions = fetch_actions_intel(options,record_no);   
		
			var actions_need_to_be_taken = questionns_actions[0].actions_need_to_be_taken;	
			console.log("actions_need_to_be_taken122",actions_need_to_be_taken);
			
			d.actions = actions_need_to_be_taken;
			frm.refresh_field("Intellectual Development");
			}
			});
		function fetch_actions_intel(options,record_no)
		{
			var question = "";
			frappe.call({
			method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.select_action`,
					args: {
						  
						  "parent":record_no,
						  "options": options
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
						
						
frappe.ui.form.on('Spiritual Development', {
		options : function(frm, cdt, cdn) 
			{
			var d = locals[cdt][cdn];
			var options = d.options;
			var record_no = d.record_no;
			console.log("options",d.options);
			console.log("record_no",d.record_no);
			var questionns_actions = fetch_actions_spiritual(options,record_no);   
		
			var actions_need_to_be_taken = questionns_actions[0].actions_need_to_be_taken;	
			console.log("actions_need_to_be_taken122",actions_need_to_be_taken);
			
			d.actions = actions_need_to_be_taken;
			frm.refresh_field("Spiritual Development");
			}
			});
		function fetch_actions_spiritual(options,record_no)
		{
			var question = "";
			frappe.call({
			method: `kare_dev.kare_dev.doctype.evaluation_form.evaluation_form.select_action`,
					args: {
						  
						  "parent":record_no,
						  "options": options
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