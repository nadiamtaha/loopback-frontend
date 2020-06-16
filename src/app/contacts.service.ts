import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  getAllContacts ():Observable<any>
  {
    return this._HttpClient.get("http://127.0.0.1:3000/contacts")
  }
 
  addContact (contact):Observable<any>
  {
    return this._HttpClient.post("http://127.0.0.1:3000/contacts",contact)
  }

  getContactById (id):Observable<any>
  {
    return this._HttpClient.get(`http://127.0.0.1:3000/contacts/${id}`)
  }

  updateContact (contact,id):Observable<any>
  {
    return this._HttpClient.put(`http://127.0.0.1:3000/contacts/${id}`,contact)
  }
  
  deleteContact (id):Observable<any>
  {
    return this._HttpClient.delete(`http://127.0.0.1:3000/contacts/${id}`)
  }
  
  constructor(public _HttpClient:HttpClient) { }
}
