import { event, importedObject } from "../interfaces";


export const variant: string = "info";
//https://hackaton3-library.herokuapp.com"
export const APIUrl: string = "http://localhost:8080";
export const ProjectUrl: string = "http://localhost:3000";
export const backgroundColor: string = "bg-"+variant;
export const activeBack: (number|null)[] = [
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
];


    export const manualtoken = "eyJraWQiOiJEVDM5TDZhVFpmRENLa3ZnQTI2dzBkaUp1MDZYMjBqYk9LU096aFl4ZjdJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwODQxMjkzZS02YzllLTQyOGUtOGRlNi1iNjk0OWE2NzQzODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0zLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtM19tR3hLMUJpOHMiLCJjb2duaXRvOnVzZXJuYW1lIjoiMDg0MTI5M2UtNmM5ZS00MjhlLThkZTYtYjY5NDlhNjc0Mzg5Iiwib3JpZ2luX2p0aSI6IjMwZmY5MWZmLTlhNDUtNGQ1Zi1iMjM2LTllOGNiN2E5ODEwZiIsImF1ZCI6IjVzOGNnNTBkb2FobXU4NTVybGM4ZnI2cW1wIiwiZXZlbnRfaWQiOiI3ZGJjMmJkNS05NTdlLTQ0NTAtYjg1ZC0xMWU0YzIxOTExZDgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2MzMxNDc1MywiZXhwIjoxNjYzNDAxMTUzLCJpYXQiOjE2NjMzMTQ3NTMsImp0aSI6ImMzNWIzYTI0LTA5MDktNDkyYS05YTIwLWE5ODMyMWRiYjRkMSIsImVtYWlsIjoidGVzdCttYW5hZ2VyMUBoZWkuc2Nob29sIn0.KTd6VN0tS7tBUFhLqnYy-ZZ2MxrEb5_izCepu1q9hKN9vwpLQmc1AQQKWCGb7T35GmahsYzKB4nh_NHMHcdoxUcZtgLitLpKZZjrfkuJrh5zgc5o0EAvU1lm2kGNewtYdlr5bljJY_FLjDay8pO1EDEBW3MuwE2jENE9SHhKywbOim1Fpm4eefNKViaVh6Wu3kfGREjQCNgx_W2OjkDcDkB38nT7cf0kAEoCQ7lzRnefQ4knqTNgjyW9vxFAQUV2uty2b-e3DwVezHaKls32rMgsSiI5mt3_TlpxdJNpk3iV58HGTsDH__jXqvgoivVVQrd0nYj1ynmkMsfXU-g_aA"



    export const firstEvent:event={
        id: "event1_id",
        name: "EL1P3",
        eventType: "COURSE",
        startingTime: "2022-10-01T08:00:00Z",
        endingTime: "2022-10-01T10:00:00Z",
        supervisor: {
            id: "teacher1_id",
            firstName: "One",
            lastName: "Teacher",
            email: "test+teacher1@hei.school",
            ref: "TCR21001",
            status: "ENABLED",
            phone: "0322411125",
            birthDate: "1990-01-01",
            entranceDatetime: "2021-10-08T08:27:24Z",
            sex: "F",
            address: "Adr 3",
            role: "TEACHER"
        },
        place: {
            id: "place2_id",
            name: "Hei ivandry"
        }
    };
  

    export const baba:importedObject = {
        "AgeRange":{
            High:1,
            Low:1
        },
        "Beard":{
            Confidence:1,
            Value:true,
        },
        "BoundingBox":{
            Height:1,
            Left:1,
            Top:1,
            Width:1,
        },
        "Confidence":1,
        "Emotions":[{
            Confidence:1,
            Type:"string",
        }],
        "Eyeglasses":{
            Confidence:1,
            Value:true,
        },
        "EyesOpen":{
            Confidence:1,
            Value:true,
        },
        "Gender":{
            Confidence:1,
            Value:"string",
        },
        "Landmarks":[{
            Type:"string",
            X:1,
            Y:1,
        }],
        "MouthOpen":{
            Confidence:1,
            Value:true,
        },
        "Mustache":{
            Confidence:1,
            Value:true,
        },
        "Pose":{
            Pitch:1,
            Roll:1,
            Yaw:1,
        },
        "Quality":{
            Brightness:1,
            Sharpness:1,
        },
        "Smile":{
            Confidence:1,
            Value:true,
        },
        "Sunglasses":{
            Confidence:1,
            Value:true,
        }
    };




