import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
const products = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 38900,
    old: 59900,
    rating: 4.8,
    reviews: 231,
    tag: 'FLASH DEAL',
    emoji: '🎧',
    bg: 'lavender',
  },
  {
    id: 2,
    name: 'Everyday Mini Crossbody Bag',
    category: 'Fashion',
    price: 12500,
    old: 18000,
    rating: 4.7,
    reviews: 184,
    tag: 'BEST SELLER',
    emoji: '👜',
    bg: 'peach',
  },
  {
    id: 3,
    name: 'Smart Fitness Watch Series 8',
    category: 'Electronics',
    price: 27900,
    old: 42000,
    rating: 4.6,
    reviews: 319,
    tag: '-34%',
    emoji: '⌚',
    bg: 'mint',
  },
  {
    id: 4,
    name: 'Minimal Ceramic Table Lamp',
    category: 'Home',
    price: 18900,
    old: 26500,
    rating: 4.9,
    reviews: 96,
    tag: 'TRENDING',
    emoji: '💡',
    bg: 'cream',
  },
  {
    id: 5,
    name: 'Premium Running Sneakers',
    category: 'Fashion',
    price: 24500,
    old: 35000,
    rating: 4.7,
    reviews: 408,
    tag: 'HOT PICK',
    emoji: '👟',
    bg: 'blue',
  },
  {
    id: 6,
    name: 'Hydrating Skincare Gift Set',
    category: 'Beauty',
    price: 9800,
    old: 14500,
    rating: 4.8,
    reviews: 147,
    tag: 'SAVE 32%',
    emoji: '🧴',
    bg: 'pink',
  },
  {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 15800,
    old: 22900,
    rating: 4.5,
    reviews: 202,
    tag: 'FLASH DEAL',
    emoji: '🔊',
    bg: 'yellow',
  },
  {
    id: 8,
    name: 'Soft Knit Throw Blanket',
    category: 'Home',
    price: 13900,
    old: 19900,
    rating: 4.8,
    reviews: 121,
    tag: 'COZY PICK',
    emoji: '🧶',
    bg: 'sand',
  },
];
const money = n => '₦' + n.toLocaleString('en-NG');
export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState({});
  const [saved, setSaved] = useState([]);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [notice, setNotice] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const visible = useMemo(
    () =>
      products
        .filter(
          p =>
            (category === 'All' || p.category === category) &&
            (!onlyDeals || p.old > p.price) &&
            p.name.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) =>
          sort === 'low'
            ? a.price - b.price
            : sort === 'high'
              ? b.price - a.price
              : sort === 'rating'
                ? b.rating - a.rating
                : a.id - b.id
        ),
    [category, query, sort, onlyDeals]
  );
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce(
    (sum, p) => sum + p.price * (cart[p.id] || 0),
    0
  );
  const add = p => {
    setCart(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    setNotice(p.name + ' added to your demo cart.');
  };
  return (
    <div className="shop">
      <div className="shop-top">
        <div className="shop-wrap top-inner">
          <span>✨ BIG SAVINGS, LITTLE PRICES</span>
          <span>
            Free delivery on demo orders over ₦50,000 <b>→</b>
          </span>
          <span>Help centre　 Track order</span>
        </div>
      </div>
      <header className="shop-header shop-wrap">
        <button
          className="shop-hamb"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle categories"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <a className="shop-logo" href="#home">
          <span>o</span> orbita<small>MARKETPLACE</small>
        </a>
        <label className="shop-search">
          <Search size={18} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
          />
          <button
            onClick={() =>
              document
                .getElementById('products')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Search
          </button>
        </label>
        <div className="shop-actions">
          <button
            onClick={() => setNotice('Sign-in is not enabled in this demo.')}
          >
            <span>♙</span>
            <small>Hello, shopper</small>
            <b>Account</b>
          </button>
          <button
            onClick={() =>
              setNotice(saved.length + ' products saved to your demo wishlist.')
            }
          >
            <Heart size={19} />
            <small>My</small>
            <b>Wishlist</b>
          </button>
          <button
            className="cart-trigger"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart size={20} />
            <i>{count}</i>
            <small>My</small>
            <b>Cart</b>
          </button>
        </div>
      </header>
      <nav
        className={
          mobileMenu ? 'shop-cats shop-wrap cats-open' : 'shop-cats shop-wrap'
        }
      >
        {['All', 'Electronics', 'Fashion', 'Home', 'Beauty'].map(c => (
          <button
            key={c}
            className={category === c ? 'cat-active' : ''}
            onClick={() => {
              setCategory(c);
              setMobileMenu(false);
              document
                .getElementById('products')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {c}
          </button>
        ))}
        <span>
          Flash deals <b>↗</b>
        </span>
      </nav>
      <section className="shop-hero shop-wrap" id="home">
        <div className="hero-copy-shop">
          <div className="shop-pill">THE MID-MONTH EDIT</div>
          <h1>
            Good finds.
            <br />
            <em>Better prices.</em>
          </h1>
          <p>
            Your next favourite thing is closer than you think. Explore
            hand-picked deals across tech, style and home.
          </p>
          <button
            onClick={() =>
              document
                .getElementById('products')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Shop the deals <ArrowRight size={17} />
          </button>
          <div className="hero-shop-trust">
            <span>
              <Check size={13} /> Great-value finds
            </span>
            <span>
              <Check size={13} /> Easy browsing
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-orbit orbit-one"></div>
          <div className="art-orbit orbit-two"></div>
          <div className="art-product product-headphones">🎧</div>
          <div className="art-product product-bag">👜</div>
          <div className="art-product product-watch">⌚</div>
          <div className="floating-deal">
            <small>WEEKLY DEAL</small>
            <b>
              UP TO <em>40%</em>
              <br />
              OFF*
            </b>
            <span>*Illustrative prices</span>
          </div>
          <div className="art-sticker">
            FIND
            <br />
            YOUR
            <br />
            THING ✦
          </div>
        </div>
      </section>
      <div className="shop-wrap benefit-row">
        <div>
          <span>🚚</span>
          <p>
            <b>Delivery options</b>
            <small>See demo delivery details</small>
          </p>
        </div>
        <div>
          <span>🔒</span>
          <p>
            <b>Safe shopping concept</b>
            <small>Demo checkout only</small>
          </p>
        </div>
        <div>
          <span>💬</span>
          <p>
            <b>Here to help</b>
            <small>Friendly support design</small>
          </p>
        </div>
        <div>
          <span>↩</span>
          <p>
            <b>Easy returns</b>
            <small>Sample store policy</small>
          </p>
        </div>
      </div>
      <section className="shop-wrap product-section" id="products">
        <div className="products-heading">
          <div>
            <div className="shop-overline">A LITTLE SOMETHING FOR EVERYONE</div>
            <h2>
              Today’s <em>top picks</em>
            </h2>
            <p>Good stuff. Good prices. Go on, have a look.</p>
          </div>
          <button
            className="view-all"
            onClick={() => {
              setCategory('All');
              setOnlyDeals(false);
              setQuery('');
            }}
          >
            View all products <ArrowRight size={15} />
          </button>
        </div>
        <div className="shop-toolbar">
          <div className="category-chips">
            {['All', 'Electronics', 'Fashion', 'Home', 'Beauty'].map(c => (
              <button
                key={c}
                className={category === c ? 'chip-active' : ''}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="sort-tools">
            <button
              className={onlyDeals ? 'deals-on' : ''}
              onClick={() => setOnlyDeals(!onlyDeals)}
            >
              <SlidersHorizontal size={14} /> Deals only
            </button>
            <label>
              Sort by{' '}
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
        </div>
        <div className="product-grid">
          {visible.map(p => (
            <article className="product-card" key={p.id}>
              <div className={'product-visual ' + p.bg}>
                <span className="product-tag">{p.tag}</span>
                <button
                  className={saved.includes(p.id) ? 'heart saved' : 'heart'}
                  aria-label="Save product"
                  onClick={() =>
                    setSaved(s =>
                      s.includes(p.id)
                        ? s.filter(id => id !== p.id)
                        : [...s, p.id]
                    )
                  }
                >
                  <Heart
                    size={17}
                    fill={saved.includes(p.id) ? 'currentColor' : 'none'}
                  />
                </button>
                <span className="product-emoji">{p.emoji}</span>
                <span
                  className="quick-view"
                  onClick={() =>
                    setNotice(
                      p.name +
                        ' — ' +
                        money(p.price) +
                        '. Product details are illustrative.'
                    )
                  }
                >
                  Quick view ↗
                </span>
              </div>
              <div className="product-details">
                <small className="product-category">{p.category}</small>
                <h3>{p.name}</h3>
                <div className="rating">
                  <span>★</span> {p.rating} <small>({p.reviews})</small>
                </div>
                <div className="price-row">
                  <b>{money(p.price)}</b>
                  <del>{money(p.old)}</del>
                  <span>{Math.round((1 - p.price / p.old) * 100)}% off</span>
                </div>
                <button className="add-cart" onClick={() => add(p)}>
                  <ShoppingCart size={15} /> Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="shop-empty">
            No products found. Try another search or category.
          </div>
        )}
      </section>
      <section className="newsletter">
        <div className="shop-wrap newsletter-inner">
          <div>
            <span className="shop-overline">GOOD DEALS IN YOUR INBOX</span>
            <h2>
              A little treat for your <em>inbox.</em>
            </h2>
            <p>
              Get product drops, seasonal edits and offers worth a second look.
            </p>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              setNotice(
                'You’re on the demo newsletter list. No email was sent.'
              );
            }}
          >
            <input type="email" placeholder="Your email address" required />
            <button>
              Count me in <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </section>
      <footer className="shop-footer">
        <div className="shop-wrap footer-shop">
          <a className="shop-logo" href="#home">
            <span>o</span> orbita<small>MARKETPLACE</small>
          </a>
          <p>
            Everyday discoveries.
            <br />A brighter way to shop.
          </p>
          <div>
            <b>SHOP</b>
            <a href="#products">All products</a>
            <a href="#products">Flash deals</a>
            <a href="#products">New arrivals</a>
          </div>
          <div>
            <b>HELP & INFO</b>
            <a href="#help">Delivery info</a>
            <a href="#help">Returns policy</a>
            <a href="#help">Contact support</a>
          </div>
          <div>
            <b>DEMO STORE</b>
            <span>Sample product listings</span>
            <span>No live payments</span>
            <span>Prices in Nigerian Naira</span>
          </div>
        </div>
        <div className="shop-wrap shop-legal" id="help">
          <span>© 2026 Orbita Marketplace · Demo concept</span>
          <span>All products, prices and offers are illustrative.</span>
        </div>
      </footer>
      {cartOpen && (
        <div
          className="cart-drawer-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-heading">
              <h3>
                Your cart <span>({count})</span>
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X />
              </button>
            </div>
            {count === 0 ? (
              <div className="drawer-empty">
                <ShoppingCart size={32} />
                <b>Your cart is taking a little break.</b>
                <p>Add a few finds and they’ll show up here.</p>
              </div>
            ) : (
              <>
                <div className="drawer-items">
                  {products
                    .filter(p => cart[p.id])
                    .map(p => (
                      <div className="drawer-item" key={p.id}>
                        <span className={'drawer-emoji ' + p.bg}>
                          {p.emoji}
                        </span>
                        <div>
                          <b>{p.name}</b>
                          <small>
                            {money(p.price)} × {cart[p.id]}
                          </small>
                          <div className="drawer-qty">
                            <button
                              onClick={() =>
                                setCart(c => ({
                                  ...c,
                                  [p.id]: Math.max(0, c[p.id] - 1),
                                }))
                              }
                            >
                              −
                            </button>
                            <span>{cart[p.id]}</span>
                            <button
                              onClick={() =>
                                setCart(c => ({ ...c, [p.id]: c[p.id] + 1 }))
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <strong>{money(p.price * cart[p.id])}</strong>
                      </div>
                    ))}
                </div>
                <div className="drawer-total">
                  <span>Subtotal</span>
                  <b>{money(total)}</b>
                </div>
                <button
                  className="checkout-demo"
                  onClick={() =>
                    setNotice(
                      'Demo checkout only: ' +
                        money(total) +
                        ' subtotal. No payment was taken.'
                    )
                  }
                >
                  Continue to demo checkout <ArrowRight size={15} />
                </button>
              </>
            )}
            <small className="drawer-note">
              Demo store only — no real orders or payments.
            </small>
          </aside>
        </div>
      )}
      {notice && (
        <div className="shop-toast" role="status">
          {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss">
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
