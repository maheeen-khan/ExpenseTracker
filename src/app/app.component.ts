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

  expArray = [{expName: 'Grocery', expAmount:13000, isEditable: false}];

  onSubmit(form : NgForm){

    console.log(form)
    console.log(form.controls['exp-name'].value);

    this.expArray.push({
      expName: form.controls['exp-name'].value,
      expAmount: form.controls['exp-amount'].value,
      isEditable:false,
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
      timer: 2500
    });
  }
 isEditable: boolean = false;
 onEdit(index: number) {
  const currentExpense = this.expArray[index];

  // Toggle the isEditable state
  // currentExpense.isEditable = !currentExpense.isEditable;

  // if (!currentExpense.isEditable) {
  //   // Save logic: Perform any additional actions needed after saving
  //   console.log('Saved:', currentExpense.expName);
  // } else {
  //   console.log('Edit mode enabled for:', currentExpense.expName);
  // }
  var temp = prompt("Edit",`${currentExpense.expName}`);
  var oldName = currentExpense.expName;

  currentExpense.expName = temp || ''; 

  if(currentExpense.expName === ""){
    // alert("Expense name should not be remain empty!!! \n Do you mean to Delete this record ?")

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-outline-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Expense name cannot be left empty. Are you sure you want to delete this record instead?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.onDelete(index) //delete this record

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        currentExpense.expName = oldName;

        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your record did not Deleted :)",
          icon: "error"
        });
      }
    });

  }
}


}
