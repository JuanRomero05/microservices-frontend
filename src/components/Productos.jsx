import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    id: "",
    descripcion: "",
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
      const response = await axios.get("API_ENDPOINT/productos");
      setProductos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProducto = async () => {
    try {
      await axios.post("API_ENDPOINT/productos", nuevoProducto);
      obtenerProductos();
      setNuevoProducto({ id: "", descripcion: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`API_ENDPOINT/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarProducto = async () => {
    try {
      await axios.put(
        `API_ENDPOINT/productos/${productoSeleccionado.id}`,
        productoSeleccionado
      );
      obtenerProductos();
      setProductoSeleccionado(null);
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
            <tr>
              <th scope="row">1</th>
              <td>Azucar</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Chocolate</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Harina</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Pan</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Cervezas</td>
            </tr>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <button onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => seleccionarProducto(producto)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agregar Producto */}
      <div className="d-flex justify-content-center align-items-center">
        <Card className="p-4">
          <Card.Title>
            <h6 style={{ color: "rgb(17,143,255)" }}>Agregar Producto</h6>
          </Card.Title>
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text" id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-123"
                viewBox="0 0 16 16"
              >
                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
              </svg>
            </span>
            <input
              className="form-control"
              type="text"
              placeholder="ID"
              value={nuevoProducto.id}
              aria-label="input id"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, id: e.target.value })
              }
            />
          </div>
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
                  descripcion: e.target.value,
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
            value={productoSeleccionado.descripcion}
            onChange={(e) =>
              setProductoSeleccionado({
                ...productoSeleccionado,
                descripcion: e.target.value,
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
