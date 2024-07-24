import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor (){
    let  savedReservations = localStorage.getItem("reservation");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [] 
  }
  
  //  CRUD

  getReservations(): Reservation[] {
    return this.reservations;
  }


  getReservation(id:string): Reservation | undefined{
    return this.reservations.find(res=>res.id===id);
  }
  


  addReservation(reservation :Reservation): void{
    reservation.id= Date.now().toString();
    this.reservations.push(reservation);
    console.log(reservation);
    localStorage.setItem("reservation",JSON.stringify(this.reservations));

  }



  deleteReservation(id:string):void{
    let index = this.reservations.findIndex(res=>res.id===id);
    this.reservations.splice(index,1);
    localStorage.setItem("reservation",JSON.stringify(this.reservations))
  }



  updateReservation(id:string,reservation :Reservation):void{
    let index= this.reservations.findIndex(res=>res.id===id)
    this.reservations[index]=reservation;
    reservation.id=id;
    localStorage.setItem("reservation",JSON.stringify(this.reservations))
  }

}
