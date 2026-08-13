import { useState, useEffect } from "react";

// Static product data that won't change
const STATIC_PRODUCTS = [
  {
    id: 1,
    number: "001",
    roman: "I",
    subtitle: "THE FOUNDATION",
    images: ["/products/villain-front.png", "/products/villain-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "SIGNATURE DROP",
  },
  {
    id: 2,
    number: "002",
    roman: "II",
    subtitle: "THE MARK",
    images: ["/products/product-2-front.png", "/products/product-2-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 3,
    number: "003",
    roman: "III",
    subtitle: "THE MOVEMENT",
    images: ["/products/product-3-front.png", "/products/product-3-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 4,
    number: "004",
    roman: "IV",
    subtitle: "THE SHIELD",
    images: ["/products/product-4-front.png", "/products/product-4-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "LIMITED",
  },
  {
    id: 5,
    number: "005",
    roman: "V",
    subtitle: "THE SPEED",
    images: ["/products/product-5-front.png", "/products/product-5-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 6,
    number: "006",
    roman: "VI",
    subtitle: "THE UTILITY",
    images: ["/products/product-6-front.png", "/products/product-6-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "LIMITED",
  },
  {
    id: 7,
    number: "007",
    roman: "VII",
    subtitle: "THE SHADOW",
    images: ["/products/product-7-front.png", "/products/product-7-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 8,
    number: "008",
    roman: "VIII",
    subtitle: "THE REBEL",
    images: ["/products/product-8-front.png", "/products/product-8-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "SIGNATURE DROP",
    colors: [
      { name: "WHITE", hex: "#F5F0E8", filter: "none" },
      { name: "BLACK", hex: "#1a1a1a", filter: "brightness(0.1)" },
      { name: "GREY", hex: "#808080", filter: "grayscale(1) brightness(0.6)" },
      {
        name: "NAVY",
        hex: "#1B2A4A",
        filter: "sepia(1) saturate(3) hue-rotate(190deg) brightness(0.4)",
      },
      {
        name: "RED",
        hex: "#CC0000",
        filter: "sepia(1) saturate(5) hue-rotate(320deg) brightness(0.7)",
      },
      {
        name: "BLUE",
        hex: "#1E40AF",
        filter: "sepia(1) saturate(4) hue-rotate(200deg) brightness(0.6)",
      },
      { name: "CREAM", hex: "#F5E6C8", filter: "sepia(0.3) brightness(1.05)" },
      {
        name: "BROWN",
        hex: "#6B3A2A",
        filter: "sepia(1) saturate(2) hue-rotate(340deg) brightness(0.5)",
      },
      {
        name: "PURPLE",
        hex: "#5B2D8E",
        filter: "sepia(1) saturate(4) hue-rotate(250deg) brightness(0.5)",
      },
    ],
  },
  {
    id: 9,
    number: "009",
    roman: "IX",
    subtitle: "THE CROWN",
    images: [],
    sizes: ["ONE SIZE"],
    tag: "ACCESSORY",
  },
];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/inventory",
    )
      .then((res) => res.json())
      .then((dynamoProducts) => {
        // Merge DynamoDB data with static data
        const merged = STATIC_PRODUCTS.map((staticProduct) => {
          const dynamic = dynamoProducts.find(
            (d) => d.productId === staticProduct.number,
          );
          return {
            ...staticProduct,
            name: dynamic?.name || staticProduct.name || "",
            price: dynamic?.price || "0",
            description: dynamic?.description || "",
            stock: dynamic?.sizes || {},
          };
        });
        setProducts(merged);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static data if fetch fails
        setProducts(
          STATIC_PRODUCTS.map((p) => ({
            ...p,
            price: "0",
            description: "",
            stock: {},
          })),
        );
        setLoading(false);
      });
  }, []);

  return { products, loading };
}
