// ... tus imports aquí
import { useAuth } from "../../../context/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ApiRegionesComunas from "../../../apiServices/ApiRegionesComunas";
import ApiUser from "../../../apiServices/ApiUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import InputField from "../../../components/atomic/InputField";
import SelectField from "../../../components/atomic/SelectField";
import TextAreaField from "../../../components/atomic/TextAreaField";
import Button from "../../../components/atomic/Button";
import FormLayout from "../../../layouts/FormsLayouts";

export default function PerfilUsuario() {
  const { user } = useAuth();

  const [direccion, setDireccion] = useState("");
  const [regiones, setRegiones] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("");
  const [comunas, setComunas] = useState([]);
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagen, setImagen] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ofrecerServicio, setOfrecerServicio] = useState(false);
  const [oficio, setOficio] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [imagenCargada, setImagenCargada] = useState(false);

  const inputRef = useRef();
  const direccionRef = useRef();
  const imagenOcultaParaSiempre = useRef(false);
  const [comunaIdDesdeBackend, setComunaIdDesdeBackend] = useState(null);

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const edad = calcularEdad(user?.fecha_nacimiento);
  const primerNombre = user?.nombre?.split(" ")[0];

  useEffect(() => {
    const cargarDatosPerfil = async () => {
      try {
        const datos = await ApiUser.getById(user.rut);
        setDireccion(datos.direccion || "");
        setTelefono(datos.telefono || "");
        setRegionSeleccionada(datos.comuna?.region_id?.toString() || "");
        setComunaIdDesdeBackend(datos.comuna?.id?.toString() || "");
        setOfrecerServicio(datos.vendedor || false);
        setOficio(datos.oficio || "");
        setExperiencia(datos.experiencia || "");
        if (datos.imagen) {
          setImagen(datos.imagen);
        }
        setBloqueado(true);
      } catch (error) {
        console.error("Error al cargar perfil del usuario:", error);
      }
    };

    if (user?.rut) {
      cargarDatosPerfil();
    }
  }, [user]);

  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const data = await ApiRegionesComunas.getRegiones();
        setRegiones(data);
      } catch (error) {
        console.error("Error al cargar regiones:", error);
      }
    };
    fetchRegiones();
  }, []);

  useEffect(() => {
    const fetchComunas = async () => {
      try {
        if (regionSeleccionada) {
          const data = await ApiRegionesComunas.getComunasByRegionId(
            regionSeleccionada
          );
          setComunas(data);
        } else {
          setComunas([]);
        }
      } catch (error) {
        console.error("Error al cargar comunas:", error);
      }
    };
    fetchComunas();
  }, [regionSeleccionada]);

  useEffect(() => {
    if (comunas.length > 0 && comunaIdDesdeBackend) {
      setComunaSeleccionada(comunaIdDesdeBackend);
      setComunaIdDesdeBackend(null);
    }
  }, [comunas, comunaIdDesdeBackend]);

  const handleImageClick = () => {
    if (imagen) {
      handleRemoveImage();
    } else {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file);
      setImagenCargada(true);
    } else {
      toast.error("Solo se permiten archivos de imagen.");
      inputRef.current.value = null;
    }
  };

  const handleRemoveImage = async () => {
    setImagen(null);
    setImagenCargada(false);
    inputRef.current.value = null;

    try {
      await ApiUser.eliminarImagen(user.rut);
      toast.success("Imagen eliminada del perfil");
    } catch (error) {
      console.error("Error al eliminar la imagen del servidor:", error);
      toast.error("No se pudo eliminar la imagen del servidor");
    }
  };

  const handleTelefonoChange = (e) => {
    const valor = e.target.value;
    const soloNumeros = valor.replace(/\D/g, "");
    setTelefono(soloNumeros);
  };

  const camposCompletos =
    direccion && regionSeleccionada && comunaSeleccionada && telefono;

  const handleSubmit = () => {
    if (!camposCompletos) {
      toast.warning("Debes llenar todos los campos obligatorios");
      return;
    }

    if (ofrecerServicio && (!oficio.trim() || !experiencia.trim())) {
      toast.warning(
        "Debes ingresar el oficio y experiencia para ofrecer un servicio"
      );
      return;
    }

    setEnviando(true);

    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("direccion", direccion);
        formData.append("telefono", telefono);
        formData.append("comuna_id", comunaSeleccionada);
        formData.append("vendedor", ofrecerServicio);

        if (ofrecerServicio) {
          formData.append("oficio", oficio);
          formData.append("experiencia", experiencia);
        }

        if (imagen && imagenCargada) {
          formData.append("imagen", imagen);
        }

        const updatedUser = await ApiUser.update(user.rut, formData);
        toast.success("Datos enviados con éxito", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });

        setBloqueado(true);
        imagenOcultaParaSiempre.current = true;
      } catch (error) {
        console.error("Error al guardar:", error);
        toast.error("Hubo un error al guardar los cambios");
      } finally {
        setEnviando(false);
      }
    }, 2000);
  };

  const handleEditar = () => {
    setBloqueado(false);
    imagenOcultaParaSiempre.current = false;
    setTimeout(() => direccionRef.current?.focus(), 100);
  };

  return (
    <FormLayout>
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md my-20">
        <h1 className="text-2xl font-bold mb-4 text-highlight text-center">
          ¡Bienvenido a Servix, {primerNombre}!
        </h1>

        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {imagen ? (
              <img
                src={
                  typeof imagen === "string"
                    ? // ? `http://localhost:3000/uploads/${imagen}`
                      `https://servix-backend.onrender.com/uploads/${imagen}`
                    : URL.createObjectURL(imagen)
                }
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircleIcon className="w-20 h-20 text-gray-500" />
            )}
          </div>
        </div>

        {!bloqueado && (
          <div className="flex justify-center mb-6 gap-2">
            <button
              onClick={handleImageClick}
              className={`text-sm px-3 py-1 rounded cursor-pointer ${
                imagen
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {imagen ? "Quitar imagen" : "Subir imagen"}
            </button>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={handleImageChange}
            />
          </div>
        )}

        <p>
          <strong>Nombre:</strong> {user?.nombre}
        </p>
        <p>
          <strong>RUT:</strong> {user?.rut}
        </p>
        <p>
          <strong>Edad:</strong> {edad} años
        </p>

        <div className="text-left mt-6">
          <InputField
            label="Dirección"
            ref={direccionRef}
            type="text"
            className="w-full px-3 py-2 border rounded mb-4"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingresa tu dirección"
            disabled={bloqueado}
          />

          <SelectField
            label="Región:"
            name="region"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
            options={regiones.map((region) => ({
              value: region.id,
              label: region.nombre,
            }))}
            placeholder="Selecciona una región"
            disabled={bloqueado}
            onClick={() =>
              bloqueado &&
              toast.info(
                'Debes presionar el botón "Editar" para modificar este campo'
              )
            }
          />

          <SelectField
            label="Comuna:"
            name="comuna"
            value={comunaSeleccionada}
            onChange={(e) => setComunaSeleccionada(e.target.value)}
            options={comunas.map((comuna) => ({
              value: comuna.id,
              label: comuna.nombre,
            }))}
            placeholder="Selecciona una comuna"
            disabled={!comunas.length || bloqueado}
            onClick={() =>
              bloqueado &&
              toast.info(
                'Debes presionar el botón "Editar" para modificar este campo'
              )
            }
          />

          <InputField
            label="Teléfono:"
            type="tel"
            className="w-full px-3 py-2 border rounded mb-6"
            value={telefono}
            onChange={handleTelefonoChange}
            placeholder="Ingresa tu número de teléfono"
            disabled={bloqueado}
          />

          <div className="flex items-center mb-4">
            {ofrecerServicio ? null : (
              <p className="mb-4">
                <span className="ml-2">
                  ¿Quieres ofrecer tus servicios?{" "}
                  <Link
                    to={"/myServices"}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Publica un servicio aquí
                  </Link>
                </span>
              </p>
            )}
          </div>

          <p className="mb-4">
            Ya que ofreces servicios, indica a tus clientes algo sobre ti:
          </p>

          {ofrecerServicio && (
            <>
              <InputField
                label="Especialidad:"
                type="text"
                value={oficio}
                onChange={(e) => setOficio(e.target.value)}
                placeholder="Ingresa tu oficio"
                disabled={bloqueado}
              />

              <TextAreaField
                label="Mi experiencia:"
                name="experiencia"
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                placeholder="Comenta brevemente tu experiencia"
                disabled={bloqueado}
                onClick={() =>
                  bloqueado &&
                  toast.info(
                    'Debes presionar el botón "Editar" para modificar este campo'
                  )
                }
              />
            </>
          )}

          <div className="flex justify-between gap-4">
            <Button
              onClick={handleSubmit}
              variant="primary"
              disabled={bloqueado || enviando}
            >
              {enviando && (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
              )}
              Guardar cambios
            </Button>

            <Button
              onClick={handleEditar}
              variant="outline"
              disabled={!bloqueado}
            >
              Editar
            </Button>
          </div>

          {enviando && (
            <p className="mt-2 text-sm text-gray-600">Enviando datos...</p>
          )}
        </div>
      </div>
    </FormLayout>
  );
}
