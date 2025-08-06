import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import { CalendarIcon, UserGroupIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'

const QuickBookingForm: React.FC = () => {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<Date | null>(new Date())
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(Date.now() + 24 * 60 * 60 * 1000))
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)
  const [customGuests, setCustomGuests] = useState('')
  const [useCustomInput, setUseCustomInput] = useState(false)
  
  const totalGuests = useCustomInput ? parseInt(customGuests) || 0 : adults + children

  const handleSearch = () => {
    // Validation
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates')
      return
    }

    if (checkIn >= checkOut) {
      toast.error('Check-out date must be after check-in date')
      return
    }

    const finalTotalGuests = useCustomInput ? parseInt(customGuests) || 0 : adults + children
    
    if (finalTotalGuests < 1) {
      toast.error('Please select at least 1 guest')
      return
    }

    const searchParams = {
      checkInDate: checkIn?.toISOString().split('T')[0] || '',
      checkOutDate: checkOut?.toISOString().split('T')[0] || '',
      adults: useCustomInput ? finalTotalGuests : adults,
      children: useCustomInput ? 0 : children,
      guests: finalTotalGuests
    }
    
    // Store search parameters in localStorage for room selection
    localStorage.setItem('searchParams', JSON.stringify(searchParams))
    
    toast.success('Searching for available rooms...')
    router.push('/rooms')
  }

  return (
    <div className="absolute top-full left-0 right-0 transform -translate-y-1/2 z-30 md:mb-0 mb-16">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow-2xl p-6 mx-4 md:mx-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Check-in Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent pl-10"
                  placeholderText="Select date"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn || new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent pl-10"
                  placeholderText="Select date"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Guests
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent pl-10 text-left bg-white"
                >
                  {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                  {children > 0 && (
                    <span className="text-xs text-gray-500 ml-1">({adults} adults, {children} children)</span>
                  )}
                </button>
                <UserGroupIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                
                {isGuestsOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      {/* Family Presets */}
                      <div className="mb-4">
                        <span className="text-sm font-medium mb-2 block text-black">Quick Family Options</span>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => { setAdults(2); setChildren(0); setUseCustomInput(false); }}
                            className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Couple (2)
                          </button>
                          <button
                            type="button"
                            onClick={() => { setAdults(2); setChildren(1); setUseCustomInput(false); }}
                            className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Small Family (3)
                          </button>
                          <button
                            type="button"
                            onClick={() => { setAdults(2); setChildren(2); setUseCustomInput(false); }}
                            className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Family (4)
                          </button>
                          <button
                            type="button"
                            onClick={() => { setAdults(4); setChildren(2); setUseCustomInput(false); }}
                            className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Large Family (6)
                          </button>
                          <button
                            type="button"
                            onClick={() => { setAdults(6); setChildren(2); setUseCustomInput(false); }}
                            className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Extended Family (8)
                          </button>
                          <button
                            type="button"
                            onClick={() => setUseCustomInput(true)}
                            className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Custom
                          </button>
                        </div>
                      </div>

                      {/* Custom Input */}
                      {useCustomInput && (
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-2 block text-black">Total Guests</label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={customGuests}
                            onChange={(e) => setCustomGuests(e.target.value)}
                            placeholder="Enter number of guests"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          />
                        </div>
                      )}

                      {/* Manual Controls */}
                      {!useCustomInput && (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-black">Adults</span>
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-black">{adults}</span>
                              <button
                                type="button"
                                onClick={() => setAdults(Math.min(15, adults + 1))}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-black">Children</span>
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-black">{children}</span>
                              <button
                                type="button"
                                onClick={() => setChildren(Math.min(10, children + 1))}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => setIsGuestsOpen(false)}
                        className="w-full mt-3 px-4 py-2 bg-luxury-gold text-white rounded-lg hover:bg-gold-600 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-luxury-gold to-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search Rooms</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickBookingForm