import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Member, ServerResponse } from "./models";

@Injectable()
export class MemberService {

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    // Post member to server and receive ResponseEntity as ServerResponse model
    postMember(member:Member):Promise<ServerResponse> {
        // Create form key-values, make sure the keys are named in accordance to RequestPart in Server Controller
        const form = new FormData()
        form.set("name", member.name)
        form.set("telegram", member.telegram)
        form.set("grade", member.grade)
        return firstValueFrom(this.http.post<ServerResponse>('https://configmysql-production.up.railway.app/member/add',form))
    }

    // Get member from server and receive ResponseEntity as ServerResponse model
    getMember(telegram:string):Promise<ServerResponse> {
        return firstValueFrom(this.http.get<ServerResponse>(`https://configmysql-production.up.railway.app/member/${telegram}`))
    }
}