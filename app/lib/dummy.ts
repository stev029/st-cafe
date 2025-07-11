import { Category, Role, User } from "@/generated/prisma";

interface MenuItem {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}

export const categoryTable: {id: string, name: string, description: string}[] = [
  { id: "cmcxcjybj000107la3dakdm5g",name: "Makanan", description: "Menu makanan yang tersedia" },
  { id: "cmcxclquh000407l4ged38yew", name: "Minuman", description: "Menu minuman yang tersedia" },
  { id: "cmcxcm6ki000607l4actqdnvj", name: "Snack", description: "Menu snack yang tersedia" },
  { id: "cmcxcn6uq000707l4awn7b8l5", name: "Dessert", description: "Menu dessert yang tersedia" },
  { id: "cmcxcnaql000807l4gz00hcsg", name: "Breakfast", description: "Menu sarapan yang tersedia" },
  { id: "cmcxcne3i000907l42ane7l07", name: "Lunch", description: "Menu makan siang yang tersedia" },
  { id: "cmcxcnhdv000a07l4g90qh3lu", name: "Dinner", description: "Menu makan malam yang tersedia" },
  { id: "cmcxcnkrh000b07l4ejuk15e8", name: "Vegan", description: "Menu vegan yang tersedia" },
  { id: "cmcxcnp2o000c07l4fhp30svx", name: "Gluten-Free", description: "Menu bebas gluten yang tersedia" },
  { id: "cmcxcnsic000d07l42ujka1n1", name: "Specials", description: "Menu spesial hari ini" },
];

export const menuTable: { id: string, name: string, price: number, description: string, categoryId: string, stock: number}[] = [
  { id: "cmcxcnsic000d07l42ujka1n1", name: "Nasi Goreng Spesial", description: "Menu nasi goreng spesial", price: 25000, categoryId: categoryTable[0].id, stock: 10 },
  { id: "cmcxdlgwa000v07l44o1dgqa5", name: "Ayam Penyet", description: "Menu ayam penyet", price: 30000, categoryId: categoryTable[0].id, stock: 5 },
  { id: "cmcxdll2e000w07l415spgemq", name: "Es Teh Manis", description: "Menu Es Teh Manis", price: 5000, categoryId: categoryTable[1].id, stock: 20 },
  { id: "cmcxdloh9000x07l48klugw5s", name: "Kopi Susu", description: "Menu Kopi susu", price: 15000, categoryId: categoryTable[1].id, stock: 15 },
  { id: "cmcxdlrx0000y07l4342n60cs", name: "Keripik Singkong", description: "Menu Keripik Singkong", price: 10000, categoryId: categoryTable[2].id, stock: 30 },
  { id: "cmcxdlvur000z07l48tzyf4tv", name: "Brownies Cokelat", description: "Menu Brownies cokelat", price: 20000, categoryId: categoryTable[3].id, stock: 12 },
  { id: "cmcxdlzn8001007l44makby4w", name: "Pancake Buah Segar", description: "Menu Pancake buah segar", price: 25000, categoryId: categoryTable[4].id, stock: 8 },
  { id: "cmcxdm3a4001107l443y3ayc4", name: "Salad Sayuran", description: "Menu Salad sayuran", price: 15000, categoryId: categoryTable[5].id, stock: 10 },
  { id: "cmcxdm6w4001207l4a45y3kk0", name: "Pizza Margherita", description: "Menu Pizza margherita", price: 60000, categoryId: categoryTable[6].id, stock: 5 },
  { id: "cmcxdma3s001307l4017ha3nl", name: "Burger Vegan", description: "Menu Burger vegan", price: 40000, categoryId: categoryTable[7].id, stock: 7 },
];

export const user: {name: string, email: string, password: string, role: Role}[] = [
  { name: "user", email: "user@mail.com", password: "user123", role: "USER" },
]