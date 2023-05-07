package excel.sql.email.emailsql;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class StudentService {
    @Autowired
    private StudentRepository repository;
    @Autowired
    private SendEmail sendEmail;
    public void insertAllRecords(MultipartFile file) throws IOException, WriterException, MessagingException, jakarta.mail.MessagingException {

        if(StudentHelper.checkIfExcel(file)){
            List<Student> students = StudentHelper.excelToList(file.getInputStream());
            GenerateQRCode.generateQRForAll(students, sendEmail);
            repository.saveAll(students);
        }

    }

    public List<Student> getAllRecords(){
        return repository.findAll();    }

//    public void generateEmailForAll() {
//
//        List<Student> students = this.getAllRecords();
//        for(Student entity: students){
//            // SendEmail.generateEmail(entity.getEmail());
//        }
//    }

    public boolean generateEmail(String email) throws MessagingException, IOException, WriterException, jakarta.mail.MessagingException {
        List<Student> students = this.getAllRecords();
        boolean isSent = false;
        for(Student entity: students){
            if(entity.getEmail().equals(email))
            {
                byte[] qrCode = GenerateQRCode.generateQR(entity);
                sendEmail.generateEmail(email,qrCode);
                isSent = true;
                return isSent;
            }
        }
        return isSent;
    }

    public void insertRecord(Student student) throws IOException, WriterException, MessagingException, jakarta.mail.MessagingException {
        if(student.getAmountRemaining() == 0) {
            student.setIsRegistered("Yes");
            student.setIsBandProvided("No");
        }
        else{
            student.setIsRegistered("No");
            student.setIsBandProvided("No");
        }
        byte[] qrArray = GenerateQRCode.generateQR(student);
        sendEmail.generateEmail(student.getEmail(), qrArray);
        repository.save(student);
    }

    public void updateRecord(Student student) throws IOException, WriterException, MessagingException, jakarta.mail.MessagingException {
        Student entity = repository.findById(student.getId()).orElseThrow( () -> new RuntimeException("User not found"));
        if(student.getEmail() != null){
            entity.setEmail(student.getEmail());
        }
        if(student.getName()!= null){
            entity.setName(student.getName());
        }
        if((Integer)student.getAmountRemaining() != null && student.getAmountRemaining() > 0){
            entity.setAmountRemaining(student.getAmountRemaining());
        }
        if(student.getIsRegistered() != null){
            entity.setIsRegistered(student.getIsRegistered());
        }
        if(student.getIsBandProvided() != null){
            entity.setIsBandProvided(student.getIsBandProvided());
        }

        byte[] qrArray = GenerateQRCode.generateQR(student);
        sendEmail.generateEmail(student.getEmail(), qrArray);
        repository.save(entity);
    }

    public Student searchStudent(String email) {
        List<Student> searchResult= new ArrayList<>();
        List<Student> students = this.getAllRecords();
        for(Student entity: students){
            if(entity.getEmail().equals(email))
            {
                return entity;
            }
        }
    return null;
    }

    public void deleteStudent(int id) {
        Student student = repository.findById(id).orElseThrow( () -> new RuntimeException("User not found"));
        repository.delete(student);
    }
}
