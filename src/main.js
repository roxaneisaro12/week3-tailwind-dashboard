
import './style.css'

const bookings = [
  { id: 'RD-1042', guest: 'Amara Uwimana', destination: 'Cape Town', date: 'Oct 28, 2026', amount: '$1,240', status: 'Confirmed' },
  { id: 'RD-1041', guest: 'Daniel Mutesi', destination: 'Zanzibar', date: 'Oct 29, 2026', amount: '$860', status: 'Pending' },
  { id: 'RD-1040', guest: 'Grace Niyonzima', destination: 'Marrakech', date: 'Oct 30, 2026', amount: '$1,580', status: 'Confirmed' },
  { id: 'RD-1039', guest: 'Eric Habimana', destination: 'Nairobi', date: 'Nov 02, 2026', amount: '$540', status: 'Cancelled' },
  { id: 'RD-1038', guest: 'Claudine Ishimwe', destination: 'Paris', date: 'Nov 04, 2026', amount: '$2,150', status: 'Confirmed' },
  { id: 'RD-1037', guest: 'Samuel Karemera', destination: 'Dubai', date: 'Nov 06, 2026', amount: '$1,780', status: 'Pending' },
]

const destinations = [
  { name: 'Amalfi Coast', country: 'Italy', price: '$1,890', image: 'photo-1533105079780-92b9be482077' },
  { name: 'Marrakech', country: 'Morocco', price: '$1,240', image: 'photo-1539020140153-e479b8c22e70' },
  { name: 'Bali', country: 'Indonesia', price: '$2,100', image: 'photo-1537996194471-e657df975ab4' },
]

const activities = [
  { title: 'New booking received', detail: 'Amara Uwimana booked Cape Town', time: '12 minutes ago' },
  { title: 'Payment confirmed', detail: 'Payment received for Paris trip', time: '48 minutes ago' },
  { title: 'Booking updated', detail: 'Zanzibar departure date changed', time: '2 hours ago' },
]

let searchTerm = ''
let selectedStatus = 'All'
let sidebarOpen = false

const app = document.querySelector('#app')

function statusClass(status) {
  if (status === 'Confirmed') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Pending') return 'bg-amber-50 text-amber-700'
  return 'bg-rose-50 text-rose-700'
}

function renderBookings() {
  const filtered = bookings.filter((booking) => {
    const matchesSearch = `${booking.id} ${booking.guest} ${booking.destination}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'All' || booking.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const rows = filtered.map((booking) => `
    <tr class="border-b border-stone-100 last:border-0 hover:bg-stone-50/70">
      <td class="whitespace-nowrap px-5 py-4 text-sm font-semibold text-stone-800">${booking.id}</td>
      <td class="whitespace-nowrap px-5 py-4 text-sm text-stone-700">${booking.guest}</td>
      <td class="whitespace-nowrap px-5 py-4 text-sm text-stone-600">${booking.destination}</td>
      <td class="whitespace-nowrap px-5 py-4 text-sm text-stone-600">${booking.date}</td>
      <td class="whitespace-nowrap px-5 py-4 text-sm font-semibold text-stone-800">${booking.amount}</td>
      <td class="whitespace-nowrap px-5 py-4"><span class="badge ${statusClass(booking.status)}">${booking.status}</span></td>
    </tr>
  `).join('')

  document.querySelector('#booking-rows').innerHTML = rows || `
    <tr><td colspan="6" class="px-5 py-10 text-center text-sm text-stone-500">No bookings match your search.</td></tr>
  `

  document.querySelector('#booking-count').textContent = `${filtered.length} bookings`
}

function render() {
  app.innerHTML = `
    <div class="min-h-screen bg-ivory text-charcoal">
      <aside id="sidebar" class="${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-charcoal px-5 py-6 text-white transition-transform duration-300 lg:translate-x-0">
        <a href="#" class="mb-10 flex items-center gap-3 px-2">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-charcoal">R</span>
          <span><span class="block text-xl font-semibold tracking-tight">roamdesk</span><span class="block text-xs text-stone-400">TRAVEL MANAGEMENT</span></span>
        </a>
        <p class="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Workspace</p>
        <nav class="space-y-2">
          <a href="#overview" class="nav-link bg-white/10 text-white"><span>▦</span> Overview</a>
          <a href="#bookings" class="nav-link"><span>▤</span> Bookings</a>
          <a href="#destinations" class="nav-link"><span>⌖</span> Destinations</a>
          <a href="#activity" class="nav-link"><span>◷</span> Activity</a>
        </nav>
        <div class="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-sm font-semibold">Need a hand?</p>
          <p class="mt-2 text-xs leading-5 text-stone-400">Your travel operations, all in one place.</p>
          <button id="help-button" class="mt-4 w-full rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/10">Visit help centre</button>
        </div>
        <div class="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8D0C3] font-semibold text-charcoal">RR</div>
          <div><p class="text-sm font-semibold">Roxane Rubagumya</p><p class="text-xs text-stone-400">Administrator</p></div>
        </div>
      </aside>

      ${sidebarOpen ? '<button id="overlay" aria-label="Close menu" class="fixed inset-0 z-30 bg-black/40 lg:hidden"></button>' : ''}

      <main class="min-w-0 lg:ml-64">
        <header class="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-stone-200/80 bg-ivory/95 px-4 backdrop-blur sm:px-8 lg:px-10">
          <div class="flex items-center gap-3">
            <button id="menu-button" class="rounded-lg border border-stone-200 p-2 lg:hidden" aria-label="Open menu">☰</button>
            <div><p class="text-xs text-stone-500">Monday, October 26, 2026</p><h1 class="text-lg font-semibold sm:text-xl">Good morning, Roxane</h1></div>
          </div>
          <div class="flex items-center gap-3"><button id="notification-button" aria-label="Notifications" class="relative rounded-full border border-stone-200 bg-white p-2.5">♧<span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"></span></button><div class="hidden text-right sm:block"><p class="text-sm font-semibold">Roxane R.</p><p class="text-xs text-stone-500">Admin account</p></div></div>
        </header>

        <div class="mx-auto max-w-[1600px] space-y-8 px-4 py-7 sm:px-8 sm:py-9 lg:px-10">
          <section id="overview" class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p class="text-sm font-medium text-stone-500">YOUR BUSINESS AT A GLANCE</p><h2 class="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Dashboard overview</h2><p class="mt-2 text-sm text-stone-500">Here is what is happening with your travel business.</p></div>
            <button id="add-booking-button" class="btn-primary">+ Add new booking</button>
          </section>

          <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article class="card"><div class="flex items-center justify-between"><p class="text-sm text-stone-500">Total revenue</p><span class="rounded-lg bg-stone-100 p-2">↗</span></div><p class="mt-5 text-3xl font-semibold">$48,290</p><p class="mt-3 text-xs text-emerald-700">↑ 12.8% <span class="text-stone-400">vs last month</span></p></article>
            <article class="card"><div class="flex items-center justify-between"><p class="text-sm text-stone-500">Total bookings</p><span class="rounded-lg bg-stone-100 p-2">▤</span></div><p class="mt-5 text-3xl font-semibold">284</p><p class="mt-3 text-xs text-emerald-700">↑ 8.2% <span class="text-stone-400">vs last month</span></p></article>
            <article class="card"><div class="flex items-center justify-between"><p class="text-sm text-stone-500">Active travellers</p><span class="rounded-lg bg-stone-100 p-2">♙</span></div><p class="mt-5 text-3xl font-semibold">196</p><p class="mt-3 text-xs text-emerald-700">↑ 5.4% <span class="text-stone-400">vs last month</span></p></article>
            <article class="card"><div class="flex items-center justify-between"><p class="text-sm text-stone-500">Pending requests</p><span class="rounded-lg bg-stone-100 p-2">◷</span></div><p class="mt-5 text-3xl font-semibold">12</p><p class="mt-3 text-xs text-amber-700">Needs your attention</p></article>
          </section>

          <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <article class="card xl:col-span-2">
              <div class="flex flex-wrap items-start justify-between gap-3"><div><h3 class="text-lg font-semibold">Revenue overview</h3><p class="mt-1 text-sm text-stone-500">Your revenue performance over the past 7 months</p></div><select id="chart-period" class="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm"><option>Last 7 months</option><option>Last 30 days</option></select></div>
              <div class="mt-7 flex h-52 items-end gap-3 border-b border-stone-200 px-1 sm:gap-5">
                ${[42, 58, 48, 72, 63, 85, 76].map((height, index) => `<div class="flex h-full flex-1 flex-col items-center justify-end gap-2"><div class="w-full max-w-12 rounded-t-md ${index === 5 ? 'bg-charcoal' : 'bg-[#D8D0C3]'} transition hover:bg-[#A58A5A]" style="height:${height}%"></div><span class="text-xs text-stone-500">${['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][index]}</span></div>`).join('')}
              </div>
              <p class="mt-4 text-sm text-stone-500">Monthly revenue <strong class="float-right text-charcoal">$48,290</strong></p>
            </article>
            <article id="activity" class="card"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">Recent activity</h3><button id="view-activity" class="text-sm font-semibold text-stone-500 hover:text-charcoal">View all</button></div><div class="mt-5 space-y-5">${activities.map((activity, index) => `<div class="flex gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${index === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-600'}">${index === 0 ? '+' : '✓'}</span><div><p class="text-sm font-semibold">${activity.title}</p><p class="mt-1 text-xs leading-5 text-stone-500">${activity.detail}</p><p class="mt-1 text-xs text-stone-400">${activity.time}</p></div></div>`).join('')}</div></article>
          </section>

          <section id="bookings" class="card !p-0">
            <div class="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6"><div><h3 class="text-lg font-semibold">Recent bookings</h3><p class="mt-1 text-sm text-stone-500">Manage and track your latest reservations.</p></div><div class="flex flex-col gap-3 sm:flex-row"><input id="booking-search" type="search" placeholder="Search bookings..." class="min-w-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold sm:w-52" /><select id="status-filter" class="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm"><option>All</option><option>Confirmed</option><option>Pending</option><option>Cancelled</option></select></div></div>
            <div class="overflow-x-auto"><table class="w-full min-w-[760px] text-left"><thead class="bg-stone-50"><tr class="text-xs uppercase tracking-wider text-stone-500"><th class="px-5 py-3 font-medium">Booking ID</th><th class="px-5 py-3 font-medium">Guest</th><th class="px-5 py-3 font-medium">Destination</th><th class="px-5 py-3 font-medium">Travel date</th><th class="px-5 py-3 font-medium">Amount</th><th class="px-5 py-3 font-medium">Status</th></tr></thead><tbody id="booking-rows"></tbody></table></div>
            <div class="flex items-center justify-between border-t border-stone-100 px-5 py-4"><span id="booking-count" class="text-sm text-stone-500"></span><button id="export-button" class="text-sm font-semibold hover:text-stone-500">Export list ↗</button></div>
          </section>

          <section id="destinations">
            <div class="mb-5 flex items-end justify-between"><div><h3 class="text-xl font-semibold">Popular destinations</h3><p class="mt-1 text-sm text-stone-500">Places your travellers love most.</p></div><button id="destinations-button" class="text-sm font-semibold">Explore all →</button></div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">${destinations.map((destination) => `<article class="overflow-hidden rounded-2xl border border-stone-200/70 bg-white"><img class="h-48 w-full object-cover" src="https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=900&q=80" alt="${destination.name}, ${destination.country}" loading="lazy"><div class="flex items-center justify-between p-5"><div><h4 class="font-semibold">${destination.name}</h4><p class="mt-1 text-sm text-stone-500">${destination.country}</p></div><div class="text-right"><p class="text-xs text-stone-500">From</p><p class="font-semibold">${destination.price}</p></div></div></article>`).join('')}</div>
          </section>

          <footer class="flex flex-col justify-between gap-2 border-t border-stone-200 py-5 text-xs text-stone-500 sm:flex-row"><p>© 2026 RoamDesk. Thoughtfully planned travel.</p><p>Made for smoother journeys.</p></footer>
        </div>
      </main>

      <div id="booking-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/40 p-4">
        <section role="dialog" aria-modal="true" aria-labelledby="modal-title" class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div class="flex items-start justify-between"><div><h2 id="modal-title" class="text-2xl font-semibold">Add a booking</h2><p class="mt-1 text-sm text-stone-500">Enter the traveller's reservation details.</p></div><button id="close-modal" aria-label="Close dialog" class="rounded-lg p-2 hover:bg-stone-100">✕</button></div>
          <form id="booking-form" class="mt-6 space-y-4">
            <div><label for="guest-name" class="mb-1.5 block text-sm font-medium">Guest full name</label><input id="guest-name" name="guest" required class="w-full rounded-lg border border-stone-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="e.g. Aline Mukamana"></div>
            <div><label for="destination-name" class="mb-1.5 block text-sm font-medium">Destination</label><input id="destination-name" name="destination" required class="w-full rounded-lg border border-stone-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="e.g. Kigali"></div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label for="travel-date" class="mb-1.5 block text-sm font-medium">Travel date</label><input id="travel-date" name="date" type="date" required class="w-full rounded-lg border border-stone-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"></div><div><label for="booking-amount" class="mb-1.5 block text-sm font-medium">Amount (USD)</label><input id="booking-amount" name="amount" type="number" min="1" required class="w-full rounded-lg border border-stone-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="850"></div></div>
            <div><label for="booking-status" class="mb-1.5 block text-sm font-medium">Status</label><select id="booking-status" name="status" class="w-full rounded-lg border border-stone-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"><option>Pending</option><option>Confirmed</option><option>Cancelled</option></select></div>
            <div class="flex justify-end gap-3 pt-3"><button type="button" id="cancel-modal" class="rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-semibold hover:bg-stone-50">Cancel</button><button type="submit" class="btn-primary">Save booking</button></div>
          </form>
        </section>
      </div>

      <div id="toast" role="status" class="fixed bottom-5 right-5 z-[60] hidden max-w-sm rounded-xl bg-charcoal px-5 py-4 text-sm text-white shadow-lg"></div>
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
  showToast.timer = window.setTimeout(() => toast.classList.add('hidden'), 3000)
}

function bindEvents() {
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
  const openModal = () => {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    document.querySelector('#guest-name').focus()
  }
  const closeModal = () => {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
  }

  document.querySelector('#add-booking-button').addEventListener('click', openModal)
  document.querySelector('#close-modal').addEventListener('click', closeModal)
  document.querySelector('#cancel-modal').addEventListener('click', closeModal)

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal()
  })

  document.querySelector('#booking-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const guest = String(formData.get('guest')).trim()
    const destination = String(formData.get('destination')).trim()
    const dateValue = String(formData.get('date'))
    const amountValue = Number(formData.get('amount'))

    if (!guest || !destination || !dateValue || !Number.isFinite(amountValue) || amountValue <= 0) {
      showToast('Please complete all fields with valid details.')
      return
    }

    const date = new Date(`${dateValue}T12:00:00`)
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

    bookings.unshift({
      id: `RD-${1043 + bookings.length - 6}`,
      guest,
      destination,
      date: formattedDate,
      amount: `$${amountValue.toLocaleString('en-US')}`,
      status: String(formData.get('status')),
    })

    selectedStatus = 'All'
    searchTerm = ''
    closeModal()
    render()
    showToast('Booking added successfully.')
  })

  document.querySelector('#export-button').addEventListener('click', () => {
    const header = ['Booking ID', 'Guest', 'Destination', 'Travel date', 'Amount', 'Status']
    const csvRows = [header, ...bookings.map((booking) => [booking.id, booking.guest, booking.destination, booking.date, booking.amount, booking.status])]
    const csv = csvRows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
    const file = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'roamdesk-bookings.csv'
    link.click()
    URL.revokeObjectURL(url)
    showToast('Your booking list has been exported.')
  })

  document.querySelector('#notification-button').addEventListener('click', () => showToast('You are all caught up on notifications.'))
  document.querySelector('#help-button').addEventListener('click', () => showToast('Help centre: support@roamdesk.example'))
  document.querySelector('#view-activity').addEventListener('click', () => showToast('You are viewing the latest activity.'))
  document.querySelector('#destinations-button').addEventListener('click', () => showToast('You are viewing our popular destinations.'))
  document.querySelector('#chart-period').addEventListener('change', (event) => showToast(`Showing: ${event.target.value}`))
}

render()
