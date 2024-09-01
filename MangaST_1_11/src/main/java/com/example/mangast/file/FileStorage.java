package com.example.mangast.file;

import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;
import static java.lang.System.currentTimeMillis;

@Service
@Slf4j
@RequiredArgsConstructor //???
public class FileStorage {

    @Value("${application.file.uploads.manga-output-path}")
    private String fileUploadPath;

    //account picture
    public String saveProfileCover(
            @Nonnull MultipartFile sourceFile,
            @Nonnull Integer userId
    ) {
        final String fileUploadSubPath = "users" + separator + userId + separator + "cover";
        return uploadFile(sourceFile, fileUploadSubPath);
    }


    //chapters
    //Добавить сюда separator + numberId
    public String saveChapterPdfFile(
            MultipartFile sourceFile,
            @Nonnull Integer mangaId,
            float chapterNumber
    ) {
        final String fileUploadSubPath = "manga" + separator + mangaId
                + separator + "chapters" + separator + chapterNumber;
        return uploadFile(sourceFile, fileUploadSubPath);
    }

    //Save manga
    public String saveUploadFile(
            @Nonnull MultipartFile sourceFile,
            @Nonnull Integer mangaId
    ) {
        final String fileUploadSubPath = "manga" + separator + mangaId + separator + "cover";
        return uploadFile(sourceFile, fileUploadSubPath);
    }



    public void deleteMangaDirectory(Integer mangaId) {
        String subPath = "manga" + separator + mangaId;
        final  String finalPath = fileUploadPath + separator + subPath;
        log.info("final path: {}", finalPath);

        try {
            org.apache.tomcat.util.http.fileupload.FileUtils.deleteDirectory(new File(finalPath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



    //Onload picture on server
    private String uploadFile(@Nonnull MultipartFile sourceFile,
                              @Nonnull String fileUploadSubPath) {
        final String finalUploadPath = fileUploadPath + separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);

        if(!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if(!folderCreated) {
                log.warn("Failed to create the target folder: " + targetFolder);
                return null;
            }
        }
        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        String targetFilePath = finalUploadPath + separator + currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);
        try {
            //Очистка предыдущих файлов в папке
            FileUtils.cleanDirectory(new File(finalUploadPath));
            log.info("target folder was cleaned!");


            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to: " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }
        return null;
    }




    //get extension file
    private String getFileExtension(String fileName) {
        if(fileName == null || fileName.isEmpty()) {
            return "";
        }
        int lastDotIndex = fileName.lastIndexOf(".");
        if(lastDotIndex == -1) {
            return "";
        }
        return fileName.substring(lastDotIndex + 1).toLowerCase();
    }


}
