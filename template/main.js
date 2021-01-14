$(document).ready(function(){
  save();
  renderListStudent();
  // show_data();
  handleSubmitForm()
});




function emailIsValid(email){
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function renderListStudent(){
  
  var students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

  if(students.length === 0){
    document.getElementById('list-student').style.display = 'none';
    return false;
  } 

    document.getElementById('list-student').style.display = 'block';

      var tableContent = `<tr>
        <td>ID</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Số điện thoại</td>
        <td>Địa chỉ</td>
        <td>Giới tính</td>
        <td>Hành động</td>
      </tr>`;

students.forEach((student, index) => {

  var studentId = index;

  var genderLabel = student.gender == 1 ? 'Nam' : 'Nữ';

  index++;

      tableContent +=  `<tr>
        <td>${index}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.address}</td>
        <td>${genderLabel}</td>
        <td>
            <a href='#' id = 'edit' >Edit | <a href='#' >Delete
        </td>
      </tr>`;
    })

document.getElementById('grid-students').innerHTML = tableContent;


}



function save(){
    const save_record =  document.getElementById("save")  

    save_record.addEventListener("click",(event) => {
      var fullname = document.getElementById('fullname').value;
      var email = document.getElementById('email').value;
      var phone = document.getElementById('phone').value;
      var address = document.getElementById('address').value;
      var gender="";
    
      if(document.getElementById('male').checked){
          gender = document.getElementById('male').value;
      }else if(document.getElementById('female').checked){
          gender = document.getElementById('female').value;
      }
    
      if(_.isEmpty(fullname)) {
        fullname ='';
        document.getElementById('fullname-er').innerHTML = 'Vui lòng nhập họ và tên';
        
      } else if(fullname.trim().length <=2 ){
        fullname ='';
        document.getElementById('fullname-er').innerHTML = 'Họ và tên không được ít hơn 2 ký tự';
        
    
      }else if(fullname.trim().length >50){
        fullname ='';
        document.getElementById('fullname-er').innerHTML = 'Họ và tên không được nhiều hơn 50 ký tự';
      }else{
        
        document.getElementById('fullname-er').innerHTML = ''; 
      }
      
        if(_.isEmpty(email)){
          email='';
          document.getElementById('email-er').innerHTML = 'Vui lòng nhập địa chỉ email';
          
        }else if(!emailIsValid(email)){
          email='';
          document.getElementById('email-er').innerHTML = 'Email không đúng định dạng';
          
        }else{
           
          document.getElementById('email-er').innerHTML = ''; 
        }
    
        if(_.isEmpty(phone)) {
          phone='';
          document.getElementById('phone-er').innerHTML = 'Vui lòng nhập số điện thoại';
         
        }else if(phone.trim().length > 10){
          phone='';
          document.getElementById('phone-er').innerHTML = 'Số điện thoại không quá 10 số';
         
        }else if(isNaN(phone)){
          phone='';
          document.getElementById('phone-er').innerHTML = 'Vui lòng nhập đúng định dạng số điện thoại';
          
        }else{ 
          document.getElementById('phone-er').innerHTML = ''; 
        }
    
        if(_.isEmpty(address)) {
          address='';
          document.getElementById('address-er').innerHTML = 'Vui lòng nhập địa chỉ';
         
        }else{  
          document.getElementById('address-er').innerHTML = ''; 
    
        }
    
    
        if(fullname && email && phone && address && gender){
         
    
    
          //lưu vào danh sách 
    
    
    
          var students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
           
           students.push({
            fullname:fullname,
            email:email,
            phone:phone,
            address:address,
            gender:gender,
    
          });
    
          localStorage.setItem('students', JSON.stringify(students));
          this.renderListStudent();
    
        }
    });
    
}



function deleteStudent(id){
   
  var students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
  students.splice(id, 1);
  localStorage.setItem('students',JSON.stringify(students));
  this.renderListStudent();
  
}






// function show_data(id_student){
//     const edit_record = document.getElementById("edit")
//     edit_record.addEventListener("click", (event) => {
//       document.getElementById("save").id = "update";
//       var students_ = localStorage.getItem('students');
//       // var student = students_[id];  
//       students_ = students_ ? JSON.parse(students_) : {};
//        var student = students_[id_student]; 
//       // var infoStudent = students[id];
      
//         document.getElementById("fullname").value = student['fullname'];
//         document.getElementById("email").value = student['email'];      
//         document.getElementById("phone").value = student['phone'];
//         document.getElementById("address").value = student['address']; 
//     });  
    
// }



function update_data(id_student) {

  var students_ = localStorage.getItem('students');
// var student = students_[id];  
students_ = students_ ? JSON.parse(students_) : {};
 var student = students_[id_student]; 
student['fullname'] = document.getElementById("fullname").value;
student['email'] = document.getElementById("email").value;
student['phone'] = document.getElementById("phone").value;
student['address'] = document.getElementById("address").value;
localStorage.setItem('student', JSON.stringify(student));
document.getElementById("update").id = "save";
}


function handleSubmitForm(id_student) {
  $('#edit').click(function () {
    document.getElementById("save").id = "update";
    var students_ = localStorage.getItem('students');
    // var student = students_[id];  
    students_ = students_ ? JSON.parse(students_) : {};
     var student = students_[id_student]; 
    // var infoStudent = students[id];
    
      document.getElementById("fullname").value = student['fullname'];
      document.getElementById("email").value = student['email'];      
      document.getElementById("phone").value = student['phone'];
      document.getElementById("address").value = student['address']; 
  });
}