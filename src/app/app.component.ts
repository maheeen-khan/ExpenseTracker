import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'exptracker';

  expArray = [{expName: 'Grocery', expAmount:13000}];

  onSubmit(form : NgForm){

    console.log(form)
    console.log(form.controls['exp-name'].value);

    this.expArray.push({
      expName: form.controls['exp-name'].value,
      expAmount: form.controls['exp-amount'].value
    })
    form.reset()
  }

  onDelete(index : number){
    console.log('delete button is pressed at ', index);
    this.expArray.splice(index,1)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Deleted!",
      text: "Your expense record has been deleted.",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
