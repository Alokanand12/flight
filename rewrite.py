import sys

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_content = []
for i, line in enumerate(lines):
    if line.strip() == '<link rel="stylesheet" href="css/csit.css">':
        new_content.append(line)
        new_content.append('  <link rel="stylesheet" href="css/airindia.css">\n')
    elif i < 122:
        new_content.append(line)

new_sections = '''
  <!-- Air India A350 Hero Section -->
  <section id="home" class="ai-hero-wrapper">
    <div class="container ai-hero-inner fade-in-up">
      <h1 class="ai-hero-title">
        AIR INDIA'S FLAGSHIP<br><span>A350</span>
      </h1>
      <p class="ai-hero-subtitle">
        Ushering in a new era of world-class flying experiences.
      </p>
      <a href="#" class="ai-btn">Take A Virtual Tour</a>
    </div>
  </section>

  <!-- Flight Search Widget -->
  <section style="position: relative; z-index: 10;">
    <div class="container">
      <div class="ai-search-widget reveal">
        <form id="flight-search" class="ai-search-form" onsubmit="event.preventDefault(); App.showToast('Searching flights...', 'info')">
          <div class="ai-search-field">
            <label>Origin</label>
            <input type="text" placeholder="From" required>
          </div>
          <div class="ai-search-field">
            <label>Destination</label>
            <input type="text" placeholder="To" required>
          </div>
          <div class="ai-search-field">
            <label>Depart Date</label>
            <input type="date" required>
          </div>
          <div class="ai-search-field">
            <label>Return Date</label>
            <input type="date">
          </div>
          <div class="ai-search-field">
            <label>Passenger(s) & Class</label>
            <select required>
              <option value="">1 Adult, Economy</option>
              <option value="PE">1 Adult, Premium Economy</option>
              <option value="BC">1 Adult, Business</option>
            </select>
          </div>
          <div class="ai-search-field" style="flex: 0 0 auto;">
            <button type="submit" class="ai-btn">Search</button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Problem Statements Category -->
  <section class="ai-section bg-light">
    <div class="container">
      <div class="ps-header reveal">
        <h2>Problem Statement <span>category</span></h2>
        <p style="color: #64748B;">We offer number of problem statement listed below one by one.</p>
      </div>
      
      <div class="ps-grid">
        <div class="ps-card reveal reveal-delay-1">
          <div class="ps-badge">01 PS</div>
          <h3 class="ps-title">Problem Statement-01</h3>
          <p class="ps-desc">Get the complete details of all flights to New Delhi.</p>
        </div>
        <div class="ps-card reveal reveal-delay-2">
          <div class="ps-badge">02 PS</div>
          <h3 class="ps-title">Problem Statement-02</h3>
          <p class="ps-desc">Get the details about all flights from Chennai to New Delhi.</p>
        </div>
        <div class="ps-card reveal reveal-delay-3">
          <div class="ps-badge">03 PS</div>
          <h3 class="ps-title">Problem Statement-03</h3>
          <p class="ps-desc">Find only the flight numbers for passenger with pid 123 for flights to Chennai before 06/11/2020.</p>
        </div>
        <div class="ps-card reveal reveal-delay-4">
          <div class="ps-badge">04 PS</div>
          <h3 class="ps-title">Problem Statement-04</h3>
          <p class="ps-desc">Find the passenger names for passengers who have bookings on at least one flight.</p>
        </div>
        <!-- Adding some more to match the grid look -->
        <div class="ps-card reveal reveal-delay-1">
          <div class="ps-badge">05 PS</div>
          <h3 class="ps-title">Problem Statement-05</h3>
          <p class="ps-desc">Find the passenger names for those who do not have any bookings in any flights.</p>
        </div>
        <div class="ps-card reveal reveal-delay-2">
          <div class="ps-badge">06 PS</div>
          <h3 class="ps-title">Problem Statement-06</h3>
          <p class="ps-desc">Find the agency names for agencies that located in the same city as passenger 123.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Business Class Experience -->
  <section class="ai-section">
    <div class="container">
      <div class="exp-row reveal">
        <div class="exp-content">
          <h3>Unparalleled Business class experience</h3>
          <ul class="exp-list">
            <li>Dedicated check-in counter</li>
            <li>Priority boarding</li>
            <li>Extra baggage allowance</li>
            <li>Private suite with 79" full flatbed and privacy doors</li>
            <li>Personal wardrobe and ample stowage</li>
            <li>Gourmet meals and handpicked beverages</li>
            <li>21" HD personal entertainment screen</li>
            <li>Universal AC and USB power outlets</li>
          </ul>
        </div>
        <div class="exp-image hover-scale">
          <img src="https://images.unsplash.com/photo-1542314831-c5a4d407e4d2?q=80&w=2070&auto=format&fit=crop" alt="Business Class">
        </div>
      </div>
    </div>
  </section>

  <!-- Premium Economy Experience -->
  <section class="ai-section bg-light">
    <div class="container">
      <div class="exp-row reverse reveal">
        <div class="exp-content">
          <h3>Level Up with Premium Economy</h3>
          <ul class="exp-list">
            <li>Dedicated check-in counter</li>
            <li>Priority boarding</li>
            <li>38" seat pitch, 18.5" seat width and 8" recline</li>
            <li>4-way adjustable headrest, leg rest with foot paddle</li>
            <li>Personal reading light</li>
            <li>Full-course hot meals with global flavours</li>
            <li>13.3" HD touchscreen</li>
            <li>Award-winning amenity kits</li>
          </ul>
        </div>
        <div class="exp-image hover-scale">
          <img src="https://images.unsplash.com/photo-1579455325251-40be2ec40bb3?q=80&w=2070&auto=format&fit=crop" alt="Premium Economy">
        </div>
      </div>
    </div>
  </section>

  <!-- Economy Experience -->
  <section class="ai-section">
    <div class="container">
      <div class="exp-row reveal">
        <div class="exp-content">
          <h3>Elevated comfort with Economy</h3>
          <ul class="exp-list">
            <li>31" seat pitch, 17.5" seat width and 6" recline</li>
            <li>Adjustable headrest</li>
            <li>12" HD touchscreen and earbuds</li>
            <li>Full-course hot meals</li>
            <li>Blanket and pillow</li>
            <li>USB power outlets</li>
          </ul>
        </div>
        <div class="exp-image hover-scale">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" alt="Economy Class">
        </div>
      </div>
    </div>
  </section>

  <!-- Seat Map -->
  <section class="ai-section bg-light">
    <div class="container">
      <div class="ps-header reveal">
        <h2 style="font-size: 2rem;">Cutting-edge features of the A350-900</h2>
        <p style="max-width: 800px; margin: 0 auto; color: #64748B;">Introducing India's first Airbus A350, where technology meets unparalleled comfort. As the latest addition to the skies, the A350 redefines air travel with its contemporary design, fuel efficiency, and innovative features.</p>
      </div>

      <div class="seat-map-legend reveal">
        <div class="legend-item"><div class="legend-color" style="background: #0A1128"></div> Business Class</div>
        <div class="legend-item"><div class="legend-color" style="background: #A50B20"></div> Premium Economy</div>
        <div class="legend-item"><div class="legend-color" style="background: #E31837"></div> Economy Class</div>
        <div class="legend-item">🍴 Galley</div>
        <div class="legend-item">🚻 Lavatory</div>
        <div class="legend-item">♿ Wheelchair</div>
      </div>

      <div class="seat-map-container hover-scale reveal">
        <!-- Placeholder for seat map graphic. Using a generic wide image as representation -->
        <img src="https://images.unsplash.com/photo-1540339832862-4745ea6198f3?q=80&w=2070&auto=format&fit=crop" alt="Seat Map" style="max-height: 200px; object-fit: cover; width: 100%; border-radius: 8px; filter: grayscale(50%) contrast(1.2);">
      </div>
    </div>
  </section>

  <!-- Destinations -->
  <section class="ai-section">
    <div class="container">
      <h3 style="font-size: 1.5rem; color: #64748B; text-transform: uppercase; margin-bottom: 2rem;" class="reveal">See where you can fly on the A350</h3>
      
      <div class="dest-tabs reveal">
        <div class="dest-tab">International</div>
        <div class="dest-tab active">Domestic</div>
      </div>

      <div class="dest-grid">
        <div class="dest-card reveal reveal-delay-1">
          <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" alt="Delhi">
          <div class="dest-info"><h4>BOM-DEL</h4></div>
        </div>
        <div class="dest-card reveal reveal-delay-2">
          <img src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070&auto=format&fit=crop" alt="Bangalore">
          <div class="dest-info"><h4>DEL-BLR</h4></div>
        </div>
        <div class="dest-card reveal reveal-delay-3">
          <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop" alt="Chennai">
          <div class="dest-info"><h4>BLR-MAA</h4></div>
        </div>
        <div class="dest-card reveal reveal-delay-4">
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" alt="Hyderabad">
          <div class="dest-info"><h4>DEL-HYD</h4></div>
        </div>
      </div>
    </div>
  </section>
'''

new_content.append(new_sections)

for i, line in enumerate(lines):
    if i >= 254:  # from footer onwards
        new_content.append(line)

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_content)
print('Rewrite successful')
