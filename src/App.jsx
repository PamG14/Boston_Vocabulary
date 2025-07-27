import { useState } from 'react';

const textos = {
  unidad5: {
    titulo: "Unidad 5",
    contenido: `The teenagers turning old clothes into money by Rita Park People say that Generation Z – people born between 1995 and 2008 – don’t like spending money as much as older people...`
  },
Level1: {
  titulo: "Level 1",
  contenido: `Can you cook?\n
This teenager can – and his mum's very happy with him.\n
Tom is like any other teenager. He goes to school, does his homework, meets his friends and enjoys doing sport.\n
But between 5.30 and 6.30 from Monday to Friday, Tom does something different. He cooks dinner for all the family: mum, dad, younger brother Joe and older sister Emma.\n
"I think it's important for teenagers to learn how to cook. Maths and English are important, of course, but they need other skills too to help them in today's world.\n
First I taught Tom how to cook easy meals like pizza or egg and chips. Then he started using recipes in my cookery books. Yesterday he made vegetable soup. It was very good!" – Tom's mum\n
"I love cooking and I think I'm really good at it. None of my friends cook. I don't know why, it isn't difficult and it's great fun!" – Tom\n
In the past, Tom didn't help out at home and his mum wasn't very happy with him. Today, things are different and she is very happy.`
},
Level2: {
  titulo: "Level 2",
  contenido: `My Town – Newquay\n 
I live in Newquay. It’s a small town on the Atlantic coast in the south of England. It has got great beaches and is the best place to surf in the UK. There are lots of surf schools where you can learn how to surf. I go surfing with my friends every weekend. My favourite place is Fistral Beach.\n
I love Newquay because there are lots of other things to do as well as surfing. If you like water sports, you can go kayaking, water-skiing or coasteering. Coasteering is different because it is rock climbing, jumping into the sea and swimming in the same activity, but you should always go with a special instructor.\n
If you like animals you can also visit the Blue Reef Aquarium and see lots of different fish and even sharks. You can also go horse riding on the beach or visit Newquay Zoo. There are lots of other attractions too like mini golf and bowling. Come and see for yourself!`
},
  Level3: {
  titulo: "Level 3",
  contenido: `Adventure travel\n
Time for an adventure?\n
Are you a bit bored with your nine-to-five routine? Have a look at our exciting range of holidays and decide what type of adventure you’d like.\n
Activity holidays\n
Our activity holidays are for everyone, people who love danger or who just like sports. We have a huge variety of water, snow or desert holidays. We’ll take you SCUBA diving in the Red Sea or kayaking and white water rafting in Canada. If you prefer snow, you can try skiing or snowboarding in the Alps or even igloo-building. For those who like warmer weather, we also have sandboarding (the desert version of skateboarding) or camel safaris.\n
Polar expeditions\n
Take a cruise to Antarctica or the northern Arctic; explore a land of white natural beauty and wonderful wildlife. Our experts will explain everything about the two poles as you watch the penguins in Antarctica or whales and polar bears in the Arctic. There's no greater adventure than travelling to the ends of the earth. A once-in-a-lifetime experience!\n
Cultural journeys\n
Our cultural journeys will help you discover ancient civilisations: India, Thailand, Egypt and many more. Visit temples, palaces and ancient ruins – just remember to bring your camera! Get to know local ways of life by exploring markets, trying exotic foods and meeting local people.\n
Trekking tours\n
We have trekking holidays to famous places such as Machu Picchu or the Everest Base Camp Trek, as well as some nearer to home in the Highlands of Scotland. You don’t need to be very sporty, just fairly fit. You’ll have a great time enjoying nature with a group of new friends. Some of the holidays include camping, but we’ll transport the tents for you!\n
Wildlife holidays\n
We organise small-group tours to get closer to nature in Africa, Asia or South America. Go on safari in Africa and watch lions and giraffes. Meet the famous turtles of the Galapagos Islands. Look for tigers in India, or take an elephant safari in Sri Lanka. We use local guides and stay in a range of accommodation, from tents to tree houses.`
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
      <span key={p.id}>{p.palabra}</span> // espacios normales
    ) : (
      <span
        key={p.id}
        onClick={() => cambiarEstado(p.id)}
        className={`palabra ${p.estado === "dudosa" ? "dudosa" : ""}`}
      >
        {p.palabra}
      </span>
    )
  )}
</div>


      <button onClick={generarCSV} disabled={!nombre}>
        Enviar por WhatsApp
      </button>
    </div>
  );
}
