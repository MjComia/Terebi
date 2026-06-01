import supabase from "../services/supabase.js";

export const register = async (req, res) => {
    const { email, username, password } = req.body || {}

    if (!username || !password || !email) {
        return res.status(400).json({ error: "Username and password are required" })
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username
                }
            }
        })
        
        console.log("SUPABASE RESPONSE:", { data, error });

        if (error) return res.status(400).json({ error: error.message })

        if (!data.user) return res.status(400).json({ error: "User with this email already exists" })

        const { error: dbError } = await supabase.from('user').insert([{
            id: data.user.id,
            email: email,
            username: username
        }])
        if (dbError) return res.status(400).json({ error: dbError.message })
        return res.status(201).json({
            message: 'Registered Successfully',
            user: data.user
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body || {}

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" })
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            username,
            password
        })
        if (error) return res.status(400).json({ error: error.message })
        return res.status(200).json({ message: 'Logged in Successfully', user: data.user, session: data.session })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}