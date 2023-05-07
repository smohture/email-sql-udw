package excel.sql.email.emailsql;

import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import java.io.File;
import java.io.IOException;
import java.util.Properties;


@Component
public class SendEmail {

    private static String emailFrom = "smohture01@gmail.com";
    private static String subject = "QR Code for UDW Registration";
    private static String content = "Dear Student,\n" +
            "\n" +
            "We are excited to have you join us for the upcoming camp. As part of your registration, we are sending you a QR code that will allow you to access the camp facilities and activities.\n" +
            "\n" +
            "Please make sure to bring a copy of this email, along with a valid ID, to the registration desk when you arrive at the camp.\n" +
            "\n" +
            "If you have any questions or concerns, please do not hesitate to contact us.\n" +
            "\n" +
            "We look forward to seeing you soon!\n" +
            "\n" +
            "Best regards";

    public void generateEmail(String emailTo, byte[] qrArray) throws MessagingException, jakarta.mail.MessagingException, IOException {

    Properties properties = System.getProperties();
    properties.put("mail.smtp.host","smtp.gmail.com");
    properties.put("mail.smtp.port","465");
    properties.put("mail.smtp.ssl.enable","true");
    properties.put("mail.smtp.auth","true");

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("shubhammohture143@gmail.com", "tudjyfixpqhqayhh");
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);
        mimeMessage.setSubject(subject);
        mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailTo));
        mimeMessage.setFrom(emailFrom);

        MimeMultipart multipart = new MimeMultipart();
        MimeBodyPart text = new MimeBodyPart();
        text.setText(content);
        MimeBodyPart attachment = new MimeBodyPart();
//        File file = new File("D:\\QR code\\"+emailTo+".png");
//        attachment.attachFile(file);

        ByteArrayDataSource bds = new ByteArrayDataSource(qrArray, "image/png");
        attachment.setDataHandler(new DataHandler(bds));
        attachment.setFileName(bds.getName());



        multipart.addBodyPart(text);
        multipart.addBodyPart(attachment);

        mimeMessage.setContent(multipart);

        Transport.send(mimeMessage);


    }

}
