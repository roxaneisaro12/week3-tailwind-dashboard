import './style.css'

const defaultBookings = [
  { id: 'RD-1042', guest: 'Amara Uwimana', destination: 'Cape Town', date: 'Oct 28, 2026', amount: 1240, status: 'Confirmed' },
  { id: 'RD-1041', guest: 'Daniel Mutesi', destination: 'Zanzibar', date: 'Oct 29, 2026', amount: 860, status: 'Pending' },
  { id: 'RD-1040', guest: 'Grace Niyonzima', destination: 'Marrakech', date: 'Oct 30, 2026', amount: 1580, status: 'Confirmed' },
  { id: 'RD-1039', guest: 'Eric Habimana', destination: 'Nairobi', date: 'Nov 02, 2026', amount: 540, status: 'Cancelled' },
  { id: 'RD-1038', guest: 'Claudine Ishimwe', destination: 'Paris', date: 'Nov 04, 2026', amount: 2150, status: 'Confirmed' },
  { id: 'RD-1037', guest: 'Samuel Karemera', destination: 'Dubai', date: 'Nov 06, 2026', amount: 1780, status: 'Pending' },
]

function loadBookings() {
  try {
    const savedBookings = localStorage.getItem('roamdesk-bookings')

    if (savedBookings !== null) {
      const parsedBookings = JSON.parse(savedBookings)

      if (Array.isArray(parsedBookings)) {
        return parsedBookings
      }
    }
  } catch (error) {
    console.error('Could not load saved bookings:', error)
  }

  return [...defaultBookings]
}

const bookings = loadBookings()
function loadTheme() {
  try {
    return localStorage.getItem('roamdesk-theme') === 'dark'
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

let currentTheme = loadTheme()

function applyTheme() {
  document.documentElement.classList.toggle(
    'dark',
    currentTheme === 'dark',
  )
}
let chartPeriod = 'Last 7 months'

const revenuePeriods = {
  'Last 7 months': {
    total: '$48,290',
    bars: [
      { month: 'Apr', height: 40 },
      { month: 'May', height: 56 },
      { month: 'Jun', height: 46 },
      { month: 'Jul', height: 69 },
      { month: 'Aug', height: 61 },
      { month: 'Sep', height: 87 },
      { month: 'Oct', height: 75 },
    ],
  },
  'Last 30 days': {
    total: '$12,640',
    bars: [
      { month: 'W1', height: 42 },
      { month: 'W2', height: 65 },
      { month: 'W3', height: 53 },
      { month: 'W4', height: 88 },
    ],
  },
}

function saveBookings() {
  try {
    localStorage.setItem('roamdesk-bookings', JSON.stringify(bookings))
    return true
  } catch (error) {
    console.error('Could not save bookings:', error)
    return false
  }
}

const destinations = [
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    price: 1890,
    image: 'photo-1533105079780-92b9be482077',
    description: 'Coastal escapes',
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    price: 1240,
    image: 'photo-1539020140153-e479b8c22e70',
    description: 'Culture & discovery',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    price: 2100,
    image: 'photo-1537996194471-e657df975ab4',
    description: 'Island retreats',
  },
]

const activities = [
  {
    title: 'New booking received',
    detail: 'Amara Uwimana · Cape Town',
    time: '12 min ago',
    mark: '+',
  },
  {
    title: 'Payment confirmed',
    detail: 'Paris reservation · RD-1038',
    time: '48 min ago',
    mark: '✓',
  },
  {
    title: 'Reservation updated',
    detail: 'Zanzibar departure details',
    time: '2 hours ago',
    mark: '↻',
  },
]

let searchTerm = ''
let selectedStatus = 'All'
let sidebarOpen = false

let nextBookingNumber =
  Math.max(
    1042,
    ...bookings.map((booking) => {
      const match = /^RD-(\d+)$/.exec(booking.id)
      return match ? Number(match[1]) : 0
    }),
  ) + 1

const app = document.querySelector('#app')

const money = (amount) =>
  `$${Number(amount).toLocaleString('en-US')}`

function statusClass(status) {
  const classes = {
    Confirmed: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Cancelled: 'bg-stone-100 text-stone-600',
  }

  return classes[status] || 'bg-stone-100 text-stone-600'
}

function createCell(text, extraClasses = '') {
  const cell = document.createElement('td')
  cell.className = `whitespace-nowrap px-5 py-4 text-sm ${extraClasses}`
  cell.textContent = text
  return cell
}

function renderBookings() {
  const tbody = document.querySelector('#booking-rows')
  if (!tbody) return

  tbody.replaceChildren()

  const filtered = bookings.filter((booking) => {
    const searchableText =
      `${booking.id} ${booking.guest} ${booking.destination}`.toLowerCase()

    const matchesSearch = searchableText.includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === 'All' || booking.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  filtered.forEach((booking) => {
    const row = document.createElement('tr')
    row.className =
      'border-b border-stone-100 last:border-0 transition hover:bg-stone-50/80'

    row.append(
      createCell(booking.id, 'font-semibold text-stone-800'),
      createCell(booking.guest, 'text-stone-700'),
      createCell(booking.destination, 'text-stone-600'),
      createCell(booking.date, 'text-stone-600'),
      createCell(money(booking.amount), 'font-medium text-stone-800'),
    )

    const statusCell = document.createElement('td')
    statusCell.className = 'whitespace-nowrap px-5 py-4'

    const badge = document.createElement('span')
    badge.className = `badge ${statusClass(booking.status)}`
    badge.textContent = booking.status

    statusCell.append(badge)
    row.append(statusCell)
    tbody.append(row)
  })

  if (filtered.length === 0) {
    const row = document.createElement('tr')
    const cell = document.createElement('td')
    cell.colSpan = 6
    cell.className = 'px-5 py-12 text-center text-sm text-stone-500'
    cell.textContent = 'No bookings found. Try another search or status.'
    row.append(cell)
    tbody.append(row)
  }

  document.querySelector('#booking-count').textContent =
    `${filtered.length} ${filtered.length === 1 ? 'booking' : 'bookings'}`
}
function render() {
  app.innerHTML = `
    <div class="min-h-screen bg-ivory text-charcoal"><div class="min-h-screen bg-ivory text-charcoal transition-colors duration-300 dark:bg-[#181715] dark:text-[#F7F6F2]">

      <aside id="sidebar"
        class="${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-charcoal px-5 py-6 text-white transition-transform duration-300 lg:translate-x-0">

        <a href="#overview" class="mb-12 flex items-center gap-3 px-2">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory font-display text-xl text-charcoal">R</span>
          <span>
            <span class="block text-xl font-semibold tracking-tight">roamdesk</span>
            <span class="mt-0.5 block text-[9px] tracking-[0.2em] text-stone-400">TRAVEL, THOUGHTFULLY</span>
          </span>
        </a>

        <p class="eyebrow mb-3 px-3 !text-stone-500">Workspace</p>

        <nav class="space-y-1">
          <a href="#overview" class="nav-link active"><span class="w-5 text-center">⌂</span> Overview</a>
          <a href="#bookings" class="nav-link"><span class="w-5 text-center">▤</span> Bookings</a>
          <a href="#destinations" class="nav-link"><span class="w-5 text-center">⌖</span> Destinations</a>
          <a href="#activity" class="nav-link"><span class="w-5 text-center">◷</span> Activity</a>
        </nav>

        <div class="mt-auto rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p class="text-sm font-medium">A smoother way to travel.</p>
          <p class="mt-2 text-xs leading-5 text-stone-400">Keep every journey and reservation in one considered space.</p>
          <button id="help-button" class="mt-4 text-sm text-stone-300 underline decoration-stone-600 underline-offset-4 hover:text-white">Contact support</button>
        </div>

        <div class="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#DEDAD0] text-sm font-semibold text-charcoal">RR</div>
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">Roxane Rubagumya</p>
            <p class="mt-0.5 text-xs text-stone-400">Administrator</p>
          </div>
        </div>
      </aside>

      ${sidebarOpen ? '<button id="overlay" aria-label="Close navigation" class="fixed inset-0 z-30 bg-black/40 lg:hidden"></button>' : ''}

      <main class="min-w-0 lg:ml-64">

        <header class="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-stone-200/80 bg-ivory/95 px-4 backdrop-blur-md sm:px-8 lg:px-10">
          <div class="flex items-center gap-3">
            <button id="menu-button" aria-label="Toggle navigation" aria-expanded="${sidebarOpen}" class="rounded-lg border border-stone-200 bg-white px-3 py-2 text-lg lg:hidden">☰</button>
            <div>
              <p class="text-xs text-stone-500">MONDAY, OCTOBER 26, 2026</p>
              <h1 class="mt-1 text-base font-semibold sm:text-lg">Good morning, Roxane</h1>
            </div>
          </div>

          <div class="flex items-center gap-3">
          
<button
  id="theme-toggle"
  type="button"
  aria-label="Switch theme"
  class="rounded-full border border-stone-200 bg-white px-3 py-2 text-sm transition hover:bg-stone-50"
>
  <span id="theme-icon">Dark</span>
</button>

            <button id="notification-button" aria-label="Notifications" class="relative rounded-full border border-stone-200 bg-white p-2.5 text-lg transition hover:bg-stone-50">
              ♧
              <span class="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-600"></span>
            </button>
            <div class="hidden border-l border-stone-200 pl-3 sm:block">
              <p class="text-sm font-medium">Roxane R.</p>
              <p class="mt-0.5 text-xs text-stone-500">Administrator</p>
            </div>
          </div>
        </header>

        <div class="mx-auto max-w-[1500px] space-y-9 px-4 py-8 sm:px-8 sm:py-10 lg:px-10">

          <section id="overview" class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p class="eyebrow">Your business at a glance</p>
              <h2 class="mt-3 font-display text-4xl font-normal tracking-tight sm:text-5xl">Overview<span class="text-stone-400">.</span></h2>
              <p class="mt-3 max-w-lg text-sm leading-6 text-stone-500">A clear view of your bookings, travellers, and the journeys ahead.</p>
            </div>
            <button id="add-booking-button" class="btn-primary self-start sm:self-auto">+ <span>New booking</span></button>
          </section>

          <section aria-label="Business statistics" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article class="card p-5 sm:p-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-stone-500">Total revenue</p>
                <span class="text-lg text-stone-400">↗</span>
              </div>
              <p class="stat-value">$48,290</p>
              <div class="mt-4 flex items-center gap-2 text-xs">
                <span class="font-semibold text-emerald-700">+12.8%</span>
                <span class="text-stone-400">compared to last month</span>
              </div>
            </article>

            <article class="card p-5 sm:p-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-stone-500">Total bookings</p>
                <span class="text-lg text-stone-400">▤</span>
              </div>
              <p class="stat-value">284</p>
              <div class="mt-4 flex items-center gap-2 text-xs">
                <span class="font-semibold text-emerald-700">+8.2%</span>
                <span class="text-stone-400">compared to last month</span>
              </div>
            </article>

            <article class="card p-5 sm:p-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-stone-500">Active travellers</p>
                <span class="text-lg text-stone-400">♙</span>
              </div>
              <p class="stat-value">196</p>
              <div class="mt-4 flex items-center gap-2 text-xs">
                <span class="font-semibold text-emerald-700">+5.4%</span>
                <span class="text-stone-400">compared to last month</span>
              </div>
            </article>

            <article class="card p-5 sm:p-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-stone-500">Pending requests</p>
                <span class="text-lg text-stone-400">◷</span>
              </div>
              <p class="stat-value">12</p>
              <div class="mt-4 flex items-center gap-2 text-xs">
                <span class="font-medium text-amber-700">Needs attention</span>
                <span class="text-stone-400">review requests</span>
              </div>
            </article>
          </section>

          <section class="grid grid-cols-1 gap-5 xl:grid-cols-5">

            <article class="card p-5 sm:p-7 xl:col-span-3">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p class="eyebrow">Financial performance</p>
                  <h3 class="mt-2 font-display text-2xl">Revenue overview</h3>
                  <p class="mt-2 text-sm text-stone-500">Revenue for ${chartPeriod.toLowerCase()}.</p>
                </div>
                <select id="chart-period" aria-label="Revenue chart period" class="rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs">
                  <option ${chartPeriod === 'Last 7 months' ? 'selected' : ''}>Last 7 months</option>
                  <option ${chartPeriod === 'Last 30 days' ? 'selected' : ''}>Last 30 days</option>
                </select>
              </div>

              <div class="mt-8 grid gap-3 border-b border-stone-200 pb-3 sm:gap-5" style="grid-template-columns: repeat(${revenuePeriods[chartPeriod].bars.length}, minmax(0, 1fr))">
                ${revenuePeriods[chartPeriod].bars.map((item, index) => `
                  <div class="flex flex-col items-center gap-3">
                    <div class="flex h-40 w-full items-end">
                      <div class="w-full rounded-t-md ${index === revenuePeriods[chartPeriod].bars.length - 1 ? 'bg-charcoal' : 'bg-[#DEDAD0] hover:bg-[#C9C1B2]'} transition-colors" style="height:${item.height}%"></div>
                    </div>
                    <span class="text-xs ${index === revenuePeriods[chartPeriod].bars.length - 1 ? 'font-semibold text-charcoal' : 'text-stone-500'}">${item.month}</span>
                  </div>
                `).join('')}
              </div>

              <div class="mt-5 flex items-center justify-between">
                <span class="text-xs text-stone-500">Total revenue this period</span>
                <span class="text-sm font-semibold">${revenuePeriods[chartPeriod].total}</span>
              </div>
            </article>

            <article id="activity" class="card p-5 sm:p-7 xl:col-span-2">
              <div class="flex items-start justify-between">
                <div>
                  <p class="eyebrow">The latest</p>
                  <h3 class="mt-2 font-display text-2xl">Recent activity</h3>
                </div>
                <span class="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500">Today</span>
              </div>

              <div class="mt-6 divide-y divide-stone-100">
                ${activities.map((activity) => `
                  <div class="flex gap-3 py-4 first:pt-0 last:pb-0">
                    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 text-sm text-stone-600">${activity.mark}</span>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium">${activity.title}</p>
                      <p class="mt-1 text-xs leading-5 text-stone-500">${activity.detail}</p>
                      <p class="mt-2 text-[11px] text-stone-400">${activity.time}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </article>

          </section>

          <section id="bookings" class="card overflow-hidden">
            <div class="flex flex-col justify-between gap-4 p-5 sm:p-7 lg:flex-row lg:items-end">
              <div>
                <p class="eyebrow">Reservations</p>
                <h3 class="mt-2 font-display text-2xl">Recent bookings</h3>
                <p class="mt-2 text-sm text-stone-500">Keep track of every traveller and reservation.</p>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row">
                <label class="sr-only" for="booking-search">Search bookings</label>
                <input id="booking-search" type="search" placeholder="Search bookings..." class="field sm:w-56" />

                <label class="sr-only" for="status-filter">Filter by status</label>
                <select id="status-filter" class="field sm:w-36">
                  <option>All</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full min-w-[760px] text-left">
                <thead class="border-y border-stone-100 bg-stone-50/70">
                  <tr class="text-[10px] uppercase tracking-[0.15em] text-stone-500">
                    <th class="px-5 py-4 font-semibold">Reference</th>
                    <th class="px-5 py-4 font-semibold">Guest</th>
                    <th class="px-5 py-4 font-semibold">Destination</th>
                    <th class="px-5 py-4 font-semibold">Travel date</th>
                    <th class="px-5 py-4 font-semibold">Amount</th>
                    <th class="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody id="booking-rows"></tbody>
              </table>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 px-5 py-4 sm:px-7">
              <span id="booking-count" class="text-xs text-stone-500"></span>
              <button id="export-button" class="btn-secondary !px-3 !py-2 text-xs">Export CSV ↗</button>
            </div>
          </section>

          <section id="destinations">
            <div class="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p class="eyebrow">Curated inspiration</p>
                <h3 class="mt-2 font-display text-3xl">Places worth the journey<span class="text-stone-400">.</span></h3>
                <p class="mt-2 text-sm text-stone-500">A few favourites for your next itinerary.</p>
              </div>
              <button id="destinations-button" class="self-start text-sm font-medium text-stone-600 transition hover:text-charcoal">Explore destinations ↗</button>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              ${destinations.map((destination) => `
                <article class="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-900/5">
                  <div class="relative overflow-hidden bg-stone-200">
                    <img
                      class="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-64"
                      src="https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=900&q=85"
                      alt="${destination.name}, ${destination.country}"
                      loading="lazy"
                    />
                    <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal">${destination.description}</span>
                  </div>
                  <div class="flex items-end justify-between gap-3 p-5">
                    <div>
                      <h4 class="font-display text-2xl">${destination.name}</h4>
                      <p class="mt-1 text-sm text-stone-500">${destination.country}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-[10px] uppercase tracking-wider text-stone-400">From</p>
                      <p class="mt-1 text-sm font-semibold">${money(destination.price)}</p>
                    </div>
                  </div>
                </article>
              `).join('')}
            </div>
          </section>

          <footer class="flex flex-col justify-between gap-2 border-t border-stone-200 py-6 text-xs text-stone-500 sm:flex-row">
            <p>© 2026 RoamDesk. Thoughtfully planned travel.</p>
            <p>Every journey starts with a good plan.</p>
          </footer>
        </div>
      </main>

      <div id="booking-modal" class="fixed inset-0 z-50 hidden items-center justify-center overflow-y-auto bg-charcoal/45 p-4 backdrop-blur-sm">
        <section role="dialog" aria-modal="true" aria-labelledby="modal-title" class="my-auto w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="eyebrow">New reservation</p>
              <h2 id="modal-title" class="mt-2 font-display text-3xl">Add a booking</h2>
              <p class="mt-2 text-sm leading-6 text-stone-500">Enter the details below to add a traveller to your bookings.</p>
            </div>
            <button id="close-modal" aria-label="Close dialog" class="rounded-lg px-3 py-2 text-stone-500 transition hover:bg-stone-100 hover:text-charcoal">×</button>
          </div>

          <form id="booking-form" class="mt-7 space-y-4">
            <div>
              <label for="guest-name" class="mb-1.5 block text-sm font-medium">Guest full name</label>
              <input id="guest-name" name="guest" required maxlength="100" autocomplete="name" class="field" placeholder="e.g. Aline Mukamana" />
            </div>

            <div>
              <label for="destination-name" class="mb-1.5 block text-sm font-medium">Destination</label>
              <input id="destination-name" name="destination" required maxlength="100" class="field" placeholder="e.g. Kigali" />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="travel-date" class="mb-1.5 block text-sm font-medium">Travel date</label>
                <input id="travel-date" name="date" type="date" required class="field" />
              </div>
              <div>
                <label for="booking-amount" class="mb-1.5 block text-sm font-medium">Amount (USD)</label>
                <input id="booking-amount" name="amount" type="number" min="1" max="10000000" step="0.01" required class="field" placeholder="850" />
              </div>
            </div>

            <div>
              <label for="booking-status" class="mb-1.5 block text-sm font-medium">Booking status</label>
              <select id="booking-status" name="status" class="field">
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div class="flex flex-col-reverse justify-end gap-3 border-t border-stone-100 pt-5 sm:flex-row">
              <button type="button" id="cancel-modal" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">Save booking ↗</button>
            </div>
          </form>
        </section>
      </div>

      <div id="toast" role="status" aria-live="polite" class="fixed bottom-5 right-5 z-[60] hidden max-w-sm rounded-xl bg-charcoal px-5 py-4 text-sm text-white shadow-lg"></div>
    </div>
  `

  renderBookings()
  bindEvents()
}
function showToast(message) {
  const toast = document.querySelector('#toast')
  toast.textContent = message
  toast.classList.remove('hidden')

  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => {
    toast.classList.add('hidden')
  }, 3000)
}

function bindEvents() {
  
  document.querySelector('#theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark'

    try {
      localStorage.setItem('roamdesk-theme', currentTheme)
    } catch (error) {
      console.error('Could not save theme preference:', error)
    }

    applyTheme()
    render()
  })

  document.querySelector('#menu-button').addEventListener('click', () => {
    sidebarOpen = !sidebarOpen
    render()
  })

  document.querySelector('#overlay')?.addEventListener('click', () => {
    sidebarOpen = false
    render()
  })

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      sidebarOpen = false
      document.querySelector('#sidebar').classList.add('-translate-x-full')
    })
  })

  document.querySelector('#booking-search').addEventListener('input', (event) => {
    searchTerm = event.target.value
    renderBookings()
  })

  document.querySelector('#status-filter').addEventListener('change', (event) => {
    selectedStatus = event.target.value
    renderBookings()
  })

  const modal = document.querySelector('#booking-modal')
  const form = document.querySelector('#booking-form')

  function openModal() {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    document.querySelector('#guest-name').focus()
  }

  function closeModal() {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
  }

  document.querySelector('#add-booking-button').addEventListener('click', openModal)
  document.querySelector('#close-modal').addEventListener('click', closeModal)
  document.querySelector('#cancel-modal').addEventListener('click', closeModal)

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal()
    }
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const guest = String(formData.get('guest') || '').trim()
    const destination = String(formData.get('destination') || '').trim()
    const dateValue = String(formData.get('date') || '')
    const amountValue = Number(formData.get('amount'))
    const status = String(formData.get('status') || 'Pending')

    if (
      !guest ||
      !destination ||
      !dateValue ||
      !Number.isFinite(amountValue) ||
      amountValue <= 0
    ) {
      showToast('Please complete every field with valid details.')
      return
    }

    const date = new Date(`${dateValue}T12:00:00`)

    if (Number.isNaN(date.getTime())) {
      showToast('Please enter a valid travel date.')
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const selectedDate = new Date(`${dateValue}T00:00:00`)

    if (selectedDate < today) {
      showToast('Travel date cannot be in the past.')
      return
    }

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })

    bookings.unshift({
      id: `RD-${nextBookingNumber++}`,
      guest,
      destination,
      date: formattedDate,
      amount: amountValue,
      status,
    })

    const saved = saveBookings()

    selectedStatus = 'All'
    searchTerm = ''
    closeModal()
    render()

    showToast(
      saved
        ? 'Booking added and saved successfully.'
        : 'Booking added, but could not be saved in this browser.',
    )
  })

  document.querySelector('#export-button').addEventListener('click', () => {
    const header = [
      'Booking ID',
      'Guest',
      'Destination',
      'Travel date',
      'Amount',
      'Status',
    ]

    const csvRows = [
      header,
      ...bookings.map((booking) => [
        booking.id,
        booking.guest,
        booking.destination,
        booking.date,
        money(booking.amount),
        booking.status,
      ]),
    ]

    const csv = csvRows
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','),
      )
      .join('\r\n')

    const file = new Blob(['\uFEFF', csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'roamdesk-bookings.csv'
    link.click()
    URL.revokeObjectURL(url)

    showToast('Your booking list has been exported.')
  })

  document.querySelector('#notification-button').addEventListener('click', () => {
    showToast('You are all caught up on notifications.')
  })

  document.querySelector('#help-button').addEventListener('click', () => {
    showToast('Support: contact your RoamDesk administrator.')
  })

  document.querySelector('#destinations-button').addEventListener('click', () => {
    showToast('You are viewing our featured destinations.')
  })

  document.querySelector('#chart-period').addEventListener('change', (event) => {
    chartPeriod = event.target.value
    render()
  })
}

applyTheme()
render()