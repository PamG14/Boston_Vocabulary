import { useState } from 'react';

const textoEjemplo = `The teenagers turning old clothes into money by Rita Park People say that Generation Z – people born between 1995 and 2008 – don’t like spending money as much as older people. Generation Z are also good at thinking of interesting business ideas, and they care about the environment. Maybe this is why so many teenagers are selling second-hand clothes to other teenagers on social media. Some teenagers are just selling their own clothes, but others have big online ‘shops’. They find cool clothes in second-hand shops. Sometimes they alter the clothes to make them look better. Then they take photos of the clothes and post them on social media. Customers can say what price they want to pay. For example, one person might say ’£10‘ for a sweatshirt, but if a second person says ’£11‘, the second person gets the sweatshirt. Two teenage friends, Emily Adams and Sophia Lopez, have an online clothes ‘shop’ on social media, and around 50,000 people like their page. They work hard and they don’t have much free time. Emily takes photos of clothes before school and replies to messages from customers between lessons. After school, she goes to the post office to send clothes to customers or goes to second-hand shops to find more clothes to sell. Social media is changing. Now it’s not just where you show photos of your friends or your holidays. For many teenagers it’s where they go shopping, and for some it’s their job. It’s also changing the way we think about second-hand clothes, and that’s a really good thing`;

export default function App() {
  const [nombre, setNombre] = useState("");
  const [palabras, setPalabras] = useState(
    textoEjemplo.match(/\S+|\s+/g).map((p, i) => ({ palabra: p, estado: "ninguno", id: i }))
  );

  const cicloEstado = (estado) => {
    switch (estado) {
      case "ninguno": return "dudosa";
      case "dudosa": return "segura";
      case "segura": return "ninguno";
      default: return "ninguno";
    }
  };

  const cambiarEstado = (id) => {
    setPalabras(palabras.map(p =>
      p.id === id ? { ...p, estado: cicloEstado(p.estado) } : p
    ));
  };

  const generarCSV = () => {
    const filas = palabras.map(p => `${nombre},${p.palabra},${p.estado}`).join("\n");
    const mensaje = `Nombre: ${nombre}\nTexto: Unidad 5\n\n${filas}`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Actividad de vocabulario</h1>
      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <div className="flex flex-wrap gap-1 mb-4 text-justify">
        {palabras.map((p) =>
          p.palabra.match(/^\s+$/) ? (
            <span key={p.id}>{p.palabra}</span>
          ) : (
            <span
              key={p.id}
              onClick={() => cambiarEstado(p.id)}
              className={ "cursor-pointer px-1 rounded " +
                p.estado === "ninguno" || p.palabra.match(/^\\s+$/)
                  ? ""
                  : p.estado === "dudosa"
                  ? "bg-yellow-300"
                  : "bg-green-300"
              }

            >
              {p.palabra}
            </span>
          )
        )}
      </div>
      <button
        onClick={generarCSV}
        disabled={!nombre}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Enviar por WhatsApp
      </button>
    </div>
  );
}

