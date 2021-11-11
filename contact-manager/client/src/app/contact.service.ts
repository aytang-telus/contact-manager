import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get('http://localhost:3000/api/contacts');
  }

  addContact(newContact) {

    if (!newContact.first_name) {
      newContact.first_name = 'undefined';
    }
    if (!newContact.last_name) {
      newContact.last_name = 'undefined';
    }
    if (!newContact.phone) {
      newContact.phone= 'undefined';
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/api/contact', newContact, { headers: headers });
  }

}
