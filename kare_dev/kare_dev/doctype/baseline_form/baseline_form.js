// Copyright (c) 2022, Pavithra M R and contributors
// For license information, please see license.txt
//fiter all child records related to PFR 
frappe.ui.form.on('Baseline Form', {
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
        method: `kare_dev.kare_dev.doctype.baseline_form.baseline_form.get_filter_child_pfr`,
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
frappe.ui.form.on('Baseline Form', {
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
        method: `kare_dev.kare_dev.doctype.baseline_form.baseline_form.get_child`,
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

frappe.ui.form.on('Baseline Form', {
age: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var full_name;
    var age = d.age;
    console.log("age_group",age);
    cur_frm.clear_table("physical_development"); 
    var physical_development_questions = fetch_physical_development(age);
    console.log(physical_development_questions);
    for(var j=0;j<physical_development_questions.length;j++)
    {
	var questions = physical_development_questions[j].questions;
    var physical_development_child = cur_frm.add_child("physical_development");
	frappe.model.set_value(physical_development_child.doctype, physical_development_child.name, "questions", questions);

       }
     cur_frm.refresh_field("physical_development");
}
    });
        function fetch_physical_development(age)
        {  
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.baseline_form.baseline_form.get_physical_development_questions`,
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
                
frappe.ui.form.on('Baseline Form', {
age: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var age = d.age;
    cur_frm.clear_table("emotional_development"); 
    var emotional_development_questions = fetch_emotional_development(age);
    console.log("emotional_development_questions",emotional_development_questions);
    for(var j=0;j<emotional_development_questions.length;j++){
	var questions = emotional_development_questions[j].questions;

    var emotional_development_child = cur_frm.add_child("emotional_development");
	frappe.model.set_value(emotional_development_child.doctype, emotional_development_child.name, "questions", questions);

       }
    cur_frm.refresh_field("emotional_development");
}
    });
        function fetch_emotional_development(age)
        { 
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.baseline_form.baseline_form.get_emotional_development_questions`,
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

frappe.ui.form.on('Baseline Form', {
age: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var age = d.age;
    cur_frm.clear_table("social_development"); 
    var social_development_questions = fetch_social_development(age);
    console.log("social_development_questions",social_development_questions);
    for(var j=0;j<social_development_questions.length;j++){
	var questions = social_development_questions[j].questions;

    var social_development_child = cur_frm.add_child("social_development");
	frappe.model.set_value(social_development_child.doctype, social_development_child.name, "questions", questions);

       }
    cur_frm.refresh_field("social_development");
}
    });
        function fetch_social_development(age)
        {  
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.baseline_form.baseline_form.get_social_development_questions`,
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

frappe.ui.form.on('Baseline Form', {
age: function(frm, cdt, cdn) {
    debugger;
    var d = locals[cdt][cdn];
    var age = d.age;
    cur_frm.clear_table("intellectual_development"); 
    var intellectual_development_questions = fetch_intellectual_development(age);
   
    console.log("intellectual_development_questions",intellectual_development_questions);
    for(var j=0;j<intellectual_development_questions.length;j++)
    {
	var questions = intellectual_development_questions[j].questions;

    var intellectual_development_child = cur_frm.add_child("intellectual_development");
	frappe.model.set_value(intellectual_development_child.doctype, intellectual_development_child.name, "questions", questions);

       
    }
   frm.refresh_field("intellectual_development");
}
    });
        function fetch_intellectual_development(age)
        {   
            console.log("entered into function");
            var data = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.baseline_form.baseline_form.get_intellectual_development_questions`,
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