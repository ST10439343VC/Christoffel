import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MenuItem } from '../../data/menuData';

const WEB_SELECTION_STORAGE_KEY =
  '@christoffel_web_selection';

export type SelectionItem = {
  item: MenuItem;
  quantity: number;
};

type WebSelectionContextType = {
  selection: SelectionItem[];

  addToSelection: (item: MenuItem) => void;

  increaseQuantity: (itemId: string) => void;

  decreaseQuantity: (itemId: string) => void;

  removeFromSelection: (itemId: string) => void;

  clearSelection: () => void;

  getQuantity: (itemId: string) => number;

  totalItems: number;

  subtotal: number;
};

const WebSelectionContext =
  createContext<WebSelectionContextType | undefined>(
    undefined
  );


// ============================================================
// WEB SELECTION PROVIDER
//
// This is the shared brain of the web cart/selection system.
// Every web page inside this provider can access the same
// selection.
// ============================================================

export function WebSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selection, setSelection] =
    useState<SelectionItem[]>([]);

  const [selectionLoaded, setSelectionLoaded] =
    useState(false);


  // ============================================================
  // LOAD SAVED WEB SELECTION
  // ============================================================

  useEffect(() => {
    const loadSelection = async () => {
      try {
        const savedSelection =
          await AsyncStorage.getItem(
            WEB_SELECTION_STORAGE_KEY
          );

        if (savedSelection) {
          setSelection(
            JSON.parse(savedSelection)
          );
        }
      } catch (error) {
        console.log(
          'Could not load web selection:',
          error
        );
      } finally {
        setSelectionLoaded(true);
      }
    };

    loadSelection();
  }, []);


  // ============================================================
  // SAVE WEB SELECTION
  // ============================================================

  useEffect(() => {
    if (!selectionLoaded) return;

    const saveSelection = async () => {
      try {
        await AsyncStorage.setItem(
          WEB_SELECTION_STORAGE_KEY,
          JSON.stringify(selection)
        );
      } catch (error) {
        console.log(
          'Could not save web selection:',
          error
        );
      }
    };

    saveSelection();
  }, [selection, selectionLoaded]);


  // ============================================================
  // ADD ITEM
  // ============================================================

  const addToSelection = (item: MenuItem) => {
    setSelection(current => {
      const existing = current.find(
        x => x.item.id === item.id
      );

      if (existing) {
        return current.map(x =>
          x.item.id === item.id
            ? {
                ...x,
                quantity: x.quantity + 1,
              }
            : x
        );
      }

      return [
        ...current,
        {
          item,
          quantity: 1,
        },
      ];
    });
  };


  // ============================================================
  // INCREASE QUANTITY
  // ============================================================

  const increaseQuantity = (itemId: string) => {
    setSelection(current =>
      current.map(x =>
        x.item.id === itemId
          ? {
              ...x,
              quantity: x.quantity + 1,
            }
          : x
      )
    );
  };


  // ============================================================
  // DECREASE QUANTITY
  // ============================================================

  const decreaseQuantity = (itemId: string) => {
    setSelection(current =>
      current
        .map(x =>
          x.item.id === itemId
            ? {
                ...x,
                quantity: x.quantity - 1,
              }
            : x
        )
        .filter(x => x.quantity > 0)
    );
  };


  // ============================================================
  // REMOVE ITEM
  // ============================================================

  const removeFromSelection = (itemId: string) => {
    setSelection(current =>
      current.filter(
        x => x.item.id !== itemId
      )
    );
  };


  // ============================================================
  // CLEAR SELECTION
  // ============================================================

  const clearSelection = () => {
    setSelection([]);
  };


  // ============================================================
  // GET ITEM QUANTITY
  // ============================================================

  const getQuantity = (itemId: string) => {
    return (
      selection.find(
        x => x.item.id === itemId
      )?.quantity ?? 0
    );
  };


  // ============================================================
  // TOTAL NUMBER OF ITEMS
  // ============================================================

  const totalItems = selection.reduce(
    (total, x) => total + x.quantity,
    0
  );


  // ============================================================
  // SUBTOTAL
  // ============================================================

  const subtotal = selection.reduce(
    (total, x) =>
      total +
      x.item.price * x.quantity,
    0
  );


  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <WebSelectionContext.Provider
      value={{
        selection,
        addToSelection,
        increaseQuantity,
        decreaseQuantity,
        removeFromSelection,
        clearSelection,
        getQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </WebSelectionContext.Provider>
  );
}


// ============================================================
// WEB SELECTION HOOK
//
// Pages use this hook to communicate with the shared
// selection/cart system.
// ============================================================

export function useWebSelection() {
  const context =
    useContext(WebSelectionContext);

  if (!context) {
    throw new Error(
      'useWebSelection must be used inside WebSelectionProvider'
    );
  }

  return context;
}