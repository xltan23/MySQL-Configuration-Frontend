import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MemberService } from 'src/app/member.service';
import { Member, SearchTele } from 'src/app/models';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  // FORMS
  postForm!:FormGroup
  getForm!:FormGroup
  // DISPLAY ELEMENTS
  telegram!:string
  grade!:string
  date!:string

  // CONSTRUCTOR
  constructor(private memberSvc:MemberService, private fb:FormBuilder) {}

  // ON INITIATION
  ngOnInit(): void {
      this.postForm = this.createPostForm() 
      this.getForm = this.createGetForm()
  }

  public createPostForm():FormGroup {
    return this.fb.group({
      name:this.fb.control(''),
      telegram:this.fb.control(''),
      grade:this.fb.control('')
    })
  }

  // Form Data to pass to MySQL Database
  processPostForm() {
    console.info('>>> Processing Form...')
    const formValue:Member = this.postForm.value as Member
    this.memberSvc.postMember(formValue)
                  .then((result) => {
                    // Pass the results to be displayed 
                    console.info('>>> Server Response:', result)
                    this.telegram = result.telegram
                    this.grade = result.grade
                    this.date = result.date
                  })
                  .catch((error) => {
                    console.error('Error:', error)
                  })
    this.ngOnInit()
  }

  public createGetForm():FormGroup {
    return this.fb.group({
      telegram:this.fb.control('')
    })
  }

  // Form Data to query MySQL Database to retrieve information related to the Data
  processGetForm() {
    console.info('>>> Processing Form...')
    const formValue:SearchTele = this.getForm.value as SearchTele
    this.memberSvc.getMember(formValue.telegram)
                  .then((result) => {
                    // Pass the results to be displayed
                    console.info('>>> Server Response:', result)
                    this.telegram = result.telegram
                    this.grade = result.grade
                    this.date = result.date
                  })
                  .catch((error) => {
                    console.error('Error:', error)
                  })
    this.ngOnInit()
  }
}
