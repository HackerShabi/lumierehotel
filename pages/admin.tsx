import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import {
  getRooms,
  getBookings,
  getContacts,
  getStats,
  updateRoom,
  deleteRoom,
  addRoom,
  updateBooking,
  deleteBooking,
  markContactAsRead,
  deleteContact,
  subscribeToBookings,
  subscribeToContacts,
  Room,
  Booking,
  Contact,
  Stats
} from '../lib/firebaseServices'
import { auth } from '../lib/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

// No longer using email authorization
// Data is now segregated by website in Firestore subcollections

export default function AdminPanel() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  
  // Data states
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    totalRooms: 0,
    pendingBookings: 0,
    unreadContacts: 0
  })
  const [rooms, setRooms] = useState<Room[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  
  // UI states
  const [activeTab, setActiveTab] = useState('dashboard')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)
  
  // Auto-load data without authentication
  useEffect(() => {
    // Set as authenticated by default - no longer checking emails
    setIsAuthenticated(true)
    setLoading(false)
    loadDashboardData()
  }, [])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (autoRefresh && isAuthenticated) {
      const interval = setInterval(() => {
        loadDashboardData()
      }, 30000) // 30 seconds
      setRefreshInterval(interval)
      return () => clearInterval(interval)
    } else if (refreshInterval) {
      clearInterval(refreshInterval)
      setRefreshInterval(null)
    }
  }, [autoRefresh, isAuthenticated])

  // Real-time listeners for bookings and contacts
  useEffect(() => {
    if (!isAuthenticated) return

    console.log('Setting up real-time listeners...');
    
    const unsubscribeBookings = subscribeToBookings((newBookings) => {
      console.log('Real-time bookings update:', newBookings.length, 'bookings');
      setBookings(newBookings)
      // Show toast for new bookings
      if (bookings.length > 0 && newBookings.length > bookings.length) {
        const latestBooking = newBookings[0]
        toast.success(`New booking from ${latestBooking.guestInfo?.firstName || 'Guest'} ${latestBooking.guestInfo?.lastName || ''}`)
      }
    })

    const unsubscribeContacts = subscribeToContacts((newContacts) => {
      console.log('Real-time contacts update:', newContacts.length, 'contacts');
      setContacts(newContacts)
      // Show toast for new contacts
      if (contacts.length > 0 && newContacts.length > contacts.length) {
        const latestContact = newContacts[0]
        toast.success(`New contact message from ${latestContact.name || 'Unknown'}`)
      }
    })

    return () => {
      console.log('Cleaning up real-time listeners');
      unsubscribeBookings()
      unsubscribeContacts()
    }
  }, [isAuthenticated])

  // No longer need login/logout functions as we're not using authentication
  const handleGoogleLogin = async () => {
    // Set as authenticated directly
    setIsAuthenticated(true)
    loadDashboardData()
    toast.success('Admin panel accessed successfully!')
  }

  const handleLogout = async () => {
    // Just for UI consistency
    setIsAuthenticated(false)
    toast.success('Exited admin panel')
  }

  const loadDashboardData = async () => {
    try {
      console.log('Loading dashboard data...');
      
      // Load each data type separately for better error tracking
      console.log('Fetching rooms...');
      const roomsData = await getRooms();
      console.log('Rooms data:', roomsData);
      
      console.log('Fetching bookings...');
      const bookingsData = await getBookings();
      console.log('Bookings data:', bookingsData);
      
      console.log('Fetching contacts...');
      const contactsData = await getContacts();
      console.log('Contacts data:', contactsData);
      
      console.log('Calculating stats...');
      const statsData = await getStats();
      console.log('Stats data:', statsData);

      setStats(statsData)
      setRooms(roomsData)
      setBookings(bookingsData)
      setContacts(contactsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast.error('Failed to load dashboard data')
    }
  }

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      await updateBooking(bookingId, { status })
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ))
      toast.success(`Booking ${status} successfully`)
      loadDashboardData() // Refresh stats
    } catch (error) {
      console.error('Error updating booking:', error)
      toast.error('Failed to update booking status')
    }
  }

  const markContactRead = async (contactId: string) => {
    try {
      await markContactAsRead(contactId)
      setContacts(prev => prev.map(contact => 
        contact.id === contactId ? { ...contact, read: true } : contact
      ))
      loadDashboardData() // Refresh stats
    } catch (error) {
      console.error('Error marking contact as read:', error)
    }
  }



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-luxury-gold"></div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Lumiere Hotel Admin Panel
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access the Lumiere Hotel management system
            </p>
            <p className="mt-1 text-center text-xs text-gray-500">
              This admin panel shows data specific to the Lumiere Hotel website
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Enter Admin Panel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Lumiere <span className="text-luxury-gold">Hotel</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Auto-refresh:</span>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRefresh ? 'bg-luxury-gold' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoRefresh ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={loadDashboardData}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
              { id: 'bookings', name: 'Bookings', icon: BuildingOfficeIcon },
              { id: 'rooms', name: 'Rooms', icon: BuildingOfficeIcon },
              { id: 'contacts', name: 'Contacts', icon: EnvelopeIcon },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-luxury-gold text-luxury-gold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                  <BuildingOfficeIcon className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</p>
                  </div>
                  <ChartBarIcon className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalRooms}</p>
                  </div>
                  <BuildingOfficeIcon className="h-8 w-8 text-indigo-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingBookings}</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unread Contacts</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.unreadContacts}</p>
                  </div>
                  <EnvelopeIcon className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.guestInfo?.firstName ? `${booking.guestInfo.firstName} ${booking.guestInfo.lastName || ''}` : booking.guestName || 'Guest'}
                        </p>
                        <p className="text-sm text-gray-600">{booking.roomName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${booking.totalAmount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-cyan-100 text-cyan-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
                <div className="space-y-3">
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600 truncate">{contact.subject}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!contact.read && (
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                        <span className="text-xs text-gray-500">
                          {contact.createdAt?.toDate ? contact.createdAt.toDate().toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Bookings Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.guestInfo?.firstName ? `${booking.guestInfo.firstName} ${booking.guestInfo.lastName || ''}` : booking.guestName || 'Guest'}
                          </div>
                          <div className="text-sm text-gray-500">{booking.guestInfo?.email || booking.email || 'No email provided'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.roomName}</div>
                        <div className="text-sm text-gray-500">{booking.roomType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{booking.guests} guests</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-cyan-100 text-cyan-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id!, 'confirmed')}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id!, 'cancelled')}
                                className="text-red-600 hover:text-red-900"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id!, 'completed')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Contact Messages</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <div key={contact.id} className={`p-6 ${!contact.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                        {!contact.read && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            New
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-1" />
                            {contact.phone}
                          </span>
                        )}
                        <span>{contact.createdAt?.toDate ? contact.createdAt.toDate().toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-medium text-gray-900">{contact.subject}</h4>
                        <p className="mt-1 text-gray-700">{contact.message}</p>
                      </div>
                    </div>
                    <div className="ml-4">
                      {!contact.read && (
                        <button
                          onClick={() => markContactAsRead(contact.id!)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}