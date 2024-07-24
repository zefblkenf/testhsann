import { Component } from '@angular/core';
import { FormBuilder,FormGroup ,Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/Reservation';
import { Router ,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  reservationForm :FormGroup =new FormGroup({})

  constructor(private formBuilder : FormBuilder,
              private reservationService :ReservationService,
              private router :Router,
              private activatedRoute: ActivatedRoute )
  {
// this creat automaticaly formBuilder that contains the form data ones the function is called
  }

  ngOnInit(): void {
    this.reservationForm=this.formBuilder.group({
      checkInDate: ['',Validators.required],
      checkOutDate: ['',Validators.required],
      guestName: ['',Validators.required],
      guestEmail: ['',[Validators.required,Validators.email]],//use array for validators
      roomNumber: ['',Validators.required,],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      let reservation=this.reservationService.getReservation(id);

      if(reservation){
        this.reservationForm.patchValue(reservation)
      }
    }
  }

  onSubmit()
  {
    if(this.reservationForm.valid){
        console.log("valid");
        let reservation :Reservation =this.reservationForm.value;

        let id= this.activatedRoute.snapshot.paramMap.get('id');
        if(id){

          this.reservationService.updateReservation(id,reservation)

        }else{

          this.reservationService.addReservation(reservation);

        }
        this.router.navigate(['/list'])
    }

    
    
  } 
}
