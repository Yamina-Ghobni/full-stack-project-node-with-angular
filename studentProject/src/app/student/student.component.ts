import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  stname: string = '';
  course: string = '';
  fee: string = '';
  courrentStudentId = '';
  constructor(private http: HttpClient) {
    this.getAllStudent();
  }
  ngOnInit(): void {}

  getAllStudent() 
  {
    this.http.get('http://localhost:3000/api/students/').subscribe((resultData: any)=>
    {
    this.isResultLoaded = true;
    console.log(resultData.data);
    this.StudentArray = resultData.data;
    });
  }

  register()
  {
   
    let bodyData = {
      "stname" : this.stname,
      "course" : this.course,
      "fee" : this.fee,
    };
    this.http.post("http://localhost:3000/api/students/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
        this.getAllStudent();
     
    });
  }
  setUpdate(data: any) 
  {
   this.stname = data.stname;
   this.course = data.course;
   this.fee = data.fee;
  
   this.courrentStudentId = data.id;
 
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "stname" : this.stname,
      "course" : this.course,
      "fee" : this.fee
    };
    
    this.http.put("http://localhost:3000/api/students/update"+ "/"+ this.courrentStudentId,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudent();
      
    });
  }
 
  save()
  {
    if(this.courrentStudentId == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:3000/api/students/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
    });
  }
}
