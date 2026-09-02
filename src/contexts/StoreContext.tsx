/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { getProducts } from "../services/productService";
import { getOrders } from "../services/orderService";
import type { CartItem, Order, Product } from "../types";
import { readStorage, writeStorage } from "../utils/storage";
import { useAuth } from "./AuthContext";

type StoreValue = {
  cart: CartItem[];
  wishlist: string[];
  products: Product[];
  orders: Order[];
  cartCount: number;

  addToCart: (product: Product, quantity?: number) => void;

  updateQuantity: (id: string, quantity: number) => void;

  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  updateOrder: (id: string, status: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const PRODUCTS_DATA_VERSION = "3";
const PRODUCTS_DATA_VERSION_KEY = "caferoast_products_version";

export function StoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const wishlistKey = `caferoast_wishlist_${user?.id ?? "guest"}`;

  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>("caferoast_cart", []),
  );

  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(wishlistKey, []),
  );

  const [products, setProducts] = useState<Product[]>(() => {
    const hasCurrentProductsVersion =
      localStorage.getItem(PRODUCTS_DATA_VERSION_KEY) === PRODUCTS_DATA_VERSION;

    return hasCurrentProductsVersion
      ? readStorage<Product[]>("caferoast_products", getProducts())
      : getProducts();
  });

  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>("caferoast_orders", getOrders()),
  );

  const previousWishlistKey = useRef(wishlistKey);

  useEffect(() => {
    writeStorage("caferoast_cart", cart);
  }, [cart]);

  useEffect(() => {
    if (previousWishlistKey.current !== wishlistKey) {
      setWishlist(readStorage<string[]>(wishlistKey, []));
      previousWishlistKey.current = wishlistKey;
      return;
    }

    writeStorage(wishlistKey, wishlist);
  }, [wishlist, wishlistKey]);

  useEffect(() => {
    writeStorage("caferoast_products", products);

    localStorage.setItem(PRODUCTS_DATA_VERSION_KEY, PRODUCTS_DATA_VERSION);
  }, [products]);

  useEffect(() => {
    writeStorage("caferoast_orders", orders);
  }, [orders]);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      products,
      orders,

      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),

      addToCart: (product, quantity = 1) => {
        setCart((currentCart) => {
          const existingProduct = currentCart.find(
            (item) => item.product.id === product.id,
          );

          return existingProduct
            ? currentCart.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              )
            : [
                ...currentCart,
                {
                  product,
                  quantity,
                },
              ];
        });
      },

      updateQuantity: (id, quantity) => {
        setCart((currentCart) =>
          quantity < 1
            ? currentCart.filter((item) => item.product.id !== id)
            : currentCart.map((item) =>
                item.product.id === id
                  ? {
                      ...item,
                      quantity,
                    }
                  : item,
              ),
        );
      },

      removeFromCart: (id) => {
        setCart((currentCart) =>
          currentCart.filter((item) => item.product.id !== id),
        );
      },

      clearCart: () => {
        setCart([]);
      },

      toggleWishlist: (id) => {
        setWishlist((currentWishlist) =>
          currentWishlist.includes(id)
            ? currentWishlist.filter((wishlistId) => wishlistId !== id)
            : [...currentWishlist, id],
        );
      },

      saveProduct: (product) => {
        setProducts((currentProducts) =>
          currentProducts.some(
            (currentProduct) => currentProduct.id === product.id,
          )
            ? currentProducts.map((currentProduct) =>
                currentProduct.id === product.id ? product : currentProduct,
              )
            : [product, ...currentProducts],
        );
      },

      deleteProduct: (id) => {
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.id !== id),
        );
      },

      updateOrder: (id, status) => {
        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  deliveryStatus: status,
                }
              : order,
          ),
        );
      },
    }),
    [cart, wishlist, products, orders],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("Store context missing");
  }

  return context;
}
