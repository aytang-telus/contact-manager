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
  email: string;
  notes: string;
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
      phone: this.angForm.value.phone,
      email: this.angForm.value.email,
      notes: this.angForm.value.notes
    };

    this.contactService.addContact(newContact).subscribe( (contact: Contact) => {
      this.contacts.push(contact);
      this.contactService.getContacts()
          .subscribe((contacts: Contact[]) => this.contacts = contacts);
    });

  }

  deleteContact(id: any) {
    const contacts = this.contacts;

    this.contactService.deleteContact(id)
        .subscribe(suc => { 
            for (let i = 0; i < contacts.length; i++) {
              if (contacts[i]._id == id) {
                contacts.splice(i, 1);
              }
            }
        });
  }

  ngOnInit() {
    this.angForm = this.fb.group({
      first_name: ['', Validators.required ],
      last_name: ['', Validators.required ],
      phone: ['', [Validators.required, Validators.minLength(10)] ],
      email: ['', Validators.required ],
      notes: ['']
    });

    this.contactService.getContacts()
        .subscribe( (contacts: Contact[]) => this.contacts = contacts);
  }

}
