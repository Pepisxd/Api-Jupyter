const Course = require("../models/Course");
const { s3User } = require("../utils/s3Client");

// Obtener todos los cursos (protegido con autenticación)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener un curso por su ID (protegido con autenticación)
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Curso no encontrado" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Crear un curso nuevo (opcional)
exports.createOrUpdateCourse = async (req, res) => {
  try {
    const { id, title, description, image, lessons } = req.body;

    if (!id || !title || !description || !image || !lessons) {
      return res.status(400).json({ msg: "Todos los campos son requeridos" });
    }

    let course = await Course.findOne();

    if (course) {
      course.id = id;
      course.title = title;
      course.description = description;
      course.image = image;
      course.lessons = lessons;
    } else {
      course = new Course({
        id,
        title,
        description,
        image,
        lessons,
      });
    }
    await course.save();
    res.status(201).json({ msg: "Curso creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No se ha subido ningún archivo" });
    }

    const params = {
      Bucket: "videos-de-curso",
      Key: `videos/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3Videos.upload(params).promise();
    res
      .status(200)
      .json({ msg: "Video subido exitosamente", url: result.Location });
  } catch (error) {
    console.error("Error al subir el video: ", error);
    res.status(500).json({ msg: "Error al subir el video" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No se ha subido ningún archivo" });
    }

    const params = {
      Bucket: "imagenes-de-curso",
      Key: `images/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3Images.upload(params).promise();
    res
      .status(200)
      .json({ msg: "Imagen subida exitosamente", url: result.Location });
  } catch (error) {
    console.error("Error al subir la imagen: ", error);
    res.status(500).json({ msg: "Error al subir la imagen" });
  }
};
