import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !:FormGroup;
  employeeModelObj :EmployeeModel=new EmployeeModel();
  employeeData!: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  email= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private formbuilder:FormBuilder,private api :ApiService, private router:Router) { 
   
  }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:['',[Validators.pattern(this.email)]],
      mobile:['',  [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.maxLength(10)]],
      salary:['',Validators.required]
    })
    this.getAllEmployee();
  }
  
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Added successfully  ");
      let ref= document.getElementById('cancel')
      ref?.click();
      
      this.formValue.reset();
      this. getAllEmployee();
    },
    err=>{
      alert("something went wromg ");
    })
  }

  getAllEmployee(){

    this.api.getEmployee().subscribe(res=>{
      this.employeeData=res;
      console.log( "akkhkhiljjhhjhhjjhhbjh"+this.employeeData);
      
    })
  }
  deleteEmployee(row :any){
    console.log(row);
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted Successfully");
      this.getAllEmployee();

    })
   
  }
  onEdit(row :any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);

    this.formValue.controls['salary'].setValue(row.salary);

  


  }
  updateEmployee(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj , this.employeeModelObj.id).subscribe(res=>{
      alert("updated successfully");
      let ref= document.getElementById('cancel')
      ref?.click();
      
      this.formValue.reset();
      this.getAllEmployee();
    })
    

  }

}
