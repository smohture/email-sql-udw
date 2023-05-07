package excel.sql.email.emailsql;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.beans.factory.annotation.Autowired;


import javax.mail.MessagingException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;


public class GenerateQRCode {


    public static byte[] generateQR(Student student) throws WriterException, IOException {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode("Name: "+student.getName()+"\n"+"Fees Pending: "+student.getAmountRemaining()+"\n"+"Tag: "+(student.getIsBandProvided().equals("Yes") ? "Provided" : "Not Provided"),BarcodeFormat.QR_CODE,400,400);
        //writing to output stream
        MatrixToImageWriter.writeToStream(bitMatrix,"PNG",outputStream);
        //converting to byte array
        byte[] qrCodeBytes = outputStream.toByteArray();
        // Create a QR code image as a byte array
//        ByteArrayOutputStream qrCodeStream = QRCode.from(text).to(ImageType.PNG).stream();
//

        // Create a data source from the QR code image byte array
        return qrCodeBytes;

    }

    public static List<Student> generateQRForAll(List<Student> students, SendEmail sendEmail) throws IOException, WriterException, MessagingException, jakarta.mail.MessagingException {

        for(Student entity: students )
        {
            byte[] qrCode = GenerateQRCode.generateQR(entity);
            sendEmail.generateEmail(entity.getEmail(), qrCode);
        }

        return students;



    }
}
