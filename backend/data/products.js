const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "electronic",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "electronic",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "electronic",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    image: "/images/playstation.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "electronic",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    image: "/images/mouse.jpg",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "electronic",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    image: "/images/alexa.jpg",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "electronic",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    category: "chair",
    image: '/images/1.jpg',
    name: "Little Armchair Sheepskin",
    price: 986,
    description:
      "Tradition Little Petra VB1 Armchair Sheepskin Moonlight/ Walnut/ Brass Limited Edition | We give you a special discount when you put this product in the basket.",
    rating: 4.5,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "kitchen",
    image: '/images/2.jpg',
    name: "Pop-Up Toaster",
    price: 45,
    description:
      " The rounded square design of the toaster allows it to fit neatly against a wall, or inside a corner. Excellent at defrosting, and with the perfect breadtoheater distance to give crunchy toast with a soft, spongey middle.",
    rating: 4.1,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/3.png',
    name: "Lamp Light Blue",
    price: 79,
    description:
      "The Verner Panton Flowerpot , designed in 1968, was originally intended for the restaurant industry and Verner Panton exhibitions.",
    rating: 4.8,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "furniture",
    image: '/images/4.jpg',
    name: "Pulp Unit - 5 Compartments",
    price: 254,
    description:
      "Pulp Units are lightweight and durable, and can be used horizontally or vertically. Designed with A4 paper in mind, MUJI angle files and ring binders fit neatly inside.",
    rating: 3.9,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/5.jpg',
    name: "Golden Modern Light",
    price: 189,
    description:
      "Tom Dixon and FRONT have created an incredibly beautiful pendant, in a completely unique design. The lamp is made using a special metallization technology that makes the look completely unique. The first of its kind. the lamp is transparent when its on and you can see the exciting play of colors.",
    rating: 4.2,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "skin-care",
    image: '/images/6.jpg',
    name: "Body Oil 200ml",
    price: 67,
    description:
      "Made from 100% plant-based oils with olive oil as the main ingredient, this cleansing oil is gentle on the skin. Free from fragrance, colours and, mineral oils, paraben free, alcohol free, allergy tested (we cannot guarantee that it will not cause allergies in any users) * How to use: Take a small amount in the palm of your hand, and massage into the face to remove make-up and dirt. Rinse well with cold or warm water",

    rating: 3.6,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/7.jpg',
    name: "Black and White Lamp",
    price: 220,
    description:
      "Concept: Dot is inspired by perforated metal and the patterns that light creates when it shines through the small holes. The contrast between the coarse perforated metal and the smooth opal glass makes the Dot a simple and meaningful pendant. With its elegant expression, Shine, whether the light is on or off.",
    rating: 4.7,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "furniture",
    image: '/images/8.jpg',
    name: "Gejst Shelf A Black Ash/Black",
    price: 115,
    description:
      "Designed by Böttcher & Kayser, Nivo is a minimalist wall shelf designed with functionality and aesthetics in mind. Without unnecessary details and clean lines, this collection hangs easily and elegantly on the wall, creating calm and an overview of the things you want to put on the shelf.",

    rating: 4,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "furniture",
    image: '/images/9.png',
    name: "Cube Lolo Vase Black",
    price: 161,
    description:
      "Kubus Vase Lolo was originally designed by Søren Lassen in 2014, but was launched in connection with by Lassens 10 year anniversary 2018. The vase is a natural and sought-after extension of the series, which already counts the Kubus candlesticks and Kubus Bowl Bowl. Set it alone or in a still life, fill it with airy, colorful flowers for a feminine look or leave it alone in all its simplicity and precision.",

    rating: 3.1,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "chair",
    image: '/images/10.jpg',
    name: "Traditional Armchair",
    price: 89,
    description:
      "Concept: &Tradition's Boomerang lounge chair is a classic Danish design with a modern and minimalist expression. The chair was designed by Hvidt & Mølgaard in 1956, and with its stylish cushions and hand-polished wooden frame, it is an ideal Nordic design that gives a personal mark to the home.",
    rating: 4.3,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/11.jpg',
    name: "The Sun Pendant Black",
    price: 160,
    description:
      "The Here Comes The Sun pendant designed by Bertrand Balas is a quality lamp with a unique and magical look. The Here Comes The Sun series has a fantastic expression and especially swhen turned on it creates a very special atmosphere in the room it hangs in. The lamp fits perfectly above both dining room table, kitchen counter, and as living room lighting . ",

    rating: 4.8,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/12.png',
    name: "Simple Golden Lamp",
    price: 220,
    description:
      "Verner Panton Flowerpot, designed in 1968, was originally meant for the hospitality industry and Verner Panton displays and showrooms. The lamp then became popular in private homes, and due to its stylish design and many colour choices, it has made a major comeback in recent years.",

    rating: 4.9,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "skin-care",
    image: '/images/13.jpg',
    name: "Unbleached Cotton Pads 180",
    price: 33,
    description:
      "Cotton pads made from soft, unbleached cotton. These are made in Japan and made from 100% cotton.",

    rating: 3.8,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "chair",
    image: '/images/14.png',
    name: "Oak Spanish Chair",
    price: 520,
    description:
      "When talking about Børge Mogensen, The Spanish Chair is probably one of the first designs you would think of, which makes good sense as it is also one of his most recognized products around the world.",

    rating: 4,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "chair",
    image: '/images/15.jpg',
    name: "Copenhagen Armchair",
    price: 330,
    description:
      "Concept: The Hyg series by Danish Normann Copenhagen is a series of chairs based on the Danish word Hygge. The designer Simon Legald has tried to embody the meaning of the word around security, warmth and convenience in a furniture series. This is expression in the fine organic shapes and hearty curves that provide a high degree of sitting comfort and well-being in the chairs. ",

    rating: 4.2,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "electronic",
    image: '/images/16.jpg',
    name: "Anti Dark Light",
    price: 120,
    description:
      "Easy Mini W75 from Antidark lives fully up to its name. Simple design, comfortable light, easy to adjust. The Easy Wall Light has made it easy for the user to handle, well, everything! The Easy lamp can turn 360 degrees and be tipped. An ideal lamp that can be placed in connection with other lamps to achieve light in all corners of the room. Furthermore, the lamp can work as a wall light or ceiling",

    rating: 4.4,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/17.png',
    name: "Table Lamp",
    price: 75,
    description:
      "The lamp has also become popular in private homes and has especially made a comeback in recent years. This is not least due to the lamp's stylish design and the many color options that make it fit everywhere.",

    rating: 4.7,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "lamp",
    image: '/images/18.png',
    name: "Mat Black Lamp",
    price: 175,
    description:
      "Unique offer We give you a special discount when you put this product in the basket. *Only applies to specific products.",

    rating: 4,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "chair",
    image: '/images/19.jpg',
    name: "Comfy Chair",
    price: 119,
    description:
      "Sum is a series designed by the Danish designer Simon Legald, who is the epitome of modern elegance. Elegant and resolute as the tip of a wing, the armrests spread out invitingly, as if they want to embrace you in the armchair's soft, homely space.",

    rating: 3.4,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
  {
    category: "skin-care",
    image: '/images/20r.jpg',
    name: "Body Oil 50ml",
    price: 45,
    description:
      "Made from 100% plant-based oils with olive oil as the main ingredient, this cleansing oil is gentle on the skin. Free from fragrance, colours and, mineral oils, paraben free, alcohol free, allergy tested (we cannot guarantee that it will not cause allergies in any users) * How to use: Take a small amount in the palm of your hand, and massage into the face to remove make-up and dirt. Rinse well with cold or warm water.",

    rating: 4.1,
    brand: "Ikea",
    countInStock: 32,
    numReviews: 12,
  },
];

module.exports = products;
