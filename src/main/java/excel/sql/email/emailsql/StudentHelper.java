package excel.sql.email.emailsql;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StudentHelper {

    public static boolean checkIfExcel(MultipartFile file){
        String fileType = file.getContentType();
        String excelType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        if(fileType.equals(excelType))
            return true;
        return false;
    }

    public static List<Student> excelToList(InputStream inputStream) throws IOException {
        List<Student> list = new ArrayList<>();
        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheet("Sheet1");

        Iterator<Row> iterator = sheet.iterator();
        int rowValue =0;
        while (iterator.hasNext()){
            Row row = iterator.next();
            if(rowValue==0){
                rowValue++;
                continue;
            }

            Iterator<Cell> iterator1 = row.iterator();
            int cellId = 0;
            Student student = new Student();
            while (iterator1.hasNext()){
                Cell cell = iterator1.next();

                switch (cellId){
                    case 0: student.setId((int)cell.getNumericCellValue());
                        System.out.println("Cell value: " + cell.toString() + ", type: " + cell.getCellType());
                    break;
                    case 1:student.setName(cell.getStringCellValue());
                        System.out.println("Cell value: " + cell.toString() + ", type: " + cell.getCellType());
                    break;
                    case 2:student.setEmail(cell.getStringCellValue());
                        System.out.println("Cell value: " + cell.toString() + ", type: " + cell.getCellType());
                    break;
                    case 3:student.setAmountRemaining((int) cell.getNumericCellValue());
                        System.out.println("Cell value: " + cell.toString() + ", type: " + cell.getCellType());
                    break;
                }
                cellId++;

            }
            list.add(student);
        }
        return list;
    }

}
