import supabase from "../services/supabase.js";

export const register = async (req, res) => {
    const { username, password } = req.body

    try {
        const { data, error } = await supabase.auth.signUp({
            username,
            password
        })

        if (error) return res.status(400).json({ error: error.message })

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
    const { username, password } = req.body
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