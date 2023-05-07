package excel.sql.email.emailsql;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.swing.text.html.parser.Entity;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    @DeleteMapping("/delete/{id}")
    public void deleteRecord(@PathVariable int id){
        service.deleteStudent(id);
    }
    @PostMapping("/upload")
    public ResponseEntity uploadExcel(@RequestParam("file") MultipartFile file) throws IOException, WriterException, MessagingException, jakarta.mail.MessagingException {
        service.insertAllRecords(file);
        return ResponseEntity.ok("File is uploaded");
    }

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/getAll")
    public List<Student> getAllRecord(){
        return service.getAllRecords();
    }

//    @GetMapping("/emails")
//    public String generateEmail(){
//        service.generateEmailForAll();
//        return "Email generated";
//    }

    @GetMapping(path = "/search", produces = "application/json")
    public Student findStudent(@RequestParam("email") String email){

        return service.searchStudent(email);
    }
    @PostMapping(path = "/email", produces = "application/json")
    public ResponseEntity<String> sendEmail(@RequestBody String emails) throws MessagingException, jakarta.mail.MessagingException, IOException, WriterException {
        String[] emailArr;
        String notSent="";
        emailArr = emails.split(",");
        for (int i = 0; i < emailArr.length; i++) {
            emailArr[i] = emailArr[i].trim();
        }
        boolean isSent =false;

        for(String entity: emailArr){
            isSent = service.generateEmail(entity);

            if(!isSent)
                notSent+=entity+", ";
        }

        if(notSent.equals(""))
            return ResponseEntity.ok("Email sent to: "+emails);
        return ResponseEntity.ok("Emails not sent to: "+notSent);
    }

    @PostMapping(path = "/add", consumes = "application/json")
    public ResponseEntity<String> addStudent(@RequestBody Student student) throws IOException, WriterException, MessagingException {
        try {
            service.insertRecord(student);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Record inserted");
    }

    @PutMapping(path = "/update", consumes = "application/json")
    public ResponseEntity<String> updateStudent(@RequestBody Student student) throws IOException, WriterException, MessagingException, jakarta.mail.MessagingException {
        service.updateRecord(student);
        return ResponseEntity.ok("Record updated");
    }

}
