frappe.ui.form.on('Assessment Intake Form', {
    preliminary_fitment_report: function(frm, cdt, cdn) {
            
                var d = locals[cdt][cdn];
                var preliminary_fitment_report = d.preliminary_fitment_report;
                console.log("preliminary_fitment_report",preliminary_fitment_report);
                if(preliminary_fitment_report)
                {	
                var details = fetch_preliminary_fitment_child_data(preliminary_fitment_report);
                console.log("details",details);
                cur_frm.set_value("child",details[0]['child'] || '');
                cur_frm.set_value("child_name",details[0]['child_name'] || '');
                //cur_frm.set_value("motherguardiancaregivers_name",details[0]['mothers_name'] || '');
                cur_frm.set_value("date_of_birth",details[0]['date_of_birth'] || '');
                cur_frm.set_value("gender",details[0]['gender'] || '');
                cur_frm.set_value("display_address",details[0]['display_address'] || '');
                
                cur_frm.set_value("caregiver",details[0]['caregiver'] || '');
                cur_frm.set_value("caregiver_name",details[0]['caregiver_name'] || '');		
                cur_frm.set_value("education",details[0]['education'] || '');
                cur_frm.set_value("skill",details[0]['skill'] || '');
                cur_frm.set_value("employed",details[0]['employed'] || '');
                cur_frm.set_value("type_of_employment",details[0]['type_of_employment'] || '');
                
                //cur_frm.set_value("relationship_between_child_and_caregiver",details[0]['relationship_between_child_and_caregiver'] || '');
                
                cur_frm.set_value("name_of_saathi",details[0]['saathi'] || '');
                
                cur_frm.set_value("name_of_coordinator",details[0]['name_of_coordinator'] || '');
                cur_frm.set_value("case_type",details[0]['case_type'] || '');
                
                cur_frm.set_value("delhi_resident",details[0]['delhi_resident'] || '');
                cur_frm.set_value("parent_status",details[0]['parent_status'] || '');
                cur_frm.set_value("age",details[0]['age'] || '');
                console.log("age",details[0]['age']);
                if(details[0]['age'] >=5 && details[0]['age'] <=17)
                {
                cur_frm.set_value("age_eligibility","Yes")
                }
                else
                {
                cur_frm.set_value("age_eligibility","No")
                }
                cur_frm.set_value("school_going",details[0]['school_going'] || '');
                cur_frm.set_value("name_of_school",details[0]['name_of_school'] || '');
                cur_frm.set_value("class",details[0]['class'] || '');
                cur_frm.set_value("motivation_to_get_educated",details[0]['motivation_to_get_educated'] || '');
                cur_frm.set_value("parent_motivation",details[0]['parent_motivation'] || '');
                cur_frm.set_value("number_of_members_in_family",details[0]['number_of_members_in_family'] || '');
                cur_frm.set_value("total_income_of_family_per_month",details[0]['total_income_of_family_per_month'] || '');
                cur_frm.set_value("income_per_month_per_head",details[0]['income_per_month_per_head'] || '');
                cur_frm.set_value("income_eligibility",details[0]['income_eligibility'] || '');
                cur_frm.set_value("date_of_reference",details[0]['date_of_reference'] || '');
                cur_frm.set_value("accepted",details[0]['accepted'] || '');
                 cur_frm.refresh();
                    
                }
                else
                {
                    
                    cur_frm.refresh();
                frm.refresh();	
                }
            
                }
            });
                
        function  fetch_preliminary_fitment_child_data(preliminary_fitment_report)
            {
              var case_d = "";
              frappe.call({
                method: `kare_dev.kare_dev.doctype.assessment_intake_form.assessment_intake_form.fetch_preliminary_fitment_data`,
                args: {
                     "preliminary_fitment_report": preliminary_fitment_report
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
        