export type Course =
  | 'Starter'
  | 'Main Course'
  | 'Dessert'
  | 'Drink';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  image: string;
};

export const menuData: MenuItem[] = [
  // =========================
  // STARTERS
  // =========================

  {
    id: 'starter-1',
    name: 'Bruschetta',
    description:
      'Grilled bread with tomato, garlic, basil and olive oil.',
    course: 'Starter',
    price: 65,
    image:
      'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/imcvuxnh/7b5e71d4-0ebb-4a63-9bcd-69c279ec92b7.jpg',
  },

  {
    id: 'starter-2',
    name: 'Calamari',
    description:
      'Crispy fried calamari served with lemon aioli.',
    course: 'Starter',
    price: 75,
    image:
      'https://trattoriadonpietro.com/_next/image?dpl=dpl_36kyG3VdnP8TB1NutyV1fds3ERtE&q=75&url=%2Fimages%2Fhighlights%2Fcalamari-fritti.jpg&w=3840',
  },

  {
    id: 'starter-3',
    name: 'Tomato Soup',
    description:
      'Creamy tomato soup with fresh basil and a touch of cream.',
    course: 'Starter',
    price: 55,
    image:
      'https://homesteadspoon.com/assets/images/1771278672200-vpe5lysq.webp',
  },

  {
    id: 'starter-4',
    name: 'Garlic Bread',
    description:
      'Toasted garlic bread with butter, herbs and parmesan.',
    course: 'Starter',
    price: 45,
    image:
      'https://petitagdal.com/cdn-cgi/image/fit%3Dcontain%2Cwidth%3D768%2Cquality%3D80%2Cformat%3Dauto/assets/images/1768429073877-53pqhvul.webp',
  },

  {
    id: 'starter-5',
    name: 'Chicken Wings',
    description:
      'Crispy chicken wings tossed in our signature sauce.',
    course: 'Starter',
    price: 85,
    image:
      'https://assets.slerp.com/uploads/images/variant/7262ac5b-3994-420d-b6b0-330e3743d4f8/7262ac5b-3994-420d-b6b0-330e3743d4f8__DSC4762-663f99dd74a3e159163a9572.jpg_standard.jpg?v=63943545891',
  },

  {
    id: 'starter-6',
    name: 'Spring Rolls',
    description:
      'Golden vegetable spring rolls served with sweet chilli sauce.',
    course: 'Starter',
    price: 60,
    image:
      'https://hips.hearstapps.com/hmg-prod/images/spring-rolls-delish2-1626710495.jpg?crop=0.668xw%3A1.00xh%3B0.0785xw%2C0&resize=1200%3A%2A',
  },

  {
    id: 'starter-7',
    name: 'Greek Salad',
    description:
      'Fresh lettuce, tomato, cucumber, olives and feta cheese.',
    course: 'Starter',
    price: 70,
    image:
      'https://www.infobae.com/resizer/v2/5ACSFOQD5BAQTC3QERNDNSCTGY.png?auth=ceb69e4d40accb064c9955741e3d6c33d7f20c029230a7ac2ea606a36d75cf3e&height=1200&quality=85&smart=true&width=1200',
  },

  {
    id: 'starter-8',
    name: 'Prawn Cocktail',
    description:
      'Succulent prawns served with crisp lettuce and cocktail sauce.',
    course: 'Starter',
    price: 95,
    image:
      'https://mtlatable.mtl.org/files/mtlatable/styles/support_image_half/public/2025-09/website_JPG-61164.jpg?itok=A0lxia1i',
  },


  {
    id: 'starter-9',
    name: 'Mozzarella Caprese',
    description:
      'Fresh mozzarella, ripe tomato, basil and extra virgin olive oil.',
    course: 'Starter',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-10',
    name: 'Stuffed Mushrooms',
    description:
      'Roasted mushrooms filled with herbs, garlic, parmesan and breadcrumbs.',
    course: 'Starter',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-11',
    name: 'Beef Carpaccio',
    description:
      'Thinly sliced beef with parmesan, rocket, olive oil and cracked pepper.',
    course: 'Starter',
    price: 110,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-12',
    name: 'Creamy Mushroom Soup',
    description:
      'Velvety mushroom soup finished with herbs and a touch of cream.',
    course: 'Starter',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-13',
    name: 'Mozzarella Sticks',
    description:
      'Golden crumbed mozzarella served with a rich tomato dipping sauce.',
    course: 'Starter',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-14',
    name: 'Loaded Potato Skins',
    description:
      'Crisp potato skins topped with cheese, herbs and crispy bacon.',
    course: 'Starter',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-15',
    name: 'Grilled Prawns',
    description:
      'Juicy prawns grilled with garlic, lemon, herbs and butter.',
    course: 'Starter',
    price: 105,
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'starter-16',
    name: 'Crispy Halloumi',
    description:
      'Golden halloumi served with fresh herbs, lemon and a sweet chilli glaze.',
    course: 'Starter',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  },

  // =========================
  // MAIN COURSES
  // =========================

  {
    id: 'main-1',
    name: 'Grilled Chicken',
    description:
      'Tender grilled chicken served with seasonal vegetables and a creamy sauce.',
    course: 'Main Course',
    price: 145,
    image:
      'https://assets.cntraveller.in/photos/694b89af7ff71c77e215345a/master/w_1600%2Cc_limit/RAD%2520menu2-3.jpg',
  },

  {
    id: 'main-2',
    name: 'Beef Steak',
    description:
      'Juicy grilled beef steak served with vegetables and your choice of side.',
    course: 'Main Course',
    price: 185,
    image:
      'https://static.spotapps.co/website_images/ab_websites/117549_website/slide_1.jpg',
  },

  {
    id: 'main-3',
    name: 'Pasta Alfredo',
    description:
      'Creamy fettuccine pasta with parmesan, garlic and rich Alfredo sauce.',
    course: 'Main Course',
    price: 125,
    image:
      'https://recetasdetiameche.com/wp-content/uploads/2024/07/pasta-fetuccini-alfredo-ricas-recetas.webp',
  },

  {
    id: 'main-4',
    name: 'Grilled Salmon',
    description:
      'Fresh grilled salmon served with vegetables and a light lemon butter sauce.',
    course: 'Main Course',
    price: 175,
    image:
      'https://cookingwithrachel.com/wp-content/uploads/2025/04/Grilled_Salmon_with_Lemon_Butter_Sauce__A_Classy_Dish_for_Dad_1.png',
  },

  {
    id: 'main-5',
    name: 'Chicken Burger',
    description:
      'Crispy chicken fillet with lettuce, tomato and our signature sauce.',
    course: 'Main Course',
    price: 110,
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2026/3/3/3a1b1f48-5bde-448d-8757-f74d65abb6b3_1336996.jpg',
  },

  {
    id: 'main-6',
    name: 'Lamb Chops',
    description:
      'Tender grilled lamb chops served with roasted vegetables and herbs.',
    course: 'Main Course',
    price: 195,
    image:
      'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill%2Cf_jpg%2Ch_511%2Cq_65%2Cw_639/v1/crm/sheboyganwi/Linos-2_A16E8AFE-D076-5A1E-236ACA03E7063775-a16e86afe6b636e_a16ea780-95ed-1248-80266c33dab24988.jpg',
  },

  {
    id: 'main-7',
    name: 'Chicken Curry',
    description:
      'Aromatic chicken curry cooked with herbs and spices, served with rice.',
    course: 'Main Course',
    price: 135,
    image:
      'https://www.zhujianger.com/chicken-curry-rice-embassy-bistro-guangzhou.jpg',
  },

  {
    id: 'main-8',
    name: 'Vegetable Risotto',
    description:
      'Creamy Italian risotto prepared with fresh seasonal vegetables and parmesan.',
    course: 'Main Course',
    price: 120,
    image:
      'https://www.arise-app.com/images/dishes/de/risotto-mit-gemuse-1symm7.webp',
  },


  {
    id: 'main-9',
    name: 'Charred Ribeye',
    description:
      'Fire-grilled ribeye with rosemary jus, roasted vegetables and crisp potatoes.',
    course: 'Main Course',
    price: 289,
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-10',
    name: 'Herb Roasted Chicken',
    description:
      'Golden roasted chicken, garden herbs, creamy mash and a rich pan jus.',
    course: 'Main Course',
    price: 219,
    image:
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-11',
    name: 'Creamy Truffle Pasta',
    description:
      'Silky pasta finished with wild mushrooms, parmesan and a touch of truffle.',
    course: 'Main Course',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-12',
    name: 'Atlantic Salmon',
    description:
      'Pan-seared salmon with lemon butter, seasonal greens and roasted potatoes.',
    course: 'Main Course',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-13',
    name: 'Slow Braised Beef',
    description:
      'Tender slow-braised beef with silky gravy, mash and seasonal vegetables.',
    course: 'Main Course',
    price: 259,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-14',
    name: 'Mediterranean Lamb',
    description:
      'Tender lamb with roasted peppers, herbs, warm grains and a fresh yoghurt dressing.',
    course: 'Main Course',
    price: 279,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-15',
    name: 'Grilled Prawn Bowl',
    description:
      'Charred prawns with fragrant rice, avocado, greens and citrus dressing.',
    course: 'Main Course',
    price: 239,
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'main-16',
    name: 'Wild Mushroom Risotto',
    description:
      'Slow-stirred arborio rice with wild mushrooms, parmesan and fresh herbs.',
    course: 'Main Course',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80',
  },

  // =========================
  // DESSERTS
  // =========================

  {
    id: 'dessert-1',
    name: 'Chocolate Cake',
    description:
      'Rich chocolate cake with a smooth chocolate frosting.',
    course: 'Dessert',
    price: 65,
    image:
      'https://images.squarespace-cdn.com/content/v1/53764fc2e4b02080802b4801/647f4b56-82aa-493e-8872-862f4b2b8731/LQ-6699.jpg',
  },

  {
    id: 'dessert-2',
    name: 'Cheesecake',
    description:
      'Creamy cheesecake with a delicious biscuit base.',
    course: 'Dessert',
    price: 65,
    image:
      'https://bucuresti.tavernasarbului.ro/wp-content/uploads/2024/01/cheesecake-min.jpg',
  },

  {
    id: 'dessert-3',
    name: 'Ice Cream',
    description:
      'Creamy vanilla ice cream served with chocolate sauce.',
    course: 'Dessert',
    price: 45,
    image:
      'https://www.metro.ca/userfiles/image/recipes/Sauce-pour-creme-glacee-Nescafe-vanille-cafe-amandes-34.jpg',
  },

  {
    id: 'dessert-4',
    name: 'Malva Pudding',
    description:
      'Warm traditional pudding served with creamy custard.',
    course: 'Dessert',
    price: 60,
    image:
      'https://chefsbox.co.za/wp-content/uploads/2025/07/CB-PUDDING.png',
  },

  {
    id: 'dessert-5',
    name: 'Brownie',
    description:
      'Warm chocolate brownie with a rich chocolate centre.',
    course: 'Dessert',
    price: 55,
    image:
      'https://resizer.otstatic.com/v2/photos/xlarge/1/82167228.jpg',
  },

  {
    id: 'dessert-6',
    name: 'Fruit Salad',
    description:
      'Fresh seasonal fruits served with a light cream.',
    course: 'Dessert',
    price: 50,
    image:
      'https://b.zmtcdn.com/data/pictures/chains/8/20945318/4d6decfd737b5f34a2afc064ba7ae9db.jpg?crop=750%3A500%3B%2A%2C%2A&fit=around%7C750%3A500',
  },

  {
    id: 'dessert-7',
    name: 'Tiramisu',
    description:
      'Classic Italian dessert with coffee, cream and cocoa.',
    course: 'Dessert',
    price: 70,
    image:
      'https://static.wixstatic.com/media/ffe35f_edbf4b9f48d940c4b39a436580cc572a~mv2.jpg/v1/fill/w_1024%2Ch_683%2Cq_90%2Cenc_avif%2Cquality_auto/ffe35f_edbf4b9f48d940c4b39a436580cc572a~mv2.jpg',
  },

  {
    id: 'dessert-8',
    name: 'Crème Brûlée',
    description:
      'Smooth vanilla custard topped with caramelised sugar.',
    course: 'Dessert',
    price: 75,
    image:
      'https://mrrecette.com/assets/images/1772841920019-7a3n2zd2.jpg',
  },

  {
    id: 'dessert-9',
    name: 'Sticky Toffee Pudding',
    description:
      'Warm date pudding with toffee sauce and creamy vanilla ice cream.',
    course: 'Dessert',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-10',
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a molten centre served with vanilla ice cream.',
    course: 'Dessert',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-11',
    name: 'Panna Cotta',
    description:
      'Silky vanilla panna cotta finished with seasonal berry compote.',
    course: 'Dessert',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-12',
    name: 'Apple Crumble',
    description:
      'Warm baked apples beneath a crisp cinnamon crumble with vanilla cream.',
    course: 'Dessert',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1568571780765-9276ac8b75a0?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-13',
    name: 'Lemon Tart',
    description:
      'Bright lemon curd tart with buttery pastry and a light cream finish.',
    course: 'Dessert',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-14',
    name: 'Red Velvet Cake',
    description:
      'Soft red velvet sponge layered with smooth cream cheese frosting.',
    course: 'Dessert',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-15',
    name: 'Chocolate Mousse',
    description:
      'Rich and airy dark chocolate mousse finished with chocolate shavings.',
    course: 'Dessert',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'dessert-16',
    name: 'Berry Pavlova',
    description:
      'Crisp meringue with soft centre, whipped cream and fresh berries.',
    course: 'Dessert',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=600&q=80',
  },

  // =========================
  // DRINKS
  // =========================

  // BEER

  {
    id: 'drink-1',
    name: 'Castle Lager',
    description:
      'Classic South African lager served chilled.',
    course: 'Drink',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-2',
    name: 'Heineken',
    description:
      'Premium lager with a crisp and refreshing finish.',
    course: 'Drink',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-3',
    name: 'Stella Artois',
    description:
      'Premium Belgian lager with a smooth, balanced taste.',
    course: 'Drink',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1695406091840-5b820df68db0?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-4',
    name: 'Corona',
    description:
      'Light and refreshing Mexican-style lager served chilled.',
    course: 'Drink',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  },

  // WINE

  {
    id: 'drink-5',
    name: 'Chardonnay',
    description:
      'Smooth white wine with fresh fruit notes and a clean finish.',
    course: 'Drink',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1757953474724-19b13fb2ebdc?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-6',
    name: 'Sauvignon Blanc',
    description:
      'Crisp white wine with bright citrus and fresh herbal notes.',
    course: 'Drink',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-7',
    name: 'Cabernet Sauvignon',
    description:
      'Full-bodied red wine with rich berry flavours and a smooth finish.',
    course: 'Drink',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-8',
    name: 'Merlot',
    description:
      'Soft and smooth red wine with ripe fruit and gentle oak notes.',
    course: 'Drink',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=600&q=80',
  },

  // COCKTAILS

  {
    id: 'drink-9',
    name: 'Mojito',
    description:
      'Refreshing cocktail with white rum, mint, lime and soda.',
    course: 'Drink',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-10',
    name: 'Margarita',
    description:
      'Classic tequila cocktail with fresh lime and a salted rim.',
    course: 'Drink',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-11',
    name: 'Cosmopolitan',
    description:
      'Elegant cocktail with vodka, cranberry, citrus and orange liqueur.',
    course: 'Drink',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-12',
    name: 'Piña Colada',
    description:
      'Tropical cocktail with rum, coconut cream and pineapple.',
    course: 'Drink',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1617728273800-1e615ab03037?auto=format&fit=crop&w=600&q=80',
  },

  // WHISKEY

  {
    id: 'drink-13',
    name: 'Jameson',
    description:
      'Smooth Irish whiskey with gentle spice, vanilla and oak notes.',
    course: 'Drink',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-14',
    name: "Jack Daniel's",
    description:
      'Tennessee whiskey with rich caramel, vanilla and oak flavours.',
    course: 'Drink',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-15',
    name: 'Johnnie Walker Black Label',
    description:
      'Rich blended Scotch whisky with layers of smoke, fruit and spice.',
    course: 'Drink',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-16',
    name: 'Chivas Regal',
    description:
      'Smooth blended Scotch whisky with honey, fruit and gentle oak.',
    course: 'Drink',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80',
  },

  // COGNAC

  {
    id: 'drink-17',
    name: 'Hennessy VS',
    description:
      'Classic cognac with rich fruit, oak and subtle spice notes.',
    course: 'Drink',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-18',
    name: 'Hennessy VSOP',
    description:
      'Refined cognac with warm spice, fruit and smooth oak character.',
    course: 'Drink',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-19',
    name: 'Rémy Martin VSOP',
    description:
      'Refined cognac with smooth fruit, vanilla and warm oak flavours.',
    course: 'Drink',
    price: 95,
    image:
      'https://images.unsplash.com/photo-1619451050621-83cb7aada2d7?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-20',
    name: 'Courvoisier VS',
    description:
      'Smooth French cognac with fruit, vanilla and delicate spice.',
    course: 'Drink',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
  },

  // WATER

  {
    id: 'drink-21',
    name: 'Still Water',
    description:
      'Pure still mineral water served chilled.',
    course: 'Drink',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-22',
    name: 'Sparkling Water',
    description:
      'Refreshing sparkling mineral water served chilled.',
    course: 'Drink',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-23',
    name: 'Flavoured Still Water',
    description:
      'Refreshing still water infused with natural fruit flavour.',
    course: 'Drink',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-24',
    name: 'Flavoured Sparkling Water',
    description:
      'Refreshing sparkling water with a light natural fruit flavour.',
    course: 'Drink',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=600&q=80',
  },

  // JUICE

  {
    id: 'drink-25',
    name: 'Orange Juice',
    description:
      'Fresh and naturally sweet orange juice served chilled.',
    course: 'Drink',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-26',
    name: 'Apple Juice',
    description:
      'Refreshing apple juice with a naturally sweet finish.',
    course: 'Drink',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-27',
    name: 'Pineapple Juice',
    description:
      'Tropical pineapple juice with a bright and refreshing taste.',
    course: 'Drink',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-28',
    name: 'Cranberry Juice',
    description:
      'Smooth cranberry juice with a refreshing sweet-tart flavour.',
    course: 'Drink',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
  },

  // MILKSHAKES

  {
    id: 'drink-29',
    name: 'Chocolate Milkshake',
    description:
      'Rich and creamy chocolate milkshake topped with whipped cream.',
    course: 'Drink',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-30',
    name: 'Vanilla Milkshake',
    description:
      'Classic creamy vanilla milkshake with a smooth finish.',
    course: 'Drink',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-31',
    name: 'Strawberry Milkshake',
    description:
      'Creamy strawberry milkshake made with sweet strawberry flavour.',
    course: 'Drink',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  },

  {
    id: 'drink-32',
    name: 'Oreo Milkshake',
    description:
      'Thick and creamy milkshake blended with crushed Oreo cookies.',
    course: 'Drink',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  },
];
