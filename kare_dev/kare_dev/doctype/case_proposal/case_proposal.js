// Copyright (c) 2021, Pavithra M R and contributors
// For license information, please see license.txt
//filter sevice provider master record where service provider type = saathi 
frappe.ui.form.on('Case Proposal', {
    saathiproposed_saathi: function(frm, cdt, cdn) {
       var d = locals[cdt][cdn];
       var c_saathi = d.saathi;
       console.log("c_saathi ",c_saathi);
       frm.set_query("saathiproposed_saathi", function() {
       console.log("saathiii")
           return {
                   filters: [
                        ["Service Provider Type","service_provider_type", "=", "saathi"]
                      ]
                   }
               });
           }});
   //filter sevice provider master record where service provider type = coordinator 
   frappe.ui.form.on('Case Proposal', {
   proposed_coordinator: function(frm, cdt, cdn) {
   var d = locals[cdt][cdn];
   frm.set_query("proposed_coordinator", function() {
           return {
               filters: [
                   ["Service Provider Type","service_provider_type", "=", "coordinator"]
                       ]
                   }
                   });
           }});
       
    //CHILD DETAILS
   frappe.ui.form.on('Case Proposal', {
   child: function(frm, cdt, cdn) {
       var d = locals[cdt][cdn];
       var child = d.child;
       var full_name;
       console.log("child",child);
       if(child)
           {	
           var child_no = fetch_child_data(child);
           full_name = (child_no[0]['first_name'] || '')+ " " + (child_no[0]['middle_name'] || '')+" " + (child_no[0]['last_name'] || '');
           cur_frm.set_value("name_of_child",full_name);
           cur_frm.set_value("gender",child_no[0]['gender'] || '');
           cur_frm.set_value("date_of_birth",child_no[0]['date_of_birth'] || '');
           frm.set_query("address_of_child", function() {
           return {
                   filters: [
                       ["Address","name", "like","%"+child+"%"]
                       ]
                   }
               });
           }
               }
           });
           
   function fetch_child_data(child)    {
   var child_d = "";
   frappe.call({
   method: `kare_dev.kare_dev.doctype.case_proposal.case_proposal.get_child_details`,
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
               return  child_d;
               }	
           
   //CAREGIVER DETAILS
   frappe.ui.form.on('Case Proposal', {
       caregiver: function(frm, cdt, cdn) {
       var d = locals[cdt][cdn];
       var caregiver = d.caregiver;
       var full_name;
       if(caregiver)
          {
           var caregiver_no = fetch_caregiver_data(caregiver);
           for ( var i = 0; i < caregiver_no.length; i++) {
           full_name = (caregiver_no[i]['first_name']|| '') + " " + (caregiver_no[i]['middle_name']|| '') + " " +(caregiver_no[i]['last_name']|| '');
           cur_frm.set_value("name_of_caregiver",full_name);
           cur_frm.set_value("skill",caregiver_no[i]['skill']|| '');
           cur_frm.set_value("education",caregiver_no[i]['education']|| '');
           cur_frm.set_value("employed",caregiver_no[i]['employed']|| '');
           cur_frm.set_value("type_of_employment",caregiver_no[i]['type_of_employment']|| '');
           } 
           }
           }
           });
       function fetch_caregiver_data(caregiver)
       {
       var caregiver_d = "";
       frappe.call({
       method: `kare_dev.kare_dev.doctype.case_proposal.case_proposal.get_caregiver_details`,
       args: {
             "caregiver": caregiver
               },
               async: false,
               callback: function(r) {
               if (r.message) {
               caregiver_d = r.message;
                   }    
                   }
               });
           return  caregiver_d;
           }
   //SAATHI DETAILS
       frappe.ui.form.on('Case Proposal', {
       saathiproposed_saathi: function(frm, cdt, cdn) {
       var d = locals[cdt][cdn];
       var saathiproposed_saathi = d.saathiproposed_saathi;
       var full_name;
       if(saathiproposed_saathi)
           {
           var saathi_data= fetch_saathi_data(saathiproposed_saathi);
           for ( var i = 0; i < saathi_data.length; i++) {
           console.log("name",saathi_data[i]['first_name']);
           full_name = saathi_data[i]['first_name'] + " " + saathi_data[i]['middle_name'] + " " +saathi_data[i]['last_name'];
           cur_frm.set_value("name_of_saathi",full_name);
               } 
              }
           }
           });
           function fetch_saathi_data(saathiproposed_saathi)
           {
             console.log("entered into function");
             var case_d = "";
             frappe.call({
               method: `kare_dev.kare_dev.doctype.service_provider_master.service_provider_master.get_saathi_details`,
               args: {
                    "name": saathiproposed_saathi
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
       
       //filter sevice provider master record and set name of saathi
   frappe.ui.form.on('Case Proposal', {
       saathiproposed_saathi: function(frm, cdt, cdn) {
           var d = locals[cdt][cdn];
           var full_name;
           var saathiproposed_saathi = d.saathiproposed_saathi;
           if(saathiproposed_saathi)
           {
           var saathi_data = fetch_saathi_data(saathiproposed_saathi);
                   console.log("saathi_data",saathi_data);
                   full_name = (saathi_data[0]['first_name'] || '')+ " " + (saathi_data[0]['middle_name'] || '')+  (saathi_data[0]['middle_name'] ? ' ':'') + (saathi_data[0]['last_name'] || '');
                   cur_frm.set_value("name_of_saathi",full_name);
                   }
                   }
                   });
               
       function fetch_saathi_data(saathiproposed_saathi)
               {
                 console.log("entered into function");
                 var saathi_d = "";
                 frappe.call({
                   method: `kare_dev.kare_dev.doctype.case_proposal.case_proposal.get_saathi_name`,
                   args: {
                        "name": saathiproposed_saathi
                         },
                       async: false,
                       callback: function(r) {
                       if (r.message) {
                       saathi_d = r.message;
                           }    
                       }
                   });
                   return  saathi_d;
                   }
               
           //filter sevice provider master record and set name of coordinator
       frappe.ui.form.on('Case Proposal', {
       proposed_coordinator: function(frm, cdt, cdn) {
           var d = locals[cdt][cdn];
           var full_name;
           var proposed_coordinator = d.proposed_coordinator;
           if(proposed_coordinator)
           {
           var coordinator_data = fetch_coordinator_data(proposed_coordinator);
                   console.log("coordinator_data",coordinator_data);
                   full_name = (coordinator_data[0]['first_name'] || '')+ " " + (coordinator_data[0]['middle_name'] || '')+  (coordinator_data[0]['middle_name'] ? ' ':'') + (coordinator_data[0]['last_name'] || '');
                   cur_frm.set_value("name_of_coordinator",full_name);
                   }
       }
                   });
               
               function fetch_coordinator_data(proposed_coordinator)
               {
                 console.log("entered into function");
                 var coordinator_d = "";
                 frappe.call({
                   method: `kare_dev.kare_dev.doctype.case_proposal.case_proposal.get_coordinator_name`,
                   args: {
                        "name": proposed_coordinator
                         },
                       async: false,
                       callback: function(r) {
                       if (r.message) {
                       coordinator_d = r.message;
                   }    
                       }
                   });
                   return  coordinator_d;
                   }
       //Display Address	
       frappe.ui.form.on('Case Proposal', {
           address_of_child : function(frm, cdt, cdn) {
           var d = locals[cdt][cdn];
           var address_of_child = d.address_of_child;
           var combined_address;
           if(address_of_child)
           {
           var full_address= fetch_child_address(address_of_child);
           console.log("child_no",full_address);
           for ( var i = 0; i < full_address.length; i++) 
               {
               combined_address = (full_address[i]['address_line1']|| '') + "\n" +(full_address[i]['address_line2']|| '') + "\n" +(full_address[i]['city']|| '') + "\n" +(full_address[i]['state']|| '') + " " +(full_address[i]['country']|| '') + "\n" +(full_address[i]['pincode']|| '') + "\n" +(full_address[i]['phone']|| '');
               cur_frm.set_value("display_address",combined_address);
               } 
           }
               }    
               });
       function fetch_child_address(address_of_child)
           {
             var address = "";
           frappe.call({
           method: `kare_dev.kare_dev.doctype.case_proposal.case_proposal.get_address`,
           args: {
                "name": address_of_child
                 },
                   async: false,
                   callback: function(r) {
                   if (r.message) {
                   address = r.message;
                       }    
                   }
                   });
                   return  address;
                       }
       
   frappe.ui.form.on('Case Proposal', {
   preliminary_fitment_report: function(frm, cdt, cdn) {
       var d = locals[cdt][cdn];
       var case_proposal = d.name;
       console.log("case_proposal ",case_proposal);
       frm.set_query("preliminary_fitment_report", function() {
       return {
               filters: [
                ["Preliminary Fitment Report","case_proposal","=",case_proposal],
                  ]};
                  });
                  }});
          frappe.ui.form.on('Case Proposal', {
          before_submit : function(frm, cdt, cdn) {
          var d = locals[cdt][cdn];
           var fitment_report_is_accepted = d.assessment_from_preliminary_fitment_report_is_accepted;
           var proposal_status = d.proposal_status;
               if(proposal_status === "Under Process")
                   {
                   frappe.msgprint("Case Proposals with Proposal Status value 'Under Process' cannot be submitted");
                   frappe.validated = false;
                   return;
                   }
                   var preliminary_fitment_report = d.preliminary_fitment_report;
                   if(preliminary_fitment_report)
                        {
                           var status=fetch_docstatus(preliminary_fitment_report);
                           if((status[0].docstatus === 1 && status[0].accepted === "Yes"))
                                   {
                                      frappe.validated = false;
                                      frappe.msgprint("Cannot submit the Case Proposal");
                                   return;
                                   }
                               if(status[0].docstatus === 1 && proposal_status === "Accepted" && status[0].accepted != "Yes")
                               {
                               frappe.msgprint("The Linked Preliminary Fitment Report " +preliminary_fitment_report+ " has it's Accepted value as No. Therefore this Case Proposal cannot be Accepted. Please Modify the Preliminary Fitment Report if you want to Accept the Case Proposal");
                               frappe.validated = false;
                               }
                               }
                           }
                           });
                           
       function fetch_docstatus(preliminary_fitment_report)
           {
               console.log("function",preliminary_fitment_report);
               var record_status = "";
               frappe.call({
               method: `kare_dev.kare_dev.doctype.case_proposal.case_proposal.get_docstatus`,
               args: {
                       "name": preliminary_fitment_report
                       },
                       async: false,
                       callback: function(r) {
                       if (r.message) {
                       record_status = r.message;
                                  }    
                                   }
                                   });
                                   return  record_status;
                                   }
                           