import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [isPolling, setIsPolling] = useState(true)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // Auto-refresh every 20 seconds
  useEffect(() => {
    if (!dToken || !isPolling) return

    const interval = setInterval(() => {
      getAppointments(false) // Silent refresh
    }, 20000)

    return () => clearInterval(interval)
  }, [dToken, isPolling])

  // Handle completion with confirmation
  const handleComplete = async (appointmentId) => {
    const confirmed = window.confirm('Mark this appointment as completed? This will update the queue for all patients.')
    if (confirmed) {
      await completeAppointment(appointmentId)
      toast.success('Appointment completed! Queue updated for all patients.')
    }
  }

  // Handle cancellation with confirmation
  const handleCancel = async (appointmentId) => {
    const confirmed = window.confirm('Cancel this appointment? This will update the queue for other patients.')
    if (confirmed) {
      await cancelAppointment(appointmentId)
      toast.success('Appointment cancelled! Queue updated.')
    }
  }

  // Get today's appointments count
  const getTodayAppointmentsCount = () => {
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    return appointments.filter(apt => 
      apt.slotDate === todayStr && !apt.cancelled && !apt.isCompleted
    ).length
  }

  return (
    <div className='w-full max-w-6xl m-5'>

      <div className='flex justify-between items-center mb-3'>
        <div>
          <p className='text-lg font-medium'>All Appointments</p>
          <p className='text-sm text-gray-500 mt-1'>
            Today's pending: {getTodayAppointmentsCount()} appointments
          </p>
        </div>
        <button
          onClick={() => setIsPolling(!isPolling)}
          className={`text-xs px-3 py-2 rounded-lg transition-all ${
            isPolling 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}
          title={isPolling ? 'Auto-refresh every 20 seconds' : 'Auto-refresh disabled'}
        >
          {isPolling ? '● Auto-refresh ON' : '○ Auto-refresh OFF'}
        </button>
      </div>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50'>
          <p className='font-medium'>#</p>
          <p className='font-medium'>Patient</p>
          <p className='font-medium'>Payment</p>
          <p className='font-medium'>Age</p>
          <p className='font-medium'>Date & Time</p>
          <p className='font-medium'>Fees</p>
          <p className='font-medium'>Action</p>
        </div>
        {appointments.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>
            <p>No appointments found</p>
          </div>
        ) : (
          appointments.map((item, index) => {
            // Calculate queue position for this appointment
            const queuePos = item.queuePosition || 1
            const totalInSlot = item.totalInSlot || 1
            const isToday = item.slotDate === `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
            
            return (
              <div 
                className={`flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 ${
                  isToday && !item.cancelled && !item.isCompleted ? 'bg-blue-50' : ''
                }`} 
                key={index}
              >
                <p className='max-sm:hidden'>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img src={item.userData.image} className='w-8 rounded-full' alt="" /> 
                  <div>
                    <p className='font-medium'>{item.userData.name}</p>
                    {!item.cancelled && !item.isCompleted && (
                      <p className='text-xs text-blue-600'>
                        Position #{queuePos} of {totalInSlot}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className='text-xs inline border border-primary px-2 rounded-full'>
                    {item.payment ? 'Online' : 'CASH'}
                  </p>
                </div>
                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                <div>
                  <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  {item.estimatedTime && item.estimatedTime !== item.slotTime && !item.cancelled && !item.isCompleted && (
                    <p className='text-xs text-gray-500 mt-1'>
                      Est: {item.estimatedTime}
                    </p>
                  )}
                  {item.patientStatus && item.patientStatus !== 'waiting' && !item.cancelled && !item.isCompleted && (
                    <p className='text-xs mt-1'>
                      {item.patientStatus === 'on-my-way' && '🚗 On the way'}
                      {item.patientStatus === 'arrived' && '✅ Arrived'}
                      {item.patientStatus === 'in-consultation' && '👨‍⚕️ In consultation'}
                    </p>
                  )}
                </div>
                <p className='font-medium'>{currency}{item.amount}</p>
                {item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <div className='flex gap-2'>
                        <img 
                          onClick={() => handleCancel(item._id)} 
                          className='w-10 cursor-pointer hover:scale-110 transition-transform' 
                          src={assets.cancel_icon} 
                          alt="Cancel" 
                          title="Cancel appointment"
                        />
                        <img 
                          onClick={() => handleComplete(item._id)} 
                          className='w-10 cursor-pointer hover:scale-110 transition-transform' 
                          src={assets.tick_icon} 
                          alt="Complete" 
                          title="Mark as completed"
                        />
                      </div>
                }
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

export default DoctorAppointments