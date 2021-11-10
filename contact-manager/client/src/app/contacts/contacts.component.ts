import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, ReactiveFormsModule } from '@angular/forms';

import { Contact } from '../contact'; 
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;
  angForm: FormGroup;
  submitted = false;

  constructor(private contactService: ContactService, private fb: FormBuilder) { }

  addContact() {
    this.submitted = true;

    if (this.angForm.invalid) {
      return;
    }

    const newContact = {
      first_name: this.angForm.value.first_name,
      last_name: this.angForm.value.last_name,
      phone: this.angForm.value.phone
    };

    this.contactService.addContacts(newContact).subscribe( (contact:any) => {
      this.contacts.push(contact);
      this.contactService.getContacts()
          .subscribe((contacts: any) => this.contacts = contacts);
    });

  }

  ngOnInit(): void {
    this.angForm = this.fb.group({
      first_name: ['', Validators.required ],
      last_name: ['', Validators.required ],
      phone: ['', [Validators.required, Validators.minLength(10)] ]
    });

    this.contactService.getContacts()
        .subscribe( (contacts: any) => this.contacts = contacts);
  }

}
