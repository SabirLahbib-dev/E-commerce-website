import { products, Products, Clothing } from "../../data/products.js";

describe("Test suite: Products", () => {
  let product1;
  beforeEach(() => {
    product1 = new Products({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });
  it("generates objects of products", () => {
    expect(product1.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product1 instanceof Products).toEqual(true);
  });

  it("Returns the correct rating stars image", () => {
    expect(product1.getStars()).toEqual(45);
  });
  it("Formats the product price correctly", () => {
    expect(product1.getPrice()).toEqual("10.90");
  });

  it("Does not display extra HTML for normal products", () => {
    expect(product1.getExtraInfo()).toEqual("");
    expect(product1.sizeChartLink).toEqual(undefined);
  });
});

describe("Test suite: Clothing", () => {
  let product2;
  beforeEach(() => {
    product2 = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });
  it("Generates a Clothing object correctly", () => {
    expect(product2.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(product2 instanceof Clothing).toEqual(true);
    expect(product2.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });
  it("Displays the Size Chart link", () => {
    expect(product2.getExtraInfo()).toContain("images/clothing-size-chart.png");
  });
});
