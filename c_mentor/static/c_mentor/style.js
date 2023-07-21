document.addEventListener('DOMContentLoaded', function() {
  let const_type = document.querySelector(".const_type").innerHTML;
  let const_id = document.querySelector(".const_id").innerHTML;
  document.querySelector(".dis-display").addEventListener('click',()=>profile_form(const_type,const_id));
});



function profile_form(type,idd,details){
    console.log(idd);
    document.querySelector(".main-body").style.display = 'none';
    document.querySelector(".display").style.display = "block";
    document.querySelector(".allmentor").style.display = "none";
    document.querySelector('.form-all').style.display = 'block';
    document.querySelector('.to_mentor').style.display = "none";
    document.querySelector('.student_mentor').style.display = "none";
    document.querySelector('.mentor_student').style.display = "none";
    document.querySelector('.fill-message').style.display = "none";
    document.querySelector('.information').style.display= "none";


    if(type == "Mentor")
    {
      console.log(details);
      document.querySelector(`.form-view-Mentor`).style.display = 'block';
      if(details){
        let url = document.querySelector(`.url-${type}-${idd}`).value = details.url;
        let qualification = document.querySelector(`.qualify-${type}-${idd}`).value = details.qualify;
        let special = document.querySelector(`.special-${type}-${idd}`).value = details.special;
        let job = document.querySelector(`.job-${type}-${idd}`).value = details.job;
        let company = document.querySelector(`.company-${type}-${idd}`).value = details.company;
        let pay = document.querySelector(`.pay-${type}-${idd}`).value = details.pay;
        let description = document.querySelector(`.description-${type}-${idd}`).value = details.description;
      }
    }
    else{
        document.querySelector(`.form-view-Student`).style.display = 'block';
        if(details){
          
          console.log(details);
          let school = document.querySelector(`.school-${type}-${idd}`).value = details.school;
          let education = document.querySelector(`.education-${type}-${idd}`).value = details.education;
          let url = document.querySelector(`.url-${type}-${idd}`).value = details.url;
          console.log(school);
          console.log(education);
          console.log(url);
        }
    }
}

function display(type,idd,name){
    console.log(name);
    console.log(type);
    console.log(name);
    console.log(idd);
    if(type=="Mentor"){
        let id = idd;
        console.log(id);
        let url = document.querySelector(`.url-${type}-${idd}`).value;
        let qualification = document.querySelector(`.qualify-${type}-${idd}`).value;
        let special = document.querySelector(`.special-${type}-${idd}`).value;
        let job = document.querySelector(`.job-${type}-${idd}`).value;
        let company = document.querySelector(`.company-${type}-${idd}`).value;
        let pay = document.querySelector(`.pay-${type}-${idd}`).value;
        let desc=document.querySelector(`.description-${type}-${idd}`).value;

        fetch(`/profile/post/${name}`,{
            method:'POST',
            body:JSON.stringify({
                qualification,
                url,
                job,
                special,
                company,
                id,
                pay,
                desc
            })
        })
        .then(response =>response.json())
        .then(result=>{
            console.log(result);
        });  
    } 
    else{
        let id = idd;
        let school = document.querySelector(`.school-${type}-${idd}`).value;
        let education = document.querySelector(`.education-${type}-${idd}`).value;
        let url = document.querySelector(`.url-${type}-${idd}`).value;
        console.log(school);
        console.log(url);
        console.log(id);
        fetch(`/profile/post/${name}`,{
            method:'POST',
            body:JSON.stringify({
                education,
                school,
                url,
                id
            })
        })
        .then(response =>response.json())
        .then(result=>{
            console.log(result);
        });  
        
    }
    location.reload();
}

function profile_display(type,name){
    document.querySelector('.information').style.display= "none";
    document.querySelector(".main-body").style.display = 'none';
    document.querySelector(".allmentor").style.display = "none";
    document.querySelector('.to_mentor').style.display = "none";
    document.querySelector('.form-all').style.display = 'none';
    document.querySelector('.student_mentor').style.display = "none";
    document.querySelector('.mentor_student').style.display = "none";
    document.querySelector('.fill-message').style.display = "none";

    console.log(`Typez:${type}`);
    console.log(name);
    document.querySelector(`.form-view-${type}`).style.display = 'none';
    fetch(`/profile/${name}`).then(response =>response.json()).then(mentors=>profile_view(mentors,type));
    

}

function profile_view(details,type,response){
  const alls = document.querySelector(".display");
  alls.style.display = "block";
  alls.innerHTML = " ";
console.log(details);
  // if(details.logic == true){
  //   let msg = document.createElement("h2");
  //   msg.className = "message";
  //   msg.innerHTML = details.Error;
  //   msg.style.display = "block";
  //   alls.append(msg)
  // }
  // else{

        if(type == "Mentor")
        {
          let mentor_profile=document.createElement('div');
          mentor_profile.style.cssText="cursor:default;";

          let title=document.createElement('div');
          title.className="title";
          title.innerHTML="PROFILE";
          title.style.cssText="  text-align: center;font-size: 40px;margin-top: 10px;";
          
           
          let outer_mentor_profile=document.createElement('div');
          outer_mentor_profile.style.cssText="  display: flex;justify-content: space-between;width: 90%;margin: auto;margin-bottom:5%;margin-top:2%;  border-radius: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);";
          
        
          let temp1=document.createElement('div');
          let outer_mentor_photo=document.createElement('div');
          outer_mentor_photo.style.cssText="  margin-left: 20%;margin-top: 20%;width: 40%;";
          
          let img=document.createElement('img');
          img.style.cssText="height: 400px;width: 300px;";
          img.src=details.url;



          let left_mentor_profile=document.createElement('div');
          left_mentor_profile.style.cssText="  margin-top: 6%;display: flex;flex-direction: column;align-items: center;justify-content: space-between;";
          
          let mentor_name=document.createElement('div');
          mentor_name.style.cssText="font-size:20px;margin-left: 30%;margin-bottom:8%;";
          mentor_name.innerHTML=details.name;
          
          
          let amount=document.createElement('div');
          amount.style.cssText="  font-size: 30px;margin-left: 30%;";
          amount.innerHTML="$"+details.pay+"/month" ;

          let mentor_details=document.createElement("div");
          mentor_details.style.cssText="width: 60%;margin-top:3.5%;";
          
          let list=["name","email","job","pay","company","qualify","special","description"];
          let list2=["Name","Email","Job","Pay per month","Company","Qualification","Skills","Description"];

          for(let i=0;i<=2;i++)
          {
          let outer_o1_mentor=document.createElement("div");
          outer_o1_mentor.style.cssText="display: flex;justify-content: space-between;width: 80%;margin-left: 5%;margin-top:2%;";

          let outer_stu=document.createElement("div");
          let tem=document.createElement("div");
          tem.style.cssText="font-weight:bolder;";
          tem.innerHTML=list2[i];
          let name=document.createElement("div");
          name.innerHTML=details[list[i]];
          name.style.cssText="height: 35px;margin-top:3%;width: 250px;outline: none;";

          
          let outer_stu2=document.createElement("div");
          let tem2=document.createElement("div");
          tem2.innerHTML=list2[i+1];
          tem2.style.cssText="font-weight:bolder;";
          let name2=document.createElement("div");
          name2.innerHTML=details[list[i+1]];
          name2.style.cssText="height: 35px;margin-top:3%;width: 250px;outline: none;";


          outer_stu.appendChild(tem);
          outer_stu.appendChild(name);

          outer_stu2.appendChild(tem2);
          outer_stu2.appendChild(name2);
          
          outer_o1_mentor.appendChild(outer_stu);
          outer_o1_mentor.appendChild(outer_stu2);
          mentor_details.appendChild(outer_o1_mentor);

          }
          for(let i=0;i<2;i++)
          {
            let outer_o3_mentor=document.createElement("div");
            outer_o3_mentor.style.cssText="width:100%;margin-left: 5%;margin-top:3%;";
  
            let outer_stu3=document.createElement("div");
            outer_stu3.style.cssText="width:100%";
            let tem=document.createElement("div");
            tem.innerHTML=list2[i+6]+":";
            tem.style.cssText="font-weight:bolder";
            let name=document.createElement("div");
            name.innerHTML=details[list[i+6]];
            name.maxlength=30;
            name.style.cssText="height: 45px;width:80%;margin-top:1%;outline: none;";
            outer_stu3.appendChild(tem);
            outer_stu3.appendChild(name);
            outer_o3_mentor.appendChild(outer_stu3);
            mentor_details.appendChild(outer_o3_mentor);
            
          }
// ---------------button--------------------------------
          let outer_o1_mentor=document.createElement("div");
          outer_o1_mentor.style.cssText="display: flex;justify-content: space-between;width: 80%;margin: 5%;margin-left:30%";

          let dan=document.createElement("button");
          dan.innerHTML="Edit";
          dan.style.cssText="height: 40px;width: 265px;border-radius: 20px;border: none;color: white;background-color: rgb(9, 10, 37);display:none;";
          dan.setAttribute('data-toggle','modal');
          dan.setAttribute('data-target','#exampleModal');

          let btn=document.createElement("button");
          btn.style.cssText = "display: none;";
          btn.innerHTML="Edit";
          btn.style.cssText="height: 40px;width: 265px;border-radius: 20px;border: none;color: white;background-color: rgb(9, 10, 37);display:none;";
          outer_o1_mentor.appendChild(dan);
          outer_o1_mentor.appendChild(btn);

          mentor_details.appendChild(outer_o1_mentor);
// ------------------------------------------------------
          left_mentor_profile.appendChild(mentor_name);
          left_mentor_profile.appendChild(amount);
          outer_mentor_photo.appendChild(img);
          temp1.append(outer_mentor_photo);
          temp1.appendChild(left_mentor_profile);
          outer_mentor_profile.appendChild(temp1);
          outer_mentor_profile.appendChild(mentor_details);
          
          mentor_profile.append(title);
          mentor_profile.appendChild(outer_mentor_profile);
// ------------------------------------------------------

let check = document.querySelector(".check-user").innerHTML;
            console.log(check);
            if(details.name == check){
              btn.style.display = "none";
              dan.style.display = "block";
              dan.addEventListener('click',()=>profile_form(type,details.user_id,details));
            }
            else{
              let request =btn;
              request.style.display = "block";
              console.log(details.check);
              if(response){
                if(response.Error){
                  request.innerHTML = "Fill the form";
                }
                else{
                  if(response.major){
                    if(response.minor){
                      request.innerHTML = "cancel request";
                    }
                    else{
                      request.innerHTML = "cancel request";
                    }
                  }
                  else{
                    request.innerHTML = "Send request";
                  }
                }
                request.addEventListener('click',()=>update(details,type))
              }
              else{
                if(details.check){

                  if(details.accept === "accepted"){
                  request.innerHTML = "Cancel request";
                  }
                  else if(details.accept === "Cant"){
                    if(details.const === "re")
                    {
                      request.style.display = "display";
                      request.innerHTML = "Cancel Request";
                    }
                    else if(details.const === "Cant"){
                      request.style.display = "none";
                    }
                  }
                  console.log(details.const);
                 
                }
                else{
                  request.innerHTML = "Send request";
                }
                request.addEventListener('click',()=>update(details,type))
              }
            }
          alls.appendChild(mentor_profile);


        
       
        }
        else{
          let student_profile=document.createElement("div");
          student_profile.style.cssText="cursor:default"
          let title_stu=document.createElement("div");
          title_stu.style.cssText="font-size: 30px;text-align: center;margin: 2%;";
          title_stu.innerHTML="PROFILE";

          let outer_content=document.createElement("div");
          outer_content.style.cssText="border-radius: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);width: 60%;height: 440px;margin: auto;margin-left: 20%;";

          let content=document.createElement("div");
          content.style.cssText="  display: flex;justify-content: space-around;";

          let outer_photo=document.createElement("div");
          outer_photo.style.cssText="width: 30%;margin-top:3%;";

          let image=document.createElement("img");
          image.src=details.url;
          image.style.cssText="  height: 350px;width: 250px;padding: 10%;";
          outer_photo.appendChild(image);

          let stu_details=document.createElement("div");
          stu_details.style.cssText="  width: 20%; align-items:left;margin-top: 5%;display: flex;flex-direction: column;justify-content: space-between;margin-bottom: 3%;margin-right:0%;";

          let list=["name","email","school","education"];
          let list2=["Name","Email","School","Education"];

          for(let i=0;i<4;i++)
          {
            let outer_stu=document.createElement("div");

              let temp=document.createElement("div");
              temp.innerHTML=list2[i];
              temp.style.cssText="font-weight:bold";
              let name=document.createElement("div");
              name.style.cssText="  height: 35px;width: 250px;margin-top:1%;outline: none;";
              name.innerHTML=details[list[i]];

              outer_stu.appendChild(temp);
              outer_stu.appendChild(name);
              stu_details.appendChild(outer_stu);

          }
          let outer_stu=document.createElement("div");
          let dans = document.createElement("button");
          dans.style.cssText = "height: 40px;width: 265px;border-radius: 20px;border: none;color: white;background-color: rgb(9, 10, 37);display:none;margin:auto;margin-top:10px";
          dans.innerHTML = "Edit";
          dans.type="button";
          dans.setAttribute('data-toggle','modal');
          dans.setAttribute('data-target','#exampleModal1');
          outer_stu.appendChild(dans);
          let check = document.querySelector(".check-user").innerHTML;
          console.log(check);
          if(details.name == check){
            dans.style.display = "block";
            dans.addEventListener('click',()=>profile_form(type,details.user_id,details));
          }
          

          

          content.append(outer_photo);
          content.append(stu_details);
          student_profile.append(title_stu);
          outer_content.append(content);
          outer_content.appendChild(outer_stu);
          student_profile.append(outer_content);


          alls.append(student_profile);
          
          }
  //  }
   
}

function update(details,type){
  console.log(type);
  console.log(details.user_id);
  console.log(type);
  fetch(`/update/${details.user_id}`)
  .then(response=>response.json())
  .then(response=>{
    profile_view(details,type,response)
  })
}

function profile_mentor(type){
    document.querySelector('.fill-message').style.display = "none";
    document.querySelector('.to_mentor').style.display = "none";
    document.querySelector('.form-all').style.display = 'none';
    document.querySelector(".main-body").style.display = 'none';
    document.querySelector(`.form-view-${type}`).style.display = 'none';
    document.querySelector(".display").style.display = "none";
    document.querySelector(".allmentor").style.display = "block";
    document.querySelector(".allmentor").innerHTML = " ";
    document.querySelector('.student_mentor').style.display = "none";
    document.querySelector('.mentor_student').style.display = "none";
    document.querySelector('.information').style.display= "none";
    fetch("/all_mentor").then(response=>response.json()).then(({mentors})=>mentors.forEach(mentor=>mentor_all(mentor)));
}

function mentor_all(mentor){
  console.log(mentor);
    const all=document.createElement('div');
    all.className='all-mentor-list';
    all.style.cssText="width: 60%;margin: auto;  border-radius: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);";

    const inner_mentor=document.createElement('div');
    inner_mentor.className='mentors';
    inner_mentor.style.cssText="  display: flex;justify-content: space-between;border-radius: 30px;margin-top: 5%;";
    
    const temp=document.createElement('div');
    const out_photo=document.createElement('div');
    out_photo.className="outer-mentor-photo";
    out_photo.style.cssText="  margin-left: 20%;margin-top: 20%;width: 40%;";

    const image=document.createElement('img');
    image.className="photo-mentor-list";
    image.style.cssText = "height: 200px;border-radius:10px;padding:2%;";
    image.src=mentor.url;

    const outer_name=document.createElement('div');
    outer_name.className="left-mentor-profile";
    outer_name.style.cssText="  margin-top: 10%;display: flex;flex-direction: column;align-items: center;justify-content: space-between;";

    const name=document.createElement('div');
    name.className="mentor-name";
    name.innerHTML=mentor.name;
    name.style.cssText="font-size: 30px;margin-left: 37%;margin-bottom: 8%;";

    const list_mentor=document.createElement('div');
    list_mentor.className="list-mentor-details";
    list_mentor.style.cssText="width: 65%;display: flex;flex-direction: column;text-align: left;margin-top: 5%;margin-right: 5%;justify-content: space-between;margin-bottom: 6%;";

    const temp2=document.createElement('div');
    const intro=document.createElement('div');
    intro.className="intro-mentor";
    intro.innerHTML="Introduction";
    intro.style.cssText="  font-weight: bold;font-size: 20px;";

    const ment=document.createElement('div');
    ment.className="mentor-intro";
    ment.innerHTML=mentor.description;

    const intro2=document.createElement('div');
    intro2.className="intro-mentor";
    intro2.innerHTML="Skills";
    intro2.style.cssText="  font-weight: bold;font-size: 20px;";

    const ment2=document.createElement('div');
    ment2.className="mentor-intro";
    ment2.innerHTML=mentor.special;
    

    temp2.append(intro);
    temp2.append(ment);
    temp2.append(document.createElement('br'));
    temp2.append(intro2);
    temp2.append(ment2);


    list_mentor.append(temp2);
    
    outer_name.append(name);
    out_photo.append(image);
    
    temp.append(out_photo);
    temp.append(outer_name);
    
    inner_mentor.append(temp);
    inner_mentor.append(list_mentor);
    
    all.append(inner_mentor);
    document.querySelector(".allmentor").append(all);
    b = document.createElement("br");
    document.querySelector(".allmentor").append(b);
    
    let s= "Mentor";
    all.addEventListener('click',()=>profile_display(s,mentor.name));
}

function close(id){
  console.log(id);
  location.reload();
}

function request(id,name){
  document.querySelector('.information').style.display= "none";
  document.querySelector('.mentor_student').style.display = "none";
  document.querySelector(".main-body").style.display = 'none';
  document.querySelector(".display").style.display = "none";
  document.querySelector(".allmentor").style.display = "none";
  document.querySelector(`.form-view-Mentor`).style.display = 'none';
  document.querySelector(`.form-view-Student`).style.display = 'none';
  document.querySelector('.form-all').style.display = 'none';
  document.querySelector('.to_mentor').style.display = "block";
  document.querySelector('.to_mentor').innerHTML = " ";
  document.querySelector('.student_mentor').style.display = "none";
  document.querySelector('.fill-message').style.display = "none";
  fetch(`to_user/${name}`)
  .then((response)=>response.json())
  .then(({tolist})=>tolist.forEach(list=>request_display(list)));
}

function request_display(list){
  if(list.status == "send"){
  const combine=document.querySelector(".to_mentor");

  let title=document.createElement("div");
  title.innerHTML="REQUESTED STUDENTS";
  title.style.cssText="  text-align: center;font-size: 40px;margin-top: 10px;";


  let request=document.createElement("div");
  request.style.cssText="display: flex;justify-content: space-between;width: 30%;height: 30px;margin: auto;align-items: center;padding: 10px;padding-left: 5%;padding-right: 5%;margin-top: 5%;border-radius: 10px;  border-radius: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);padding:2%; ";

  let name=document.createElement("div");
  name.innerHTML=list.sender;

  let temp1=document.createElement("div");
  let btn1=document.createElement("button");
  btn1.innerHTML="Accept";
  btn1.style.cssText="  height: 25px;width: 100px;border-radius: 20px;border: none;color: white;background-color: rgb(5, 178, 168);";
  temp1.append(btn1);
  btn1.onclick = ()=>accepted(list.sender,list.receiver,list.status,list.idd);

  let temp2=document.createElement("div");
  let btn2=document.createElement("button");
  btn2.innerHTML="Reject";
  btn2.style.cssText="  height: 25px;width: 100px;border-radius: 20px;border: none;color: white;background-color: rgb(5, 178, 168);";
  temp2.append(btn2);
  btn2.onclick=()=>reject(list.sender,list.receiver)


  request.append(name);
  request.append(temp1);
  request.append(temp2);
  combine.append(title);
  combine.append(request);
}
else{
  document.querySelector(".to_mentor").innerHTML = " ";
}
}

function accepted(sender,receiver,status,id){
  location.reload();
  console.log(sender);
  console.log(receiver);
  console.log(status);
  fetch(`accept/${id}`)
  .then(response=>response.json());
}

function reject(sender,receiver){
  console.log(sender);
    fetch(`mentor_reject/${sender}`)
    .then(response=>response.json())
    .then(response=>{
      console.log(response.message);
    })
    location.reload();
}

function student_display(id,name){
  document.querySelector(".main-body").style.display = 'none';
  document.querySelector(".display").style.display = "none";
  document.querySelector(".allmentor").style.display = "none";
  document.querySelector(`.form-view-Mentor`).style.display = 'none';
  document.querySelector(`.form-view-Student`).style.display = 'none';
  document.querySelector('.form-all').style.display = 'none';
  document.querySelector('.to_mentor').style.display = "none";
  document.querySelector('.student_mentor').style.display = "block";
  document.querySelector('.student_mentor').innerHTML = " ";
  document.querySelector('.mentor_student').style.display = "none";
  document.querySelector('.fill-message').style.display = "none";
  document.querySelector('.information').style.display= "none";
  fetch(`student_list/${id}`)
  .then(response=>response.json())
  .then(({student_list})=>student_list.forEach(list=>each_student(list)))
}

function each_student(list){
  const cn = document.querySelector(".student_mentor");


  let title=document.createElement("div");
  title.innerHTML="STUDENTS";
  title.style.cssText="  text-align: center;font-size: 40px;margin-top: 10px;";


  let request=document.createElement("div");
  request.style.cssText="display: flex;justify-content: space-between;width: 30%;height: 30px;margin: auto;align-items: center;padding: 10px;padding-left: 5%;padding-right: 5%;margin-top: 5%;border-radius: 10px;  border-radius: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);padding:2%; ";

  // let name=document.createElement("div");
  // name.innerHTML=list.sender;

  let temp1=document.createElement("div");
  let btn1=document.createElement("div");
  btn1.innerHTML=list.name;
  btn1.style.cssText="  height: 25px;width: 100px;";
  temp1.append(btn1);

  let temp2=document.createElement("div");
  let btn2=document.createElement("div");
  btn2.innerHTML=list.email;
  btn2.style.cssText="  height: 25px;width: 100px;";
  temp2.append(btn2);
  
  request.append(temp2);
  request.append(temp1);
  request.onclick = ()=>dis_prof(list);
  cn.append(request);
}

function dis_prof(list){
  fetch(`profile/${list.name}`)
  .then(response=>response.json())
  .then(response=>profile_display("Student",list.name))
}

function mentor_display(id,name){
  document.querySelector(".main-body").style.display = 'none';
  document.querySelector(".display").style.display = "none";
  document.querySelector(".allmentor").style.display = "none";
  document.querySelector(`.form-view-Mentor`).style.display = 'none';
  document.querySelector(`.form-view-Student`).style.display = 'none';
  document.querySelector('.form-all').style.display = 'none';
  document.querySelector('.to_mentor').style.display = "none";
  document.querySelector('.student_mentor').style.display = "none";
  document.querySelector('.mentor_student').style.display = "block";
  document.querySelector('.mentor_student').innerHTML = " ";
  document.querySelector('.fill-message').style.display = "none";
  document.querySelector('.information').style.display= "none";
  fetch(`mentor_list/${id}`)
  .then(response=>response.json())
  .then(({mentor_list})=>mentor_list.forEach(list=>each_mentor(list)))
}
function each_mentor(list){
  const sn = document.querySelector(".mentor_student");
  let cats =  document.createElement("div");
  cats.className = "stud_card";
  cats.onclick = ()=>dis_roof(list);

  let geos = document.createElement("div");
  geos.className = "row "

  let r11 = document.createElement("div");
  r11.className = "col-lg-1";
  r11.id="joe"
  r11.innerHTML = list.name;
  geos.append(r11)

  let r22 = document.createElement("div");
  r22.className = "col-lg-1";
  r22.id = "rock";
  r22.innerHTML = list.email;
  geos.append(r22)

  cats.append(geos)
  sn.append(cats);
  let ctus =  document.createElement("br");
  sn.append(ctus)
}

function dis_roof(list){
  fetch(`profile/${list.name}`)
  .then(response=>response.json())
  .then(response=>profile_display("Mentor",list.name))
}

function writes(){
  document.querySelector(".main-body").style.display = 'none';
  document.querySelector(".display").style.display = "none";
  document.querySelector(".allmentor").style.display = "none";
  document.querySelector(`.form-view-Mentor`).style.display = 'none';
  document.querySelector(`.form-view-Student`).style.display = 'none';
  document.querySelector('.form-all').style.display = 'none';
  document.querySelector('.to_mentor').style.display = "none";
  document.querySelector('.student_mentor').style.display = "none";
  document.querySelector('.mentor_student').style.display = "none";
  document.querySelector('.fill-message').style.display = "block";
  document.querySelector('.information').style.display= "none";
  document.querySelector('#fill-receiver').value = '';
  document.querySelector('#fill_content').value = '';
}

function fill_information(){
  fetch('/fill',{
    method:'POST',
    body:JSON.stringify({
      content:document.querySelector('#fill_content').value,
      receiver:document.querySelector('#fill-receiver').value
    })
  })
  document.querySelector('#fill-receiver').value = '';
  document.querySelector('#fill_content').value = '';
  return false;
}

function display_message(common,id,type){
  document.querySelector(".main-body").style.display = 'none';
  document.querySelector(".display").style.display = "none";
  document.querySelector(".allmentor").style.display = "none";
  document.querySelector(`.form-view-Mentor`).style.display = 'none';
  document.querySelector(`.form-view-Student`).style.display = 'none';
  document.querySelector('.form-all').style.display = 'none';
  document.querySelector('.to_mentor').style.display = "none";
  document.querySelector('.student_mentor').style.display = "none";
  document.querySelector('.mentor_student').style.display = "none";
  document.querySelector('.fill-message').style.display = "none";
  document.querySelector('.information').style.display= "block";
  document.querySelector('.information').innerHTML = " ";
  fetch(`message/${common}`)
  .then(response=>response.json())
  .then(({all})=>{
    console.log(all);
    if(type === "Mentor"){
      fetch(`student_list/${id}`).then(response=>response.json()).then(({student_list})=>{
        all.forEach(detail=>full_display(detail,common,type,student_list));
      })
      }
      else if(type === "Student"){
          fetch(`mentor_list/${id}`).then(response=>response.json()).then(({mentor_list})=>{
            console.log(mentor_list);
            all.forEach(detail=>full_display(detail,common,type,mentor_list));
          })
      }
      else{
        all.forEach(detail=>full_display(detail,common))
      }
  })
}

function full_display(details,common,type,list){
  console.log(list);
  const div = document.createElement('div');
  div.id = "mas";

  if(details.seen){
    div.className = "ca row";
   }
  else{
     div.className = "r-card  row";
   }
   const receiver = document.createElement('b');
   receiver.className = "col-lg-3 ";
   if(common === 'sent')
   {
   receiver.innerHTML = details.receiver;
   }
   else{
     receiver.innerHTML = details.sender;
   }
   div.append(receiver);
 
   const time = document.createElement('div');
   time.className = "col-lg-5";
   time.innerHTML = details.time;
   div.append(time);
 
   document.querySelector('.information').append(div);
   const bro = document.createElement("br");
   document.querySelector('.information').append(bro);
   time.onclick=()=>inner_content(common,details.id,type);
   receiver.onclick=()=>inner_content(common,details.id,type);
   if(list){
    if(type === "Mentor"||"Student"){
      for(let i=0;i<list.length;i++){
        if(list[i].name === details.sender){
          console.log(details.sender);
          let ccg = document.createElement("i");
          ccg.className = "col-lg-4 fas fa-bookmark";
          ccg.id = "identify";
          div.title = "Your Student";
          div.append(ccg);
        }
      }
    }
  }
}

function inner_content(name,id,type){
  fetch(`unique/${id}`,{
    method:"PUT",
    body:JSON.stringify({
      seen:true
    })
  })

  fetch(`unique/${id}`)
  .then(response=>response.json())
  .then(result=>{
    console.log(result);
    const message_main = document.querySelector(".information");
    message_main.innerHTML = " ";
    const Div = document.createElement("div");
    Div.id = "sub_topic";
    Div.style.cssText="padding:5%;border-radius: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);";
    const names = document.createElement("div");

    names.id="designs";
    names.style.cssText="font-weight:bolder;"
    if(name === "received"){
      names.innerHTML = result.sender;
    }
    else if(name === "sent"){
      names.innerHTML = result.receiver;
    }
    Div.append(names)
    const time = document.createElement("div")
    time.innerHTML = result.time
    Div.append(time)

    const zs = document.createElement("br")
    Div.append(zs)

    const mes = document.createElement("div")
    mes.innerHTML = result.message
    Div.append(mes)
    message_main.append(Div)
  })
}