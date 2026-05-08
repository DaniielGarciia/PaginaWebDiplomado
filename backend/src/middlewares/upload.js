import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "imagenes",
    filename: 
    (solicitud, file, callback) => {
        const extension = path.extname(file.originalname);
        const nameWithoutExtension = path.basename(file.originalname, extension).replace(/\s+/g, "-").toLowerCase();
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g,'');

        const uniqueName = `${nameWithoutExtension}-${timestamp}${extension}`;
        
        callback(null, uniqueName);
    }
});

export const uploadSingleImagen = multer({ storage }).single("imagen");