import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  // Replaced currentVideoId and currentFabricData with activeModal for simplicity
  const [activeModal, setActiveModal] = useState(null); // State to store the key of the active fabric for the modal
  const [playingCardVideoId, setPlayingCardVideoId] = useState(null); // State to track which card video is playing on hover

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    quantity: '',
    message: '',
    inquiry_type: 'general'
  });

  // Hero images showcase traditional craftsmanship
  const heroImages = [
    {
      src: "/images/kalamkari/kalam8.jpg",
      title: "Traditional Handloom Weaving",
      subtitle: "Master craftsmen preserving ancient techniques"
    },
    {
      src: "/images/kalamkari/kalam7.jpg",
      title: "Hand-Carved Printing Blocks",
      subtitle: "Intricate patterns carved with precision"
    },
    {
      src: "/images/kalamkari/kalam4.jpg",
      title: "Artisan Block Printing",
      subtitle: "Each design hand-printed with care"
    },
    {
      src: "/images/kalamkari/kalam5.jpg",
      title: "Traditional Pattern Display",
      subtitle: "Showcasing generations of textile artistry"
    },
    {
      src: "/images/kalamkari/kalam6.jpg",
      title: "Finished Textile Collection",
      subtitle: "Beautiful patterns ready for the world"
    },
    {
      src: "/images/kalamkari/kalam3.jpg",
      title: "Masterful Craftsmanship",
      subtitle: "The delicate art of pattern creation"
    }
  ];

  // Fabric data with detailed information
  const fabricData = {
    kalamkari: {
      title: "Kalamkari",
      badge: "Kalamkari",
      description: "Ancient art of hand-painting and block-printing on fabrics, featuring mythological narratives and floral motifs.",
      aboutPoints: [
        "Ancient hand-painting technique originating from Andhra Pradesh",
        "Uses natural dyes and organic materials for coloring",
        "Features mythological stories and floral patterns", 
        "Requires 15-20 steps of meticulous treatment and painting",
        "Each piece is unique and handcrafted by skilled artisans"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.unsplash.com/photo-1693987644332-bbfc96ab2cee",
        "https://images.pexels.com/photos/32568884/pexels-photo-32568884.jpeg",
        "https://images.unsplash.com/photo-1749367288395-f874bb54bc8a",
        "https://images.pexels.com/photos/32562648/pexels-photo-32562648.jpeg",
        "https://images.pexels.com/photos/32563294/pexels-photo-32563294.jpeg"
      ]
    },
    ikat: {
      title: "IKAT",
      badge: "IKAT",
      description: "Intricate resist-dyeing technique creating geometric patterns with a distinctive feathered edge effect, showcasing master craftsmanship.",
      aboutPoints: [
        "Resist-dyeing technique with threads dyed before weaving",
        "Creates distinctive geometric patterns with feathered edges",
        "Requires exceptional skill in pattern alignment",
        "Originated from Malay-Indonesian weaving traditions",
        "Known for its vibrant colors and complex designs"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf",
        "https://images.pexels.com/photos/32563294/pexels-photo-32563294.jpeg",
        "https://images.unsplash.com/photo-1579693004042-0f47ae6ce653",
        "https://images.pexels.com/photos/32582606/pexels-photo-32582606.jpeg",
        "https://images.unsplash.com/photo-1684703126283-14429bcf1547"
      ]
    },
    yarndyed: {
      title: "Yarn Dyed",
      badge: "Yarn Dyed",
      description: "Premium fabrics woven from pre-dyed yarns, creating vibrant, long-lasting colors and intricate check and stripe patterns.",
      aboutPoints: [
        "Yarns are dyed before weaving for superior color fastness",
        "Creates vibrant, long-lasting colors and patterns",
        "Perfect for checks, plaids, and stripe designs",
        "Exceptional durability and color retention",
        "Allows precise color placement in complex patterns"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.pexels.com/photos/6634460/pexels-photo-6634460.jpeg",
        "https://images.unsplash.com/photo-1692365272628-530e24acc610",
        "https://images.unsplash.com/photo-1737094661856-7e0bbe0ee05b",
        "https://images.unsplash.com/photo-1584949091882-158ebf933cda",
        "https://images.pexels.com/photos/9348503/pexels-photo-9348503.jpeg"
      ]
    },
    batik: {
      title: "Batik",
      badge: "Batik",
      description: "Traditional wax-resist dyeing technique creating beautiful, organic patterns with rich colors and cultural significance.",
      aboutPoints: [
        "Ancient wax-resist dyeing technique from Indonesia",
        "Creates intricate organic patterns with flowing designs",
        "Uses hot wax application and successive dyeing",
        "Produces rich, layered color combinations",
        "Each piece features unique, handcrafted patterns"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.pexels.com/photos/29136217/pexels-photo-29136217.jpeg",
        "https://images.pexels.com/photos/3988087/pexels-photo-3988087.jpeg",
        "https://images.pexels.com/photos/32156190/pexels-photo-32156190.jpeg",
        "https://images.unsplash.com/photo-1681003564665-62848f8d481e",
        "https://images.unsplash.com/photo-1672716912554-c23ba8fac4ce"
      ]
    },
    patchwork: {
      title: "Patch Work Fabrics",
      badge: "Patch Work",
      description: "Artistically assembled fabric pieces creating unique patterns through careful stitching and creative combinations.",
      aboutPoints: [
        "Art of sewing together different fabric pieces",
        "Combines various colors, patterns, and textures",
        "Creates unique, storytelling textile designs",
        "Requires skilled artisan craftsmanship",
        "Each piece is meticulously planned and executed"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.pexels.com/photos/9890661/pexels-photo-9890661.jpeg",
        "https://images.pexels.com/photos/6764690/pexels-photo-6764690.jpeg",
        "https://images.unsplash.com/photo-1632046876672-de5e7ee4ac61",
        "https://images.unsplash.com/photo-1720982892132-63039ca02f36",
        "https://images.unsplash.com/photo-1731504801830-5b14ac73d7ca"
      ]
    },
    rotaryprint: {
      title: "Rotary Print Garments",
      badge: "Rotary Print",
      description: "High-quality machine-printed fabrics with consistent patterns and vibrant colors using advanced rotary printing technology.",
      aboutPoints: [
        "Modern printing using cylindrical screen technology",
        "High-speed, consistent pattern reproduction",
        "Excellent color registration and quality",
        "Combines traditional motifs with contemporary designs",
        "Suitable for both traditional and modern applications"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.unsplash.com/photo-1701887875566-dec20a2ad137",
        "https://images.pexels.com/photos/691710/pexels-photo-691710.jpeg",
        "https://images.unsplash.com/photo-1693031630177-b897fb9d7154",
        "https://images.unsplash.com/photo-1693031630157-7ecc8d06de63",
        "https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg"
      ]
    },
    pintuck: {
      title: "Pintuck Fabrics",
      badge: "Pintuck",
      description: "Sophisticated fabrics featuring delicate pleated detailing that adds texture, dimension, and refined elegance to garments.",
      aboutPoints: [
        "Features narrow, decorative pleats for texture",
        "Creates sophisticated dimension through light and shadow",
        "Maintains consistent pleat spacing and depth",
        "Perfect for formal and semi-formal applications",
        "Adds elegant refinement to any garment"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.unsplash.com/photo-1601232251778-81ba856938c8",
        "https://images.unsplash.com/photo-1740391767939-ba18f6ee9764",
        "https://images.unsplash.com/photo-1583147621748-8c2d81382c1f",
        "https://images.pexels.com/photos/32582609/pexels-photo-32582609.jpeg",
        "https://images.pexels.com/photos/32582606/pexels-photo-32582606.jpeg"
      ]
    },
    gray: {
      title: "Gray Fabrics",
      badge: "Gray Fabrics",
      description: "Timeless gray fabrics in various shades and textures, providing sophisticated neutrals for diverse applications and styling needs.",
      aboutPoints: [
        "Versatile shades from light silver to deep charcoal",
        "Sophisticated neutral foundation for any design",
        "Carefully woven for perfect tone and texture",
        "Suitable for both traditional and contemporary uses",
        "Offers endless coordination possibilities"
      ],
      youtubeVideoId: "Ac395h-q6rw", // Placeholder for Kalamkari video ID
      galleryImages: [
        "https://images.unsplash.com/photo-1715867125247-120c0fc4593b",
        "https://images.unsplash.com/photo-1632844384543-bb1b2c3900d7",
        "https://images.pexels.com/photos/4210376/pexels-photo-4210376.jpeg",
        "https://images.pexels.com/photos/7289112/pexels-photo-7289112.jpeg",
        "https://images.pexels.com/photos/32526447/pexels-photo-32526447.jpeg"
      ]
    }
  };
 
  useEffect(() => {
    // Loader animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Hero image carousel
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isLoading, heroImages.length]);

  useEffect(() => {
    // Advanced Intersection Observer for staggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 150); // Staggered animation delay
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Open modal function
  const openModal = (fabricKey) => {
    setActiveModal(fabricKey);
    setModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setModalOpen(false);
    setActiveModal(null);
    setPlayingCardVideoId(null); // Stop any playing card video when modal closes
  };

  // Helper function to generate YouTube embed URL with options
  const getYouTubeEmbedUrl = (videoId, autoplay = 0, mute = 0, controls = 0, loop = 0) => {
    if (!videoId) return '';
    let params = `autoplay=${autoplay}&mute=${mute}&controls=${controls}&showinfo=0&rel=0`;
    if (loop) {
      params += `&loop=1&playlist=${videoId}`; // YouTube loop requires playlist param
    }
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      quantity: '',
      message: '',
      inquiry_type: 'general'
    });
  };

  const scrollToForm = () => {
    closeModal();
    setTimeout(() => {
      scrollToSection('inquiry-form');
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="weaving-animation">
          <div className="advanced-loom">
            <div className="loom-frame">
              <div className="thread-group">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`thread thread-${i + 1}`}></div>
                ))}
              </div>
              <div className="shuttle-container">
                <div className="shuttle"></div>
                <div className="shuttle-trail"></div>
              </div>
            </div>
            <div className="weaving-particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`particle particle-${i + 1}`}></div>
              ))}
            </div>
          </div>
          <h2 className="loader-text">
            <span>Weaving</span>
            <span>Excellence</span>
          </h2>
          <div className="loader-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Enhanced Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>
              <span className="logo-main">ARUNA</span>
            </h1>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">
              <span>Home</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('heritage')} className="nav-link">
              <span>Heritage</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('collection')} className="nav-link">
              <span>Collection</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              <span>Contact</span>
              <div className="nav-link-border"></div>
            </button>
            <button onClick={() => scrollToSection('inquiry-form')} className="nav-link">
              <span>Inquiry</span>
              <div className="nav-link-border"></div>
            </button>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Carousel */}
      <section id="home" className="hero-section">
        <div className="hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentHeroImage ? 'active' : ''}`}
            >
              <div className="hero-background">
                <img 
                  src={image.src}
                  alt={image.title}
                  className="hero-bg-image"
                />
                <div className="hero-overlay"></div>
              </div>
              <div className="slide-content">
                <h3 className="slide-title">{image.title}</h3>
                <p className="slide-subtitle">{image.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <div className="hero-badge animate-on-scroll">
            <span>Since 1989</span>
          </div>
          <h1 className="hero-title animate-on-scroll">
            <span className="title-line">ARUNA</span>
            <span className="title-line">HANDLOOM</span>
            <span className="title-line title-accent">FABRICS</span>
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            Preserving textile heritage through generations of master craftsmanship since 1989
          </p>
          <div className="hero-highlight animate-on-scroll">
            <div className="highlight-content">
              <h3>We have thousands & thousands (1000s of 1000s) of swatches in each category</h3>
              <p>Digital versions of swatches are available. <button onClick={() => scrollToSection('inquiry-form')} className="highlight-link">Please ask us</button></p>
            </div>
          </div>
          <div className="hero-buttons animate-on-scroll">
            <button 
              className="hero-cta primary"
              onClick={() => scrollToSection('collection')}
            >
              <span>Discover Our Fabrics</span>
              <div className="button-shine"></div>
            </button>
            <button 
              className="hero-cta secondary"
              onClick={() => scrollToSection('heritage')}
            >
              <span>Our Story</span>
            </button>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prevHeroImage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <div className="carousel-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentHeroImage ? 'active' : ''}`}
                onClick={() => setCurrentHeroImage(index)}
              ></button>
            ))}
          </div>
          <button className="carousel-btn next" onClick={nextHeroImage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-dot"></div>
        </div>
      </section>

      {/* Enhanced Heritage Section */}
      <section id="heritage" className="heritage-section">
        <div className="container">
          <div className="heritage-content">
            <div className="heritage-text animate-on-scroll">
              <div className="section-header">
                <span className="section-label">Our Story</span>
                <h2 className="section-title">Our Heritage</h2>
              </div>
              <div className="heritage-story">
                <ul>
                  <li>Since <span className="highlight">1989</span>, Aruna Handloom Fabrics has been a beacon of traditional textile artistry. Our journey began with a simple yet profound vision: to preserve and celebrate the rich heritage of handloom weaving that has been passed down through generations of master craftsmen.</li>
                  <li>Every thread tells a story, every pattern carries the wisdom of <span className="highlight">centuries-old techniques</span>. Our skilled artisans don't just create fabrics; they weave dreams, traditions, and cultural narratives into each piece.</li>
                  <li>From the gentle rhythm of the loom to the careful selection of natural dyes, we honor the time-tested methods that make each creation truly <span className="highlight">extraordinary</span>.</li>
                </ul>
              </div>
              <div className="heritage-stats animate-on-scroll">
                <div className="stat-item">
                  <div className="stat-number">35+</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Master Artisans</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Unique Patterns</div>
                </div>
              </div>
            </div>
            <div className="heritage-image animate-on-scroll">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1626889268968-2280ec97c38b" 
                  alt="Artisan Textile Crafting" 
                  className="heritage-img"
                />
                <div className="image-frame"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Collection Section */}
      <section id="collection" className="collection-section">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Our Expertise</span>
            <h2 className="section-title">Fabric Collection</h2>
          </div>
          
          <div className="collection-grid">
            {Object.keys(fabricData).map((key) => {
              const fabric = fabricData[key];
              return (
                <div className="fabric-card animate-on-scroll" key={key}>
                  <div
                    className="card-video"
                    onClick={() => openModal(key)}
                    onMouseEnter={() => setPlayingCardVideoId(key)}
                    onMouseLeave={() => setPlayingCardVideoId(null)}
                  >
                    <iframe
                      // Only autoplay and loop if this specific card is being hovered
                      src={getYouTubeEmbedUrl(
                        fabric.youtubeVideoId,
                        playingCardVideoId === key ? 1 : 0, // Autoplay if hovered
                        playingCardVideoId === key ? 1 : 0, // Mute if hovered
                        0, // No controls in card
                        playingCardVideoId === key ? 1 : 0 // Loop if hovered
                      )}
                      title={`${fabric.title} Making Process`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <h4>{fabric.title}</h4> {/* Dynamic title */}
                        <p>View Process</p> {/* Changed text to reflect action */}
                      </div>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-badge">{fabric.badge}</div>
                    <p className="card-description">{fabric.description}</p>
                    <button className="card-btn" onClick={() => openModal(key)}>
                      <span>View Process</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Connect With Us</h2>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card animate-on-scroll">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </div>
              <h3>Office Address</h3>
              <p>
                New # 34 (Old # 42/13),<br />
                Kothandaraman Street,<br />
                Old Washermenpet,<br />
                Chennai - 600021,<br />
                Tamil Nadu, India.
              </p>
              <div className="contact-action">
                <button className="contact-btn" onClick={() => window.open("https://maps.app.goo.gl/ZerxsY8eywdT6LYe9", "_blank")}>Get Directions</button>

              </div>
            </div>

            <div className="contact-card animate-on-scroll">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3>Phone</h3>
              <p>
                +91 8897667573<br />
                +91 9789089099<br />
              </p>
              <div className="contact-action">
                <button className="contact-btn"  onClick={() => (window.location.href = 'tel:+918897667573')}>Call Now</button>
              </div>
            </div>

            <div className="contact-card animate-on-scroll">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3>Email</h3>
              <p>
                <strong>For Inquiries:</strong><br />
                arunahandloomfabrics@gmail.com<br />
              </p>
              <div className="contact-action">
                <button className="contact-btn">Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Inquiry Form Section */}
      <section id="inquiry-form" className="inquiry-section">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">Submit Your Inquiry</h2>
            <p className="section-description">
              Tell us about your textile needs and we'll provide personalized solutions
            </p>
          </div>

          <div className="form-container animate-on-scroll">
            <form onSubmit={handleFormSubmit} className="inquiry-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="Company name (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry_type">Inquiry Type *</label>
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="wholesale">Wholesale Orders</option>
                    <option value="custom">Custom Design</option>
                    <option value="sample">Sample Request</option>
                    <option value="collaboration">Business Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Fabric Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a category</option>
                    {Object.keys(fabricData).map((key) => (
                      <option key={key} value={fabricData[key].title}>
                        {fabricData[key].title}
                      </option>
                    ))}
                    <option value="mixed">Multiple Categories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Estimated Quantity</label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleFormChange}
                  >
                    <option value="">Select quantity range</option>
                    <option value="1-10">1-10 meters</option>
                    <option value="10-50">10-50 meters</option>
                    <option value="50-100">50-100 meters</option>
                    <option value="100-500">100-500 meters</option>
                    <option value="500+">500+ meters</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message / Requirements *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows="5"
                    placeholder="Please describe your requirements, preferred colors, delivery timeline, or any specific questions you have..."
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <span>Submit Inquiry</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m22 2-7 20-4-9-9-4z"/>
                    <path d="m22 2-10 10"/>
                  </svg>
                </button>
                <p className="form-note">
                  We'll respond to your inquiry within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2>ARUNA HANDLOOM FABRICS</h2>
              <p>Preserving heritage, weaving futures.</p>
            </div>
            <div className="footer-links">
              <div className="footer-social">
                <button className="social-btn">Facebook</button>
                <button className="social-btn" onClick={() => window.open("https://www.instagram.com/arunahandloomfabrics", "_blank")}> Instagram</button>
                <button className="social-btn">LinkedIn</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 Aruna Handloom Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <a 
          href="https://wa.me/918897667573" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span className="whatsapp-text">Chat with us</span>
        </a>
      </div>

      {/* Fabric Detail Modal */}
      {modalOpen && activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-header">
              <h2>{fabricData[activeModal].title}</h2>
            </div>

            <div className="modal-body">
              <p className="modal-description">
                 {fabricData[activeModal].detailedDescription}
              </p>

              <div className="modal-video">
                <iframe
                  // Ensure autoplay and controls in modal
                  src={getYouTubeEmbedUrl(fabricData[activeModal].youtubeVideoId, 1, 0, 1)} 
                  title={`${fabricData[activeModal].title} Making Process`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="about-fabric">
                <h3>About {fabricData[activeModal].badge}</h3>
                <ul className="about-list">
                  {fabricData[activeModal].aboutPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-gallery">
                <h3>{fabricData[activeModal].badge} Gallery</h3>
                <div className="gallery-grid">
                  {fabricData[activeModal].galleryImages.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`${fabricData[activeModal].title} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeModal}>
                Close
              </button>
              <button className="modal-btn primary" onClick={scrollToForm}>
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
