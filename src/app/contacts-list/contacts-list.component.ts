import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $ :any;

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contactsList:any[]=[];
  contactId:any;
  contactName:any;
  modalMode:string;
  contactForm=new FormGroup({
    //id:new FormControl(null),
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    phonenumber:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{11}$/)]), 
  })

  constructor(public _ContactsService:ContactsService) { 
   this.getContactsList();
  }


   getContactsList(){
    this._ContactsService.getAllContacts().subscribe(data=>{
      this.contactsList=data
    },
    err=>console.log(err))
   }

   onDeleteIconClicked(contact){
    this.contactId=contact.id;
    Swal.fire({
      title: 'Are you sure?',
      text:  `Contact ${contact.name} will be deleted.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.deleteContact();
      }
    })
   
  }

  deleteContact(){
    
    this._ContactsService.deleteContact(this.contactId).subscribe({next:response=>{
        console.log(response)
      
          Swal.fire(
            'Contact successfully deleted!',
          )
          this.getContactsList()
      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    
  }
  onEditIconClicked(contact){
    this.openContactModal(contact)
  }
  openContactModal(contact?){
     $("#contactModal").modal('show');
     //edit mode
     if(contact){
      this.contactForm.controls['name'].setValue(contact.name);
      this.contactForm.controls['phonenumber'].setValue(contact.phonenumber);
      this.modalMode="editMode";
      this.contactId=contact.id
     }
     //add mode
     else{
      this.contactForm.reset();
      this.modalMode="addMode"
     }
  }
  submitContactData(){
    if(this.modalMode=="addMode")  //add mode(call add service)
    {
     this.addContact();
    }
    else   //edit mode(call update service)
    {
      this.updateContact();
    }
    $("#contactModal").modal('hide');  

  }

  addContact(){
    this._ContactsService.addContact(this.contactForm.value).subscribe({next:response=>{
      this.getContactsList()
    },
    error:err=>{
      console.log(err.error);
    }
    })
  }

  updateContact(){
    this._ContactsService.updateContact(this.contactForm.value,this.contactId).subscribe({next:response=>{
      this.getContactsList()
    },
    error:err=>{
      console.log(err.error);
    }
    })
  }
  ngOnInit(): void {
  }

}
