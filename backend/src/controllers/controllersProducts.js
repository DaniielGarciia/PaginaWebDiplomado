import { uploadSingleImagen } from "../middlewares/upload.js";
import fs from "fs";
import path from "path";
import modelProducts from "../models/modelProducts.js";

const controllersProducts = {};

// Crear un nuevo producto
controllersProducts.createProduct = async (solicitud, respuesta) => {
  try {
    const { name, description, price, category, imagen } = solicitud.body;
    const newProduct = new modelProducts({
      name,
      description,
      price,
      category,
      imagen: imagen || null,
    });
    const productCreated = await newProduct.save();
    respuesta.status(200).json({mensaje: "Producto creado exitosamente"});
  } catch (error) {
    respuesta.status(500).json({ mensaje: "Error al crear el producto", error: error.message });
  }
};

// Obtener todos los productos

controllersProducts.readAllProducts = async (solicitud, respuesta) => {
  try {
    const products = await modelProducts.find();
    respuesta.status(200).json({
        mensaje: "Productos obtenidos exitosamente", data: products});

    } catch (error) {
    respuesta.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
  }
};

// Obtener un producto por su ID
controllersProducts.readProductById = async (solicitud, respuesta) => {
  try {
    
    const product = await modelProducts.findById(solicitud.params.id);
    
    if (!product) {
      return respuesta.status(404).json({ mensaje: "Producto no encontrado" });
    }

    respuesta.status(200).json({
      mensaje: "Producto obtenido exitosamente",
      data: product
    });
  } catch (error) {
    respuesta.status(500).json({ mensaje: "Error al obtener el producto", error: error.message });
  }
    
};

// Actualizar un producto
controllersProducts.updateProduct = async (solicitud, respuesta) => {
  try {
    const { name, description, price, category, imagen } = solicitud.body;
    const updateFields = { name, description, price, category };
    if (imagen !== undefined) updateFields.imagen = imagen;
    const productUpdate = await modelProducts.findByIdAndUpdate(
      solicitud.params.id,
      updateFields,
      { new: true }
    );
    if (!productUpdate) {
      return respuesta.status(404).json({ mensaje: "Producto no encontrado", data: productUpdate });
    }
    respuesta.status(200).json({
      mensaje: "Producto actualizado exitosamente",
      data: productUpdate
    });
  } catch (error) {
    respuesta.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
  }
};

// Eliminar un producto
controllersProducts.deleteProduct = async (solicitud, respuesta) => {
  try {
    const productDelete = await modelProducts.findByIdAndDelete(solicitud.params.id); 
    
    if (!productDelete) {
      return respuesta.status(404).json({ mensaje: "Producto no encontrado" });
    }
    
    respuesta.status(200).json({
      mensaje: "Producto eliminado exitosamente",
      data: productDelete
    });

  } catch (error) {
    
    respuesta.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
  }
};

export default controllersProducts;
