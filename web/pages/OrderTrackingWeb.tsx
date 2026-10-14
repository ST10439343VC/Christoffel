import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { MenuItem } from '../../data/menuData';

type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';

type Order = {
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

type Coordinate = { latitude: number; longitude: number };
type Driver = { name: string; vehicle: string; registration: string };

type Props = {
  order: Order | null;
  menuItems: MenuItem[];
  onBack: () => void;
  onHome: () => void;
};

const ROUTES: Coordinate[][] = [
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2024,longitude:28.0452},{latitude:-26.2035,longitude:28.0468},{latitude:-26.2044,longitude:28.0485},{latitude:-26.2058,longitude:28.0494},{latitude:-26.2072,longitude:28.0508},{latitude:-26.2087,longitude:28.0522},{latitude:-26.2100,longitude:28.0535},{latitude:-26.2115,longitude:28.0546}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2006,longitude:28.0448},{latitude:-26.1993,longitude:28.0465},{latitude:-26.1982,longitude:28.0482},{latitude:-26.1971,longitude:28.0500},{latitude:-26.1960,longitude:28.0517},{latitude:-26.1952,longitude:28.0536},{latitude:-26.1940,longitude:28.0552},{latitude:-26.1927,longitude:28.0566}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2030,longitude:28.0422},{latitude:-26.2047,longitude:28.0412},{latitude:-26.2064,longitude:28.0405},{latitude:-26.2081,longitude:28.0394},{latitude:-26.2098,longitude:28.0383},{latitude:-26.2114,longitude:28.0372},{latitude:-26.2128,longitude:28.0360},{latitude:-26.2142,longitude:28.0348}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2032,longitude:28.0440},{latitude:-26.2048,longitude:28.0445},{latitude:-26.2065,longitude:28.0454},{latitude:-26.2082,longitude:28.0465},{latitude:-26.2098,longitude:28.0478},{latitude:-26.2114,longitude:28.0492},{latitude:-26.2130,longitude:28.0507},{latitude:-26.2146,longitude:28.0520}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2008,longitude:28.0419},{latitude:-26.2000,longitude:28.0400},{latitude:-26.1992,longitude:28.0382},{latitude:-26.1984,longitude:28.0365},{latitude:-26.1973,longitude:28.0348},{latitude:-26.1960,longitude:28.0332},{latitude:-26.1947,longitude:28.0317},{latitude:-26.1934,longitude:28.0303}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2021,longitude:28.0457},{latitude:-26.2026,longitude:28.0478},{latitude:-26.2032,longitude:28.0498},{latitude:-26.2041,longitude:28.0518},{latitude:-26.2051,longitude:28.0537},{latitude:-26.2064,longitude:28.0554},{latitude:-26.2078,longitude:28.0570},{latitude:-26.2093,longitude:28.0584}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2002,longitude:28.0430},{latitude:-26.1985,longitude:28.0423},{latitude:-26.1968,longitude:28.0416},{latitude:-26.1952,longitude:28.0407},{latitude:-26.1936,longitude:28.0398},{latitude:-26.1921,longitude:28.0387},{latitude:-26.1907,longitude:28.0375},{latitude:-26.1894,longitude:28.0363}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2029,longitude:28.0460},{latitude:-26.2043,longitude:28.0484},{latitude:-26.2059,longitude:28.0506},{latitude:-26.2076,longitude:28.0528},{latitude:-26.2093,longitude:28.0549},{latitude:-26.2111,longitude:28.0568},{latitude:-26.2130,longitude:28.0585},{latitude:-26.2148,longitude:28.0600}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2007,longitude:28.0455},{latitude:-26.1995,longitude:28.0473},{latitude:-26.1980,longitude:28.0491},{latitude:-26.1964,longitude:28.0508},{latitude:-26.1948,longitude:28.0524},{latitude:-26.1932,longitude:28.0540},{latitude:-26.1917,longitude:28.0554},{latitude:-26.1902,longitude:28.0568}],
  [{latitude:-26.2018,longitude:28.0436},{latitude:-26.2035,longitude:28.0432},{latitude:-26.2052,longitude:28.0427},{latitude:-26.2070,longitude:28.0421},{latitude:-26.2088,longitude:28.0413},{latitude:-26.2106,longitude:28.0405},{latitude:-26.2124,longitude:28.0396},{latitude:-26.2141,longitude:28.0385},{latitude:-26.2158,longitude:28.0374}],
];

const DRIVERS: Driver[] = [
  {name:'Thabo M.',vehicle:'Toyota Corolla',registration:'CJ 42-19 GP'},
  {name:'Sipho N.',vehicle:'Volkswagen Polo',registration:'ND 81-27 GP'},
  {name:'Lerato K.',vehicle:'Toyota Starlet',registration:'CA 54-73 GP'},
  {name:'Mandla S.',vehicle:'Hyundai i20',registration:'GP 29-64 GP'},
  {name:'Siyabonga D.',vehicle:'Toyota Corolla',registration:'KZ 73-18 GP'},
  {name:'Ayanda M.',vehicle:'Volkswagen Polo',registration:'GP 46-92 GP'},
  {name:'Bongani Z.',vehicle:'Suzuki Swift',registration:'ND 35-61 GP'},
  {name:'Nokuthula P.',vehicle:'Toyota Starlet',registration:'CA 67-24 GP'},
  {name:'Sanele T.',vehicle:'Hyundai Grand i10',registration:'GP 58-43 GP'},
  {name:'Mthokozisi B.',vehicle:'Toyota Corolla',registration:'KZ 91-35 GP'},
];

const routeIndexFor = (id: string) => {
  const n = parseInt(id.replace(/\D/g,''),10);
  return Number.isNaN(n) ? 0 : (n - 1) % ROUTES.length;
};

const driverProgressFor = (status: OrderStatus, now: number, created: number, ready: number) => {
  if (status === 'received') return 0;
  if (status === 'completed') return 1;
  if (status === 'ready') return .7;
  const duration = ready - created;
  if (duration <= 0) return .3;
  return .15 + Math.max(0,Math.min(1,(now-created)/duration))*.4;
};

const createMapHtml = (route: Coordinate[], driver: Driver, progress: number) => {
  const points = route.map(p => [p.latitude,p.longitude]);
  const restaurant = route[0];
  const destination = route[route.length-1];

  return `<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<style>
html,body,#map{width:100%;height:100%;margin:0;background:#111110}
.leaflet-control-zoom a{background:#171717!important;color:#D4AF37!important;border-color:#51492B!important}
.leaflet-popup-content-wrapper{background:#171717;color:#E8E5DD;border:1px solid #51492B}
.leaflet-popup-tip{background:#171717}
.marker{display:flex;align-items:center;justify-content:center;border-radius:50%;box-shadow:0 3px 10px rgba(0,0,0,.45);font-size:20px}
.restaurant{width:42px;height:42px;background:#D4AF37;border:3px solid #FFF4CC}
.driver{width:46px;height:46px;background:#111110;border:3px solid #D4AF37}
.customer{width:42px;height:42px;background:#E8E5DD;border:3px solid #D4AF37}
</style></head><body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>
const inputRoute=${JSON.stringify(points)},restaurant=${JSON.stringify([restaurant.latitude,restaurant.longitude])},destination=${JSON.stringify([destination.latitude,destination.longitude])};
const driverName=${JSON.stringify(driver.name)},vehicle=${JSON.stringify(driver.vehicle)},registration=${JSON.stringify(driver.registration)},initialProgress=${progress};
const map=L.map('map',{zoomControl:true}).setView(restaurant,14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
let roadRoute=inputRoute,driverMarker=null,travelled=null,fullRoute=null;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function posAt(p){const s=clamp(p,0,1),x=s*(roadRoute.length-1),i=Math.floor(x);if(i>=roadRoute.length-1)return roadRoute[roadRoute.length-1];const q=x-i,a=roadRoute[i],b=roadRoute[i+1];return[a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q]}
const ri=L.divIcon({className:'',html:'<div class="marker restaurant">🍽</div>',iconSize:[48,48],iconAnchor:[24,24]});
const di=L.divIcon({className:'',html:'<div class="marker driver">🚗</div>',iconSize:[52,52],iconAnchor:[26,26]});
const ci=L.divIcon({className:'',html:'<div class="marker customer">🏠</div>',iconSize:[48,48],iconAnchor:[24,24]});
L.marker(restaurant,{icon:ri}).addTo(map).bindPopup('<b>Christoffel Restaurant</b><br>Restaurant');
L.marker(destination,{icon:ci}).addTo(map).bindPopup('<b>Delivery Location</b><br>Customer destination');
function draw(){if(fullRoute)map.removeLayer(fullRoute);if(travelled)map.removeLayer(travelled);fullRoute=L.polyline(roadRoute,{color:'#8A7A35',weight:4,opacity:.75}).addTo(map);travelled=L.polyline([],{color:'#D4AF37',weight:5}).addTo(map);map.fitBounds(fullRoute.getBounds(),{padding:[30,30]})}
function update(p){const s=clamp(p,0,1),position=posAt(s);if(!driverMarker)driverMarker=L.marker(position,{icon:di}).addTo(map).bindPopup('<b>'+driverName+'</b><br>'+vehicle+'<br>'+registration);else driverMarker.setLatLng(position);const c=Math.floor(s*(roadRoute.length-1)),arr=roadRoute.slice(0,c+1);arr.push(position);travelled.setLatLngs(arr)}
async function roads(){try{const c=inputRoute.map(p=>p[1]+','+p[0]).join(';');const r=await fetch('https://router.project-osrm.org/route/v1/driving/'+c+'?overview=full&geometries=geojson');const d=await r.json();if(d.code!=='Ok')throw Error('OSRM');roadRoute=d.routes[0].geometry.coordinates.map(p=>[p[1],p[0]]);draw();update(initialProgress)}catch(e){draw();update(initialProgress)}}
window.addEventListener('message',event=>{if(event.data?.type==='christoffel-map-progress')update(event.data.progress)});
draw();update(initialProgress);roads();
</script></body></html>`;
};

export default function OrderTrackingWeb({
  order,
  menuItems,
  onBack,
  onHome,
}: Props) {
  const [now, setNow] = useState(Date.now());
  const mapFrame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = window.setInterval(
      () => setNow(Date.now()),
      1000
    );

    return () => window.clearInterval(timer);
  }, []);

  if (!order) return <div style={S.page}><header style={S.header}><button style={S.logo} onClick={onHome}>CHRISTOFFEL</button><button style={S.nav} onClick={onHome}>HOME</button></header><main style={S.empty}><div style={S.eyebrow}>CHRISTOFFEL RESTAURANT</div><h1 style={S.h1}>NO ACTIVE ORDER</h1><button style={S.gold} onClick={onHome}>BACK TO HOME</button></main></div>;

  const ri = routeIndexFor(order.id);
  const route = ROUTES[ri];
  const driver = DRIVERS[ri];

  const progress = driverProgressFor(
    order.status,
    now,
    order.createdAt,
    order.estimatedReadyAt
  );
  const mapHtml = useMemo(
    () => createMapHtml(route, driver, progress),
    [route, driver]
  );

  useEffect(() => {
    mapFrame.current?.contentWindow?.postMessage(
      { type: 'christoffel-map-progress', progress },
      '*'
    );
  }, [progress]);

  const current =
    order.status === 'received'
      ? 0
      : order.status === 'preparing'
        ? 1
        : order.status === 'ready'
          ? 2
          : 3;
  const status=order.status==='received'?'Order Received':order.status==='preparing'?'Preparing Your Order':order.status==='ready'?'Ready for Collection':'Order Completed';
  const description=order.status==='received'?'Your order has been received by the restaurant.':order.status==='preparing'?'Chef Christoffel is currently preparing your meal.':order.status==='ready'?'Your meal is ready for collection.':'Your order has been completed. Enjoy your meal!';
  const driverStatus=order.status==='received'?'Driver waiting':order.status==='preparing'?'Driver en route':order.status==='ready'?'Driver nearby':'Delivered';
  const itemCount = Object.values(order.items).reduce(
    (a, b) => a + b,
    0
  );
  const remaining = order.estimatedReadyAt - now;
  const secs = Math.max(
    0,
    Math.ceil(remaining / 1000)
  );

  const mins = Math.floor(secs / 60);
  const countdown=remaining<=0?'Ready now':`${mins>0?mins+' min ':''}${String(secs%60).padStart(2,'0')} sec`;
  const stages=[['Order Received','Your order has been confirmed.','✓'],['Preparing','The chef is preparing your meal.','👨‍🍳'],['Ready for Collection','Your order is ready.','🍽'],['Completed','Order completed successfully.','✓']];

  return <div style={S.page}>
    <header style={S.header}>
      <button style={S.brand} onClick={onHome}>
        <span style={S.brandIcon}>♨</span>
        <span>
          <span style={S.brandName}>CHRISTOFFEL</span>
          <span style={S.brandMenu}><i style={S.brandLine}/>MENU<i style={S.brandLine}/></span>
        </span>
      </button>
      <nav style={S.navWrap}>
        <button style={S.nav} onClick={onHome}>HOME</button>
        <button style={S.nav} onClick={onBack}>ORDER HISTORY</button>
        <button style={S.nav} onClick={onHome}>CHRISTOFFEL</button>
      </nav>
    </header>
    <main style={S.container}>
      <div style={S.top}><button style={S.link} onClick={onBack}>← BACK</button><button style={S.linkMuted} onClick={onHome}>HOME</button></div>
      <section style={S.hero}><div><div style={S.eyebrow}>CHRISTOFFEL RESTAURANT</div><h1 style={S.h1}>TRACK YOUR ORDER</h1><p style={S.sub}>Order <b>{order.id}</b> • Route {ri+1}</p></div><div style={S.live}><span style={S.dot}/> LIVE ORDER</div></section>

      <section style={S.statusCard}><div style={S.statusIcon}>{order.status==='preparing'?'👨‍🍳':order.status==='ready'?'🍽':'✓'}</div><div><div style={S.eyebrow}>CURRENT STATUS</div><h2 style={S.h2}>{status}</h2><p style={S.sub}>{description}</p></div></section>

      <section style={S.panel}><div style={S.sectionHead}><div><div style={S.eyebrow}>LIVE DELIVERY</div><h2 style={S.h2}>ORDER MAP</h2><p style={S.muted}>Route {ri+1} • {driverStatus}</p></div><div style={S.badge}>{order.status==='completed'?'100%':Math.round(progress*100)+'%'}</div></div><iframe ref={mapFrame} title="Christoffel live order map" srcDoc={mapHtml} style={S.map}/><div style={S.legend}><span>🟡 Restaurant</span><span>⚫ Driver</span><span>⚪ Destination</span></div></section>

      <div style={S.grid}>
        <section style={S.panel}><div style={S.eyebrow}>YOUR DRIVER</div><h2 style={S.h2}>{driver.name}</h2><p style={S.goldText}>{driverStatus}</p><div style={S.driver}><div style={S.avatar}>👨🏽</div><div><b>{driver.vehicle}</b><p style={S.muted}>{driver.registration}</p></div><span style={S.car}>🚗</span></div></section>
        <section style={S.panel}><div style={S.eyebrow}>ESTIMATED READY TIME</div><div style={S.count}>{order.status==='completed'?'COMPLETED':order.status==='ready'?'READY NOW':countdown}</div><div style={S.muted}>Estimated Ready Time</div><div style={S.time}>{new Date(order.estimatedReadyAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div><div style={S.muted}>Based on your order time</div></section>
      </div>

      <section style={S.panel}><div style={S.eyebrow}>ORDER JOURNEY</div><h2 style={S.h2}>ORDER PROGRESS</h2><div style={{marginTop:24}}>{stages.map(([title,desc,icon],i)=><div key={title} style={S.stage}><div style={S.rail}><div style={{...S.circle,...(i<=current?S.activeCircle:{})}}>{i<current?'✓':icon}</div>{i<3&&<div style={{...S.line,...(i<current?S.activeLine:{})}}/>}</div><div><div style={{...S.stageTitle,...(i<=current?S.stageActive:{})}}>{title}</div><div style={S.muted}>{desc}</div></div></div>)}</div></section>

      <div style={S.grid}>
        <section style={S.panel}><div style={S.eyebrow}>ORDER DETAILS</div><h2 style={S.h2}>YOUR ORDER</h2>{Object.entries(order.items).map(([name,qty])=>{const item=menuItems.find(x=>x.name===name);return <div key={name} style={S.item}><div style={S.itemLeft}>{item?.image?<img src={item.image} alt={name} style={S.image}/>:<div style={S.imageFallback}>🍽</div>}<div><div>{name}</div><small style={S.muted}>× {qty}</small></div></div><b style={S.goldText}>R{((item?.price??0)*qty).toFixed(2)}</b></div>})}<div style={S.divider}/><div style={S.row}><span>Items</span><b>{itemCount}</b></div><div style={S.row}><span>Payment</span><b>{order.paymentMethod}</b></div><div style={S.row}><span>Order Time</span><b>{new Date(order.createdAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</b></div></section>

        <section style={S.panel}><div style={S.eyebrow}>PAYMENT SUMMARY</div><h2 style={S.h2}>ORDER TOTAL</h2><div style={S.row}><span>Subtotal</span><b>R{order.subtotal.toFixed(2)}</b></div><div style={S.row}><span>Service Fee</span><b>R{order.serviceFee.toFixed(2)}</b></div><div style={S.divider}/><div style={S.total}><span>TOTAL</span><b>R{order.total.toFixed(2)}</b></div><div style={S.route}><div>📍 <span><small>PICKUP</small><b>Christoffel Restaurant</b></span></div><div style={S.connector}/><div>🏠 <span><small>DESTINATION</small><b>Customer Delivery Location</b></span></div></div></section>
      </div>

      <div style={S.actions}><button style={S.outline} onClick={onBack}>← BACK</button><button style={S.gold} onClick={onHome}>BACK TO HOME</button></div>
    </main>
    <footer style={S.footer}><b>CHRISTOFFEL</b><span>RESTAURANT • ORDER • EXPERIENCE</span></footer>
  </div>;
}

const S: { [key: string]: React.CSSProperties } = {
  page: {
    width:'100vw',
    minWidth:'100vw',
    minHeight:'100vh',
    margin:0,
    padding:0,
    boxSizing:'border-box',
    backgroundImage:"url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85')",
    backgroundAttachment:'fixed',
    backgroundPosition:'center',
    backgroundSize:'cover',
    color:'#E8E5DD',
    fontFamily:'Arial,Helvetica,sans-serif',
    overflowX:'hidden',
  },
  header: {
    width:'100%',
    boxSizing:'border-box',
    minHeight:92,
    padding:'0 6%',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    background:'rgba(5,9,7,.94)',
    borderBottom:'1px solid rgba(212,175,55,.16)',
    position:'sticky',
    top:0,
    zIndex:20,
    backdropFilter:'blur(18px)',
  },
  brand: {
    display:'flex',
    alignItems:'center',
    gap:13,
    background:'none',
    border:0,
    color:'#F5F1E8',
    cursor:'pointer',
    padding:0,
    textAlign:'left',
  },
  brandIcon: {
    fontSize:28,
    color:'#D4AF37',
    lineHeight:1,
  },
  brandName: {
    display:'block',
    fontSize:22,
    fontWeight:700,
    letterSpacing:5,
    lineHeight:1,
    color:'#F5F1E8',
  },
  brandMenu: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:8,
    color:'#8F8D87',
    fontSize:8,
    letterSpacing:4,
    marginTop:7,
  },
  brandLine: {
    display:'inline-block',
    width:26,
    height:1,
    background:'#51492B',
  },
  navWrap: {
    display:'flex',
    alignItems:'center',
    gap:28,
  },
  nav: {
    background:'none',
    border:0,
    color:'#A9A69E',
    fontSize:10,
    letterSpacing:2.5,
    cursor:'pointer',
    padding:'12px 0',
  },
  container: {
    width:'88%',
    maxWidth:1280,
    margin:'0 auto',
    padding:'30px 0 90px',
    boxSizing:'border-box',
  },
  top: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:28,
  },
  link: {
    background:'none',
    border:0,
    color:'#D4AF37',
    cursor:'pointer',
    letterSpacing:2.5,
    fontSize:10,
    padding:0,
  },
  linkMuted: {
    background:'none',
    border:0,
    color:'#77746C',
    cursor:'pointer',
    letterSpacing:2.5,
    fontSize:10,
    padding:0,
  },
  hero: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'flex-end',
    gap:30,
    padding:'34px 0 38px',
    borderTop:'1px solid rgba(212,175,55,.10)',
    borderBottom:'1px solid rgba(212,175,55,.12)',
    marginBottom:22,
  },
  eyebrow: {
    color:'#D4AF37',
    fontSize:9,
    letterSpacing:3.2,
    marginBottom:11,
    fontWeight:600,
  },
  h1: {
    margin:0,
    fontSize:'clamp(38px,5.2vw,72px)',
    lineHeight:.95,
    letterSpacing:4,
    fontWeight:500,
  },
  h2: {
    margin:0,
    fontSize:25,
    letterSpacing:1.8,
    fontWeight:500,
  },
  sub: {
    color:'#A9A69E',
    margin:'9px 0 0',
    fontSize:13,
    lineHeight:1.6,
  },
  live: {
    border:'1px solid rgba(212,175,55,.34)',
    background:'rgba(212,175,55,.035)',
    padding:'11px 15px',
    color:'#D4AF37',
    letterSpacing:2.2,
    fontSize:9,
    display:'flex',
    alignItems:'center',
    gap:8,
    whiteSpace:'nowrap',
  },
  dot: {
    width:7,
    height:7,
    borderRadius:'50%',
    background:'#D4AF37',
    boxShadow:'0 0 10px rgba(212,175,55,.7)',
  },
  statusCard: {
    display:'flex',
    gap:20,
    alignItems:'center',
    padding:'25px 28px',
    marginBottom:24,
    background:'linear-gradient(110deg,rgba(20,27,22,.86),rgba(10,15,12,.78))',
    border:'1px solid rgba(212,175,55,.16)',
    boxShadow:'0 18px 50px rgba(0,0,0,.18)',
  },
  statusIcon: {
    width:58,
    height:58,
    borderRadius:'50%',
    display:'grid',
    placeItems:'center',
    background:'#D4AF37',
    color:'#080B09',
    fontSize:24,
    flexShrink:0,
    boxShadow:'0 0 0 7px rgba(212,175,55,.07)',
  },
  panel: {
    background:'linear-gradient(145deg,rgba(17,24,19,.86),rgba(9,14,11,.82))',
    border:'1px solid rgba(212,175,55,.14)',
    padding:28,
    marginBottom:24,
    boxShadow:'0 18px 55px rgba(0,0,0,.16)',
  },
  sectionHead: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:18,
  },
  badge: {
    color:'#D4AF37',
    border:'1px solid rgba(212,175,55,.32)',
    background:'rgba(212,175,55,.035)',
    padding:'9px 13px',
    fontSize:11,
    letterSpacing:1.5,
  },
  map: {
    width:'100%',
    height:470,
    border:'1px solid rgba(212,175,55,.10)',
    display:'block',
    background:'#111110',
  },
  legend: {
    display:'flex',
    gap:26,
    flexWrap:'wrap',
    paddingTop:15,
    color:'#8F8D87',
    fontSize:10,
    letterSpacing:1,
  },
  grid: {
    display:'grid',
    gridTemplateColumns:'repeat(2,minmax(0,1fr))',
    gap:24,
  },
  goldText: {
    color:'#D4AF37',
  },
  driver: {
    display:'flex',
    alignItems:'center',
    gap:16,
    borderTop:'1px solid rgba(212,175,55,.12)',
    paddingTop:18,
    marginTop:18,
  },
  avatar: {
    width:54,
    height:54,
    borderRadius:'50%',
    display:'grid',
    placeItems:'center',
    background:'linear-gradient(145deg,#263128,#141B16)',
    border:'1px solid rgba(212,175,55,.16)',
    fontSize:24,
  },
  car: {
    marginLeft:'auto',
    fontSize:27,
    opacity:.9,
  },
  count: {
    color:'#D4AF37',
    fontSize:40,
    fontWeight:500,
    letterSpacing:1,
    margin:'14px 0 20px',
  },
  time: {
    fontSize:18,
    letterSpacing:1,
    margin:'5px 0 3px',
    color:'#E8E5DD',
  },
  muted: {
    color:'#8F8D87',
    fontSize:11,
    lineHeight:1.65,
  },
  stage: {
    display:'grid',
    gridTemplateColumns:'52px 1fr',
    gap:16,
    minHeight:82,
  },
  rail: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  circle: {
    width:38,
    height:38,
    borderRadius:'50%',
    border:'1px solid #51492B',
    display:'grid',
    placeItems:'center',
    color:'#6F6B60',
    background:'#0B100D',
    zIndex:2,
  },
  activeCircle: {
    background:'#D4AF37',
    borderColor:'#D4AF37',
    color:'#080B09',
    boxShadow:'0 0 0 5px rgba(212,175,55,.06)',
  },
  line: {
    width:1,
    flex:1,
    background:'#302C20',
  },
  activeLine: {
    background:'#D4AF37',
  },
  stageTitle: {
    paddingTop:8,
    color:'#77746C',
    fontSize:14,
    marginBottom:5,
    letterSpacing:.4,
  },
  stageActive: {
    color:'#E8E5DD',
  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    gap:15,
    padding:'13px 0',
    borderBottom:'1px solid rgba(212,175,55,.08)',
  },
  itemLeft: {
    display:'flex',
    alignItems:'center',
    gap:12,
    minWidth:0,
  },
  image: {
    width:56,
    height:56,
    objectFit:'cover',
    borderRadius:2,
    border:'1px solid rgba(212,175,55,.10)',
  },
  imageFallback: {
    width:56,
    height:56,
    display:'grid',
    placeItems:'center',
    background:'#1C241E',
    fontSize:22,
    border:'1px solid rgba(212,175,55,.10)',
  },
  divider: {
    height:1,
    background:'rgba(212,175,55,.15)',
    margin:'19px 0',
  },
  row: {
    display:'flex',
    justifyContent:'space-between',
    padding:'8px 0',
    color:'#9E9B92',
    fontSize:12,
  },
  total: {
    display:'flex',
    justifyContent:'space-between',
    fontSize:17,
    letterSpacing:1,
    color:'#E8E5DD',
    fontWeight:600,
  },
  route: {
    marginTop:24,
    paddingTop:20,
    borderTop:'1px solid rgba(212,175,55,.12)',
  },
  connector: {
    width:1,
    height:24,
    background:'#51492B',
    margin:'3px 0 3px 8px',
  },
  actions: {
    display:'flex',
    justifyContent:'center',
    gap:12,
    paddingTop:12,
  },
  outline: {
    padding:'14px 26px',
    background:'transparent',
    border:'1px solid rgba(212,175,55,.35)',
    color:'#D4AF37',
    cursor:'pointer',
    letterSpacing:2,
    fontSize:10,
  },
  gold: {
    padding:'14px 26px',
    background:'#D4AF37',
    border:'1px solid #D4AF37',
    color:'#080B09',
    cursor:'pointer',
    letterSpacing:2,
    fontSize:10,
    fontWeight:700,
  },
  footer: {
    width:'100%',
    boxSizing:'border-box',
    borderTop:'1px solid rgba(212,175,55,.14)',
    padding:'34px 6%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    color:'#77746C',
    fontSize:9,
    letterSpacing:2.2,
  },
  empty: {
    minHeight:'70vh',
    display:'grid',
    placeItems:'center',
    alignContent:'center',
    textAlign:'center',
    padding:30,
  },
};
