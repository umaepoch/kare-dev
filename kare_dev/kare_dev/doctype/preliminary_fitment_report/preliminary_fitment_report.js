// Copyright (c) 2022, Pavithra M R and contributors
// For license information, please see license.txt
frappe.ui.form.on('Preliminary Fitment Report', {
    refresh: function(frm, cdt, cdn) 
        {
            var d = locals[cdt][cdn];
            var name=d.name;    
            var case_proposal_no = fetch_caseproposal_name(name);    
 //           cur_frm.set_value("case_proposal",case_proposal_no);
            }
        });
        function fetch_caseproposal_name(name) {
            var case_no = "";
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    'doctype': 'Case Proposal',
                    'fieldname': 'name',
                },
                async: false,
                callback: function(r) {
                    if (r.message) {
                        // console.log(r.qty);
                         case_no = r.message.name;
                    }
                }
            });
            return  case_no;
        }
        //set value on selection of case proposal
        frappe.ui.form.on('Preliminary Fitment Report', {
        case_proposal: function(frm, cdt, cdn) {
                var d = locals[cdt][cdn];
                var case_proposal = d.case_proposal;
                var full_name;
                console.log("case_proposal",case_proposal);
            if(case_proposal)
                {	
                var case_pro_details = fetch_proposal_deatails(case_proposal);
                cur_frm.set_value("child",case_pro_details[0]['child'] || '');
                full_name = (case_pro_details[0]['first_name'] || '')+ " " + (case_pro_details[0]['middle_name'] || '')+  (case_pro_details[0]['middle_name'] ? ' ':'') + (case_pro_details[0]['last_name'] || '');
                cur_frm.set_value("child_name",full_name);
                cur_frm.set_value("date_of_birth",case_pro_details[0]['date_of_birth'] || '');
                cur_frm.set_value("gender",case_pro_details[0]['gender'] || '');
                //cur_frm.set_value("mothers_name",case_pro_details[0]['motherguardiancaregivers_name'] || '');
                cur_frm.set_value("display_address",case_pro_details[0]['display_address'] || '');
                
                cur_frm.set_value("caregiver",case_pro_details[0]['caregiver'] || '');
                cur_frm.set_value("caregiver_name",case_pro_details[0]['name_of_caregiver'] || '');		
                cur_frm.set_value("education",case_pro_details[0]['education'] || '');
                cur_frm.set_value("skill",case_pro_details[0]['skill'] || '');
                cur_frm.set_value("employed",case_pro_details[0]['employed'] || '');
                cur_frm.set_value("type_of_employment",case_pro_details[0]['type_of_employment'] || '');
                
                cur_frm.set_value("relationship_between_child_and_caregiver",case_pro_details[0]['how_is_caregiver_related_to_child'] || '');
                
                cur_frm.set_value("saathi",case_pro_details[0]['name_of_saathi'] || '');
                
                cur_frm.set_value("name_of_coordinator",case_pro_details[0]['name_of_coordinator'] || '');
                cur_frm.set_value("case_type",case_pro_details[0]['case_type'] || '');
                    }
                    }
                });
                
    function fetch_proposal_deatails(case_proposal)
        {
            var case_d = "";
            frappe.call({
            method: `kare_dev.kare_dev.doctype.preliminary_fitment_report.preliminary_fitment_report.get_case_proposal_details`,
                args: {
                     "name": case_proposal
                      },
                    async: false,
                    callback: function(r) {
                    if (r.message) {
                    case_d = r.message;
                    }    
                    }
                    });
                    return  case_d;
                    }	
                
    frappe.ui.form.on('Preliminary Fitment Report', {
    number_of_members_in_family: function(frm, cdt, cdn) 
        {
            var d = locals[cdt][cdn];
            var income = d.total_income_of_family_per_month; 
            var no_of_family = d.number_of_members_in_family;
            console.log("income",income);
            console.log("no_of_family",no_of_family);
            var month_income =  income/no_of_family;
            if(!isNaN(month_income))
            {
            cur_frm.set_value("income_per_month_per_head",month_income);
            }
             else
            {
             cur_frm.set_value("income_per_month_per_head"," "); 
            }
           
           
            if(month_income <= 2000)
            {
              cur_frm.set_value("income_eligibility","Yes");
            }
            else if(month_income >= 2000)
            {
              cur_frm.set_value("income_eligibility","No"); 
            }
            else
            {
             cur_frm.set_value("income_eligibility"," "); 
            }
            }
        });

        frappe.ui.form.on('Preliminary Fitment Report', {
            total_income_of_family_per_month: function(frm, cdt, cdn) 
                {
                    var d = locals[cdt][cdn];
                    var income = d.total_income_of_family_per_month; 
                    var no_of_family = d.number_of_members_in_family;
                    console.log("income",income);
                    console.log("no_of_family",no_of_family);
                    var month_income =  income/no_of_family;
                    if(!isNaN(month_income))
                    {
                    cur_frm.set_value("income_per_month_per_head",month_income);
                    }
                     else
                    {
                     cur_frm.set_value("income_per_month_per_head"," "); 
                    }
                   
                   
                    if(month_income <= 2000)
                    {
                      cur_frm.set_value("income_eligibility","Yes");
                    }
                    else if(month_income >= 2000)
                    {
                      cur_frm.set_value("income_eligibility","No"); 
                    }
                    else
                    {
                     cur_frm.set_value("income_eligibility"," "); 
                    }
                    }
                });

    frappe.ui.form.on('Preliminary Fitment Report', {
    case_proposal: function(frm, cdt, cdn) 
        {
        var d = locals[cdt][cdn];
        var date_of_birth=d.date_of_birth;    
        var age = get_age(date_of_birth);   
        console.log("age",age);
        cur_frm.set_value("age",age[0]+" Years, "+age[1]+" Months");
        if(age[0] >=5 && age[0] <=17)
        {
            cur_frm.set_value("age_eligibility","Yes")
            }
            else
                {
                cur_frm.set_value("age_eligibility","No")
                }
                }
                });
    function get_age(date_of_birth) {
    var age = "";
        frappe.call({
        method: `kare_dev.kare_dev.doctype.preliminary_fitment_report.preliminary_fitment_report.calculateAge`,
        args: {
                "date_of_birth": date_of_birth
                },
                async: false,
                callback: function(r) {
                if (r.message) {
                age = r.message;
                }    
                }
                });
                return  age;
            }	

//client script

frappe.ui.form.on('Preliminary Fitment Report',{ 
    before_save : function(frm, cdt, cdn)
    {
    var d = locals[cdt][cdn];
    var case_proposal = d.case_proposal;
    var case_proposal_data = find_dublicate(case_proposal);
    console.log("case_proposal_data",case_proposal_data);
    console.log("case_proposal_data.length",case_proposal_data.length);
    if(case_proposal_data.length > 0)
    {
       frappe.msgprint("This case Proposal number is already have Preliminary Fitment Report "); 
     
         frappe.validated = false;
    }
    }
    });
    function find_dublicate(case_proposal)
    {
        var c = " ";
        frappe.call({
        method: 'kare_dev.kare_dev.doctype.preliminary_fitment_report.preliminary_fitment_report.check_case_proposal',
       args: {
             case_proposal : case_proposal
          },
          async: false,
          callback: function(r) {
            if (r.message) {
              console.log(typeof r.message)
              c = r.message;
              console.log("c",c);
            }
          }
        })
        return c
      }
      
    