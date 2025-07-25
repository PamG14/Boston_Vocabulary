import { useState } from 'react';

const textos = {
  unidad5: {
    titulo: "Unidad 5",
    contenido: `The teenagers turning old clothes into money by Rita Park People say that Generation Z – people born between 1995 and 2008 – don’t like spending money as much as older people...`
  },
  unidad6: {
    titulo: "Unidad 6",
    contenido: `Este es un segundo texto de prueba. Podés reemplazarlo por lo que quieras.`
  }
};

export default function App() {
  const [textoActual, setTextoActual] = useState("unidad5");

  const [palabras, setPalabras] = useState(
    textos["unidad5"].contenido.match(/\S+|\s+/g).map((p, i) => ({
      palabra: p,
      estado: "ninguno",
      id: i
    }))
  );

  const [nombre, setNombre] = useState("");

  const cicloEstado = (estado) => {
    return estado === "dudosa" ? "ninguno" : "dudosa";
  };

  const cambiarEstado = (id) => {
    setPalabras(palabras.map(p =>
      p.id === id ? { ...p, estado: cicloEstado(p.estado) } : p
    ));
  };

  const generarCSV = () => {
    const filas = palabras
      .filter(p => !p.palabra.match(/^\s+$/)) // excluye espacios
      .map(p => `${nombre},${p.palabra},${p.estado}`)
      .join("\n");

    const mensaje = `Nombre: ${nombre}\nTexto: ${textos[textoActual].titulo}\n\n${filas}`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    // Reiniciar estado después de enviar
    setNombre("");
    setPalabras(
      textos[textoActual].contenido.match(/\S+|\s+/g).map((p, i) => ({
        palabra: p,
        estado: "ninguno",
        id: i
      }))
    );
  };

  return (
    <div className="container">
      <h1>Vocabulary test</h1>
      <label className="block mb-2 font-semibold">Seleccioná el texto:</label>
      <select
        value={textoActual}
        onChange={(e) => {
          const nuevoTexto = e.target.value;
          setTextoActual(nuevoTexto);
          setPalabras(
            textos[nuevoTexto].contenido.match(/\S+|\s+/g).map((p, i) => ({
              palabra: p,
              estado: "ninguno",
              id: i
            }))
          );
        }}
        className="p-2 border rounded w-full mb-4"
      >
        {Object.entries(textos).map(([clave, { titulo }]) => (
          <option key={clave} value={clave}>
            {titulo}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <div className="texto">
        {palabras.map((p) =>
          p.palabra.match(/^\s+$/) ? (
            <span
              key={p.id}
              onClick={() => cambiarEstado(p.id)}
              className={`palabra ${p.estado === "dudosa" ? "dudosa" : ""}`}
            >
              {p.palabra}
            </span>
          ) : null
        )}
      </div>

      <button onClick={generarCSV} disabled={!nombre}>
        Enviar por WhatsApp
      </button>
    </div>
  );
}
