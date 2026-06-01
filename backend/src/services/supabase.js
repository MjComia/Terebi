import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
//Last time its ANON_KEY NOW ITS SERVICE_KEY

console.log("USING KEY:", supabaseKey?.substring(0, 30) + "...")

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase