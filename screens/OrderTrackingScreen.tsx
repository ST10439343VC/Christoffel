import React, { useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { menuData, MenuItem } from '../data/menuData';

type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'completed';

type Coordinate = {
  latitude: number;
  longitude: number;
};

type Driver = {
  name: string;
  vehicle: string;
  registration: string;
};

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85';

/*
|--------------------------------------------------------------------------
| CHRISTOFFEL DELIVERY ROUTES
|--------------------------------------------------------------------------
|
| There are 10 different predefined routes.
| The route is selected from the order number so different orders
| naturally receive different routes.
|
*/

const ROUTES: Coordinate[][] = [
  // Route 1
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2024, longitude: 28.0452 },
    { latitude: -26.2035, longitude: 28.0468 },
    { latitude: -26.2044, longitude: 28.0485 },
    { latitude: -26.2058, longitude: 28.0494 },
    { latitude: -26.2072, longitude: 28.0508 },
    { latitude: -26.2087, longitude: 28.0522 },
    { latitude: -26.2100, longitude: 28.0535 },
    { latitude: -26.2115, longitude: 28.0546 },
  ],

  // Route 2
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2006, longitude: 28.0448 },
    { latitude: -26.1993, longitude: 28.0465 },
    { latitude: -26.1982, longitude: 28.0482 },
    { latitude: -26.1971, longitude: 28.0500 },
    { latitude: -26.1960, longitude: 28.0517 },
    { latitude: -26.1952, longitude: 28.0536 },
    { latitude: -26.1940, longitude: 28.0552 },
    { latitude: -26.1927, longitude: 28.0566 },
  ],

  // Route 3
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2030, longitude: 28.0422 },
    { latitude: -26.2047, longitude: 28.0412 },
    { latitude: -26.2064, longitude: 28.0405 },
    { latitude: -26.2081, longitude: 28.0394 },
    { latitude: -26.2098, longitude: 28.0383 },
    { latitude: -26.2114, longitude: 28.0372 },
    { latitude: -26.2128, longitude: 28.0360 },
    { latitude: -26.2142, longitude: 28.0348 },
  ],

  // Route 4
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2032, longitude: 28.0440 },
    { latitude: -26.2048, longitude: 28.0445 },
    { latitude: -26.2065, longitude: 28.0454 },
    { latitude: -26.2082, longitude: 28.0465 },
    { latitude: -26.2098, longitude: 28.0478 },
    { latitude: -26.2114, longitude: 28.0492 },
    { latitude: -26.2130, longitude: 28.0507 },
    { latitude: -26.2146, longitude: 28.0520 },
  ],

  // Route 5
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2008, longitude: 28.0419 },
    { latitude: -26.2000, longitude: 28.0400 },
    { latitude: -26.1992, longitude: 28.0382 },
    { latitude: -26.1984, longitude: 28.0365 },
    { latitude: -26.1973, longitude: 28.0348 },
    { latitude: -26.1960, longitude: 28.0332 },
    { latitude: -26.1947, longitude: 28.0317 },
    { latitude: -26.1934, longitude: 28.0303 },
  ],

  // Route 6
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2021, longitude: 28.0457 },
    { latitude: -26.2026, longitude: 28.0478 },
    { latitude: -26.2032, longitude: 28.0498 },
    { latitude: -26.2041, longitude: 28.0518 },
    { latitude: -26.2051, longitude: 28.0537 },
    { latitude: -26.2064, longitude: 28.0554 },
    { latitude: -26.2078, longitude: 28.0570 },
    { latitude: -26.2093, longitude: 28.0584 },
  ],

  // Route 7
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2002, longitude: 28.0430 },
    { latitude: -26.1985, longitude: 28.0423 },
    { latitude: -26.1968, longitude: 28.0416 },
    { latitude: -26.1952, longitude: 28.0407 },
    { latitude: -26.1936, longitude: 28.0398 },
    { latitude: -26.1921, longitude: 28.0387 },
    { latitude: -26.1907, longitude: 28.0375 },
    { latitude: -26.1894, longitude: 28.0363 },
  ],

  // Route 8
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2029, longitude: 28.0460 },
    { latitude: -26.2043, longitude: 28.0484 },
    { latitude: -26.2059, longitude: 28.0506 },
    { latitude: -26.2076, longitude: 28.0528 },
    { latitude: -26.2093, longitude: 28.0549 },
    { latitude: -26.2111, longitude: 28.0568 },
    { latitude: -26.2130, longitude: 28.0585 },
    { latitude: -26.2148, longitude: 28.0600 },
  ],

  // Route 9
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2007, longitude: 28.0455 },
    { latitude: -26.1995, longitude: 28.0473 },
    { latitude: -26.1980, longitude: 28.0491 },
    { latitude: -26.1964, longitude: 28.0508 },
    { latitude: -26.1948, longitude: 28.0524 },
    { latitude: -26.1932, longitude: 28.0540 },
    { latitude: -26.1917, longitude: 28.0554 },
    { latitude: -26.1902, longitude: 28.0568 },
  ],

  // Route 10
  [
    { latitude: -26.2018, longitude: 28.0436 },
    { latitude: -26.2035, longitude: 28.0432 },
    { latitude: -26.2052, longitude: 28.0427 },
    { latitude: -26.2070, longitude: 28.0421 },
    { latitude: -26.2088, longitude: 28.0413 },
    { latitude: -26.2106, longitude: 28.0405 },
    { latitude: -26.2124, longitude: 28.0396 },
    { latitude: -26.2141, longitude: 28.0385 },
    { latitude: -26.2158, longitude: 28.0374 },
  ],
];

const DRIVERS: Driver[] = [
  {
    name: 'Thabo M.',
    vehicle: 'Toyota Corolla',
    registration: 'CJ 42-19 GP',
  },
  {
    name: 'Sipho N.',
    vehicle: 'Volkswagen Polo',
    registration: 'ND 81-27 GP',
  },
  {
    name: 'Lerato K.',
    vehicle: 'Toyota Starlet',
    registration: 'CA 54-73 GP',
  },
  {
    name: 'Mandla S.',
    vehicle: 'Hyundai i20',
    registration: 'GP 29-64 GP',
  },
  {
    name: 'Siyabonga D.',
    vehicle: 'Toyota Corolla',
    registration: 'KZ 73-18 GP',
  },
  {
    name: 'Ayanda M.',
    vehicle: 'Volkswagen Polo',
    registration: 'GP 46-92 GP',
  },
  {
    name: 'Bongani Z.',
    vehicle: 'Suzuki Swift',
    registration: 'ND 35-61 GP',
  },
  {
    name: 'Nokuthula P.',
    vehicle: 'Toyota Starlet',
    registration: 'CA 67-24 GP',
  },
  {
    name: 'Sanele T.',
    vehicle: 'Hyundai Grand i10',
    registration: 'GP 58-43 GP',
  },
  {
    name: 'Mthokozisi B.',
    vehicle: 'Toyota Corolla',
    registration: 'KZ 91-35 GP',
  },
];

/*
|--------------------------------------------------------------------------
| ROUTE HELPERS
|--------------------------------------------------------------------------
*/

const getRouteIndex = (orderId: string) => {
  const numbers = orderId.replace(/\D/g, '');

  if (!numbers) {
    return 0;
  }

  const orderNumber = parseInt(numbers, 10);

  if (Number.isNaN(orderNumber)) {
    return 0;
  }

  return (orderNumber - 1) % ROUTES.length;
};

const interpolateCoordinate = (
  start: Coordinate,
  end: Coordinate,
  progress: number
): Coordinate => {
  return {
    latitude:
      start.latitude +
      (end.latitude - start.latitude) * progress,

    longitude:
      start.longitude +
      (end.longitude - start.longitude) * progress,
  };
};

const getCoordinateAtProgress = (
  route: Coordinate[],
  progress: number
): Coordinate => {
  if (route.length === 0) {
    return {
      latitude: -26.2018,
      longitude: 28.0436,
    };
  }

  if (route.length === 1) {
    return route[0];
  }

  const safeProgress = Math.max(
    0,
    Math.min(1, progress)
  );

  const scaledPosition =
    safeProgress * (route.length - 1);

  const index = Math.floor(
    scaledPosition
  );

  if (index >= route.length - 1) {
    return route[route.length - 1];
  }

  const localProgress =
    scaledPosition - index;

  return interpolateCoordinate(
    route[index],
    route[index + 1],
    localProgress
  );
};

const getDriverProgress = (
  status: OrderStatus,
  currentTime: number,
  createdAt: number,
  estimatedReadyAt: number
) => {
  if (status === 'received') {
    return 0;
  }

  if (status === 'completed') {
    return 1;
  }

  if (status === 'ready') {
    return 0.7;
  }

  /*
   * During "preparing", allow the driver to move gradually.
   * This uses the existing order timestamps rather than creating
   * a second order timer.
   */

  const totalDuration =
    estimatedReadyAt - createdAt;

  if (totalDuration <= 0) {
    return 0.3;
  }

  const elapsed =
    currentTime - createdAt;

  const overallProgress = Math.max(
    0,
    Math.min(
      1,
      elapsed / totalDuration
    )
  );

  /*
   * Driver movement during preparing is kept between
   * 15% and 55% of the route.
   */

  return 0.15 + overallProgress * 0.4;
};

/*
|--------------------------------------------------------------------------
| OPENSTREETMAP MAP
|--------------------------------------------------------------------------
*/

const createMapHtml = (
  route: Coordinate[],
  driver: Driver,
  initialProgress: number
) => {
  const routePoints = route.map(
    point => [
      point.latitude,
      point.longitude,
    ]
  );

  const restaurant = route[0];

  const destination =
    route[route.length - 1];

  const initialDriver =
    getCoordinateAtProgress(
      route,
      initialProgress
    );

  return `
<!DOCTYPE html>
<html>
<head>

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<style>

html,
body,
#map {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #0C0C0B;
}

.leaflet-control-attribution {
  font-size: 9px !important;
}

.leaflet-control-zoom {
  border: none !important;
}

.leaflet-control-zoom a {
  background: #171717 !important;
  color: #D4AF37 !important;
  border-color: #4A4022 !important;
}

.leaflet-popup-content-wrapper {
  background: #141412;
  color: #E8E5DD;
  border: 1px solid #4A4022;
  border-radius: 10px;
}

.leaflet-popup-tip {
  background: #141412;
}

.marker {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0,0,0,0.45);
}

.restaurant {
  width: 42px;
  height: 42px;
  background: #D4AF37;
  border: 3px solid #FFF4CC;
}

.driver {
  width: 46px;
  height: 46px;
  background: #0C0C0B;
  border: 3px solid #D4AF37;
}

.customer {
  width: 42px;
  height: 42px;
  background: #E8E5DD;
  border: 3px solid #D4AF37;
}

</style>

</head>

<body>

<div id="map"></div>

<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
</script>

<script>

const route =
  ${JSON.stringify(routePoints)};

const restaurant =
  ${JSON.stringify([
    restaurant.latitude,
    restaurant.longitude,
  ])};

const destination =
  ${JSON.stringify([
    destination.latitude,
    destination.longitude,
  ])};

const initialDriver =
  ${JSON.stringify([
    initialDriver.latitude,
    initialDriver.longitude,
  ])};

const driverName =
  ${JSON.stringify(driver.name)};

const vehicle =
  ${JSON.stringify(driver.vehicle)};

const registration =
  ${JSON.stringify(driver.registration)};

const map =
  L.map('map', {
    zoomControl: true,
    attributionControl: true,
  });

L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; OpenStreetMap contributors',
  }
).addTo(map);

const fullRoute =
  L.polyline(
    route,
    {
      color: '#8B7430',
      weight: 4,
      opacity: 0.75,
    }
  ).addTo(map);

const travelled =
  L.polyline(
    [],
    {
      color: '#D4AF37',
      weight: 5,
      opacity: 1,
    }
  ).addTo(map);

const restaurantIcon =
  L.divIcon({
    className: '',
    html:
      '<div class="marker restaurant">🍽</div>',
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });

const driverIcon =
  L.divIcon({
    className: '',
    html:
      '<div class="marker driver">🚗</div>',
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });

const customerIcon =
  L.divIcon({
    className: '',
    html:
      '<div class="marker customer">🏠</div>',
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });

L.marker(
  restaurant,
  {
    icon: restaurantIcon,
  }
)
.addTo(map)
.bindPopup(
  '<b>Christoffel Restaurant</b><br>Restaurant'
);

const driverMarker =
  L.marker(
    initialDriver,
    {
      icon: driverIcon,
    }
  )
  .addTo(map)
  .bindPopup(
    '<b>' +
    driverName +
    '</b><br>' +
    vehicle +
    '<br>' +
    registration
  );

L.marker(
  destination,
  {
    icon: customerIcon,
  }
)
.addTo(map)
.bindPopup(
  '<b>Delivery Location</b><br>Customer destination'
);

map.fitBounds(
  fullRoute.getBounds(),
  {
    padding: [30, 30],
  }
);

function updateDriver(
  latitude,
  longitude,
  progress
) {

  const position = [
    latitude,
    longitude,
  ];

  driverMarker.setLatLng(
    position
  );

  const count =
    Math.floor(
      progress *
      (route.length - 1)
    );

  const points =
    route.slice(
      0,
      count + 1
    );

  points.push(position);

  travelled.setLatLngs(
    points
  );
}

updateDriver(
  initialDriver[0],
  initialDriver[1],
  ${initialProgress}
);

</script>

</body>
</html>
`;
};

export default function OrderTrackingScreen({
  order,
  onBack,
}: {
  order: {
    id: string;
    items: {
      [key: string]: number;
    };
    paymentMethod: string;
    subtotal: number;
    serviceFee: number;
    total: number;
    status: OrderStatus;
    createdAt: number;
    estimatedReadyAt: number;
  };

  onBack: () => void;
}) {
  const [currentTime, setCurrentTime] =
    useState(Date.now());

  const webViewRef =
    useRef<WebView>(null);

  /*
  |--------------------------------------------------------------------------
  | LIVE CLOCK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer =
      setInterval(() => {
        setCurrentTime(
          Date.now()
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SELECT ROUTE FROM ORDER NUMBER
  |--------------------------------------------------------------------------
  */

  const routeIndex =
    getRouteIndex(order.id);

  const selectedRoute =
    ROUTES[routeIndex];

  const selectedDriver =
    DRIVERS[routeIndex];

  /*
  |--------------------------------------------------------------------------
  | DRIVER PROGRESS
  |--------------------------------------------------------------------------
  */

  const driverProgress =
    getDriverProgress(
      order.status,
      currentTime,
      order.createdAt,
      order.estimatedReadyAt
    );

  const driverCoordinate =
    getCoordinateAtProgress(
      selectedRoute,
      driverProgress
    );

  /*
  |--------------------------------------------------------------------------
  | MAP HTML
  |--------------------------------------------------------------------------
  */

  const mapHtml =
    useMemo(
      () =>
        createMapHtml(
          selectedRoute,
          selectedDriver,
          driverProgress
        ),
      [
        selectedRoute,
        selectedDriver,
      ]
    );

  /*
  |--------------------------------------------------------------------------
  | UPDATE DRIVER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!webViewRef.current) {
      return;
    }

    webViewRef.current.injectJavaScript(`
      if (
        typeof updateDriver ===
        'function'
      ) {
        updateDriver(
          ${driverCoordinate.latitude},
          ${driverCoordinate.longitude},
          ${driverProgress}
        );
      }

      true;
    `);
  }, [
    driverCoordinate.latitude,
    driverCoordinate.longitude,
    driverProgress,
  ]);

  /*
  |--------------------------------------------------------------------------
  | ORDER STATUS
  |--------------------------------------------------------------------------
  */

  const getStatusNumber = () => {
    switch (order.status) {
      case 'received':
        return 0;

      case 'preparing':
        return 1;

      case 'ready':
        return 2;

      case 'completed':
        return 3;

      default:
        return 0;
    }
  };

  const currentStatus =
    getStatusNumber();

  const getStatusText = () => {
    switch (order.status) {
      case 'received':
        return 'Order Received';

      case 'preparing':
        return 'Preparing Your Order';

      case 'ready':
        return 'Ready for Collection';

      case 'completed':
        return 'Order Completed';

      default:
        return 'Order Received';
    }
  };

  const getStatusDescription = () => {
    switch (order.status) {
      case 'received':
        return 'Your order has been received by the restaurant.';

      case 'preparing':
        return 'Chef Christoffel is currently preparing your meal.';

      case 'ready':
        return 'Your meal is ready for collection.';

      case 'completed':
        return 'Your order has been completed. Enjoy your meal!';

      default:
        return 'Your order has been received.';
    }
  };

  const formatTime = (
    timestamp: number
  ) => {
    return new Date(
      timestamp
    ).toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | LIVE COUNTDOWN
  |--------------------------------------------------------------------------
  */

  const getRemainingTime = () => {
    const remainingMilliseconds =
      order.estimatedReadyAt -
      currentTime;

    if (
      remainingMilliseconds <=
      0
    ) {
      return 'Ready now';
    }

    const totalSeconds =
      Math.ceil(
        remainingMilliseconds /
        1000
      );

    const minutes =
      Math.floor(
        totalSeconds / 60
      );

    const seconds =
      totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes} min ${seconds
        .toString()
        .padStart(2, '0')} sec`;
    }

    return `${seconds} sec`;
  };

  const getItemCount = () => {
    return Object.values(
      order.items
    ).reduce(
      (sum, quantity) =>
        sum + quantity,
      0
    );
  };

  /*
  |--------------------------------------------------------------------------
  | MAP STATUS
  |--------------------------------------------------------------------------
  */

  const getDriverStatus = () => {
    switch (order.status) {
      case 'received':
        return 'Driver waiting';

      case 'preparing':
        return 'Driver en route';

      case 'ready':
        return 'Driver nearby';

      case 'completed':
        return 'Delivered';

      default:
        return 'Driver waiting';
    }
  };

  const getDriverProgressText =
    () => {
      if (
        order.status ===
        'completed'
      ) {
        return '100%';
      }

      return `${Math.round(
        driverProgress * 100
      )}%`;
    };

  /*
  |--------------------------------------------------------------------------
  | PROGRESS STAGES
  |--------------------------------------------------------------------------
  */

  const stages = [
    {
      title: 'Order Received',
      description:
        'Your order has been confirmed.',
      icon: '✓',
    },

    {
      title: 'Preparing',
      description:
        'The chef is preparing your meal.',
      icon: '👨‍🍳',
    },

    {
      title:
        'Ready for Collection',
      description:
        'Your order is ready.',
      icon: '🍽',
    },

    {
      title: 'Completed',
      description:
        'Order completed successfully.',
      icon: '✓',
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | LIVE MENU DATA
  |--------------------------------------------------------------------------
  | Order Tracking must use the same saved menu as Manage Menu.
  | This makes newly added/edited dishes keep their real price and image.
  | The original menuData remains the fallback for the built-in dishes.
  */

  const [liveMenuItems, setLiveMenuItems] =
    useState<MenuItem[]>(menuData);

  useEffect(() => {
    const loadLiveMenu = async () => {
      try {
        const savedMenu =
          await AsyncStorage.getItem('@christoffel_menu');

        if (savedMenu) {
          const parsedMenu =
            JSON.parse(savedMenu);

          if (Array.isArray(parsedMenu)) {
            setLiveMenuItems(parsedMenu);
          }
        }
      } catch (error) {
        console.log(
          'Could not load saved menu:',
          error
        );
      }
    };

    loadLiveMenu();
  }, []);

  const getMenuItem = (name: string) => {
    const savedItem =
      liveMenuItems.find(
        item => item.name === name
      );

    if (savedItem) {
      return savedItem;
    }

    return menuData.find(
      item => item.name === name
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'bottom',
      ]}
    >
      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.backgroundOverlay} />

      {/* HEADER */}

      <View
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text
            style={styles.back}
          >
            ‹
          </Text>
        </TouchableOpacity>

        <View
          style={styles.headerTitle}
        >
          <Text
            style={styles.title}
          >
            Order Tracking
          </Text>

          <Text
            style={styles.subtitle}
          >
            {order.id}
          </Text>
        </View>

        <View
          style={styles.headerSpace}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* CURRENT STATUS */}

        <View
          style={styles.statusCard}
        >
          <View
            style={styles.statusIcon}
          >
            <Text
              style={
                styles.statusIconText
              }
            >
              {order.status ===
              'preparing'
                ? '👨‍🍳'
                : order.status ===
                  'ready'
                ? '🍽'
                : '✓'}
            </Text>
          </View>

          <Text
            style={styles.statusTitle}
          >
            {getStatusText()}
          </Text>

          <Text
            style={
              styles.statusDescription
            }
          >
            {getStatusDescription()}
          </Text>
        </View>

        {/* LIVE DELIVERY MAP */}

        <View
          style={styles.mapCard}
        >
          <View
            style={styles.mapHeader}
          >
            <View>
              <Text
                style={styles.mapTitle}
              >
                Live Order Map
              </Text>

              <Text
                style={
                  styles.mapSubtitle
                }
              >
                Route {routeIndex + 1} •{' '}
                {getDriverStatus()}
              </Text>
            </View>

            <View
              style={styles.liveBadge}
            >
              <View
                style={styles.liveDot}
              />

              <Text
                style={styles.liveText}
              >
                LIVE
              </Text>
            </View>
          </View>

          <View
            style={styles.mapContainer}
          >
            <WebView
              ref={webViewRef}
              source={{
                html: mapHtml,
              }}
              originWhitelist={[
                '*',
              ]}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              scrollEnabled={false}
              style={styles.map}
            />
          </View>

          {/* MAP LEGEND */}

          <View
            style={styles.mapLegend}
          >
            <View
              style={
                styles.legendItem
              }
            >
              <View
                style={
                  styles.legendRestaurant
                }
              />

              <Text
                style={
                  styles.legendText
                }
              >
                Restaurant
              </Text>
            </View>

            <View
              style={
                styles.legendItem
              }
            >
              <View
                style={
                  styles.legendDriver
                }
              />

              <Text
                style={
                  styles.legendText
                }
              >
                Driver
              </Text>
            </View>

            <View
              style={
                styles.legendItem
              }
            >
              <View
                style={
                  styles.legendCustomer
                }
              />

              <Text
                style={
                  styles.legendText
                }
              >
                Destination
              </Text>
            </View>
          </View>
        </View>

        {/* DRIVER INFORMATION */}

        <View
          style={styles.driverCard}
        >
          <View
            style={
              styles.driverCardHeader
            }
          >
            <View>
              <Text
                style={
                  styles.driverSectionTitle
                }
              >
                Your Driver
              </Text>

              <Text
                style={
                  styles.driverStatus
                }
              >
                {getDriverStatus()}
              </Text>
            </View>

            <View
              style={
                styles.driverProgressBadge
              }
            >
              <Text
                style={
                  styles.driverProgressText
                }
              >
                {getDriverProgressText()}
              </Text>
            </View>
          </View>

          <View
            style={
              styles.driverDetails
            }
          >
            <View
              style={
                styles.driverAvatar
              }
            >
              <Text
                style={
                  styles.driverAvatarText
                }
              >
                👨🏽
              </Text>
            </View>

            <View
              style={
                styles.driverInfo
              }
            >
              <Text
                style={
                  styles.driverName
                }
              >
                {selectedDriver.name}
              </Text>

              <Text
                style={
                  styles.driverVehicle
                }
              >
                {selectedDriver.vehicle}
              </Text>

              <Text
                style={
                  styles.driverRegistration
                }
              >
                {selectedDriver.registration}
              </Text>
            </View>

            <View
              style={
                styles.driverCarIcon
              }
            >
              <Text
                style={
                  styles.carEmoji
                }
              >
                🚗
              </Text>
            </View>
          </View>
        </View>

        {/* PROGRESS */}

        <View
          style={styles.progressCard}
        >
          <Text
            style={styles.sectionTitle}
          >
            Order Progress
          </Text>

          {stages.map(
            (
              stage,
              index
            ) => {
              const completed =
                index <
                currentStatus;

              const active =
                index ===
                currentStatus;

              return (
                <View
                  key={
                    stage.title
                  }
                  style={
                    styles.stageRow
                  }
                >
                  <View
                    style={
                      styles.timeline
                    }
                  >
                    <View
                      style={[
                        styles.stageCircle,
                        completed &&
                          styles.completedCircle,
                        active &&
                          styles.activeCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.stageIcon,
                          completed &&
                            styles.completedIcon,
                          active &&
                            styles.activeIcon,
                        ]}
                      >
                        {completed
                          ? '✓'
                          : stage.icon}
                      </Text>
                    </View>

                    {index <
                      stages.length -
                        1 && (
                      <View
                        style={[
                          styles.stageLine,
                          index <
                            currentStatus &&
                            styles.completedLine,
                        ]}
                      />
                    )}
                  </View>

                  <View
                    style={
                      styles.stageContent
                    }
                  >
                    <Text
                      style={[
                        styles.stageTitle,
                        active &&
                          styles.activeStageTitle,
                        completed &&
                          styles.completedStageTitle,
                      ]}
                    >
                      {stage.title}
                    </Text>

                    <Text
                      style={
                        styles.stageDescription
                      }
                    >
                      {
                        stage.description
                      }
                    </Text>
                  </View>
                </View>
              );
            }
          )}
        </View>

        {/* ESTIMATED TIME */}

        <View
          style={styles.timeCard}
        >
          <Text
            style={styles.timeLabel}
          >
            {order.status ===
              'ready' ||
            order.status ===
              'completed'
              ? 'Order Status'
              : 'Estimated Ready In'}
          </Text>

          <Text
            style={
              styles.countdownValue
            }
          >
            {order.status ===
            'completed'
              ? 'Completed'
              : order.status ===
                'ready'
              ? 'Ready Now'
              : getRemainingTime()}
          </Text>

          <Text
            style={styles.timeLabel}
          >
            Estimated Ready Time
          </Text>

          <Text
            style={styles.timeValue}
          >
            {formatTime(
              order.estimatedReadyAt
            )}
          </Text>

          <Text
            style={styles.timeSubtext}
          >
            Based on your order time
          </Text>
        </View>

        {/* ORDER DETAILS */}

        <View
          style={styles.orderCard}
        >
          <Text
            style={styles.sectionTitle}
          >
            Your Order
          </Text>

          {Object.entries(
            order.items
          ).map(
            ([
              name,
              quantity,
            ]) => {
              const menuItem = getMenuItem(name);

              return (
                <View
                  key={name}
                  style={styles.itemRow}
                >
                  {menuItem?.image ? (
                    <Image
                      source={{ uri: menuItem.image }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.itemImagePlaceholder}>
                      <Text style={styles.itemImagePlaceholderText}>
                        🍽
                      </Text>
                    </View>
                  )}

                  <View style={styles.itemInfo}>
                    <Text
                      style={styles.itemName}
                      numberOfLines={2}
                    >
                      {name}
                    </Text>

                    <Text style={styles.itemQuantity}>
                      × {quantity}
                    </Text>
                  </View>

                  <Text style={styles.itemPrice}>
                    R{((menuItem?.price ?? 0) * quantity).toFixed(2)}
                  </Text>
                </View>
              );
            }
          )}

          <View
            style={styles.divider}
          />

          <View
            style={styles.detailRow}
          >
            <Text
              style={
                styles.detailLabel
              }
            >
              Items
            </Text>

            <Text
              style={
                styles.detailValue
              }
            >
              {getItemCount()}
            </Text>
          </View>

          <View
            style={styles.detailRow}
          >
            <Text
              style={
                styles.detailLabel
              }
            >
              Payment
            </Text>

            <Text
              style={
                styles.detailValue
              }
            >
              {order.paymentMethod}
            </Text>
          </View>

          <View
            style={styles.detailRow}
          >
            <Text
              style={styles.totalLabel}
            >
              Total
            </Text>

            <Text
              style={styles.totalValue}
            >
              R{order.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* ROUTE INFORMATION */}

        <View
          style={styles.routeCard}
        >
          <View
            style={styles.routeRow}
          >
            <View
              style={
                styles.routeIcon
              }
            >
              <Text
                style={
                  styles.routeIconText
                }
              >
                📍
              </Text>
            </View>

            <View
              style={
                styles.routeTextContainer
              }
            >
              <Text
                style={
                  styles.routeLabel
                }
              >
                PICKUP
              </Text>

              <Text
                style={
                  styles.routeValue
                }
              >
                Christoffel Restaurant
              </Text>
            </View>
          </View>

          <View
            style={
              styles.routeConnector
            }
          />

          <View
            style={styles.routeRow}
          >
            <View
              style={
                styles.routeIcon
              }
            >
              <Text
                style={
                  styles.routeIconText
                }
              >
                🏠
              </Text>
            </View>

            <View
              style={
                styles.routeTextContainer
              }
            >
              <Text
                style={
                  styles.routeLabel
                }
              >
                DESTINATION
              </Text>

              <Text
                style={
                  styles.routeValue
                }
              >
                Customer Delivery Location
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={
            styles.backHomeButton
          }
          onPress={onBack}
        >
          <Text
            style={
              styles.backHomeText
            }
          >
            Back
          </Text>
        </TouchableOpacity>
      </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    /*
    |--------------------------------------------------------------------------
    | MAIN
    |--------------------------------------------------------------------------
    */

    container: {
      flex: 1,
      backgroundColor: '#080807',
    },

    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(5, 12, 8, 0.78)',
    },

    header: {
      height: 112,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      borderBottomWidth: 0,
      backgroundColor: 'transparent',
    },

    backButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1.5,
      borderColor: '#D4AF37',
      backgroundColor: 'rgba(5, 10, 7, 0.72)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    back: {
      color: '#D4AF37',
      fontSize: 38,
      fontWeight: '300',
      marginTop: -4,
    },

    headerTitle: {
      flex: 1,
      alignItems: 'center',
    },

    title: {
      color: '#F5F1E8',
      fontFamily: 'serif',
      fontSize: 32,
      fontWeight: '400',
      letterSpacing: 0.3,
    },

    subtitle: {
      color: '#D4AF37',
      fontSize: 12,
      letterSpacing: 2,
      marginTop: 4,
    },

    headerSpace: {
      width: 48,
      height: 48,
    },

    scroll: {
      flex: 1,
    },

    scrollContent: {
      paddingHorizontal: 18,
      paddingTop: 6,
      paddingBottom: 30,
    },

    /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

    statusCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      padding: 22,
      alignItems: 'center',
      marginBottom: 14,
    },

    statusIcon: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor:
        '#D4AF37',
      alignItems: 'center',
      justifyContent:
        'center',
      marginBottom: 14,
    },

    statusIconText: {
      fontSize: 28,
    },

    statusTitle: {
      color: '#D4AF37',
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },

    statusDescription: {
      color: '#B5B0A4',
      fontSize: 12,
      lineHeight: 19,
      textAlign: 'center',
      marginTop: 8,
      maxWidth: 280,
    },

    /*
    |--------------------------------------------------------------------------
    | MAP
    |--------------------------------------------------------------------------
    */

    mapCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      overflow: 'hidden',
      marginBottom: 14,
    },

    mapHeader: {
      paddingHorizontal: 17,
      paddingTop: 16,
      paddingBottom: 13,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
    },

    mapTitle: {
      color: '#D4AF37',
      fontSize: 15,
      fontWeight: '500',
    },

    mapSubtitle: {
      color: '#8E918D',
      fontSize: 11,
      marginTop: 4,
    },

    liveBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor:
        '#6B5A2B',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 6,
      backgroundColor:
        '#0D0D0C',
    },

    liveDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor:
        '#D4AF37',
      marginRight: 6,
    },

    liveText: {
      color: '#D4AF37',
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 1,
    },

    mapContainer: {
      width: '100%',
      height: 275,
      backgroundColor:
        '#0C0C0B',
    },

    map: {
      width: '100%',
      height: 275,
      backgroundColor:
        '#0C0C0B',
    },

    mapLegend: {
      flexDirection: 'row',
      justifyContent:
        'space-around',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      backgroundColor:
        '#0C0C0B',
      borderTopWidth: 1,
      borderTopColor:
        '#27241B',
    },

    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    legendRestaurant: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor:
        '#D4AF37',
      marginRight: 5,
    },

    legendDriver: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor:
        '#222222',
      borderWidth: 2,
      borderColor:
        '#D4AF37',
      marginRight: 5,
    },

    legendCustomer: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor:
        '#E8E5DD',
      marginRight: 5,
    },

    legendText: {
      color: '#B5B0A4',
      fontSize: 9,
    },

    /*
    |--------------------------------------------------------------------------
    | MAP MARKERS
    |--------------------------------------------------------------------------
    */

    restaurantMarker: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor:
        '#D4AF37',
      borderWidth: 3,
      borderColor:
        '#FFF4CC',
      alignItems: 'center',
      justifyContent:
        'center',
      elevation: 6,
      shadowColor:
        '#000000',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },

    markerEmoji: {
      fontSize: 20,
    },

    driverMarker: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor:
        '#0C0C0B',
      borderWidth: 3,
      borderColor:
        '#D4AF37',
      alignItems: 'center',
      justifyContent:
        'center',
      elevation: 8,
      shadowColor:
        '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },

    driverEmoji: {
      fontSize: 22,
    },

    customerMarker: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor:
        '#E8E5DD',
      borderWidth: 3,
      borderColor:
        '#D4AF37',
      alignItems: 'center',
      justifyContent:
        'center',
      elevation: 6,
      shadowColor:
        '#000000',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },

    customerEmoji: {
      fontSize: 19,
    },

    /*
    |--------------------------------------------------------------------------
    | DRIVER CARD
    |--------------------------------------------------------------------------
    */

    driverCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      padding: 18,
      marginBottom: 14,
    },

    driverCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
      marginBottom: 14,
    },

    driverSectionTitle: {
      color: '#D4AF37',
      fontSize: 16,
      fontWeight: '500',
    },

    driverStatus: {
      color: '#B5B0A4',
      fontSize: 11,
      marginTop: 4,
    },

    driverProgressBadge: {
      minWidth: 48,
      paddingHorizontal: 9,
      paddingVertical: 7,
      borderRadius: 15,
      backgroundColor:
        '#0D0D0C',
      borderWidth: 1,
      borderColor:
        '#5A512D',
      alignItems: 'center',
    },

    driverProgressText: {
      color: '#D4AF37',
      fontSize: 11,
      fontWeight: '600',
    },

    driverDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    driverAvatar: {
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor:
        '#252525',
      borderWidth: 1,
      borderColor:
        '#6A5C30',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    driverAvatarText: {
      fontSize: 26,
    },

    driverInfo: {
      flex: 1,
      marginLeft: 13,
    },

    driverName: {
      color: '#E8E5DD',
      fontSize: 15,
      fontWeight: '600',
    },

    driverVehicle: {
      color: '#B5B0A4',
      fontSize: 11,
      marginTop: 4,
    },

    driverRegistration: {
      color: '#817D72',
      fontSize: 10,
      marginTop: 2,
    },

    driverCarIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor:
        '#0D0D0C',
      borderWidth: 1,
      borderColor:
        '#5A512D',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    carEmoji: {
      fontSize: 20,
    },

    /*
    |--------------------------------------------------------------------------
    | PROGRESS
    |--------------------------------------------------------------------------
    */

    progressCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      padding: 18,
      marginBottom: 14,
    },

    sectionTitle: {
      color: '#D4AF37',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 14,
    },

    stageRow: {
      flexDirection: 'row',
      minHeight: 72,
    },

    timeline: {
      width: 46,
      alignItems: 'center',
    },

    stageCircle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor:
        '#0D0D0C',
      borderWidth: 1,
      borderColor:
        '#3A3A36',
      alignItems: 'center',
      justifyContent:
        'center',
      zIndex: 2,
    },

    completedCircle: {
      backgroundColor:
        '#D4AF37',
      borderColor:
        '#D4AF37',
    },

    activeCircle: {
      backgroundColor:
        '#D4AF37',
      borderColor:
        '#D4AF37',
    },

    stageIcon: {
      fontSize: 13,
      color: '#817D72',
    },

    completedIcon: {
      color: '#0D0D0C',
      fontSize: 15,
      fontWeight: '600',
    },

    activeIcon: {
      color: '#0D0D0C',
    },

    stageLine: {
      width: 2,
      flex: 1,
      backgroundColor:
        '#3A3A36',
      marginVertical: -1,
    },

    completedLine: {
      backgroundColor:
        '#D4AF37',
    },

    stageContent: {
      flex: 1,
      paddingLeft: 12,
      paddingTop: 1,
      paddingBottom: 13,
    },

    stageTitle: {
      color: '#817D72',
      fontSize: 14,
      fontWeight: '500',
    },

    activeStageTitle: {
      color: '#D4AF37',
    },

    completedStageTitle: {
      color: '#E8E5DD',
    },

    stageDescription: {
      color: '#817D72',
      fontSize: 11,
      lineHeight: 17,
      marginTop: 4,
    },

    /*
    |--------------------------------------------------------------------------
    | TIME
    |--------------------------------------------------------------------------
    */

    timeCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      padding: 18,
      alignItems: 'center',
      marginBottom: 14,
    },

    timeLabel: {
      color: '#B5B0A4',
      fontSize: 12,
    },

    countdownValue: {
      color: '#D4AF37',
      fontSize: 26,
      fontWeight: '500',
      marginTop: 6,
      marginBottom: 14,
    },

    timeValue: {
      color: '#D4AF37',
      fontSize: 23,
      fontWeight: '500',
      marginTop: 6,
    },

    timeSubtext: {
      color: '#817D72',
      fontSize: 10,
      marginTop: 5,
    },

    /*
    |--------------------------------------------------------------------------
    | ORDER DETAILS
    |--------------------------------------------------------------------------
    */

    orderCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      padding: 18,
      marginBottom: 14,
    },

    itemRow: {
      width: '100%',
      minHeight: 70,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(14, 22, 17, 0.82)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#3E3B27',
      padding: 7,
      marginBottom: 8,
    },

    itemImage: {
      width: 62,
      height: 56,
      borderRadius: 9,
    },

    itemImagePlaceholder: {
      width: 62,
      height: 56,
      borderRadius: 9,
      backgroundColor: '#0D0D0C',
      borderWidth: 1,
      borderColor: '#4A4022',
      alignItems: 'center',
      justifyContent: 'center',
    },

    itemImagePlaceholderText: {
      fontSize: 20,
    },

    itemInfo: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      minWidth: 0,
    },

    itemName: {
      color: '#F4F0E7',
      fontFamily: 'serif',
      fontSize: 15,
      lineHeight: 19,
    },

    itemQuantity: {
      color: '#99958A',
      fontFamily: 'serif',
      fontSize: 10,
      marginTop: 4,
    },

    itemPrice: {
      color: '#D4AF37',
      fontFamily: 'serif',
      fontSize: 14,
      fontWeight: '500',
      paddingRight: 6,
    },

    divider: {
      height: 1,
      backgroundColor:
        '#302C20',
      marginVertical: 8,
    },

    detailRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      marginTop: 9,
    },

    detailLabel: {
      color: '#B5B0A4',
      fontSize: 12,
    },

    detailValue: {
      color: '#E8E5DD',
      fontSize: 12,
    },

    totalLabel: {
      color: '#D4AF37',
      fontSize: 15,
      fontWeight: '500',
    },

    totalValue: {
      color: '#D4AF37',
      fontSize: 15,
      fontWeight: '500',
    },

    /*
    |--------------------------------------------------------------------------
    | ROUTE INFORMATION
    |--------------------------------------------------------------------------
    */

    routeCard: {
      backgroundColor:
        'rgba(8, 15, 11, 0.92)',
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        '#5A512D',
      padding: 18,
      marginBottom: 14,
    },

    routeRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    routeIcon: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor:
        '#0D0D0C',
      borderWidth: 1,
      borderColor:
        '#5A512D',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    routeIconText: {
      fontSize: 15,
    },

    routeTextContainer: {
      flex: 1,
      marginLeft: 12,
    },

    routeLabel: {
      color: '#817D72',
      fontSize: 9,
      fontWeight: '600',
      letterSpacing: 1,
    },

    routeValue: {
      color: '#E8E5DD',
      fontSize: 13,
      marginTop: 4,
    },

    routeConnector: {
      height: 24,
      width: 1,
      backgroundColor:
        '#51492B',
      marginLeft: 19,
      marginVertical: 2,
    },

    /*
    |--------------------------------------------------------------------------
    | BACK BUTTON
    |--------------------------------------------------------------------------
    */

    backHomeButton: {
      height: 56,
      backgroundColor: '#D4AF37',
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      marginBottom: 6,
    },

    backHomeText: {
      color: '#0D0D0C',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
  }); 