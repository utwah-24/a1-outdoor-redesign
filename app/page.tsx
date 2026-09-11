import Image from "next/image";
import StaggeredMenu from "./StaggeredMenu";
import FlowingMenu from "./FlowingMenu";

const products = [
  {
    number: "01",
    icon: "/assets/billboard-70.png",
    title: "Billboards",
    body: "Strategic locations for maximum visibility and impact.",
  },
  {
    number: "02",
    icon: "/assets/tv-monitor-70.png",
    title: "Digital screens",
    body: "Captivating, 24/7 dynamic exposure.",
  },
  {
    number: "03",
    icon: "/assets/billboard-1-70.png",
    title: "Street furniture",
    body: "Cost effective way to promote your brand.",
  },
  {
    number: "04",
    icon: "/assets/cargo-truck-70.png",
    title: "Mobile signs",
    body: "Flexibility to place your brand anywhere.",
  },
];

const reasons = [
  ["Reach", "Wider audience due to the increasing population on the move."],
  ["Recognition", "Strengthen brand recall, dominance and customer loyalty."],
  ["Sales", "Promote sales through strategic campaigns and promotions."],
  ["Audience", "Capture and engage your audience through strategic positioning."],
  ["Exposure", "We deliver frequency through repeat exposure at no extra costs."],
  ["Costs", "Cost effective reach per thousand compared to other media."],
];

const services = [
  {
    text: "Graphic design",
    description: "Make your brand stand out with compelling visuals.",
    image: "/assets/graphic-design.png",
    imageAlt: "Graphic design workspace with creative software on a tablet",
    link: "#contact",
  },
  {
    text: "Video animation",
    description: "Captivate audiences with dynamic visual effects.",
    image: "/assets/video-animation.png",
    imageAlt: "Video editing timeline with footage and audio tracks",
    link: "#contact",
  },
  {
    text: "Media planning",
    description: "Target your prime audience with our experienced media strategists.",
    image: "/assets/media-planning.png",
    imageAlt: "Weekly social media content plan on a whiteboard",
    link: "#contact",
  },
];

const team = [
  ["Sarah Koola", "Managing Director"],
  ["Chipasha Musokotwane", "General Manager Zambia"],
  ["Catherine Thande", "General Manager Kenya"],
];

const offices = [
  {
    country: "Tanzania office",
    address:
      "Mikocheni Light Industries Area, Plot 17, Natai Building, 11000 CocaCola Rd, P.o.box 71035, Dar es Salaam, Tanzania",
    phone: ["Tel: +255 22 2184181/2865861", "Fax: +255 22 2180616", "Hotline: +255 784 700600"],
    email: "info@a1outdoor.co.tz",
  },
  {
    country: "Kenya office",
    address: "Mbaruk RD, off Mucai, Po box 27563-00506, Nairobi, Kenya",
    phone: ["Tel +254 020 8044414", "Cell +254 704 642 322"],
    email: "catherine@a1outdoor.co.ke",
  },
  {
    country: "Zambia office",
    address: "Chiwalamabwe RD, plot no 6703, Post net no 619, P/BAG e891, Lusaka, Zambia",
    phone: ["Tel +260 211 254901", "Cell +260 961 199121"],
    email: "chipasha@a1outdoor.co.zm",
  },
];

const navItems = [
  { label: "About", ariaLabel: "Learn about A1 Outdoor", link: "#about" },
  { label: "Products", ariaLabel: "View A1 Outdoor products", link: "#products" },
  { label: "Team", ariaLabel: "Meet the A1 Outdoor team", link: "#team" },
  { label: "CSR", ariaLabel: "View A1 Outdoor CSR projects", link: "#csr" },
  { label: "Contact", ariaLabel: "Contact A1 Outdoor", link: "#contact" },
  { label: "Book space", ariaLabel: "Book advertising space with A1 Outdoor", link: "mailto:info@a1outdoor.co.tz" },
];

const contactLinks = [
  { label: "Email", link: "mailto:info@a1outdoor.co.tz" },
  { label: "Contact offices", link: "#contact" },
];

export default function Home() {
  return (
    <>
      <StaggeredMenu
        position="right"
        items={navItems}
        socialItems={contactLinks}
        colors={["#262262", "#d71920"]}
        logoUrl="/assets/a1-outdoor-logo.jpg"
        accentColor="#d71920"
        displaySocials
        displayItemNumbering
      />

      <main id="top">
        <section className="hero chapter-dark" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal="rise">
            <p className="eyebrow">Outdoor media across Tanzania, Kenya and Zambia</p>
            <h1 id="hero-title">Brands seen where cities move.</h1>
            <p className="hero-text">
              We create and deliver platforms for brands to connect with their consumers wherever they are.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#products">
                View formats
              </a>
              <a className="button button-ghost-light" href="#contact">
                Talk to A1
              </a>
            </div>
          </div>
          <figure className="hero-media" data-reveal="media">
            <Image
              src="/assets/slides-1.jpeg"
              alt="A1 Outdoor billboard advertising structure in an urban roadside location"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            <figcaption>Billboards. Digital screens. Street furniture. Mobile signs.</figcaption>
          </figure>
        </section>

        <section className="products section-pad" id="products" aria-labelledby="products-title">
          <div className="section-kicker" data-reveal="rise">Products</div>
          <div className="split-heading" data-reveal="rise">
            <h2 id="products-title">Four ways to hold attention outside the screen.</h2>
            <p>
              A1 Outdoor develops products that enable brands to connect with consumers impactfully and cost
              effectively.
            </p>
          </div>
          <div className="product-rail" aria-label="Outdoor advertising products">
            {products.map((product) => (
              <article key={product.title} data-reveal="rise">
                <span>{product.number}</span>
                <Image src={product.icon} alt="" width={70} height={70} />
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-strip" aria-label="Company statistics">
          <div data-reveal="rise">
            <strong>3</strong>
            <span>Countries</span>
          </div>
          <div data-reveal="rise">
            <strong>600+</strong>
            <span>Locations</span>
          </div>
          <div data-reveal="rise">
            <strong>35+</strong>
            <span>Years</span>
          </div>
          <div data-reveal="rise">
            <strong>No. 1</strong>
            <span>Ranked (tz)</span>
          </div>
        </section>

        <section className="story section-pad" id="about" aria-labelledby="about-title">
          <div className="story-media" data-reveal="media">
            <Image
              src="/assets/slides-2.jpeg"
              alt="Large format outdoor advertising display beside a busy roadway"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
          <div className="story-copy" data-reveal="rise">
            <p className="section-kicker">Since 1989</p>
            <h2 id="about-title">Advertising specialists with regional footprint.</h2>
            <p>
              We are the market leader in outdoor advertising in Tanzania with footprint in Kenya and Zambia.
            </p>
            <p>
              Our success is driven by nearly three decades in the outdoor advertising industry and is fuelled by
              our passion and commitment to excellence. Our team strives to deliver professionalism, innovation
              and attend to all our clients with the same level of detail.
            </p>
          </div>
        </section>

        <section className="why chapter-dark section-pad" aria-labelledby="why-title">
          <div className="split-heading" data-reveal="rise">
            <h2 id="why-title">Why outdoor advertising?</h2>
            <p>Reach people repeatedly, in motion, and in context without paying for every extra impression.</p>
          </div>
          <div className="reason-grid">
            {reasons.map(([title, body]) => (
              <article key={title} data-reveal="rise">
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services section-pad" aria-labelledby="services-title">
          <div data-reveal="rise">
            <p className="section-kicker">Core values</p>
            <h2 id="services-title">Integrity, quality, passion and leadership.</h2>
          </div>
          <div className="service-stack" data-reveal="rise">
            <p className="lead">
              We provide free Out.Of-Home planning, artwork design, and material production logistics management.
            </p>
            <FlowingMenu items={services} />
          </div>
        </section>

        <section className="digital chapter-dark" aria-labelledby="digital-title">
          <Image
            src="/assets/slides-3.jpeg"
            alt="A1 Outdoor digital screen in a high traffic location"
            fill
            sizes="100vw"
          />
          <div className="digital-card" data-reveal="rise">
            <p className="section-kicker">Digital network</p>
            <h2 id="digital-title">Our digital network is growing.</h2>
            <p>
              Our high-tech LED screens are placed in prime locations to reach multiple target audiences. Screens
              can be booked individually, as part of a network or as a bespoke package.
            </p>
            <ul>
              <li>Multiple messages</li>
              <li>Broadcasting messages at specific times of day</li>
              <li>Shorter lead times</li>
              <li>Production costs savings</li>
            </ul>
          </div>
        </section>

        <section className="team section-pad" id="team" aria-labelledby="team-title">
          <div className="split-heading" data-reveal="rise">
            <h2 id="team-title">Management team</h2>
            <p>
              A1 Outdoor is led by industry experts with over 40 years of combined experience in developing,
              operating, and selling Out Of Home inventory in local and international markets.
            </p>
          </div>
          <div className="people">
            {team.map(([name, title]) => (
              <article key={name} data-reveal="rise">
                <h3>{name}</h3>
                <p>{title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials section-pad" aria-label="Client testimonials">
          <blockquote data-reveal="rise">
            <p>
              “We have dealt with A1 Outdoor Kenya for the past 5 years, during which time they have provided our
              business with excellent support in the areas of Outdoor Advertising Solutions.”
            </p>
            <cite>Robert Malenya, STARTIMES</cite>
          </blockquote>
          <blockquote data-reveal="rise">
            <p>
              “A1 Outdoor Kenya Limited has been our business partner for the last 6 years. We strongly recommend
              their solid and reliable services.”
            </p>
            <cite>George Mugeni, POSTERSCOPE</cite>
          </blockquote>
        </section>

        <section className="csr section-pad" id="csr" aria-labelledby="csr-title">
          <div className="section-kicker" data-reveal="rise">CSR Projects</div>
          <h2 id="csr-title" data-reveal="rise">Media space for public interest projects.</h2>
          <p data-reveal="rise">
            A1 Outdoor sponsors educational and environmental initiatives and contributes media space for public
            interest projects. We are dedicated to promoting great initiatives done by these Non Profit
            organisations through our network of digital screens and billboards across the country.
          </p>
          <div className="csr-list">
            <a href="https://a1outdoor.co.tz/" aria-label="Read more about Hassan Majaar Trust" data-reveal="rise">
              Hassan Majaar Trust
            </a>
            <a href="https://a1outdoor.co.tz/" aria-label="Read more about Get Educated Anywhere and Anytime" data-reveal="rise">
              Get Educated Anywhere & Anytime
            </a>
            <a href="https://a1outdoor.co.tz/" aria-label="Read more about Nipe Fagio" data-reveal="rise">
              Nipe Fagio
            </a>
          </div>
        </section>

        <section className="clients chapter-dark section-pad" aria-labelledby="clients-title">
          <p className="section-kicker" data-reveal="rise">Our valued clients</p>
          <h2 id="clients-title" data-reveal="rise">Built for brands that need to be remembered in public.</h2>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-lead" data-reveal="rise">
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">Put your campaign on the map.</h2>
            <a className="button button-dark" href="mailto:info@a1outdoor.co.tz">
              info@a1outdoor.co.tz
            </a>
          </div>
          <div className="offices" aria-label="A1 Outdoor offices">
            {offices.map((office) => (
              <article key={office.country} data-reveal="rise">
                <h3>{office.country}</h3>
                <p>{office.address}</p>
                <p>{office.phone.map((line) => <span key={line}>{line}</span>)}</p>
                <a href={`mailto:${office.email}`}>{office.email}</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#top">Back to top</a>
        <p>Copyright © 2026 A1 Outdoor</p>
      </footer>
    </>
  );
}
