import bcrypt from "bcryptjs";
import modelUser from "../models/modelUser.js";

const controllersUser = {

    // CREAR USUARIO
    createUser: async (solicitud, respuesta) => {

        try {

            const { name, email, password, role } = solicitud.body;

            console.log(solicitud.body);

            const passwordProtedted = await bcrypt.hash(password, 10);

            const newUser = new modelUser({

                name,
                email,
                password: passwordProtedted,
                role

            });

            console.log(newUser);

            const userCreated = await newUser.save();

            if (userCreated._id) {

                respuesta.json({

                    result: "fine",
                    message: "Usuario creado exitosamente",
                    data: userCreated._id,

                });

            }

        } catch (error) {

            respuesta.json({

                result: "Error",
                message: "Error al crear el usuario",
                data: error,

            });

        }

    },

    // LOGIN
    loginUser: async (solicitud, respuesta) => {

        try {

            const { email, password } = solicitud.body;

            const userFound = await modelUser.findOne({ email });

            if (!userFound) {

                return respuesta.status(404).json({

                    result: "mistake",
                    message: "Usuario no encontrado"

                });

            }

            const passwordCorrect = await bcrypt.compare(
                password,
                userFound.password
            );

            if (!passwordCorrect) {

                return respuesta.status(401).json({

                    result: "mistake",
                    message: "Contraseña incorrecta"

                });

            }

            respuesta.status(200).json({

                result: "fine",

                message: "Login exitoso",

                data: {

                    id: userFound._id,
                    name: userFound.name,
                    email: userFound.email,
                    role: userFound.role

                }

            });

        } catch (error) {

            respuesta.status(500).json({

                result: "mistake",
                message: "Error en login",
                data: error

            });

        }

    },

    // LEER USUARIO
    readUser: async (solicitud, respuesta) => {

        try {

            const userFound = await modelUser.findById(
                solicitud.params.id
            );

            if (userFound._id) {

                respuesta.json({

                    result: "fine",
                    message: "User found",
                    data: userFound,

                });

            }

        } catch (error) {

            respuesta.json({

                result: "mistake",
                message: "Error al leer el usuario",
                data: error,

            });

        }

    },

    // LEER TODOS
    readAllUsers: async (solicitud, respuesta) => {

        try {

            const allUserFound = await modelUser.find();

            respuesta.json({

                result: "fine",
                message: "All User found",
                data: allUserFound,

            });

        } catch (error) {

            respuesta.json({

                result: "mistake",
                message: "Error al leer usuarios",
                data: error,

            });

        }

    },

    // ACTUALIZAR
    updateUser: async (solicitud, respuesta) => {

        try {

            const { name, email, password, role } = solicitud.body;

            const dataUpdate = {};

            if (name) dataUpdate.name = name;
            if (email) dataUpdate.email = email;
            if (role) dataUpdate.role = role;

            if (password) {

                dataUpdate.password = await bcrypt.hash(password, 10);

            }

            await modelUser.findByIdAndUpdate(
                solicitud.params.id,
                dataUpdate,
                { new: true }
            );

            respuesta.status(200).json({

                result: "fine",
                message: "Usuario actualizado exitosamente",

            });

        } catch (error) {

            respuesta.json({

                result: "mistake",
                message: "Error al actualizar el usuario",
                data: error,

            });

        }

    },

    // ELIMINAR
    deleteUser: async (solicitud, respuesta) => {

        try {

            const userDeleted = await modelUser.findByIdAndDelete(
                solicitud.params.id
            );

            if (userDeleted._id) {

                respuesta.json({

                    result: "fine",
                    message: "Usuario eliminado exitosamente",
                    data: userDeleted._id,

                });

            }

        } catch (error) {

            respuesta.json({

                result: "mistake",
                message: "Error al eliminar el usuario",
                data: error,

            });

        }

    }

};

export default controllersUser;