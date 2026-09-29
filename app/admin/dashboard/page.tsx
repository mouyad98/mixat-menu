"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Category = { id: string; name_en: string; name_ar: string | null };
type Product = {
  id: string;
  category_id: string;
  name_en: string;
  description_en: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
};

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();

  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [newProduct, setNewProduct] = useState({
    category_id: "",
    name_en: "",
    description_en: "",
    price: "",
    file: null as File | null,
  });

  // Load the logged-in owner's restaurant + its data
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (!restaurant) return; // first-time setup: create a restaurants row for this owner_id manually once

      setRestaurantId(restaurant.id);

      const { data: cats } = await supabase
        .from("categories")
        .select("id, name_en, name_ar")
        .eq("restaurant_id", restaurant.id);
      setCategories(cats ?? []);

      const { data: prods } = await supabase
        .from("products")
        .select("id, category_id, name_en, description_en, price, image_url, is_available")
        .in("category_id", (cats ?? []).map((c) => c.id));
      setProducts(prods ?? []);
    })();
  }, []);

  async function addCategory() {
    if (!newCatName || !restaurantId) return;
    const { data, error } = await supabase
      .from("categories")
      .insert({ restaurant_id: restaurantId, name_en: newCatName })
      .select()
      .single();
    if (!error && data) {
      setCategories([...categories, data]);
      setNewCatName("");
    }
  }

  async function addProduct() {
    if (!newProduct.category_id || !newProduct.name_en || !newProduct.price) return;

    let image_url: string | null = null;

    if (newProduct.file) {
      const filePath = `products/${Date.now()}-${newProduct.file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(filePath, newProduct.file);

      if (!uploadError) {
        const { data } = supabase.storage.from("menu-images").getPublicUrl(filePath);
        image_url = data.publicUrl;
      }
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        category_id: newProduct.category_id,
        name_en: newProduct.name_en,
        description_en: newProduct.description_en || null,
        price: Number(newProduct.price),
        image_url,
      })
      .select()
      .single();

    if (!error && data) {
      setProducts([...products, data]);
      setNewProduct({ category_id: "", name_en: "", description_en: "", price: "", file: null });
    }
  }

  async function toggleAvailability(product: Product) {
    const { error } = await supabase
      .from("products")
      .update({ is_available: !product.is_available })
      .eq("id", product.id);
    if (!error) {
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, is_available: !p.is_available } : p
        )
      );
    }
  }

  async function deleteProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">Menu Dashboard</h1>

      {/* Add category */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Add Category</h2>
        <div className="flex gap-2">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Category name (e.g. Fresh Juices)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <button onClick={addCategory} className="bg-black text-white rounded px-4">
            Add
          </button>
        </div>
      </section>

      {/* Add product */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Add Product</h2>
        <div className="flex flex-col gap-2">
          <select
            className="border rounded px-3 py-2"
            value={newProduct.category_id}
            onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_en}
              </option>
            ))}
          </select>
          <input
            className="border rounded px-3 py-2"
            placeholder="Product name"
            value={newProduct.name_en}
            onChange={(e) => setNewProduct({ ...newProduct, name_en: e.target.value })}
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Description (optional)"
            rows={2}
            value={newProduct.description_en}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description_en: e.target.value })
            }
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewProduct({ ...newProduct, file: e.target.files?.[0] ?? null })
            }
          />
          <button onClick={addProduct} className="bg-black text-white rounded px-4 py-2">
            Add Product
          </button>
        </div>
      </section>

      {/* Product list */}
      <section>
        <h2 className="font-semibold mb-2">Products</h2>
        <ul className="flex flex-col gap-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="border rounded p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{p.name_en}</p>
                <p className="text-sm text-gray-500">
                  ${p.price} — {p.is_available ? "Available" : "Hidden"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAvailability(p)}
                  className="text-sm underline"
                >
                  {p.is_available ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-sm text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
