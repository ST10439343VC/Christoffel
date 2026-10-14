export type MenuItemForOrder = {
  name: string;
  price: number;
};

export type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'completed';

export type Order = {
  id: string;
  items: { [key: string]: number };
  paymentMethod: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  estimatedReadyAt: number;
};

export type Selection = {
  [key: string]: number;
};

/*
 * ============================================================
 * ORDER NUMBER
 * ============================================================
 */

export const getNextOrderNumber = (
  orders: Order[]
): number => {
  const highestOrderNumber = orders.reduce(
    (highest, order) => {
      const match = /^CH(\d+)$/.exec(order.id);

      return match
        ? Math.max(
            highest,
            Number(match[1])
          )
        : highest;
    },
    1023
  );

  return highestOrderNumber + 1;
};

/*
 * ============================================================
 * CREATE ORDER
 * ============================================================
 *
 * This is the same order-creation logic used by the
 * Christoffel mobile App.tsx.
 */

export const createOrder = (
  menuItems: MenuItemForOrder[],
  selected: Selection,
  paymentMethod: string,
  orders: Order[]
): Order | null => {
  const totalSelected =
    Object.values(selected).reduce(
      (total, quantity) =>
        total + quantity,
      0
    );

  if (totalSelected === 0) {
    return null;
  }

  const selectedItems =
    menuItems.filter(
      item => selected[item.name]
    );

  const subtotal =
    selectedItems.reduce(
      (total, item) =>
        total +
        item.price *
          selected[item.name],
      0
    );

  const serviceFee =
    subtotal * 0.10;

  const total =
    subtotal + serviceFee;

  const now = Date.now();

  const preparationMinutes =
    Math.min(
      20,
      Math.max(
        8,
        8 + totalSelected * 1.5
      )
    );

  const estimatedReadyAt =
    now +
    preparationMinutes *
      60 *
      1000;

  const nextOrderNumber =
    getNextOrderNumber(orders);

  const newOrder: Order = {
    id: `CH${nextOrderNumber}`,
    items: { ...selected },
    paymentMethod,
    subtotal,
    serviceFee,
    total,
    status: 'received',
    createdAt: now,
    estimatedReadyAt,
  };

  return newOrder;
};

/*
 * ============================================================
 * UPDATE ORDER STATUSES
 * ============================================================
 *
 * Exact lifecycle from the Christoffel mobile App.tsx:
 *
 * received
 *    ↓ 20% of preparation time
 * preparing
 *    ↓ estimatedReadyAt
 * ready
 *    ↓ 60 seconds
 * completed
 */

export const updateOrderStatuses = (
  orders: Order[],
  now: number = Date.now()
): Order[] => {
  let changed = false;

  const updatedOrders =
    orders.map(order => {
      const totalPreparationTime =
        order.estimatedReadyAt -
        order.createdAt;

      const elapsed =
        now -
        order.createdAt;

      let newStatus: OrderStatus =
        order.status;

      if (
        elapsed >=
          totalPreparationTime *
            0.20 &&
        now <
          order.estimatedReadyAt
      ) {
        newStatus =
          'preparing';
      }

      if (
        now >=
        order.estimatedReadyAt
      ) {
        newStatus =
          'ready';
      }

      if (
        now >=
          order.estimatedReadyAt +
            60 * 1000
      ) {
        newStatus =
          'completed';
      }

      if (
        newStatus !==
        order.status
      ) {
        changed = true;

        return {
          ...order,
          status: newStatus,
        };
      }

      return order;
    });

  return changed
    ? updatedOrders
    : orders;
};

/*
 * ============================================================
 * ACTIVE ORDERS
 * ============================================================
 */

export const isActiveOrder = (
  order: Order
): boolean => {
  return (
    order.status === 'received' ||
    order.status === 'preparing' ||
    order.status === 'ready'
  );
};

export const getActiveOrders = (
  orders: Order[]
): Order[] => {
  return orders
    .filter(order =>
      isActiveOrder(order)
    )
    .sort(
      (a, b) =>
        b.createdAt -
        a.createdAt
    );
};

/*
 * ============================================================
 * FLOATING TRACKER ORDERS
 * ============================================================
 *
 * The tracker shows the newest two active orders.
 * Completed orders are never returned here.
 */

export const getTrackerOrders = (
  orders: Order[]
): Order[] => {
  return getActiveOrders(
    orders
  ).slice(0, 2);
};

export const hasActiveOrders = (
  orders: Order[]
): boolean => {
  return getActiveOrders(
    orders
  ).length > 0;
};
