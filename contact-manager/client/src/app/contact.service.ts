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

  addContacts(contact) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/api/contact', contact, { headers: headers });
  }

}
