import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) await fetchProfile(session.user.id)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-10 text-center">Loading iHome Platform...</div>
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold p-6">iHome Platform - {profile?.role || 'Select Role'}</h1>
      {/* Your existing routes / components go here */}
      {/* Keep all your pages for Agency / Seller / Buyer */}
      {!user && <p className="p-6">Please login - Supabase is connected to {supabase.supabaseUrl}</p>}
      {user && profile && <p className="p-6">Logged in as {profile.email} - Role: {profile.role}</p>}
    </div>
  )
}

export default App
