import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    description: "",
  });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:5050/products");
      setProductos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProducto = async () => {
    try {
      await axios.post("http://localhost:5050/products", nuevoProducto);
      setNuevoProducto({ description: "" });
      obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/products/${id}`);
      obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarProducto = async () => {
    try {
      await axios.put(
        `http://localhost:5050/products/${productoSeleccionado.id}`,
        productoSeleccionado
      );
      setProductoSeleccionado(null);
      obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-center">
      <h1>Productos</h1>
      <div className="d-flex justify-content-center align-items-center">
        <table
          className="table table-striped table-hover table-bordered border-secondary table-responsive align-middle caption-top"
          style={{ maxWidth: 400 }}
        >
          <caption>Lista de productos</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Descripción</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            
            {productos ? productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.description}</td>
                <td>
                  <button onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => seleccionarProducto(producto)}>
                    Editar
                  </button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      {/* Agregar Producto */}
      <div className="d-flex justify-content-center align-items-center">
        <Card className="p-4">
          <Card.Title>
            <h6 style={{ color: "rgb(17,143,255)" }}>Agregar Producto</h6>
          </Card.Title>
          <div className="input-group mb-3 mt-1">
            <span className="input-group-text" id="basic-addon2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-card-text"
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
            </span>
            <input
              className="form-control"
              type="text"
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              aria-label="input description"
              aria-describedby="basic-addon2"
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  description: e.target.value,
                })
              }
            />
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={agregarProducto}
          >
            Agregar
          </button>
        </Card>
      </div>

      {productoSeleccionado && (
        <div>
          <h2>Editar Producto</h2>
          <input
            type="text"
            placeholder="ID"
            value={productoSeleccionado.id}
            onChange={(e) =>
              setProductoSeleccionado({
                ...productoSeleccionado,
                id: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Descripción"
            value={productoSeleccionado.description}
            onChange={(e) =>
              setProductoSeleccionado({
                ...productoSeleccionado,
                description: e.target.value,
              })
            }
          />
          <button onClick={actualizarProducto}>Actualizar</button>
        </div>
      )}
    </div>
  );
};

export default Productos;
